# 📖 故事线系统说明

本文件夹包含游戏的所有故事线内容，采用模块化设计，便于扩展和维护。

## 文件夹结构说明

### `prologue/` - 序章
- 游戏开始时的引导故事
- 介绍三丽鸥世界的背景设定
- 引导玩家进入第一章

### `chapter_1/` ~ `chapter_6/` - 主线章节
每个章节围绕一个三丽鸥角色展开：

| 章节 | 主题角色 | 故事主题 | 关卡范围 |
|------|----------|----------|----------|
| 第一章 | Hello Kitty | 甜品派对 | 1-10关 |
| 第二章 | 美乐蒂 | 音乐盒的秘密 | 11-20关 |
| 第三章 | 大耳狗 | 云端冒险 | 21-30关 |
| 第四章 | 布丁狗 | 悠闲午后 | 31-40关 |
| 第五章 | 库洛米 | 恶作剧大作战 | 41-50关 |
| 第六章 | 双子星 | 星空之旅 | 51-60关 |

### `special_events/` - 特别活动
- 限时活动的专属故事线
- 节日主题活动剧情

### `characters/` - 角色档案
- 每个角色的详细资料
- 包含角色介绍、性格、喜好等

## 故事文件格式

### level_X.json 格式
```json
{
  "level_id": 1,
  "title": "关卡标题",
  "pre_dialogue": [
    {
      "character": "hello_kitty",
      "expression": "happy",
      "text": "欢迎来到甜品派对！",
      "voice": "voice_001.mp3"
    }
  ],
  "post_dialogue": [
    {
      "character": "hello_kitty",
      "expression": "excited",
      "text": "太棒了！谢谢你帮我！",
      "voice": "voice_002.mp3"
    }
  ],
  "objective": {
    "description": "收集20个草莓",
    "hint": "优先消除红色方块"
  }
}
```

### story.json 格式
```json
{
  "chapter_id": 1,
  "title": "Hello Kitty的甜品派对",
  "description": "Kitty正在准备一场盛大的甜品派对...",
  "unlock_condition": "完成序章",
  "main_character": "hello_kitty",
  "supporting_characters": ["my_melody", "cinnamonroll"],
  "bgm": "chapter1_bgm.mp3",
  "background": "chapter1_bg.png"
}
```

## 故事编写规范

1. **语言风格**：甜美可爱，符合三丽鸥品牌形象
2. **对话长度**：每句不超过30个字符，适合手机阅读
3. **角色语气**：
   - Hello Kitty：温柔友善
   - 美乐蒂：天真烂漫
   - 大耳狗：软萌可爱
   - 布丁狗：悠闲自在
   - 库洛米：调皮但善良
   - 双子星：梦幻甜美

4. **故事节奏**：
   - 简单关卡：1-2句对话
   - 普通关卡：3-5句对话
   - Boss关卡：完整剧情过场
