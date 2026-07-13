#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成带文件名的HTML音乐生成器
"""

import json

# 读取配置文件
with open('music_config.json', 'r', encoding='utf-8') as f:
    config = json.load(f)

tracks = config['tracks']
sfx_list = config['sfx']

# 生成BGM列表
bgm_cards = ""
for track in tracks:
    full_prompt = f"[FILENAME:{track['filename']}] {track['suno_prompt']}"
    safe_prompt = full_prompt.replace("'", "\\'")
    bgm_cards += f"""
                <div class="track-card" id="track-{track['id']}">
                    <div class="track-header">
                        <span class="filename-badge">📁 {track['filename']}</span>
                        <div class="track-title">{track['title']}</div>
                    </div>
                    <div class="track-meta">
                        <span class="meta-tag">🎵 {track['key']}</span>
                        <span class="meta-tag">⏱️ {track['tempo']} BPM</span>
                        <span class="meta-tag">💫 {track['style']}</span>
                    </div>
                    <div class="prompt-box" onclick="copyText('{safe_prompt}')">
                        <div class="prompt-label">📋 点击复制提示词（已含文件名）</div>
                        <div class="prompt-text">{full_prompt}</div>
                    </div>
                    <div class="track-actions">
                        <button class="btn-copy" onclick="copyText('{safe_prompt}'); event.stopPropagation();">
                            📋 复制
                        </button>
                        <button class="btn-generate" onclick="openSuno(); event.stopPropagation();">
                            🎵 去Suno生成
                        </button>
                    </div>
                    <div class="copy-hint">💡 提示：点击上方灰色区域或复制按钮复制完整提示词</div>
                </div>
"""

# 生成音效列表
sfx_cards = ""
for sfx in sfx_list:
    full_prompt = f"[FILENAME:{sfx['filename']}] {sfx['elevenlabs_prompt']}"
    safe_prompt = full_prompt.replace("'", "\\'")
    sfx_cards += f"""
                <div class="track-card" id="track-{sfx['id']}">
                    <div class="track-header">
                        <span class="filename-badge">📁 {sfx['filename']}</span>
                        <div class="track-title">{sfx['title']}</div>
                    </div>
                    <div class="track-meta">
                        <span class="meta-tag">⏱️ {sfx['duration']}</span>
                        <span class="meta-tag">🔊 {sfx['volume_db']}dB</span>
                    </div>
                    <div class="prompt-box" onclick="copyText('{safe_prompt}')">
                        <div class="prompt-label">📋 点击复制提示词（已含文件名）</div>
                        <div class="prompt-text">{full_prompt}</div>
                    </div>
                    <div class="track-actions">
                        <button class="btn-copy" onclick="copyText('{safe_prompt}'); event.stopPropagation();">
                            📋 复制
                        </button>
                        <button class="btn-generate" onclick="openElevenLabs(); event.stopPropagation();">
                            🔊 去ElevenLabs
                        </button>
                    </div>
                    <div class="copy-hint">💡 提示：点击上方灰色区域或复制按钮复制完整提示词</div>
                </div>
