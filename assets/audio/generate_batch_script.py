#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
三丽鸥梦幻消消乐 - AI音乐批量生成辅助脚本

这个脚本帮助你组织和批量生成AI音乐
支持导出各种AI音乐工具可用的格式

使用方法:
1. 确保安装了Python 3.7+
2. 运行: python generate_batch_script.py
3. 根据提示选择输出格式
"""

import json
import os
from datetime import datetime


def load_music_data():
    """加载音乐配置数据"""
    with open('ai_generation_prompts.json', 'r', encoding='utf-8') as f:
        return json.load(f)


def load_sfx_data():
    """加载音效配置数据"""
    with open('sfx_generation_prompts.json', 'r', encoding='utf-8') as f:
        return json.load(f)


def generate_suno_csv(music_data):
    """生成Suno AI可用的CSV格式"""
    csv_lines = ['filename,prompt,style,tempo,key']

    for track in music_data['tracks']:
        filename = track['filename'].replace('.mp3', '')
        prompt = track['suno_prompt'].replace(',', '，')  # 替换英文逗号
        style = track['mood']
        tempo = track['tempo']
        key = track['key']
        csv_lines.append(f"{filename},{prompt},{style},{tempo},{key}")

    return '\n'.join(csv_lines)


def generate_prompt_list(music_data):
    """生成纯提示词列表，方便复制粘贴"""
    output = []
    output.append("=" * 60)
    output.append("🎵 三丽鸥梦幻消消乐 - AI音乐生成提示词列表")
    output.append("=" * 60)
    output.append("")

    current_category = ""
    for track in music_data['tracks']:
        if track['category'] != current_category:
            current_category = track['category']
            output.append("")
            output.append(f"📂 {current_category}")
            output.append("-" * 40)

        output.append(f"\n🎼 {track['title']} ({track['filename']})")
        output.append(f"   调性: {track['key']} | 速度: {track['tempo']} BPM")
        output.append(f"\n   📝 Suno AI 提示词:")
        output.append(f"   {track['suno_prompt']}")
        output.append("")

    return '\n'.join(output)


def generate_udio_format(music_data):
    """生成Udio可用的格式"""
    output = []
    output.append("# Udio 批量生成配置")
    output.append(f"# 生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    output.append("")

    for track in music_data['tracks']:
        output.append(f"## {track['filename']}")
        output.append(f"**标题**: {track['title']}")
        output.append(f"**风格**: {track['mood']}")
        output.append(f"**提示词**: {track['suno_prompt']}")
        output.append(f"**乐器**: {', '.join(track['instruments'])}")
        output.append("")

    return '\n'.join(output)


def generate_markdown_guide(music_data, sfx_data):
    """生成完整的Markdown指南"""
    md = f"""# 🎵 三丽鸥梦幻消消乐 - AI音乐生成完整指南

> 生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## 📊 生成统计

- **背景音乐总数**: {len(music_data['tracks'])} 首
- **音效总数**: {len(sfx_data['sfx_tracks'])} 个
- **角色语音**: 多个角色多种情绪

---

## 🎼 背景音乐列表

"""

    current_category = ""
    for track in music_data['tracks']:
        if track['category'] != current_category:
            current_category = track['category']
            md += f"\n### {current_category}\n\n"

        md += f"""#### {track['title']}
- **文件名**: `{track['filename']}`
- **时长**: {track['duration']}
- **调性**: {track['key']}
- **速度**: {track['tempo']} BPM
- **情绪**: {track['mood']}
- **乐器**: {', '.join(track['instruments'])}

**Suno AI 提示词**:
```
{track['suno_prompt']}
```

"""

    md += """---

## 🔊 音效列表

"""

    for sfx in sfx_data['sfx_tracks']:
        md += f"""### {sfx['description']} (`{sfx['filename']}`)
- **类别**: {sfx['category']}
- **时长**: {sfx['duration']}
- **建议音量**: {sfx['volume_db']}dB

**ElevenLabs 提示词**:
```
{sfx['elevenlabs_prompt']}
```

**参考**: {sfx['reference']}

"""

    md += """---

## 🎤 角色语音

