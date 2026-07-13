const Game = require('./game.js')
const StoryManager = require('./story/storyManager.js')
const AudioManager = require('./utils/audio.js')
const StorageManager = require('./utils/storage.js')
const { CHAPTER_1_LEVELS, getChapter1Level } = require('./data/chapter1.js')
const { CHAPTER_2_LEVELS, getChapter2Level } = require('./data/chapter2.js')
const { CHAPTER_3_LEVELS, getChapter3Level } = require('./data/chapter3.js')
const { CHAPTER_4_LEVELS, getChapter4Level } = require('./data/chapter4.js')
const { CHAPTER_5_LEVELS, getChapter5Level } = require('./data/chapter5.js')
const { CHAPTER_6_LEVELS, getChapter6Level } = require('./data/chapter6.js')
const { PROLOGUE_STORY } = require('./data/prologue.js')

const canvas = wx.createCanvas()
const ctx = canvas.getContext('2d')
const systemInfo = wx.getSystemInfoSync()

const GAME_STATE = {
  LOADING: 'loading',
  HOME: 'home',
  PROLOGUE: 'prologue',
  LEVEL_SELECT: 'level_select',
  STORY: 'story',
  PLAYING: 'playing',
  PAUSE: 'pause',
  LEVEL_COMPLETE: 'level_complete',
  LEVEL_FAIL: 'level_fail'
}

const CHAPTERS = {
  1: {
    id: 1,
    title: 'Hello Kitty 的甜品派对',
    shortTitle: '第一章 甜品派对',
    character: 'hello_kitty',
    levels: CHAPTER_1_LEVELS,
    background: 'assets/images/ui/backgrounds/chapter_1_bg.png',
    theme: '#ff6fae'
  },
  2: {
    id: 2,
    title: '美乐蒂的音乐盒',
    shortTitle: '第二章 音乐盒',
    character: 'my_melody',
    levels: CHAPTER_2_LEVELS,
    background: 'assets/images/ui/backgrounds/chapter_2_bg.png',
    theme: '#d870ad'
  },
  3: {
    id: 3,
    title: '大耳狗的云端冒险',
    shortTitle: '第三章 云端冒险',
    character: 'cinnamonroll',
    levels: CHAPTER_3_LEVELS,
    background: 'assets/images/ui/backgrounds/chapter_3_bg.png',
    theme: '#87CEEB'
  },
  4: {
    id: 4,
    title: '布丁狗的悠闲午后',
    shortTitle: '第四章 悠闲午后',
    character: 'pompompurin',
    levels: CHAPTER_4_LEVELS,
    background: 'assets/images/ui/backgrounds/chapter_4_bg.png',
    theme: '#FFD93D'
  },
  5: {
    id: 5,
    title: '库洛米的挑战',
    shortTitle: '第五章 库洛米的挑战',
    character: 'kuromi',
    levels: CHAPTER_5_LEVELS,
    background: 'assets/images/ui/backgrounds/chapter_5_bg.png',
    theme: '#9B59B6'
  },
  6: {
    id: 6,
    title: '双子星的星空之旅',
    shortTitle: '第六章 星空之旅',
    character: 'little_twin_stars',
    levels: CHAPTER_6_LEVELS,
    background: 'assets/images/ui/backgrounds/chapter_6_bg.png',
    theme: '#5DADE2'
  }
}

const ASSETS = {
  home: 'assets/images/ui/backgrounds/main_menu_bg.png',
  levelSelect: 'assets/images/ui/backgrounds/level_select_bg.png',
  story: 'assets/images/ui/backgrounds/story_bg.png',
  storyChapter1: 'assets/images/ui/story/chapter_1_story_bg.png',
  storyChapter2: 'assets/images/ui/story/chapter_2_story_bg.png',
  storyChapter3: 'assets/images/ui/story/chapter_3_story_bg.png',
  storyChapter4: 'assets/images/ui/story/chapter_4_story_bg.png',
  storyChapter5: 'assets/images/ui/story/chapter_5_story_bg.png',
  storyChapter6: 'assets/images/ui/story/chapter_6_story_bg.png',
  prologue: 'assets/images/ui/backgrounds/prologue_bg.png',
  mainTitle: 'assets/images/ui/title/main_title_ai.png',
  chapter1: 'assets/images/ui/backgrounds/chapter_1_bg.png',
  chapter2: 'assets/images/ui/backgrounds/chapter_2_bg.png',
  chapter3: 'assets/images/ui/backgrounds/chapter_3_bg.png',
  chapter4: 'assets/images/ui/backgrounds/chapter_4_bg.png',
  chapter5: 'assets/images/ui/backgrounds/chapter_5_bg.png',
  chapter6: 'assets/images/ui/backgrounds/chapter_6_bg.png',
  // 头像
  kittyPortrait: 'assets/images/characters/hello_kitty/portrait/normal.png',
  melodyPortrait: 'assets/images/characters/my_melody/portrait/normal.png',
  cinnamonrollPortrait: 'assets/images/characters/cinnamonroll/portrait/normal.png',
  pompompurinPortrait: 'assets/images/characters/pompompurin/portrait/normal.png',
  kuromiPortrait: 'assets/images/characters/kuromi/portrait/normal.png',
  twinStarsPortrait: 'assets/images/characters/little_twin_stars/portrait/normal.png',
  // 全身立绘
  kittyFullbody: 'assets/images/characters/hello_kitty/fullbody/cutout.png',
  melodyFullbody: 'assets/images/characters/my_melody/fullbody/cutout.png',
  cinnamonrollFullbody: 'assets/images/characters/cinnamonroll/fullbody/cutout.png',
  pompompurinFullbody: 'assets/images/characters/pompompurin/fullbody/cutout.png',
  kuromiFullbody: 'assets/images/characters/kuromi/fullbody/cutout.png',
  twinStarsFullbody: 'assets/images/characters/little_twin_stars/fullbody/cutout.png',
  // 水果图标（用于关卡选择界面）
  piece_1: 'assets/images/pieces/normal/piece_1_strawberry.png',
  piece_2: 'assets/images/pieces/normal/piece_2_lemon.png',
  piece_3: 'assets/images/pieces/normal/piece_3_grape.png',
  piece_4: 'assets/images/pieces/normal/piece_4_apple.png',
  piece_5: 'assets/images/pieces/normal/piece_5_blueberry.png',
  piece_6: 'assets/images/pieces/normal/piece_6_orange.png'
}

