# 🎵 AI音乐生成操作指南

## 推荐的AI音乐生成工具

### 1. Suno AI (首选) 🌟
**网址**: https://suno.ai

**优点**:
- 支持中文和英文提示词
- 生成质量高，风格多样
- 可以生成完整的器乐作品
- 免费版每天有一定额度

**使用步骤**:
1. 注册并登录 Suno AI
2. 点击 "Create" 创建新音乐
3. 选择 "Custom Mode"
4. 在 "Style of Music" 输入框中粘贴提示词
5. 确保选择 "Instrumental"（纯音乐，无歌词）
6. 点击生成

### 2. Udio
**网址**: https://udio.com

**优点**:
- 音质非常出色
- 支持详细的风格描述
- 可以生成较长的音乐

### 3. AIVA
**网址**: https://www.aiva.ai

**优点**:
- 专门为游戏/视频配乐设计
- 支持多种预设风格
- 可以导出各种格式

---

## 批量生成脚本

### 使用 Suno AI 批量生成步骤

#### 方法一：手动批量生成

1. 打开 `ai_generation_prompts.json`
2. 复制每个 track 的 `suno_prompt` 字段内容
3. 在 Suno AI 中依次粘贴并生成
4. 下载生成的音乐并重命名为对应的 `filename`

#### 方法二：使用浏览器控制台自动化 (需要技术基础)

```javascript
// 在 Suno AI 网页控制台中运行的示例脚本
// 注意：这只是一个示例，实际使用需要根据网站更新调整

const tracks = [
  {
    name: "bgm_main_theme.mp3",
    prompt: "Cute and dreamy opening theme for a Sanrio-themed mobile game..."
  },
  // ... 其他曲目
];

async function generateAll() {
  for (const track of tracks) {
    console.log(`正在生成: ${track.name}`);
    // 这里需要根据实际情况填写元素选择器
    // document.querySelector('...').value = track.prompt;
    // document.querySelector('...').click();
    await new Promise(r => setTimeout(r, 5000)); // 等待生成
  }
}

generateAll();
```

---

## 音效(SFX)生成

对于音效，推荐使用以下工具：

### 1. ElevenLabs Sound Effects
**网址**: https://elevenlabs.io/sound-effects

**适用音效**:
- match_1.mp3 (消除音效)
- click.mp3 (点击音效)
- level_complete.mp3 (胜利音效)

**提示词示例**:
```
// match_1.mp3
"Cute pop sound, bubble burst, satisfying mobile game match sound, high pitch ding, magical sparkle"

// level_complete.mp3
"Triumphant victory fanfare, celebration music, achievement unlocked sound, bright and happy"
```

### 2. Freesound.org + AI处理
**网址**: https://freesound.org

- 下载免费音效
- 使用 AI 音频工具 (如 Adobe Podcast) 进行风格统一处理

---

## 音乐后期处理

### 推荐工具

1. **Audacity** (免费)
   - 剪辑音乐长度
   - 调整音量
   - 制作无缝循环

2. **Adobe Audition**
   - 专业音频编辑
   - 批量处理

3. **FL Studio / Ableton Live**
   - 如果需要进一步改编 AI 生成的音乐

### 后期处理步骤

1. **剪辑长度**
   - 普通关卡BGM：60秒循环
   - Boss关卡BGM：90秒循环
   - 胜利音效：5-10秒

2. **调整音量**
   - BGM: -12dB ~ -10dB
   - SFX: -8dB ~ -6dB

3. **制作无缝循环**
   - 找到音乐的循环点
   - 使用 crossfade 技术
   - 测试循环是否平滑

4. **格式转换**
   - 导出为 MP3
   - 128kbps, 44.1kHz, stereo

---

## 文件命名和存放

生成完成后，按以下结构存放：

```
assets/audio/
├── bgm/                          # 背景音乐
│   ├── bgm_main_theme.mp3
│   ├── bgm_chapter1_normal.mp3
│   ├── bgm_chapter1_explore.mp3
│   ├── ... (共30首)
│   └── bgm_victory.mp3
├──