"""

    for voice in sfx_data.get('voice_sfx', []):
        md += f"\n### {voice['character']}\n\n"
        for sound in voice['sounds']:
            md += f"- `{sound['filename']}` - {sound['description']}: \"{sound['text']}\"\n"

    md += """

---

## 🛠️ 生成工具推荐

### 背景音乐
1. **Suno AI** (推荐) - https://suno.ai
2. **Udio** - https://udio.com
3. **AIVA** - https://www.aiva.ai

### 音效
1. **ElevenLabs Sound Effects** - https://elevenlabs.io/sound-effects
2. **Freesound.org** - https://freesound.org
3. **ChipTone** - https://sfbgames.itch.io/chiptone

### 角色语音
1. **ElevenLabs** - 支持多语言语音合成
2. **VOICEVOX** - 开源日语语音合成

---

## 📁 文件存放结构

```
assets/audio/
├── bgm/                          # 背景音乐 (30首)
│   ├── bgm_main_theme.mp3
│   ├── bgm_chapter1_normal.mp3
│   └── ...
├── sfx/                          # 游戏音效 (15个)
│   ├── sfx_match_1.mp3
│   ├── sfx_click.mp3
│   └── ...
└── voices/                       # 角色语音
    ├── hello_kitty/
    ├── my_melody/
    └── ...
```

---

## ⚙️ 技术规格

### 背景音乐
- **格式**: MP3
- **比特率**: 128kbps
- **采样率**: 44.1kHz
- **声道**: Stereo
- **音量**: -12dB ~ -10dB

### 音效
- **格式**: MP3
- **比特率**: 96kbps
- **采样率**: 44.1kHz
- **声道**: Mono (部分可使用 Stereo)
- **音量**: -8dB ~ -6dB

---

## 🎨 风格指南

### 整体风格
- 日系治愈系 (Healing Music)
- Kawaii Future Bass
- 轻快 J-Pop
- 梦幻电子

### 情感基调
- 甜美 (Sweet)
- 梦幻 (Dreamy)
- 治愈 (Healing)
- 活泼 (Energetic)

### 配器特点
- 电子合成器 + 真实乐器混合
- 大量使用: 铃铛、钢琴、弦乐
- 适当使用: 木管、吉他、打击乐

---

*本指南由脚本自动生成*
"""

    return md


def main():
    """主函数"""
    print("🎵 三丽鸥梦幻消消乐 - AI音乐批量生成助手")
    print("=" * 50)

    # 加载数据
    try:
        music_data = load_music_data()
        sfx_data = load_sfx_data()
        print(f"✅ 成功加载 {len(music_data['tracks'])} 首BGM配置")
        print(f"✅ 成功加载 {len(sfx_data['sfx_tracks'])} 个音效配置")
    except FileNotFoundError as e:
        print(f"❌ 错误: 找不到配置文件 - {e}")
        return

    # 显示菜单
    print("\n请选择输出格式:")
    print("1. 📝 生成纯提示词列表 (适合手动复制)")
    print("2. 📊 生成Suno AI CSV格式")
    print("3. 🎵 生成Udio格式")
    print("4. 📄 生成完整Markdown指南")
    print("5. 🚀 生成所有格式")

    # 自动生成所有格式
    choice = '5'
    print("\n🚀 正在生成所有格式...")

    output_dir = "output"
    os.makedirs(output_dir, exist_ok=True)

    if choice == '1' or choice == '5':
        content = generate_prompt_list(music_data)
        filepath = os.path.join(output_dir, "prompt_list.txt")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ 已生成: {filepath}")

    if choice == '2' or choice == '5':
        content = generate_suno_csv(music_data)
        filepath = os.path.join(output_dir, "suno_batch.csv")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ 已生成: {filepath}")

    if choice == '3' or choice == '5':
        content = generate_udio_format(music_data)
        filepath = os.path.join(output_dir, "udio_format.md")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ 已生成: {filepath}")

    if choice == '4' or choice == '5':
        content = generate_markdown_guide(music_data, sfx_data)
        filepath = os.path.join(output_dir, "complete_guide.md")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ 已生成: {filepath}")

    print("\n🎉 生成完成！")
    print(f"📁 所有文件已保存到: {os.path.abspath(output_dir)}/")


if __name__ == '__main__':
    main()
