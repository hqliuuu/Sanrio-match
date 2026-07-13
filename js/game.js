const Board = require('./board.js')
const Matcher = require('./matcher.js')
const Level = require('./level.js')
const Piece = require('./piece.js')
const { PowerUpManager, POWERUP_TYPES } = require('./powerups.js')
const { CuteEffectManager } = require('./animation/cuteEffects.js')
const DialogBubble = require('./ui/dialogBubble.js')

const CHAPTER_HELPERS = {
  1: { character: 'hello_kitty', name: 'Kitty', portrait: 'assets/images/characters/hello_kitty/portrait/normal.png', color: '#ff6fae' },
  2: { character: 'my_melody', name: '美乐蒂', portrait: 'assets/images/characters/my_melody/portrait/normal.png', color: '#d870ad' },
  3: { character: 'cinnamonroll', name: '大耳狗', portrait: 'assets/images/characters/cinnamonroll/portrait/normal.png', color: '#5dade2' },
  4: { character: 'pompompurin', name: '布丁狗', portrait: 'assets/images/characters/pompompurin/portrait/normal.png', color: '#d49a34' },
  5: { character: 'kuromi', name: '库洛米', portrait: 'assets/images/characters/kuromi/portrait/normal.png', color: '#9b59b6' },
  6: { character: 'little_twin_stars', name: '双子星', portrait: 'assets/images/characters/little_twin_stars/portrait/normal.png', color: '#5dade2' }
}

const COMBO_PRAISES = [
  '太棒啦，连击成功！',
  '漂亮！节奏越来越顺了！',
  '闪闪发光的一步！',
  '好厉害，又连起来了！'
]

const ENCOURAGEMENTS = [
  '慢慢来，我们一起完成任务。',
  '找找能凑成一排的材料吧。',
  '这一步很关键，我相信你。',
  '再收集一点点就更接近目标了。'
]

const TOPBAR_ASSETS = {
  1: 'assets/images/ui/topbars/topbar_chapter_1.png',
  2: 'assets/images/ui/topbars/topbar_chapter_2.png',
  3: 'assets/images/ui/topbars/topbar_chapter_3.png',
  4: 'assets/images/ui/topbars/topbar_chapter_4.png',
  5: 'assets/images/ui/topbars/topbar_chapter_5.png',
  6: 'assets/images/ui/topbars/topbar_chapter_6.png'
}

function createHelperImage(src) {
  const image = wx.createImage()
  image.onload = () => {
    image.ready = true
  }
  image.src = src
  return image
}

/**
 * 游戏核心类
 * 负责游戏主循环、状态管理和事件处理
 */
class Game {
  constructor(config) {
    this.canvas = config.canvas
    this.ctx = config.ctx
    this.width = config.width
    this.height = config.height
    this.onStateChange = config.onStateChange
    this.audioManager = config.audioManager

    this.board = null
    this.matcher = null
    this.level = null
    this.backgroundImage = wx.createImage()
    this.backgroundImage.onload = () => {
      this.backgroundImage.ready = true
    }
    this.backgroundImage.src = 'assets/images/ui/backgrounds/chapter_1_bg.png'
    this.helperImages = {}
    Object.keys(CHAPTER_HELPERS).forEach((chapter) => {
      this.helperImages[chapter] = createHelperImage(CHAPTER_HELPERS[chapter].portrait)
    })
    this.topBarImages = {}
    Object.keys(TOPBAR_ASSETS).forEach((chapter) => {
      this.topBarImages[chapter] = createHelperImage(TOPBAR_ASSETS[chapter])
    })
    this.helperTip = ''
    this.helperTipTimer = 0
    this.lastComboPraiseIndex = 0
    this.objectiveIntroStartTime = 0
    this.objectiveIntroDuration = 1650

    this.isPlaying = false
    this.isAnimating = false
    this.selectedPiece = null

    this.score = 0
    this.moves = 0
    this.timeLeft = 0

    this.boardOffsetX = 0
    this.boardOffsetY = 0
    this.cellSize = 0

    // 道具系统
    this.powerUpManager = new PowerUpManager(this)
    this.availablePowerUps = [
      POWERUP_TYPES.FREEZE,
      POWERUP_TYPES.HAMMER,
      POWERUP_TYPES.REFRESH,
      POWERUP_TYPES.BOMB,
      POWERUP_TYPES.PLUS_FIVE
    ]
    this.powerUpBarY = 0

    // 可爱风格动画系统
    this.effects = new CuteEffectManager()

    // 对话气泡系统
    this.dialogBubble = new DialogBubble(this)
  }