const CHARACTER_ASSET_KEYS = {
  hello_kitty: { portrait: 'kittyPortrait', fullbody: 'kittyFullbody' },
  my_melody: { portrait: 'melodyPortrait', fullbody: 'melodyFullbody' },
  cinnamonroll: { portrait: 'cinnamonrollPortrait', fullbody: 'cinnamonrollFullbody' },
  pompompurin: { portrait: 'pompompurinPortrait', fullbody: 'pompompurinFullbody' },
  kuromi: { portrait: 'kuromiPortrait', fullbody: 'kuromiFullbody' },
  little_twin_stars: { portrait: 'twinStarsPortrait', fullbody: 'twinStarsFullbody' }
}

const CHARACTER_COLORS = {
  hello_kitty: { theme: '#FFF0F5', accent: '#FFB8C9', name: '#FF1493' },
  my_melody: { theme: '#FFE4F3', accent: '#FFB8E0', name: '#D870AD' },
  cinnamonroll: { theme: '#E8F4FF', accent: '#B8D4FF', name: '#4C9FDB' },
  pompompurin: { theme: '#FFF2C8', accent: '#F7C76B', name: '#C18432' },
  kuromi: { theme: '#F0E8FF', accent: '#C7A7F2', name: '#7A4BA3' },
  little_twin_stars: { theme: '#EEF0FF', accent: '#B9D4FF', name: '#7195D8' },
  narrator: { theme: '#FFF0F5', accent: '#FFB8C9', name: '#FF1493' },
  all: { theme: '#FFF0F5', accent: '#FFD1E1', name: '#FF1493' }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

class Main {
  constructor() {
    this.canvas = canvas
    this.ctx = ctx
    this.width = systemInfo.windowWidth
    this.height = systemInfo.windowHeight
    this.state = GAME_STATE.LOADING

    this.storageManager = new StorageManager()
    this.audioManager = new AudioManager()
    this.storyManager = new StoryManager()
    this.playerData = null
    this.game = null

    this.images = {}
    this.buttons = {}
    this.currentStory = null
    this.currentDialog = null
    this.pendingChapter = 1
    this.pendingLevel = 1
    this.result = null
    this.lastTime = Date.now()

    this.init()
  }

  init() {
    this.loadImages()
    this.audioManager.preload()
    this.loadPlayerData()

    this.game = new Game({
      canvas: this.canvas,
      ctx: this.ctx,
      width: this.width,
      height: this.height,
      audioManager: this.audioManager,
      onStateChange: this.handleGameStateChange.bind(this)
    })

    this.setupTouchEvents()
    this.changeState(GAME_STATE.HOME)
    this.gameLoop()
  }

  loadImages() {
    Object.keys(ASSETS).forEach((key) => {
      const image = wx.createImage()
      image.onload = () => {
        image.ready = true
      }
      image.src = ASSETS[key]
      this.images[key] = image
    })
  }

  loadPlayerData() {
    const stored = this.storageManager.get('player_data')
    this.playerData = stored || {
      currentLevel: 60,
      coins: 100,
      stars: 0,
      settings: {
        music: true,
        sound: true,
        vibration: true
      }
    }

    // 确保 currentLevel 至少为 1
    this.playerData.currentLevel = Math.max(this.playerData.currentLevel || 1, 1)
  }

  savePlayerData() {
    this.storageManager.set('player_data', this.playerData)
  }

  changeState(newState, data) {
    this.state = newState
    this.buttons = {}

    if (newState === GAME_STATE.HOME) {
      this.audioManager.playBGM('main_theme')
    }

    if (newState === GAME_STATE.PROLOGUE) {
      this.startPrologue()
    }

    if (newState === GAME_STATE.LEVEL_SELECT) {
      this.pendingChapter = data && data.chapter ? data.chapter : this.pendingChapter
    }

    if (newState === GAME_STATE.STORY) {
      this.prepareStory(data)
    }

    if (newState === GAME_STATE.PLAYING) {
      this.startGame(data)
    }

    if (newState === GAME_STATE.LEVEL_COMPLETE) {
      this.prepareLevelComplete(data)
    }

    if (newState === GAME_STATE.LEVEL_FAIL) {
      this.result = data || {}
    }

    if (newState === GAME_STATE.PAUSE) {
      this.audioManager.pauseBGM()
    }
  }

  startPrologue() {
    this.currentStory = PROLOGUE_STORY
    this.currentDialogIndex = 0
    this.currentDialog = PROLOGUE_STORY.pre_dialogue[0]
    this.audioManager.playBGM('story_scene')
  }

  prepareStory(data) {
    this.pendingChapter = data && data.chapter ? data.chapter : this.pendingChapter
    this.pendingLevel = data && data.level ? data.level : this.pendingLevel
    this.currentStory = this.storyManager.loadStory({
      chapter: this.pendingChapter,
      level: this.pendingLevel
    })
    this.currentDialog = this.storyManager.getNextDialog()
    this.audioManager.playBGM('story_scene')
  }

  startGame(data) {
    this.pendingChapter = data && data.chapter ? data.chapter : this.pendingChapter
    this.pendingLevel = data && data.level ? data.level : this.pendingLevel

    const level = this.getLevel(this.pendingChapter, this.pendingLevel)
    this.game.startLevel(level)
    this.audioManager.playBGM(level.bgm || (level.boss ? `chapter${level.chapter}_boss` : `chapter${level.chapter}_normal`))
  }

  getLevel(chapter, levelId) {
    switch (Number(chapter)) {
      case 2: return getChapter2Level(levelId)
      case 3: return getChapter3Level(levelId)
      case 4: return getChapter4Level(levelId)
      case 5: return getChapter5Level(levelId)
      case 6: return getChapter6Level(levelId)
      default: return getChapter1Level(levelId)
    }
  }

  getNextLevelInfo(levelId) {
    if (levelId < 10) return { chapter: 1, level: levelId + 1 }
    if (levelId === 10) return { chapter: 2, level: 11 }
    if (levelId < 20) return { chapter: 2, level: levelId + 1 }
    if (levelId === 20) return { chapter: 3, level: 21 }
    if (levelId < 30) return { chapter: 3, level: levelId + 1 }
    if (levelId === 30) return { chapter: 4, level: 31 }
    if (levelId < 40) return { chapter: 4, level: levelId + 1 }
    if (levelId === 40) return { chapter: 5, level: 41 }
    if (levelId < 50) return { chapter: 5, level: levelId + 1 }
    if (levelId === 50) return { chapter: 6, level: 51 }
    if (levelId < 60) return { chapter: 6, level: levelId + 1 }
    return null
  }

  prepareLevelComplete(result) {
    this.result = result || {}
    const levelId = this.result.level || this.pendingLevel
    const stars = this.result.stars || 1
    const next = this.getNextLevelInfo(levelId)

    if (next) {
      this.playerData.currentLevel = Math.max(this.playerData.currentLevel || 1, next.level)
    }
    this.playerData.stars = (this.playerData.stars || 0) + stars
    this.playerData.coins = (this.playerData.coins || 0) + 20 + stars * 10
    this.savePlayerData()
    this.audioManager.playBGM('victory')
  }

  handleGameStateChange(event, data) {
    if (event === 'level_complete') this.changeState(GAME_STATE.LEVEL_COMPLETE, data)
    if (event === 'level_fail') this.changeState(GAME_STATE.LEVEL_FAIL, data)
  }

  setupTouchEvents() {
    wx.onTouchStart((event) => {
      const touch = event.touches[0]
      this.handleTouchStart(touch.clientX, touch.clientY)
    })
    wx.onTouchMove((event) => {
      const touch = event.touches[0]
      if (this.state === GAME_STATE.PLAYING) this.game.handleTouchMove(touch.clientX, touch.clientY)
    })
    wx.onTouchEnd(() => {
      if (this.state === GAME_STATE.PLAYING) this.game.handleTouchEnd()
    })
  }

  handleTouchStart(x, y) {
    if (this.state === GAME_STATE.PLAYING) {
      this.game.handleTouchStart(x, y)
      return
    }

    const hit = this.hitButton(x, y)
    if (!hit) {
      if (this.state === GAME_STATE.STORY) this.advanceStory()
      return
    }

    this.audioManager.playSFX('select')

    if (hit === 'start_adventure') this.changeState(GAME_STATE.PROLOGUE)
    if (hit === 'prologue_next') this.advancePrologue()
    if (hit === 'start_first_level') {
      this.changeState(GAME_STATE.STORY, { chapter: 1, level: 1 })
    }
    if (hit.indexOf('chapter_') === 0) {
      const chapterId = Number(hit.split('_')[1])
      if (CHAPTERS[chapterId]) this.changeState(GAME_STATE.LEVEL_SELECT, { chapter: chapterId })
    }
    if (hit === 'back_home') this.changeState(GAME_STATE.HOME)
    if (hit.indexOf('level_') === 0) {
      const parts = hit.split('_')
      this.changeState(GAME_STATE.STORY, { chapter: Number(parts[1]), level: Number(parts[2]) })
    }
    if (hit === 'story_next') this.advanceStory()
    if (hit === 'next_level') {
      const next = this.getNextLevelInfo(this.pendingLevel)
      if (next) this.changeState(GAME_STATE.STORY, next)
      else this.changeState(GAME_STATE.HOME)
    }
    if (hit === 'retry') this.changeState(GAME_STATE.PLAYING, { chapter: this.pendingChapter, level: this.pendingLevel })
    if (hit === 'resume') {
      this.game.resumeGame()
      this.changeState(GAME_STATE.PLAYING)
      this.audioManager.resumeBGM()
    }
  }

  advancePrologue() {
    this.currentDialogIndex++
    if (this.currentDialogIndex < PROLOGUE_STORY.pre_dialogue.length) {
      this.currentDialog = PROLOGUE_STORY.pre_dialogue[this.currentDialogIndex]
      this.audioManager.playSFX('dialogue')
    }
  }

  advanceStory() {
    const dialog = this.storyManager.getNextDialog()
    if (dialog) {
      this.currentDialog = dialog
      this.audioManager.playSFX('dialogue')
      return
    }
    this.changeState(GAME_STATE.PLAYING, { chapter: this.pendingChapter, level: this.pendingLevel })
  }

  hitButton(x, y) {
    return Object.keys(this.buttons).find((key) => {
      const btn = this.buttons[key]
      return x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h
    })
  }

  gameLoop() {
    const now = Date.now()
    const deltaTime = now - this.lastTime
    this.lastTime = now

    if (this.state === GAME_STATE.PLAYING) this.game.update(deltaTime)
    this.render()
    requestAnimationFrame(this.gameLoop.bind(this))
  }

  render() {
    if (this.state === GAME_STATE.HOME) this.renderHome()
    if (this.state === GAME_STATE.PROLOGUE) this.renderPrologue()
    if (this.state === GAME_STATE.LEVEL_SELECT) this.renderLevelSelect()
    if (this.state === GAME_STATE.STORY) this.renderStory()
    if (this.state === GAME_STATE.PLAYING) this.game.render()
    if (this.state === GAME_STATE.PAUSE) this.renderPause()
    if (this.state === GAME_STATE.LEVEL_COMPLETE) this.renderLevelComplete()
    if (this.state === GAME_STATE.LEVEL_FAIL) this.renderLevelFail()
    if (this.state === GAME_STATE.LOADING) this.renderLoading()
  }

  drawImageCover(image, fallback) {
    const ctx = this.ctx
    const w = this.width
    const h = this.height
    if (image && (image.ready || image.complete || image.width)) {
      ctx.drawImage(image, 0, 0, w, h)
      return
    }
    ctx.fillStyle = fallback
    ctx.fillRect(0, 0, w, h)
  }

  renderHome() {
    const ctx = this.ctx
    const w = this.width
    const h = this.height
    this.buttons = {}
    this.drawImageCover(this.images.home, '#fff0f5')

    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
    ctx.fillRect(0, 0, w, h)

    // 优先使用标题图片，加载失败时回退到Canvas艺术字
    const titleBottom = this.renderHomeTitleImage(h * 0.08)
    if (!titleBottom) this.renderTitleArt('三丽鸥梦幻消消乐', h * 0.12)
    this.drawCenteredText('成为梦想守护者，拯救梦幻小镇', titleBottom ? titleBottom + 16 : h * 0.2, '#77576a', 16, false)

    // 开始冒险按钮（新游戏/序章）
    this.drawButton('start_adventure', '✨ 开始冒险', w / 2, h * 0.5, 260, 56, '#FF69B4')

    // 章节选择
    this.drawCenteredText('或直接选择章节', h * 0.6, '#77576a', 14, false)
    this.renderHomeChapterGrid()
  }

  renderPrologue() {
    const ctx = this.ctx
    const w = this.width
    const h = this.height
    this.buttons = {}
    const character = this.currentDialog && this.currentDialog.character ? this.currentDialog.character : 'narrator'
    const isNarrator = character === 'narrator'
    const colors = this.getCharacterColors(character)

    // 绘制序章专用背景
    this.drawImageCover(this.images.prologue, colors.theme)
    ctx.fillStyle = isNarrator ? 'rgba(255, 240, 248, 0.28)' : 'rgba(255, 255, 255, 0.18)'
    ctx.fillRect(0, 0, w, h)

    // 绘制装饰性光点
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    for (let i = 0; i < 15; i++) {
      const x = ((i * 73) % w)
      const y = ((i * 37) % h)
      const size = 3 + (i % 5)
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    // 序章标题
    this.renderTitleArt('序章：梦想守护者', h * 0.12)

    // 当前说话角色的全身立绘（narrator不显示）
    const characterAssets = this.getCharacterAssets(character)
    const fullbody = characterAssets ? this.images[characterAssets.fullbody] : null

    if (fullbody && (fullbody.ready || fullbody.complete || fullbody.width)) {
      const maxHeight = h * 0.48
      const scale = Math.min(maxHeight / fullbody.height, (w * 0.72) / fullbody.width)
      const drawWidth = fullbody.width * scale
      const drawHeight = fullbody.height * scale
      const drawX = (w - drawWidth) / 2
      const drawY = h * 0.18

      ctx.save()
      ctx.shadowColor = colors.accent
      ctx.shadowBlur = 24
      ctx.drawImage(fullbody, drawX, drawY, drawWidth, drawHeight)
      ctx.restore()

      const fadeGradient = ctx.createLinearGradient(0, drawY + drawHeight * 0.65, 0, drawY + drawHeight + 36)
      fadeGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
      fadeGradient.addColorStop(1, 'rgba(255, 255, 255, 0.84)')
      ctx.fillStyle = fadeGradient
      ctx.fillRect(drawX, drawY + drawHeight * 0.65, drawWidth, drawHeight * 0.35 + 36)
    }

    // 对话框背景
    const dialogY = h - 280
    const dialogHeight = 240
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.strokeStyle = '#FF69B4'
    ctx.lineWidth = 3
    this.drawRoundRect(18, dialogY, w - 36, dialogHeight, 22)
    ctx.fill()
    ctx.stroke()

    // 渲染当前对话
    if (this.currentDialog) {
      const portrait = characterAssets ? this.images[characterAssets.portrait] : null
      const hasPortrait = portrait && (portrait.ready || portrait.complete || portrait.width)
      const textX = hasPortrait ? 100 : 40

      if (hasPortrait) {
        const avatarSize = 64
        const avatarX = 28
        const avatarY = dialogY + 14

        ctx.save()
        ctx.beginPath()
        ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 3, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
        ctx.strokeStyle = '#FF69B4'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(portrait, avatarX, avatarY, avatarSize, avatarSize)
        ctx.restore()
      }

      // 角色名字
      ctx.fillStyle = colors.name
      ctx.font = 'bold 22px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.fillText(this.getCharacterName(character), textX, dialogY + 20)

      // 对话文本
      ctx.fillStyle = '#5d4350'
      ctx.font = '18px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
      this.wrapText(this.currentDialog.text, textX, dialogY + 60, w - textX - 40, 28)
    }

    // 继续按钮或开始游戏按钮
    const isLastDialog = this.currentDialogIndex >= PROLOGUE_STORY.pre_dialogue.length - 1
    if (isLastDialog) {
      this.drawButton('start_first_level', '开始第一个任务 ✨', w / 2, dialogY + dialogHeight - 60, 240, 48, '#FF69B4')
    } else {
      this.drawButton('prologue_next', '继续 →', w - 100, dialogY + dialogHeight - 50, 90, 42, '#FF69B4')
    }
  }

  // 绘制艺术字标题
  renderTitleArt(text, centerY) {
    const ctx = this.ctx
    const w = this.width

    ctx.save()

    // 设置字体
    const fontSize = 42
    ctx.font = `bold ${fontSize}px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // 测量文字宽度
    const textMetrics = ctx.measureText(text)
    const textWidth = textMetrics.width

    // 1. 绘制外发光阴影
    ctx.shadowColor = 'rgba(255, 105, 180, 0.6)'
    ctx.shadowBlur = 20
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 4

    // 2. 绘制渐变色填充
    const gradient = ctx.createLinearGradient(w / 2 - textWidth / 2, centerY - fontSize / 2, w / 2 + textWidth / 2, centerY + fontSize / 2)
    gradient.addColorStop(0, '#FF69B4')
    gradient.addColorStop(0.3, '#FF1493')
    gradient.addColorStop(0.6, '#FF6FAE')
    gradient.addColorStop(1, '#FF1493')

    ctx.fillStyle = gradient
    ctx.fillText(text, w / 2, centerY)

    // 3. 绘制白色高光描边（内发光效果）
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.lineWidth = 2
    ctx.strokeText(text, w / 2, centerY - 1)

    // 4. 绘制深色外描边
    ctx.strokeStyle = '#C71585'
    ctx.lineWidth = 3
    ctx.strokeText(text, w / 2, centerY)

    // 5. 再次填充确保颜色鲜艳
    ctx.fillStyle = gradient
    ctx.fillText(text, w / 2, centerY)

    // 6. 添加装饰性的小星星
    this.drawDecorativeStars(w / 2, centerY, textWidth, fontSize)

    ctx.restore()
  }

  // 绘制装饰性小星星
  drawDecorativeStars(centerX, centerY, textWidth, fontSize) {
    const ctx = this.ctx
    const starPositions = [
      { x: centerX - textWidth / 2 - 20, y: centerY - fontSize / 2, size: 8 },
      { x: centerX + textWidth / 2 + 20, y: centerY - fontSize / 2, size: 8 },
      { x: centerX - textWidth / 2 - 35, y: centerY + 5, size: 5 },
      { x: centerX + textWidth / 2 + 35, y: centerY + 5, size: 5 },
      { x: centerX, y: centerY - fontSize / 2 - 15, size: 6 }
    ]

    starPositions.forEach(star => {
      ctx.fillStyle = '#FFD700'
      ctx.shadowColor = '#FFA500'
      ctx.shadowBlur = 10
      this.drawStar(ctx, star.x, star.y, star.size)
    })

    ctx.shadowBlur = 0
  }

  // 绘制五角星
  drawStar(ctx, x, y, radius) {
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
      const px = x + Math.cos(angle) * radius
      const py = y + Math.sin(angle) * radius
      if (i === 0) {
        ctx.moveTo(px, py)
      } else {
        ctx.lineTo(px, py)
      }
    }
    ctx.closePath()
    ctx.fill()
  }

  renderHomeTitleImage(topY) {
    const image = this.images.mainTitle
    if (!image || !(image.ready || image.complete || image.width)) return null

    const w = this.width
    const titleWidth = Math.min(w + 16, 430)
    const titleHeight = titleWidth * (image.height / image.width)
    const x = (w - titleWidth) / 2

    this.ctx.drawImage(image, x, topY, titleWidth, titleHeight)
    return topY + titleHeight
  }

  renderHomeChapterGrid() {
    const ctx = this.ctx
    const w = this.width
    const h = this.height
    const chapterIds = Object.keys(CHAPTERS).map(Number)
    const cols = 2
    const gap = 10
    const startY = h * 0.64
    const cardWidth = (w - 42 - gap) / cols
    const cardHeight = Math.min(64, (h - startY - 24 - gap * 2) / 3)
    const startX = 21

    chapterIds.forEach((chapterId, index) => {
      const chapter = CHAPTERS[chapterId]
      const col = index % cols
      const row = Math.floor(index / cols)
      const x = startX + col * (cardWidth + gap)
      const y = startY + row * (cardHeight + gap)
      const key = `chapter_${chapterId}`
      const label = `${chapterId}. ${chapter.shortTitle.replace(/^第.章\s*/, '')}`

      this.buttons[key] = { x, y, w: cardWidth, h: cardHeight }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      this.drawRoundRect(x, y, cardWidth, cardHeight, 14)
      ctx.fill()
      ctx.strokeStyle = chapter.theme
      ctx.lineWidth = 2
      ctx.stroke()

      const colors = this.getCharacterColors(chapter.character)
      ctx.fillStyle = colors.theme
      ctx.beginPath()
      ctx.arc(x + 26, y + cardHeight / 2, 18, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = chapter.theme
      ctx.lineWidth = 1.5
      ctx.stroke()

      const assets = this.getCharacterAssets(chapter.character)
      const portrait = assets ? this.images[assets.portrait] : null
      if (portrait && (portrait.ready || portrait.complete || portrait.width)) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(x + 26, y + cardHeight / 2, 16, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(portrait, x + 10, y + cardHeight / 2 - 16, 32, 32)
        ctx.restore()
      }

      ctx.fillStyle = chapter.theme
      ctx.font = 'bold 15px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, x + 50, y + cardHeight / 2 - 8)

      ctx.fillStyle = '#77576a'
      ctx.font = '12px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
      ctx.fillText(this.getCharacterName(chapter.character), x + 50, y + cardHeight / 2 + 12)
    })
  }

  drawChapterButton(key, chapter, centerX, centerY) {
    const width = Math.min(this.width - 52, 300)
    const height = 86
    const x = centerX - width / 2
    const y = centerY - height / 2
    this.buttons[key] = { x, y, w: width, h: height }

    const ctx = this.ctx
    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)'
    this.drawRoundRect(x, y, width, height, 20)
    ctx.fill()
    ctx.strokeStyle = chapter.theme
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.fillStyle = chapter.theme
    ctx.font = 'bold 22px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(chapter.shortTitle, centerX, centerY - 12)

    ctx.fillStyle = '#77576a'
    ctx.font = '16px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    ctx.fillText(chapter.title, centerX, centerY + 18)
  }

  renderLevelSelect() {
    const ctx = this.ctx
    const w = this.width
    const h = this.height
    const chapter = CHAPTERS[this.pendingChapter] || CHAPTERS[1]
    this.buttons = {}

    // 保存当前 canvas 状态，确保渲染环境干净
    ctx.save()

    this.drawImageCover(this.images[`chapter${chapter.id}`] || this.images.levelSelect, '#ffe4ee')
    ctx.fillStyle = 'rgba(255, 255, 255, 0.42)'
    ctx.fillRect(0, 0, w, h)

    // 返回按钮
    this.drawButton('back_home', '← 返回', 72, 42, 96, 40, 'rgba(154, 160, 166, 0.9)')

    // 章节标题 - 使用艺术字效果
    this.renderLevelSelectTitle(chapter.shortTitle, 88, chapter.theme)

    // 进度条
    this.renderProgressBar(chapter)

    const cols = 5
    const size = Math.min(64, (w - 80) / cols)
    const gap = 16
    const startX = (w - (cols * size + (cols - 1) * gap)) / 2
    const startY = 170

    // 预设置字体，避免每次绘制时重新计算
    ctx.font = `bold 22px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    chapter.levels.forEach((level, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)
      const x = startX + col * (size + gap)
      const y = startY + row * (size + 50 + gap)
      const key = `level_${chapter.id}_${level.id}`
      const label = String(level.localId || level.id)

      // 获取关卡进度（星星数）
      const progress = this.getLevelProgress(level.id)
      const isCurrent = level.id === (this.playerData.currentLevel || 1)
      const isLocked = level.id > (this.playerData.currentLevel || 1)

      // 绘制关卡节点
      this.renderLevelNode(ctx, x, y, size, label, chapter.theme, level.boss, isCurrent, isLocked, progress)

      this.buttons[key] = { x, y, w: size, h: size + 40 }
    })

    // 恢复 canvas 状态
    ctx.restore()
  }

  // 获取关卡进度
  getLevelProgress(levelId) {
    const progress = this.storageManager.get('level_progress', {})
    return progress[levelId] || { stars: 0, completed: false }
  }

  // 绘制关卡选择标题
  renderLevelSelectTitle(text, centerY, theme) {
    const ctx = this.ctx
    const w = this.width

    ctx.save()

    // 阴影
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)'
    ctx.shadowBlur = 8
    ctx.shadowOffsetY = 3

    // 渐变文字
    const gradient = ctx.createLinearGradient(w / 2 - 100, centerY - 15, w / 2 + 100, centerY + 15)
    gradient.addColorStop(0, theme)
    gradient.addColorStop(0.5, '#FF69B4')
    gradient.addColorStop(1, theme)

    ctx.fillStyle = gradient
    ctx.font = 'bold 26px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, w / 2, centerY)

    // 描边
    ctx.shadowColor = 'transparent'
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.lineWidth = 2
    ctx.strokeText(text, w / 2, centerY)

    ctx.fillStyle = gradient
    ctx.fillText(text, w / 2, centerY)

    ctx.restore()
  }

  // 绘制进度条
  renderProgressBar(chapter) {
    const ctx = this.ctx
    const w = this.width
    const barY = 128
    const barWidth = w - 60
    const barHeight = 8
    const barX = (w - barWidth) / 2

    // 计算完成进度
    const totalLevels = chapter.levels.length
    let completedLevels = 0
    chapter.levels.forEach(level => {
      const progress = this.getLevelProgress(level.id)
      if (progress.completed) completedLevels++
    })
    const progressPercent = completedLevels / totalLevels

    ctx.save()

    // 背景条
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    this.drawRoundRect(ctx, barX, barY, barWidth, barHeight, barHeight / 2)
    ctx.fill()

    // 进度条
    const progressWidth = barWidth * progressPercent
    if (progressWidth > 0) {
      const gradient = ctx.createLinearGradient(barX, barY, barX + progressWidth, barY)
      gradient.addColorStop(0, chapter.theme)
      gradient.addColorStop(1, '#FFD700')
      ctx.fillStyle = gradient
      this.drawRoundRect(ctx, barX, barY, progressWidth, barHeight, barHeight / 2)
      ctx.fill()
    }

    // 进度文字
    ctx.fillStyle = '#5d4350'
    ctx.font = '12px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${completedLevels}/${totalLevels}`, barX + barWidth, barY - 10)

    ctx.restore()
  }

  // 绘制关卡节点
  renderLevelNode(ctx, x, y, size, label, theme, isBoss, isCurrent, isLocked, progress) {
    const centerX = x + size / 2
    const centerY = y + size / 2

    // 一次性绘制整个节点（避免分步渲染导致的闪烁）
    ctx.save()

    // 当前关卡脉冲效果
    if (isCurrent) {
      const time = Date.now() / 1000
      const pulse = Math.sin(time * 3) * 0.1 + 0.9
      ctx.shadowColor = theme
      ctx.shadowBlur = 15 * pulse
    }

    // 外圈发光（已完成的关卡）
    if (progress.completed) {
      ctx.shadowColor = '#FFD700'
      ctx.shadowBlur = 10
    }

    // 绘制背景圆形
    if (isLocked) {
      ctx.fillStyle = '#ccc'
    } else if (isBoss) {
      // Boss关特殊渐变
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size / 2)
      gradient.addColorStop(0, '#E8D5FF')
      gradient.addColorStop(1, '#b276ff')
      ctx.fillStyle = gradient
    } else {
      // 普通关卡渐变
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size / 2)
      gradient.addColorStop(0, '#FFF5F8')
      gradient.addColorStop(1, theme)
      ctx.fillStyle = gradient
    }

    ctx.beginPath()
    ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.shadowBlur = 0

    // 边框
    ctx.strokeStyle = isLocked ? '#bbb' : (isBoss ? '#9B59B6' : theme)
    ctx.lineWidth = isCurrent ? 4 : 3
    ctx.stroke()

    // 内部装饰圆圈
    if (!isLocked && !isBoss) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, size / 2 - 8, 0, Math.PI * 2)
      ctx.stroke()
    }

    // 关卡数字/图标
    ctx.fillStyle = isLocked ? '#999' : '#fff'
    ctx.font = `bold ${isBoss ? 24 : 22}px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    if (isLocked) {
      // 显示锁图标
      ctx.fillText('🔒', centerX, centerY)
    } else if (isBoss) {
      ctx.fillText('👑', centerX, centerY)
    } else {
      ctx.fillText(label, centerX, centerY)
    }

    ctx.restore()

    // 绘制星星（在圆形下方）
    this.renderStars(ctx, centerX, y + size + 20, progress.stars || 0, isLocked)
  }

  // 绘制星星
  renderStars(ctx, centerX, y, starCount, isLocked) {
    const starSize = 12
    const gap = 4
    const totalWidth = starSize * 3 + gap * 2
    const startX = centerX - totalWidth / 2 + starSize / 2

    for (let i = 0; i < 3; i++) {
      const x = startX + i * (starSize + gap)
      const isFilled = i < starCount && !isLocked

      // 绘制填充星星（发光效果）
      if (isFilled) {
        ctx.save()
        ctx.fillStyle = '#FFD700'
        ctx.shadowColor = '#FFA500'
        ctx.shadowBlur = 5
        this.drawSmallStar(ctx, x, y, starSize / 2, true)
        ctx.restore()
      } else {
        // 绘制空心星星（无发光）
        ctx.save()
        ctx.fillStyle = 'rgba(200, 200, 200, 0.5)'
        this.drawSmallStar(ctx, x, y, starSize / 2, true)
        ctx.restore()
      }
    }
  }

  // 绘制小星星
  drawSmallStar(ctx, x, y, radius, isFilled) {
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
      const px = x + Math.cos(angle) * radius
      const py = y + Math.sin(angle) * radius
      if (i === 0) {
        ctx.moveTo(px, py)
      } else {
        ctx.lineTo(px, py)
      }
    }
    ctx.closePath()

    if (isFilled) {
      ctx.fill()
    } else {
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)'
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }

  renderStory() {
    const ctx = this.ctx
    const w = this.width
    const h = this.height
    this.buttons = {}

    // 绘制故事背景（带渐变的柔和背景）
    const character = this.currentDialog && this.currentDialog.character ? this.currentDialog.character : 'narrator'
    const characterAssets = this.getCharacterAssets(character)
    const colors = this.getCharacterColors(character)

    const storyBg = this.images[`storyChapter${this.pendingChapter || 1}`] || this.images.story
    if (storyBg && (storyBg.ready || storyBg.complete || storyBg.width)) {
      ctx.drawImage(storyBg, 0, 0, w, h)
      ctx.fillStyle = 'rgba(255, 252, 255, 0.12)'
      ctx.fillRect(0, 0, w, h)
    } else {
      const bgGradient = ctx.createRadialGradient(w / 2, h * 0.3, 0, w / 2, h * 0.3, w * 0.8)
      bgGradient.addColorStop(0, '#FFFFFF')
      bgGradient.addColorStop(0.5, colors.theme)
      bgGradient.addColorStop(1, colors.accent)
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, w, h)
    }

    // 全身立绘（添加底部渐变遮罩融入对话框）
    const fullbody = characterAssets ? this.images[characterAssets.fullbody] : null

    if (fullbody && (fullbody.ready || fullbody.complete || fullbody.width)) {
      // 计算立绘尺寸
      const maxHeight = h * 0.5
      const scale = Math.min(maxHeight / fullbody.height, (w * 0.7) / fullbody.width)
      const drawWidth = fullbody.width * scale
      const drawHeight = fullbody.height * scale
      const drawX = (w - drawWidth) / 2
      const drawY = h * 0.12

      // 创建遮罩区域 - 底部渐变淡出
      ctx.save()

      // 先绘制立绘
      ctx.drawImage(fullbody, drawX, drawY, drawWidth, drawHeight)

      // 添加底部渐变遮罩，让立绘自然融入对话框
      const fadeGradient = ctx.createLinearGradient(0, drawY + drawHeight * 0.6, 0, drawY + drawHeight + 40)
      fadeGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
      fadeGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
      fadeGradient.addColorStop(1, 'rgba(255, 255, 255, 0.95)')
      ctx.fillStyle = fadeGradient
      ctx.fillRect(drawX, drawY + drawHeight * 0.6, drawWidth, drawHeight * 0.4 + 40)

      ctx.restore()

      // 添加角色周围的柔和光晕效果
      ctx.save()
      ctx.shadowColor = colors.accent
      ctx.shadowBlur = 30
      ctx.globalAlpha = 0.3
      ctx.drawImage(fullbody, drawX, drawY, drawWidth, drawHeight)
      ctx.restore()
    }

    // 对话框背景
    const dialogY = h - 240
    const dialogHeight = 200
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.strokeStyle = this.pendingChapter === 2 ? '#d870ad' : '#ff9fc5'
    ctx.lineWidth = 3
    this.drawRoundRect(18, dialogY, w - 36, dialogHeight, 22)
    ctx.fill()
    ctx.stroke()

    // 头像（显示在对话框左上角）
    const portrait = characterAssets ? this.images[characterAssets.portrait] : null
    const hasPortrait = portrait && (portrait.ready || portrait.complete || portrait.width)
    const textX = hasPortrait ? 100 : 40

    if (hasPortrait) {
      const avatarSize = 64
      const avatarX = 28
      const avatarY = dialogY + 10

      // 头像背景圆形
      ctx.save()
      ctx.beginPath()
      ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 3, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.strokeStyle = this.pendingChapter === 2 ? '#d870ad' : '#ff9fc5'
      ctx.lineWidth = 2
      ctx.stroke()

      // 裁剪圆形区域显示头像
      ctx.beginPath()
      ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(portrait, avatarX, avatarY, avatarSize, avatarSize)
      ctx.restore()
    }

    // 角色名字（在头像右侧）
    ctx.fillStyle = colors.name
    ctx.font = 'bold 22px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText(this.getCharacterName(character), textX, dialogY + 20)

    // 对话文本
    ctx.fillStyle = '#5d4350'
    ctx.font = '18px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    this.wrapText((this.currentDialog && this.currentDialog.text) || '', textX, dialogY + 55, w - textX - 30, 28)

    // 继续按钮
    this.drawButton('story_next', '继续', w - 84, dialogY + dialogHeight - 50, 100, 42, colors.name)
  }

  renderLevelComplete() {
    const next = this.getNextLevelInfo(this.pendingLevel)
    this.renderResultBase('闯关成功', '#ff5b9f')
    this.drawCenteredText(`分数 ${this.result.score || 0}    星星 ${this.result.stars || 1}`, this.height * 0.48, '#5d4350', 20)
    this.drawButton('next_level', next ? '下一关' : '回到起始页', this.width / 2, this.height * 0.62, 220, 56, '#ff7caf')
    this.drawButton('back_home', '起始页', this.width / 2, this.height * 0.72, 220, 56, '#8fc8ff')
  }

  renderLevelFail() {
    this.renderResultBase('还差一点点', '#8b5d73')
    this.drawCenteredText(`分数 ${this.result.score || 0}`, this.height * 0.48, '#5d4350', 20)
    this.drawButton('retry', '再试一次', this.width / 2, this.height * 0.62, 220, 56, '#ff7caf')
    this.drawButton('back_home', '起始页', this.width / 2, this.height * 0.72, 220, 56, '#8fc8ff')
  }

  renderPause() {
    // 先渲染游戏画面作为背景
    this.game.render()

    // 半透明遮罩
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.width, this.height)

    this.buttons = {}

    // 暂停标题
    this.drawCenteredText('游戏暂停', this.height * 0.35, '#ffffff', 36, true)

    // 按钮
    this.drawButton('resume', '继续游戏', this.width / 2, this.height * 0.5, 220, 56, '#ff7caf')
    this.drawButton('retry', '重新开始', this.width / 2, this.height * 0.6, 220, 56, '#8fc8ff')
    this.drawButton('back_home', '返回首页', this.width / 2, this.height * 0.7, 220, 56, '#9aa0a6')
  }

  renderResultBase(title, color) {
    this.buttons = {}
    const image = this.pendingChapter === 2 ? this.images.chapter2 : this.images.chapter1
    this.drawImageCover(image, '#fff0f5')
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.62)'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.drawCenteredText(title, this.height * 0.38, color, 34, true)
  }

  renderLoading() {
    this.ctx.fillStyle = '#ffb6c1'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.drawCenteredText('加载中...', this.height / 2, '#ffffff', 28, true)
  }

  drawButton(key, label, centerX, centerY, width, height, color) {
    const x = centerX - width / 2
    const y = centerY - height / 2
    this.buttons[key] = { x, y, w: width, h: height }

    const ctx = this.ctx
    ctx.fillStyle = color
    this.drawRoundRect(x, y, width, height, 18)
    ctx.fill()

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 21px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, centerX, centerY)
  }

  drawRoundRect(x, y, width, height, radius) {
    const ctx = this.ctx
    ctx.beginPath()
    if (ctx.roundRect) {
      // 微信小程序 Canvas 需要数组格式的 radius 参数
      const r = Array.isArray(radius) ? radius : [radius, radius, radius, radius]
      try {
        ctx.roundRect(x, y, width, height, r)
      } catch (e) {
        // 如果 roundRect 失败，使用备用绘制方法
        this.drawRoundRectFallback(ctx, x, y, width, height, radius)
      }
    } else {
      this.drawRoundRectFallback(ctx, x, y, width, height, radius)
    }
  }

  drawRoundRectFallback(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2)
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + width - r, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + r)
    ctx.lineTo(x + width, y + height - r)
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
    ctx.lineTo(x + r, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }

  drawCenteredText(text, y, color, size, bold) {
    this.ctx.fillStyle = color
    this.ctx.font = `${bold ? 'bold ' : ''}${size}px sans-serif`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(text, this.width / 2, y)
  }

  wrapText(text, x, y, maxWidth, lineHeight) {
    const chars = text.split('')
    let line = ''
    chars.forEach((char) => {
      const test = line + char
      if (this.ctx.measureText(test).width > maxWidth && line) {
        this.ctx.fillText(line, x, y)
        line = char
        y += lineHeight
      } else {
        line = test
      }
    })
    if (line) this.ctx.fillText(line, x, y)
  }

  getCharacterAssets(character) {
    return CHARACTER_ASSET_KEYS[character] || null
  }

  getCharacterColors(character) {
    return CHARACTER_COLORS[character] || CHARACTER_COLORS.hello_kitty
  }

  getCharacterName(character) {
    const names = {
      hello_kitty: 'Hello Kitty',
      my_melody: '美乐蒂',
      cinnamonroll: '大耳狗',
      pompompurin: '布丁狗',
      kuromi: '库洛米',
      little_twin_stars: '双子星',
      narrator: '旁白',
      all: '大家'
    }
    return names[character] || 'Hello Kitty'
  }
}

// 导出 Main 类供外部使用
module.exports = Main