"""

# 生成全部BGM复制文本
bgm_copy_text = ""
for i, track in enumerate(tracks, 1):
    full_prompt = f"[FILENAME:{track['filename']}] {track['suno_prompt']}"
    bgm_copy_text += f"【{i}】{track['title']}\\n{full_prompt}\\n\\n"

# 生成全部音效复制文本
sfx_copy_text = ""
for i, sfx in enumerate(sfx_list, 1):
    full_prompt = f"[FILENAME:{sfx['filename']}] {sfx['elevenlabs_prompt']}"
    sfx_copy_text += f"【{i}】{sfx['title']}\\n{full_prompt}\\n\\n"

html_template = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎵 三丽鸥消消乐 - AI音乐批量生成器 (含文件名)</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }}
        .container {{ max-width: 1400px; margin: 0 auto; }}
        header {{
            text-align: center;
            margin-bottom: 30px;
            color: white;
        }}
        h1 {{ font-size: 2.5em; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }}
        .subtitle {{ opacity: 0.9; font-size: 1.1em; }}

        .filename-badge {{
            background: #FF6B6B;
            color: white;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.8em;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 8px;
            border: 2px solid #fff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }}

        .batch-controls {{
            background: white;
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }}

        .batch-controls h2 {{
            color: #667eea;
            margin-bottom: 20px;
        }}

        .control-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }}

        .btn-primary {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1em;
            font-weight: bold;
            transition: all 0.3s;
        }}

        .btn-primary:hover {{
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102,126,234,0.4);
        }}

        .btn-secondary {{
            background: #f0f0f0;
            color: #333;
            border: 2px solid #667eea;
            padding: 12px 25px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.3s;
        }}

        .btn-secondary:hover {{
            background: #667eea;
            color: white;
        }}

        .music-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 20px;
        }}

        .track-card {{
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s;
            border: 2px solid transparent;
        }}

        .track-card:hover {{
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            border-color: #667eea;
        }}

        .track-header {{ margin-bottom: 10px; }}

        .track-title {{
            font-weight: bold;
            color: #333;
            font-size: 1.1em;
            margin-top: 5px;
        }}

        .track-meta {{
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }}

        .meta-tag {{
            background: #f0f0f0;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.8em;
            color: #666;
        }}

        .prompt-box {{
            background: #f8f9fa;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
        }}

        .prompt-box:hover {{
            background: #e3f2fd;
            border-color: #2196F3;
        }}

        .prompt-label {{
            font-size: 0.75em;
            color: #999;
            margin-bottom: 8px;
            font-weight: bold;
        }}

        .prompt-text {{
            font-size: 0.9em;
            color: #333;
            line-height: 1.6;
            word-break: break-word;
            font-family: 'Courier New', monospace;
            background: #fff;
            padding: 10px;
            border-radius: 5px;
            border-left: 4px solid #FF6B6B;
        }}

        .track-actions {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }}

        .btn-copy {{
            background: #667eea;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9em;
            font-weight: bold;
            transition: all 0.3s;
        }}

        .btn-copy:hover {{ background: #5568d3; }}

        .btn-generate {{
            background: #764ba2;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9em;
            font-weight: bold;
            transition: all 0.3s;
        }}

        .btn-generate:hover {{ background: #6a4190; }}

        .category-section {{ margin-bottom: 40px; }}

        .category-title {{
            color: white;
            font-size: 1.5em;
            margin-bottom: 20px;
            padding: 15px 25px;
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
            display: inline-block;
            font-weight: bold;
        }}

        .toast {{
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #333;
            color: white;
            padding: 15px 30px;
            border-radius: 30px;
            opacity: 0;
            transition: all 0.3s;
            z-index: 1000;
            font-weight: bold;
        }}

        .toast.show {{
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }}

        .instructions {{
            background: rgba(255,255,255,0.95);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 30px;
            color: #333;
        }}

        .instructions h3 {{
            color: #667eea;
            margin-bottom: 15px;
        }}

        .instructions ol {{
            margin-left: 20px;
            line-height: 2;
        }}

        .highlight {{
            background: #fff3cd;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: monospace;
            color: #856404;
            font-weight: bold;
        }}

        .copy-hint {{
            font-size: 0.8em;
            color: #666;
            text-align: center;
            margin-top: 8px;
            font-style: italic;
        }}

        @media (max-width: 768px) {{
            h1 {{ font-size: 1.8em; }}
            .music-grid {{ grid-template-columns: 1fr; }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🎀 三丽鸥梦幻消消乐</h1>
            <p class="subtitle">AI音乐批量生成器 | 提示词已包含文件名，方便对应整理</p>
        </header>

        <div class="instructions">
            <h3>📖 使用说明</h3>
            <ol>
                <li><strong>单个生成</strong>：点击任意卡片的"📋 复制"按钮</li>
                <li><strong>批量生成</strong>：点击下方的"📋 复制全部BGM提示词"</li>
                <li><strong>Suno AI设置</strong>：选择 <strong>Custom Mode</strong> → <strong>Instrumental</strong>（无歌词）</li>
                <li><strong>保存文件</strong>：按提示词中的 <span class="highlight">[FILENAME:xxx.mp3]</span> 命名保存</li>
            </ol>
            <p style="margin-top: 15px; padding: 15px; background: #fff3cd; border-radius: 8px; color: #856404; border-left: 4px solid #ffc107;">
                💡 <strong>重要提示</strong>：每个提示词开头都有红色的文件名标记，生成后请务必按此文件名保存到对应文件夹
            </p>
        </div>

        <div class="batch-controls">
            <h2>🚀 批量操作</h2>
            <div class="control-grid">
                <button class="btn-primary" onclick="copyAllBGM()">
                    📋 复制全部BGM提示词（含文件名）
                </button>
                <button class="btn-primary" onclick="copyAllSFX()">
                    📋 复制全部音效提示词（含文件名）
                </button>
                <button class="btn-secondary" onclick="openSuno()">
                    🎵 打开 Suno AI
                </button>
                <button class="btn-secondary" onclick="openElevenLabs()">
                    🔊 打开 ElevenLabs
                </button>
            </div>
        </div>

        <div class="category-section">
            <div class="category-title">🎼 背景音乐 (30首)</div>
            <div class="music-grid">
                {bgm_cards}
            </div>
        </div>

        <div class="category-section">
            <div class="category-title">🔊 游戏音效 (15个)</div>
            <div class="music-grid">
                {sfx_cards}
            </div>
        </div>
    </div>

    <div class="toast" id="toast"></div>

    <script>
        // 复制文本
        function copyText(text) {{
            navigator.clipboard.writeText(text).then(() => {{
                const filenameMatch = text.match(/\\[FILENAME:(.+?)\\]/);
                const filename = filenameMatch ? filenameMatch[1] : '文件';
                showToast(`✅ ${{filename}} 提示词已复制！`);
            }}).catch(err => {{
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                showToast('✅ 提示词已复制！');
            }});
        }}

        // 复制全部BGM
        function copyAllBGM() {{
            let allPrompts = '🎵 三丽鸥消消乐 - BGM提示词列表（含文件名）\\n';
            allPrompts += '═══════════════════════════════════════════════════\\n\\n';
            allPrompts += '💡 使用说明：\\n';
            allPrompts += '   1. 将下面的提示词逐个复制到 Suno AI 中生成\\n';
            allPrompts += '   2. 每个提示词开头的 [FILENAME:xxx.mp3] 是目标文件名\\n';
            allPrompts += '   3. 生成后请按此文件名保存到 assets/audio/bgm/ 文件夹\\n\\n';
            allPrompts += '═══════════════════════════════════════════════════\\n\\n';
            allPrompts += `{bgm_copy_text}`;

            navigator.clipboard.writeText(allPrompts).then(() => {{
                showToast('✅ 全部30首BGM提示词已复制（含文件名）！');
            }});
        }}

        // 复制全部音效
        function copyAllSFX() {{
            let allPrompts = '🔊 三丽鸥消消乐 - 音效提示词列表（含文件名）\\n';
            allPrompts += '═══════════════════════════════════════════════════\\n\\n';
            allPrompts += '💡 使用说明：\\n';
            allPrompts += '   1. 将下面的提示词逐个复制到 ElevenLabs 中生成\\n';
            allPrompts += '   2. 每个提示词开头的 [FILENAME:xxx.mp3] 是目标文件名\\n';
            allPrompts += '   3. 生成后请按此文件名保存到 assets/audio/sfx/ 文件夹\\n\\n';
            allPrompts += '═══════════════════════════════════════════════════\\n\\n';
            allPrompts += `{sfx_copy_text}`;

            navigator.clipboard.writeText(allPrompts).then(() => {{
                showToast('✅ 全部15个音效提示词已复制（含文件名）！');
            }});
        }}

        // 打开Suno AI
        function openSuno() {{
            window.open('https://suno.ai', '_blank');
            showToast('🎵 请在 Suno AI 中选择 Custom Mode → Instrumental');
        }}

        // 打开ElevenLabs
        function openElevenLabs() {{
            window.open('https://elevenlabs.io/sound-effects', '_blank');
            showToast('🔊 请在 ElevenLabs 中粘贴音效提示词');
        }}

        // 显示提示
        function showToast(message) {{
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {{
                toast.classList.remove('show');
            }}, 3000);
        }}
    </script>
</body>
</html>
"""

# 保存文件
output_path = 'batch_generator_with_filename.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html_template)

print(f"✅ 已生成文件: {output_path}")
print(f"📊 包含:")
print(f"   - BGM: {len(tracks)} 首")
print(f"   - 音效: {len(sfx_list)} 个")
print(f"\n🚀 使用方式:")
print(f"   open {output_path}")