  /**
   * 开始一个关卡
   */
  startLevel(levelData) {
    console.log('开始关卡:', levelData)

    // 初始化关卡配置
    this.level = new Level(levelData)
    this.backgroundImage.ready = false
    this.backgroundImage.src = this.level.background || `assets/images/ui/backgrounds/chapter_${this.level.chapter || 1}_bg.png`

    // 计算棋盘布局
    this.calculateBoardLayout()

    // 初始化棋盘
    this.board = new Board({
      rows: this.level.boardRows,
      cols: this.level.boardCols,
      cellSize: this.cellSize,
      offsetX: this.boardOffsetX,
      offsetY: this.boardOffsetY,
      pieceTypes: this.level.availablePieces,
      chapter: this.level.chapter || 1
    })

    // 初始化障碍物（如果有关卡配置）
    if (this.board.obstacleManager && this.level.obstacles) {
      this.board.obstacleManager.initFromLevelData(this.level)
    }

    // 初始化匹配检测器
    this.matcher = new Matcher(this.board)

    // 确保初始棋盘没有匹配
    this.board.ensureNoInitialMatches()

    this.updateHelperTip('level_start')
    this.objectiveIntroStartTime = Date.now()

    // 设置游戏状态
    this.score = 0
    this.moves = this.level.maxMoves
    this.timeLeft = this.level.timeLimit || 0
    this.isPlaying = true

    // 更新可用道具
    this.availablePowerUps = this.level.availablePowerUps || []

    // 加载道具图标
    if (this.powerUpManager) {
      this.powerUpManager.loadPowerUpIcons()
    }

    // 关卡开始时显示对话
    if (this.dialogBubble) {
      setTimeout(() => {
        this.dialogBubble.onLevelStart()
      }, 500)
    }

    console.log('关卡初始化完成')
  }

  /**
   * 计算棋盘在屏幕上的位置和大小
   */
  calculateBoardLayout() {
    const cols = this.level.boardCols
    const rows = this.level.boardRows

    // 计算合适的格子大小
    const maxBoardWidth = this.width * 0.9
    const maxBoardHeight = this.height * 0.6

    const cellWidth = maxBoardWidth / cols
    const cellHeight = maxBoardHeight / rows

    this.cellSize = Math.min(cellWidth, cellHeight, 80)

    // 计算棋盘偏移量（居中）
    const boardWidth = this.cellSize * cols
    const boardHeight = this.cellSize * rows

    this.boardOffsetX = (this.width - boardWidth) / 2
    this.boardOffsetY = this.height * 0.25
  }

  /**
   * 更新游戏逻辑
   */
  update(deltaTime) {
    // 更新棋子的动画（即使游戏暂停也更新动画）
    if (this.board) {
      this.board.updatePieces(deltaTime)
    }

    // 更新道具系统
    if (this.powerUpManager) {
      this.powerUpManager.update(deltaTime)
    }

    // 更新动画效果
    if (this.effects) {
      this.effects.update()
      if (this.isPlaying && !this.isAnimating) {
        this.effects.createAmbientParticle(this.width, this.height)
      }
    }

    if (!this.isPlaying || this.isAnimating) return

    // 更新对话气泡
    if (this.dialogBubble) {
      this.dialogBubble.update(deltaTime)
    }

    // 检查冰冻状态 - 冰冻时不减少时间
    if (this.powerUpManager && this.powerUpManager.isFrozen) {
      // 冰冻状态下时间暂停
    } else {
      // 更新时间限制
      if (this.timeLeft > 0) {
        this.timeLeft -= deltaTime / 1000
        if (this.timeLeft <= 0) {
          this.onTimeUp()
        }
      }
    }

    // 检查关卡目标
    this.checkLevelObjectives()
  }

  /**
   * 渲染游戏画面
   */
  render() {
    // 清空画布
    this.ctx.fillStyle = '#FFF0F5'
    this.ctx.fillRect(0, 0, this.width, this.height)

    // 绘制游戏背景
    this.renderGameBackground()

    // 绘制UI
    this.renderUI()

    // 绘制棋盘
    if (this.board) {
      this.board.render(this.ctx)
    }

    // 绘制选中效果
    if (this.selectedPiece) {
      this.renderSelectionEffect()
    }

    // 绘制冰冻效果
    if (this.powerUpManager) {
      this.powerUpManager.renderFreezeEffect(this.ctx, this.width, this.height)
    }

    this.renderHelperFeedback()

    // 绘制动画效果（粒子、飘字等）
    if (this.effects) {
      this.effects.render(this.ctx)
    }

    // 绘制对话气泡
    if (this.dialogBubble) {
      this.dialogBubble.render(this.ctx)
    }

    // 绘制角色助手
    this.renderHelperCharacter()
  }

  /**
   * 绘制角色助手（右下角小图标）
   */
  renderHelperCharacter() {
    const chapter = this.level?.chapter || 1
    const helperImage = this.helperImages[chapter]

    if (!helperImage || !helperImage.ready) return

    const ctx = this.ctx
    const size = 50
    const x = this.width - size - 15
    const y = this.height - size - 95 // 在道具栏上方

    // 绘制圆形背景
    ctx.save()

    // 脉冲动画效果
    const time = Date.now() / 1000
    const pulse = Math.sin(time * 2) * 0.05 + 1
    const scale = pulse

    ctx.translate(x + size / 2, y + size / 2)
    ctx.scale(scale, scale)
    ctx.translate(-(x + size / 2), -(y + size / 2))

    // 外圈光晕
    const gradient = ctx.createRadialGradient(x + size / 2, y + size / 2, 0, x + size / 2, y + size / 2, size / 2 + 5)
    gradient.addColorStop(0, 'rgba(255, 182, 193, 0.5)')
    gradient.addColorStop(1, 'rgba(255, 182, 193, 0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x + size / 2, y + size / 2, size / 2 + 5, 0, Math.PI * 2)
    ctx.fill()

    // 白色背景
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2)
    ctx.fill()

    // 头像裁剪
    ctx.beginPath()
    ctx.arc(x + size / 2, y + size / 2, size / 2 - 2, 0, Math.PI * 2)
    ctx.clip()
    ctx.drawImage(helperImage, x, y, size, size)

    ctx.restore()

    // 边框
    ctx.strokeStyle = CHAPTER_HELPERS[chapter].color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2)
    ctx.stroke()
  }

  /**
   * 绘制游戏背景
   */
  renderGameBackground() {
    const ctx = this.ctx
    const w = this.width
    const h = this.height

    if (this.backgroundImage.ready || this.backgroundImage.complete || this.backgroundImage.width) {
      ctx.drawImage(this.backgroundImage, 0, 0, w, h)
      ctx.fillStyle = 'rgba(255, 248, 252, 0.18)'
      ctx.fillRect(0, 0, w, h)
      return
    }

    // 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, h)
    gradient.addColorStop(0, '#FFF0F5')
    gradient.addColorStop(0.5, '#FFE4E1')
    gradient.addColorStop(1, '#FFF0F5')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)

    // 绘制装饰性图案（简化的三丽鸥风格）
    ctx.fillStyle = 'rgba(255, 182, 193, 0.1)'
    for (let i = 0; i < 5; i++) {
      const x = (i * w) / 5 + w / 10
      ctx.beginPath()
      ctx.arc(x, h * 0.1, 30, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  /**
   * 绘制游戏UI
   */
  renderUI() {
    const ctx = this.ctx
    const w = this.width
    const topBarHeight = this.getTopBarHeight()
    const topBarY = this.getTopBarY()

    this.renderTopBarBackground(ctx, topBarY, topBarHeight)

    // 绘制分数
    ctx.fillStyle = this.getChapterAccentColor()
    ctx.font = 'bold 18px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(`分数 ${this.score}`, 18, topBarY + 29)

    // 绘制剩余步数
    ctx.fillText(`步数 ${this.moves}`, 18, topBarY + 58)

    // 绘制时间（如果有）
    if (this.timeLeft > 0) {
      const timeText = Math.ceil(this.timeLeft)
      // 冰冻状态下时间显示为蓝色
      if (this.powerUpManager && this.powerUpManager.isFrozen) {
        ctx.fillStyle = '#87CEEB'
      }
      ctx.textAlign = 'right'
      ctx.fillText(`时间 ${timeText}s`, w - 82, topBarY + 29)
      ctx.textAlign = 'left'
      ctx.fillStyle = this.getChapterAccentColor()
    }

    // 绘制关卡目标
    this.renderObjectives(ctx, 0, topBarY)

    // 绘制暂停按钮
    this.renderPauseButton(ctx, w - 50, topBarY + 40)

    // 绘制道具栏
    this.renderPowerUpBar(ctx)
  }

  getTopBarHeight() {
    return Math.min(86, Math.max(76, this.height * 0.115))
  }

  getTopBarY() {
    return Math.max(10, Math.min(18, this.height * 0.018))
  }

  getChapterAccentColor() {
    const chapter = this.level?.chapter || 1
    return CHAPTER_HELPERS[chapter]?.color || '#ff6fae'
  }

  renderTopBarBackground(ctx, y, height) {
    const chapter = this.level?.chapter || 1
    const image = this.topBarImages?.[chapter]

    if (image && (image.ready || image.complete || image.width)) {
      ctx.drawImage(image, 0, y, this.width, height)
      return
    }

    const gradient = ctx.createLinearGradient(0, y, this.width, y + height)
    gradient.addColorStop(0, 'rgba(255, 240, 248, 0.92)')
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.88)')
    gradient.addColorStop(1, 'rgba(255, 232, 246, 0.92)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, y, this.width, height)
  }

  /**
   * 绘制关卡目标
   */
  renderObjectives(ctx, x, y) {
    if (!this.level || !this.level.objectives) return

    const introProgress = this.getObjectiveIntroProgress()
    if (introProgress < 1) {
      this.renderObjectiveIntro(ctx, introProgress)
      return
    }

    this.renderObjectiveCards(ctx, this.getObjectiveTargetLayout())
  }

  getObjectiveIntroProgress() {
    if (!this.objectiveIntroStartTime) return 1
    return Math.min(1, (Date.now() - this.objectiveIntroStartTime) / this.objectiveIntroDuration)
  }

  getObjectiveTargetLayout() {
    const objectiveHeight = 38
    const objectiveWidth = 56
    const iconSize = 20
    const gap = 5
    const totalWidth = this.level.objectives.length * objectiveWidth + (this.level.objectives.length - 1) * gap
    const startX = (this.width - totalWidth) / 2
    const rowY = this.getTopBarY() + 19

    return {
      objectiveWidth,
      objectiveHeight,
      iconSize,
      gap,
      startX,
      rowY
    }
  }

  renderObjectiveCards(ctx, layout) {
    this.level.objectives.forEach((obj, index) => {
      const cardX = layout.startX + index * (layout.objectiveWidth + layout.gap)
      this.renderObjectiveCard(ctx, obj, cardX, layout.rowY, layout.objectiveWidth, layout.objectiveHeight, layout.iconSize, 1)
    })
  }

  renderObjectiveIntro(ctx, progress) {
    const targetLayout = this.getObjectiveTargetLayout()
    const holdEnd = 0.42
    const moveProgress = progress <= holdEnd ? 0 : (progress - holdEnd) / (1 - holdEnd)
    const eased = this.easeOutCubic(Math.min(1, moveProgress))
    const count = this.level.objectives.length
    const startWidth = Math.min(96, Math.max(76, this.width / (count + 1.8)))
    const startHeight = 72
    const startGap = 10
    const totalStartWidth = count * startWidth + (count - 1) * startGap
    const startX = (this.width - totalStartWidth) / 2
    const startY = this.height * 0.38

    ctx.save()
    const veilAlpha = (1 - eased) * 0.28
    if (veilAlpha > 0.02) {
      ctx.fillStyle = `rgba(255, 240, 248, ${veilAlpha})`
      ctx.fillRect(0, 0, this.width, this.height)
    }
    ctx.restore()

    this.level.objectives.forEach((obj, index) => {
      const fromX = startX + index * (startWidth + startGap)
      const fromY = startY
      const toX = targetLayout.startX + index * (targetLayout.objectiveWidth + targetLayout.gap)
      const toY = targetLayout.rowY
      const x = this.lerp(fromX, toX, eased)
      const y = this.lerp(fromY, toY, eased)
      const width = this.lerp(startWidth, targetLayout.objectiveWidth, eased)
      const height = this.lerp(startHeight, targetLayout.objectiveHeight, eased)
      const iconSize = this.lerp(38, targetLayout.iconSize, eased)
      const scale = this.lerp(1.06, 1, eased)

      ctx.save()
      ctx.translate(x + width / 2, y + height / 2)
      ctx.scale(scale, scale)
      ctx.translate(-(x + width / 2), -(y + height / 2))
      this.renderObjectiveCard(ctx, obj, x, y, width, height, iconSize, 1 - eased * 0.15)
      ctx.restore()
    })
  }

  renderObjectiveCard(ctx, obj, x, y, width, height, iconSize, alpha = 1) {
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = 'rgba(255, 255, 255, 0.76)'
    ctx.strokeStyle = 'rgba(255, 182, 193, 0.38)'
    ctx.lineWidth = 1
    ctx.shadowColor = 'rgba(255, 182, 193, 0.18)'
    ctx.shadowBlur = 8
    this.drawRoundRect(ctx, x, y, width, height, Math.min(16, height / 2.6))
    ctx.fill()
    ctx.shadowBlur = 0
    ctx.stroke()

    const iconX = x + Math.max(5, width * 0.1)
    const iconY = y + (height - iconSize) / 2
    this.renderObjectiveIcon(ctx, obj, iconX, iconY, iconSize)

    ctx.fillStyle = this.getChapterAccentColor()
    ctx.font = `bold ${Math.max(12, Math.floor(height * 0.32))}px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${obj.current}/${obj.target}`, iconX + iconSize + Math.max(4, width * 0.05), y + height / 2)
    ctx.restore()
  }

  lerp(from, to, amount) {
    return from + (to - from) * amount
  }

  easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3)
  }

  renderObjectiveIcon(ctx, obj, x, y, size) {
    if (obj.type === 'collect' && obj.pieceType) {
      const src = Piece.getPieceImageSrc(obj.pieceType, this.board)
      const image = src ? Piece.getImage(src) : null
      if (image && (image.ready || image.complete || image.width)) {
        ctx.drawImage(image, x, y, size, size)
        return
      }

      ctx.fillStyle = Piece.FALLBACK_COLORS[obj.pieceType] || '#ffb6c1'
      ctx.beginPath()
      ctx.arc(x + size / 2, y + size / 2, size / 2 - 2, 0, Math.PI * 2)
      ctx.fill()
      return
    }

    if (obj.type === 'special') {
      const image = Piece.getImage('assets/images/pieces/special/color_bomb.png')
      if (image && (image.ready || image.complete || image.width)) {
        ctx.drawImage(image, x, y, size, size)
        return
      }
      ctx.fillText('★', x + size / 2, y + size / 2)
      return
    }

    ctx.fillStyle = '#FFD54F'
    ctx.beginPath()
    ctx.arc(x + size / 2, y + size / 2, size / 2 - 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#FFFFFF'
    ctx.font = `bold ${Math.floor(size * 0.62)}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('分', x + size / 2, y + size / 2)
  }

  /**
   * 绘制暂停按钮
   */
  renderPauseButton(ctx, x, y) {
    ctx.fillStyle = '#FF69B4'
    ctx.beginPath()
    ctx.arc(x, y, 25, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(x - 8, y - 10, 6, 20)
    ctx.fillRect(x + 2, y - 10, 6, 20)
  }

  /**
   * 绘制选中效果
   */
  renderSelectionEffect() {
    if (!this.selectedPiece) return

    const ctx = this.ctx
    const piece = this.selectedPiece

    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 4
    this.drawRoundRect(ctx,
      piece.x + 2,
      piece.y + 2,
      this.cellSize - 4,
      this.cellSize - 4,
      10
    )
    ctx.stroke()

    // 发光效果
    ctx.shadowColor = '#FFD700'
    ctx.shadowBlur = 15
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  updateHelperTip(type, count = 0) {
    if (type === 'combo') {
      const index = this.lastComboPraiseIndex % COMBO_PRAISES.length
      const prefix = count > 1 ? `${count}连击！` : ''
      this.helperTip = `${prefix}${COMBO_PRAISES[index]}`
      this.lastComboPraiseIndex++
    } else if (type === 'level_start') {
      this.helperTip = '新的挑战开始啦！'
    } else if (type === 'match') {
      this.helperTip = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]
    } else {
      this.helperTip = ''
    }

    this.helperTipTimer = this.helperTip ? 180 : 0
  }

  renderHelperFeedback() {
    if (!this.helperTip || this.helperTipTimer <= 0) return

    const ctx = this.ctx
    const bubbleWidth = Math.min(this.width - 32, 280)
    const bubbleHeight = 38
    const x = (this.width - bubbleWidth) / 2
    const y = Math.max(88, this.boardOffsetY - 48)

    ctx.save()
    ctx.globalAlpha = Math.min(1, this.helperTipTimer / 20)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.strokeStyle = 'rgba(255, 105, 180, 0.55)'
    ctx.lineWidth = 2
    this.drawRoundRect(ctx, x, y, bubbleWidth, bubbleHeight, 18)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = '#ff4f9a'
    ctx.font = '15px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(this.helperTip, this.width / 2, y + bubbleHeight / 2)
    ctx.restore()

    this.helperTipTimer--
    if (this.helperTipTimer <= 0) this.helperTip = ''
  }

  drawRoundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath()
    if (ctx.roundRect) {
      try {
        const r = Array.isArray(radius) ? radius : [radius, radius, radius, radius]
        ctx.roundRect(x, y, width, height, r)
      } catch (e) {
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

  /**
   * 处理触摸开始事件
   */
  handleTouchStart(x, y) {
    if (!this.isPlaying || this.isAnimating) return

    // 检测是否点击暂停按钮
    if (this.isPointInPauseButton(x, y)) {
      this.pauseGame()
      return
    }

    // 检测是否点击道具栏
    if (this.handlePowerUpClick(x, y)) {
      return
    }

    // 检测是否点击棋盘
    if (this.board && this.board.containsPoint(x, y)) {
      const piece = this.board.getPieceAt(x, y)
      if (piece) {
        // 检查是否正在等待道具目标选择
        if (this.powerUpManager && this.powerUpManager.isWaitingForTarget()) {
          this.powerUpManager.handleTargetSelection(piece.row, piece.col)
          return
        }
        this.onPieceSelected(piece)
      }
    }
  }

  /**
   * 处理触摸移动事件
   */
  handleTouchMove(x, y) {
    // 可以添加滑动预览效果
  }

  /**
   * 处理触摸结束事件
   */
  handleTouchEnd() {
    // 处理触摸结束逻辑
  }

  /**
   * 元素被选中时的处理
   */
  onPieceSelected(piece) {
    if (!this.selectedPiece) {
      // 第一次选择
      this.selectedPiece = piece
      if (this.audioManager) this.audioManager.playSFX('select')
    } else {
      // 第二次选择
      if (this.selectedPiece === piece) {
        // 取消选择
        this.selectedPiece = null
      } else if (this.board.isAdjacent(this.selectedPiece, piece)) {
        // 尝试交换
        this.trySwap(this.selectedPiece, piece)
        this.selectedPiece = null
      } else {
        // 选择新的元素
        this.selectedPiece = piece
      }
    }
  }

  /**
   * 尝试交换两个元素
   */
  async trySwap(piece1, piece2) {
    if (this.isAnimating) return

    this.isAnimating = true

    // 执行交换动画
    await this.board.swapPieces(piece1, piece2)

    // 检测是否有匹配
    const matches = this.matcher.findMatches()

    if (matches.length > 0) {
      // 有效移动
      this.moves--
      if (this.audioManager) this.audioManager.playSFX('swap_success')

      // 处理匹配
      await this.processMatches(matches)
    } else {
      // 无效移动，交换回来
      if (this.audioManager) this.audioManager.playSFX('swap_fail')
      await this.board.swapPieces(piece1, piece2)
    }

    this.isAnimating = false

    // 检查游戏状态
    this.checkGameState()
  }

  /**
   * 处理匹配
   */
  async processMatches(matches) {
    // 计算分数
    const points = this.calculateMatchScore(matches)
    this.score += points

    // 播放匹配音效
    const matchCount = matches.length
    if (matchCount >= 5) {
      if (this.audioManager) this.audioManager.playSFX('match_3')
    } else if (matchCount >= 4) {
      if (this.audioManager) this.audioManager.playSFX('match_2')
    } else {
      if (this.audioManager) this.audioManager.playSFX('match_1')
    }

    // 计算中心位置用于特效
    let centerX = 0, centerY = 0, totalCount = 0
    matches.flat().forEach(piece => {
      centerX += this.board.offsetX + piece.col * this.board.cellSize + this.board.cellSize / 2
      centerY += this.board.offsetY + piece.row * this.board.cellSize + this.board.cellSize / 2
      totalCount++
    })
    centerX /= totalCount
    centerY /= totalCount

    // 播放分数飘字特效
    if (this.effects) {
      this.effects.createScorePopup(centerX, centerY - 30, points)
    }

    // 连击效果
    if (matches.length > 1 && this.effects) {
      this.effects.createComboEffect(centerX, centerY, matches.length)
      this.updateHelperTip('combo', matches.length)
      // 触发连击对话
      if (this.dialogBubble) {
        const dialogShown = this.dialogBubble.onCombo(matches.length)
        if (dialogShown && this.audioManager) {
          this.audioManager.playSFX(this.getComboCelebrationSFX())
        }
      }
    } else {
      this.updateHelperTip('match')
      // 随机触发好评对话
      if (this.dialogBubble && Math.random() < 0.2) {
        this.dialogBubble.onGoodMove()
      }
    }

    const specialCreated = this.createSpecialPieces(matches)
    const keepKeys = new Set(specialCreated.map((piece) => `${piece.row}:${piece.col}`))
    const removableMatches = matches.map((match) => (
      match.filter((piece) => !keepKeys.has(`${piece.row}:${piece.col}`))
    )).filter((match) => match.length > 0)

    // 消除动画（传入特效管理器）
    const removedPieces = await this.board.removeMatches(removableMatches, this.effects)
    this.level.recordRemovedPieces(removedPieces, this.score, specialCreated.length)

    // 特殊糖果生成特效
    if (specialCreated.length > 0 && this.effects) {
      specialCreated.forEach(piece => {
        const x = this.board.offsetX + piece.col * this.board.cellSize + this.board.cellSize / 2
        const y = this.board.offsetY + piece.row * this.board.cellSize + this.board.cellSize / 2
        this.effects.createSpecialEffect(x, y, piece.special)
      })
      // 触发特殊糖果对话
      if (this.dialogBubble) {
        this.dialogBubble.onSpecialCreated()
      }
    }

    // 元素下落
    await this.board.applyGravity()

    // 填充新元素
    await this.board.fillEmptyCells()

    // 检查连锁反应
    const newMatches = this.matcher.findMatches()
    if (newMatches.length > 0) {
      // 连锁反应加分
      this.score += Math.floor(points * 0.5)
      await this.processMatches(newMatches)
    }
  }

  /**
   * 计算匹配分数
   */
  calculateMatchScore(matches) {
    let score = 0
    matches.forEach((match) => {
      score += match.length * 10
      if (match.length >= 4) score += 50
      if (match.length >= 5) score += 100
    })
    return score
  }

  /**
   * 创建特殊元素
   */
  createSpecialPieces(matches) {
    const specialPieces = []

    matches.forEach((match) => {
      if (match.length === 4) {
        // 创建条纹糖果
        const centerPiece = match[Math.floor(match.length / 2)]
        const isHorizontal = match.every((p) => p.row === centerPiece.row)
        this.board.createSpecialPiece(centerPiece, isHorizontal ? 'striped_h' : 'striped_v')
        specialPieces.push(centerPiece)
      } else if (match.length >= 5) {
        // 创建彩色炸弹
        const centerPiece = match[Math.floor(match.length / 2)]
        this.board.createSpecialPiece(centerPiece, 'color_bomb')
        specialPieces.push(centerPiece)
      }
    })

    return specialPieces
  }

  getComboCelebrationSFX() {
    const chapter = this.level?.chapter || 1
    const sfxByChapter = {
      1: 'celebrate_hello_kitty',
      2: 'celebrate_my_melody',
      3: 'celebrate_cinnamonroll',
      4: 'celebrate_pompompurin',
      5: 'celebrate_kuromi',
      6: 'celebrate_little_twin_stars'
    }
    return sfxByChapter[chapter] || 'celebrate_hello_kitty'
  }

  /**
   * 检查关卡目标完成情况
   */
  checkLevelObjectives() {
    if (!this.level) return

    const allCompleted = this.level.objectives.every((obj) => obj.current >= obj.target)
    const progress = this.getLevelProgress()

    // 即将完成时显示鼓励对话
    if (progress >= 0.8 && progress < 1 && this.dialogBubble) {
      const now = Date.now()
      if (!this.lastAlmostCompleteTime || now - this.lastAlmostCompleteTime > 5000) {
        this.dialogBubble.onAlmostComplete()
        this.lastAlmostCompleteTime = now
      }
    }

    if (allCompleted) {
      this.onLevelComplete()
    }
  }

  /**
   * 获取关卡完成进度
   */
  getLevelProgress() {
    if (!this.level || !this.level.objectives) return 0
    const totalProgress = this.level.objectives.reduce((sum, obj) => {
      return sum + (obj.current / obj.target)
    }, 0)
    return totalProgress / this.level.objectives.length
  }

  /**
   * 检查游戏状态
   */
  checkGameState() {
    // 检查步数或时间是否用完
    if (this.moves <= 0 || (this.level && this.level.timeLimit > 0 && this.timeLeft <= 0)) {
      this.checkLevelObjectives()
      if (!this.level.objectives.every((obj) => obj.current >= obj.target)) {
        this.onLevelFail()
      }
    }
  }

  /**
   * 关卡完成
   */
  onLevelComplete() {
    this.isPlaying = false
    if (this.audioManager) this.audioManager.playSFX('level_complete')

    // 计算星星
    const stars = this.calculateStars()

    this.onStateChange('level_complete', {
      score: this.score,
      stars: stars,
      level: this.level.id
    })
  }

  /**
   * 关卡失败
   */
  onLevelFail() {
    this.isPlaying = false
    if (this.audioManager) this.audioManager.playSFX('level_fail')

    this.onStateChange('level_fail', {
      score: this.score,
      level: this.level.id
    })
  }

  /**
   * 时间到
   */
  onTimeUp() {
    this.checkGameState()
  }

  /**
   * 计算星星数
   */
  calculateStars() {
    const score = this.score
    const target = this.level.targetScore

    if (score >= target * 2) return 3
    if (score >= target * 1.5) return 2
    if (score >= target) return 1
    return 0
  }

  /**
   * 暂停游戏
   */
  pauseGame() {
    this.isPlaying = false
    this.onStateChange('pause')
  }

  /**
   * 恢复游戏
   */
  resumeGame() {
    this.isPlaying = true
  }

  /**
   * 检测是否点击暂停按钮
   */
  isPointInPauseButton(x, y) {
    const btnX = this.width - 50
    const btnY = 40
    const radius = 25

    const dx = x - btnX
    const dy = y - btnY
    return dx * dx + dy * dy <= radius * radius
  }

  /**
   * 渲染道具栏
   */
  renderPowerUpBar(ctx) {
    if (!this.powerUpManager || !this.availablePowerUps.length) return

    const itemSize = 48
    const hitSize = 54
    const gap = 8
    const totalWidth = this.availablePowerUps.length * hitSize + (this.availablePowerUps.length - 1) * gap
    const startX = (this.width - totalWidth) / 2
    this.powerUpBarY = this.height - hitSize - 18

    this.availablePowerUps.forEach((type, index) => {
      const config = this.powerUpManager.constructor.POWERUP_CONFIG[type]
      if (!config) return

      const bx = startX + index * (hitSize + gap)
      const by = this.powerUpBarY
      const isActive = this.powerUpManager.activePowerUp === type
      const isFrozen = this.powerUpManager.isFrozen && type !== POWERUP_TYPES.FREEZE

      ctx.save()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.58)'
      ctx.strokeStyle = isActive ? 'rgba(255, 105, 180, 0.62)' : 'rgba(255, 182, 193, 0.28)'
      ctx.lineWidth = isActive ? 2 : 1
      ctx.shadowColor = 'rgba(255, 182, 193, 0.24)'
      ctx.shadowBlur = 8
      this.drawRoundRect(ctx, bx + 2, by + 4, hitSize - 4, hitSize - 8, 14)
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.stroke()
      ctx.restore()

      if (isActive) {
        ctx.save()
        ctx.shadowColor = 'rgba(255, 105, 180, 0.65)'
        ctx.shadowBlur = 16
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)'
        ctx.beginPath()
        ctx.arc(bx + hitSize / 2, by + hitSize / 2, hitSize * 0.42, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      ctx.save()
      if (isActive) {
        ctx.translate(bx + hitSize / 2, by + hitSize / 2)
        ctx.scale(1.1, 1.1)
        ctx.translate(-(bx + hitSize / 2), -(by + hitSize / 2))
      }
      if (isFrozen) {
        ctx.globalAlpha = 0.42
      }
      this.renderPowerUpIcon(ctx, type, config, bx + (hitSize - itemSize) / 2, by + (hitSize - itemSize) / 2, itemSize, isFrozen)
      ctx.restore()

      if (isFrozen) {
        ctx.save()
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.62)'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(bx + 12, by + hitSize - 12)
        ctx.lineTo(bx + hitSize - 12, by + 12)
        ctx.stroke()
        ctx.restore()
      }
    })
  }

  /**
   * 渲染道具图标
   */
  renderPowerUpIcon(ctx, type, config, x, y, size, isFrozen) {
    const centerX = x + size / 2
    const centerY = y + size / 2 - 2

    // 使用Canvas生成的图标
    if (this.powerUpManager?.iconGenerator) {
      const iconSize = size
      ctx.save()
      if (isFrozen) {
        ctx.globalAlpha = 0.5
        // 注意：小程序Canvas不支持filter属性
      }
      this.powerUpManager.iconGenerator.drawToContext(ctx, type, centerX, centerY, iconSize)
      ctx.restore()
    } else {
      // 备用：使用emoji
      if (isFrozen) {
        ctx.fillStyle = '#999999'
      } else {
        ctx.fillStyle = '#FFFFFF'
      }

      if (type === POWERUP_TYPES.PLUS_FIVE) {
        ctx.font = 'bold 18px sans-serif'
      } else {
        ctx.font = '26px sans-serif'
      }
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(config.icon, centerX, centerY)
    }
  }

  /**
   * 颜色加深
   */
  darkenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const R = Math.max((num >> 16) - amt, 0)
    const G = Math.max((num >> 8 & 0x00FF) - amt, 0)
    const B = Math.max((num & 0x0000FF) - amt, 0)
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
  }

  /**
   * 处理道具栏点击
   */
  handlePowerUpClick(x, y) {
    if (!this.powerUpManager || !this.availablePowerUps.length) return false

    const buttonSize = 54
    const gap = 8
    const startX = (this.width - (this.availablePowerUps.length * buttonSize + (this.availablePowerUps.length - 1) * gap)) / 2

    for (let i = 0; i < this.availablePowerUps.length; i++) {
      const bx = startX + i * (buttonSize + gap)
      const by = this.powerUpBarY

      if (x >= bx && x <= bx + buttonSize && y >= by && y <= by + buttonSize) {
        const powerUpType = this.availablePowerUps[i]

        // 如果已经选中了这个道具，取消选中
        if (this.powerUpManager.activePowerUp === powerUpType) {
          this.powerUpManager.cancelPowerUp()
          return true
        }

        // 尝试使用道具
        const result = this.powerUpManager.usePowerUp(powerUpType)
        if (result && this.powerUpManager.isWaitingForTarget()) {
          // 需要选择目标的道具，等待用户点击棋盘
          return true
        }
        return result
      }
    }

    return false
  }
}

module.exports = Game
