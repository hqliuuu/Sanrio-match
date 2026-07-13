/**
 * 道具系统 - Powerup System
 * 包含各种道具的定义、效果和使用逻辑
 */

const POWERUP_TYPES = {
  FREEZE: 'freeze',        // 冰冻道具 - 冻结时间
  HAMMER: 'hammer',        // 锤子道具 - 消除单个元素
  REFRESH: 'refresh',      // 刷新道具 - 重新排列棋盘
  BOMB: 'bomb',            // 炸弹道具 - 消除3x3区域
  RAINBOW: 'rainbow',      // 彩虹道具 - 消除所有同色元素
  SHUFFLE: 'shuffle',      // 洗牌道具 - 随机交换位置
  PLUS_FIVE: 'plus_five'   // +5步道具 - 增加5步
}

const POWERUP_CONFIG = {
  [POWERUP_TYPES.FREEZE]: {
    name: '冰冻',
    description: '冻结时间5秒',
    icon: '❄️',
    color: '#87CEEB',
    duration: 5000,  // 冻结时间(毫秒)
    cost: 100        // 金币成本
  },
  [POWERUP_TYPES.HAMMER]: {
    name: '锤子',
    description: '消除任意一个元素',
    icon: '🔨',
    color: '#8B4513',
    cost: 150
  },
  [POWERUP_TYPES.REFRESH]: {
    name: '刷新',
    description: '重新排列所有元素',
    icon: '🔄',
    color: '#9370DB',
    cost: 200
  },
  [POWERUP_TYPES.BOMB]: {
    name: '炸弹',
    description: '消除3x3区域',
    icon: '💣',
    color: '#FF4500',
    radius: 1,      // 影响半径
    cost: 250
  },
  [POWERUP_TYPES.RAINBOW]: {
    name: '彩虹',
    description: '消除所有同色元素',
    icon: '🌈',
    color: '#FF69B4',
    cost: 300
  },
  [POWERUP_TYPES.SHUFFLE]: {
    name: '洗牌',
    description: '随机交换元素位置',
    icon: '🔀',
    color: '#20B2AA',
    cost: 180
  },
  [POWERUP_TYPES.PLUS_FIVE]: {
    name: '+5步',
    description: '增加5步移动次数',
    icon: '+5',
    color: '#32CD32',
    steps: 5,
    cost: 120
  }
}

const PowerUpIconGenerator = require('./ui/powerupIcons.js')

class PowerUpManager {
  constructor(game) {
    this.game = game
    this.activePowerUp = null  // 当前选中的道具
    this.freezeEndTime = 0     // 冰冻结束时间
    this.isFrozen = false      // 是否处于冰冻状态
    this.effects = []          // 正在播放的特效
    this.iconGenerator = new PowerUpIconGenerator() // 道具图标生成器
  }

  /**
   * 加载道具图标（现在使用Canvas生成）
   */
  loadPowerUpIcons() {
    // Canvas图标生成器已经准备好了，无需额外加载
  }

  /**
   * 获取道具图标
   */
  getPowerUpIcon(type, size = 64) {
    return this.iconGenerator.getIcon(type, size)
  }

  // 静态获取配置方法
  static get POWERUP_TYPES() {
    return POWERUP_TYPES
  }

  static get POWERUP_CONFIG() {
    return POWERUP_CONFIG
  }

  /**
   * 使用道具
   * @param {string} type - 道具类型
   * @param {number} row - 目标行(可选)
   * @param {number} col - 目标列(可选)
   * @returns {boolean} 是否成功使用
   */
  usePowerUp(type, row, col) {
    if (!this.canUsePowerUp(type)) return false

    const config = POWERUP_CONFIG[type]
    if (!config) return false

    // 检查金币是否足够
    if (!this.deductCost(type)) return false

    switch (type) {
      case POWERUP_TYPES.FREEZE:
        return this.useFreeze()
      case POWERUP_TYPES.HAMMER:
        return this.useHammer(row, col)
      case POWERUP_TYPES.REFRESH:
        return this.useRefresh()
      case POWERUP_TYPES.BOMB:
        return this.useBomb(row, col)
      case POWERUP_TYPES.RAINBOW:
        return this.useRainbow(row, col)
      case POWERUP_TYPES.SHUFFLE:
        return this.useShuffle()
      case POWERUP_TYPES.PLUS_FIVE:
        return this.usePlusFive()
      default:
        return false
    }
  }

  /**
   * 检查是否可以使用道具
   */
  canUsePowerUp(type) {
    if (!this.game.isPlaying || this.game.isAnimating) return false

    // 冰冻状态下不能使用其他道具
    if (this.isFrozen && type !== POWERUP_TYPES.FREEZE) return false

    return true
  }

  /**
   * 扣除金币成本
   */
  deductCost(type) {
    const config = POWERUP_CONFIG[type]
    // 这里应该检查玩家金币，暂时返回true
    // TODO: 整合玩家金币系统
    return true
  }

  /**
   * 使用冰冻道具
   */
  useFreeze() {
    const config = POWERUP_CONFIG[POWERUP_TYPES.FREEZE]
    this.freezeEndTime = Date.now() + config.duration
    this.isFrozen = true

    // 播放音效
    if (this.game.audioManager) {
      this.game.audioManager.playSFX('freeze')
    }

    // 播放可爱冰冻特效（在屏幕中央）
    if (this.game.effects) {
      this.game.effects.createPowerUpEffect('freeze', this.game.width / 2, this.game.height / 2)
    }

    // 触发道具使用对话
    if (this.game.dialogBubble) {
      this.game.dialogBubble.onPowerUpUsed()
    }

    // 添加冰冻特效
    this.addEffect({
      type: 'freeze',
      startTime: Date.now(),
      duration: config.duration
    })

    return true
  }

  /**
   * 使用锤子道具
   */
  async useHammer(row, col) {
    if (row === undefined || col === undefined) {
      // 进入选择模式
      this.activePowerUp = POWERUP_TYPES.HAMMER
      return true
    }

    const piece = this.game.board.grid[row] && this.game.board.grid[row][col]
    if (!piece) return false

    this.activePowerUp = null
    this.game.isAnimating = true

    // 播放音效
    if (this.game.audioManager) {
      this.game.audioManager.playSFX('hammer')
    }

    // 触发道具使用对话
    if (this.game.dialogBubble) {
      this.game.dialogBubble.onPowerUpUsed()
    }

    // 锤子动画效果
    const x = this.game.board.offsetX + col * this.game.board.cellSize + this.game.board.cellSize / 2
    const y = this.game.board.offsetY + row * this.game.board.cellSize + this.game.board.cellSize / 2

    // 播放可爱锤子特效
    if (this.game.effects) {
      this.game.effects.createPowerUpEffect('hammer', x, y)
    }

    await this.playHammerAnimation(row, col)

    // 消除目标元素
    const removed = [{ type: piece.type, special: piece.special, row, col }]
    this.game.board.grid[row][col] = null

    // 记录消除
    this.game.level.recordRemovedPieces(removed, 0, 0)

    // 应用重力
    await this.game.board.applyGravity()
    await this.game.board.fillEmptyCells()

    // 检查新的匹配
    const matches = this.game.matcher.findMatches()
    if (matches.length > 0) {
      await this.game.processMatches(matches)
    }

    this.game.isAnimating = false
    this.game.checkGameState()

    return true
  }

  /**
   * 使用刷新道具
   */
  async useRefresh() {
    this.game.isAnimating = true

    // 播放音效
    if (this.game.audioManager) {
      this.game.audioManager.playSFX('refresh')
    }

    // 触发道具使用对话
    if (this.game.dialogBubble) {
      this.game.dialogBubble.onPowerUpUsed()
    }

    // 刷新动画
    await this.playRefreshAnimation()

    // 重新生成棋盘，保持特殊元素
    const specialPieces = []
    for (let row = 0; row < this.game.board.rows; row++) {
      for (let col = 0; col < this.game.board.cols; col++) {
        const piece = this.game.board.grid[row][col]
        if (piece && piece.special) {
          specialPieces.push({ row, col, special: piece.special, type: piece.type })
        }
      }
    }

    // 重新初始化棋盘
    this.game.board.init()
    this.game.board.ensureNoInitialMatches()

    // 恢复特殊元素
    specialPieces.forEach(({ row, col, special, type }) => {
      if (this.game.board.grid[row] && this.game.board.grid[row][col]) {
        this.game.board.grid[row][col].special = special
        this.game.board.grid[row][col].type = type
      }
    })

    this.game.isAnimating = false
    return true
  }

  /**
   * 使用炸弹道具
   */
  async useBomb(row, col) {
    if (row === undefined || col === undefined) {
      this.activePowerUp = POWERUP_TYPES.BOMB
      return true
    }

    const config = POWERUP_CONFIG[POWERUP_TYPES.BOMB]
    const radius = config.radius

    this.activePowerUp = null
    this.game.isAnimating = true

    // 播放音效
    if (this.game.audioManager) {
      this.game.audioManager.playSFX('bomb')
    }

    // 触发道具使用对话
    if (this.game.dialogBubble) {
      this.game.dialogBubble.onPowerUpUsed()
    }

    // 播放可爱炸弹特效
    const centerX = this.game.board.offsetX + col * this.game.board.cellSize + this.game.board.cellSize / 2
    const centerY = this.game.board.offsetY + row * this.game.board.cellSize + this.game.board.cellSize / 2

    if (this.game.effects) {
      this.game.effects.createPowerUpEffect('bomb', centerX, centerY)
      this.game.effects.createBombBlastEffect(centerX, centerY, this.game.board.cellSize, radius)
    }

    // 炸弹动画
    await this.playBombAnimation(row, col)

    // 消除区域内的元素
    const removed = []
    for (let r = Math.max(0, row - radius); r <= Math.min(this.game.board.rows - 1, row + radius); r++) {
      for (let c = Math.max(0, col - radius); c <= Math.min(this.game.board.cols - 1, col + radius); c++) {
        const piece = this.game.board.grid[r] && this.game.board.grid[r][c]
        if (piece) {
          removed.push({ type: piece.type, special: piece.special, row: r, col: c })
          this.game.board.grid[r][c] = null
        }
      }
    }

    // 计分
    const score = removed.length * 20
    this.game.score += score

    // 记录消除
    this.game.level.recordRemovedPieces(removed, score, 0)

    // 应用重力
    await this.game.board.applyGravity()
    await this.game.board.fillEmptyCells()

    // 检查新的匹配
    const matches = this.game.matcher.findMatches()
    if (matches.length > 0) {
      await this.game.processMatches(matches)
    }

    this.game.isAnimating = false
    this.game.checkGameState()

    return true
  }

  /**
   * 使用彩虹道具
   */
  async useRainbow(row, col) {
    if (row === undefined || col === undefined) {
      this.activePowerUp = POWERUP_TYPES.RAINBOW
      return true
    }

    const targetPiece = this.game.board.grid[row] && this.game.board.grid[row][col]
    if (!targetPiece) return false

    const targetType = targetPiece.type
    const startX = this.game.board.offsetX + col * this.game.board.cellSize + this.game.board.cellSize / 2
    const startY = this.game.board.offsetY + row * this.game.board.cellSize + this.game.board.cellSize / 2

    const linkedTargets = []
    for (let r = 0; r < this.game.board.rows; r++) {
      for (let c = 0; c < this.game.board.cols; c++) {
        const piece = this.game.board.grid[r] && this.game.board.grid[r][c]
        if (piece && piece.type === targetType) {
          linkedTargets.push({
            x: this.game.board.offsetX + c * this.game.board.cellSize + this.game.board.cellSize / 2,
            y: this.game.board.offsetY + r * this.game.board.cellSize + this.game.board.cellSize / 2
          })
        }
      }
    }

    this.activePowerUp = null
    this.game.isAnimating = true

    // 播放音效
    if (this.game.audioManager) {
      this.game.audioManager.playSFX('rainbow')
    }

    // 触发道具使用对话
    if (this.game.dialogBubble) {
      this.game.dialogBubble.onPowerUpUsed()
    }

    if (this.game.effects) {
      this.game.effects.createPowerUpEffect('rainbow', startX, startY)
      this.game.effects.createRainbowLinkEffect(startX, startY, linkedTargets)
    }

    // 彩虹动画
    await this.playRainbowAnimation(targetType)

    // 消除所有同色元素
    const removed = []
    for (let r = 0; r < this.game.board.rows; r++) {
      for (let c = 0; c < this.game.board.cols; c++) {
        const piece = this.game.board.grid[r] && this.game.board.grid[r][c]
        if (piece && piece.type === targetType) {
          removed.push({ type: piece.type, special: piece.special, row: r, col: c })
          this.game.board.grid[r][c] = null
        }
      }
    }

    // 计分
    const score = removed.length * 15
    this.game.score += score

    // 记录消除
    this.game.level.recordRemovedPieces(removed, score, 0)

    // 应用重力
    await this.game.board.applyGravity()
    await this.game.board.fillEmptyCells()

    // 检查新的匹配
    const matches = this.game.matcher.findMatches()
    if (matches.length > 0) {
      await this.game.processMatches(matches)
    }

    this.game.isAnimating = false
    this.game.checkGameState()

    return true
  }

  /**
   * 使用洗牌道具
   */
  async useShuffle() {
    this.game.isAnimating = true

    // 播放音效
    if (this.game.audioManager) {
      this.game.audioManager.playSFX('shuffle')
    }

    // 洗牌动画
    await this.playShuffleAnimation()

    // 随机交换位置
    const positions = []
    for (let row = 0; row < this.game.board.rows; row++) {
      for (let col = 0; col < this.game.board.cols; col++) {
        positions.push({ row, col })
      }
    }

    // Fisher-Yates 洗牌算法
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]]
    }

    // 创建新的网格
    const newGrid = []
    for (let row = 0; row < this.game.board.rows; row++) {
      newGrid[row] = []
      for (let col = 0; col < this.game.board.cols; col++) {
        const newPos = positions[row * this.game.board.cols + col]
        const oldPiece = this.game.board.grid[newPos.row] && this.game.board.grid[newPos.row][newPos.col]
        if (oldPiece) {
          const newPiece = this.game.board.createPiece(row, col)
          newPiece.type = oldPiece.type
          newPiece.special = oldPiece.special
          newGrid[row][col] = newPiece
        }
      }
    }

    this.game.board.grid = newGrid

    // 确保没有初始匹配
    this.game.board.ensureNoInitialMatches()

    this.game.isAnimating = false
    return true
  }

  /**
   * 使用+5步道具
   */
  usePlusFive() {
    const config = POWERUP_CONFIG[POWERUP_TYPES.PLUS_FIVE]
    this.game.moves += config.steps

    // 播放音效
    if (this.game.audioManager) {
      this.game.audioManager.playSFX('plus_five')
    }

    // 添加特效
    this.addEffect({
      type: 'plus_five',
      startTime: Date.now(),
      duration: 1000
    })

    return true
  }

  /**
   * 取消当前选中的道具
   */
  cancelPowerUp() {
    this.activePowerUp = null
  }

  /**
   * 检查是否正在等待选择目标
   */
  isWaitingForTarget() {
    return this.activePowerUp === POWERUP_TYPES.HAMMER ||
           this.activePowerUp === POWERUP_TYPES.BOMB ||
           this.activePowerUp === POWERUP_TYPES.RAINBOW
  }

  /**
   * 处理道具目标选择
   */
  handleTargetSelection(row, col) {
    if (!this.isWaitingForTarget()) return false

    return this.usePowerUp(this.activePowerUp, row, col)
  }

  /**
   * 更新冰冻状态
   */
  update(deltaTime) {
    if (this.isFrozen && Date.now() >= this.freezeEndTime) {
      this.isFrozen = false
    }

    // 更新特效
    this.effects = this.effects.filter(effect => {
      return Date.now() - effect.startTime < effect.duration
    })
  }

  /**
   * 获取剩余冰冻时间(秒)
   */
  getFreezeTimeLeft() {
    if (!this.isFrozen) return 0
    return Math.max(0, (this.freezeEndTime - Date.now()) / 1000)
  }

  /**
   * 添加特效
   */
  addEffect(effect) {
    this.effects.push(effect)
  }

  /**
   * 播放锤子动画
   */
  async playHammerAnimation(row, col) {
    // 这里添加锤子动画逻辑
    await this.wait(300)
  }

  /**
   * 播放刷新动画
   */
  async playRefreshAnimation() {
    await this.wait(400)
  }

  /**
   * 播放炸弹动画
   */
  async playBombAnimation(row, col) {
    await this.wait(400)
  }

  /**
   * 播放彩虹动画
   */
  async playRainbowAnimation(targetType) {
    await this.wait(500)
  }

  /**
   * 播放洗牌动画
   */
  async playShuffleAnimation() {
    await this.wait(400)
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 渲染道具UI
   */
  renderPowerUpBar(ctx, x, y, availablePowerUps) {
    const buttonSize = 50
    const gap = 10

    availablePowerUps.forEach((type, index) => {
      const config = POWERUP_CONFIG[type]
      if (!config) return

      const bx = x + index * (buttonSize + gap)
      const by = y

      // 绘制按钮背景
      const isActive = this.activePowerUp === type
      ctx.fillStyle = isActive ? '#FFD700' : config.color
      ctx.beginPath()
      ctx.roundRect(bx, by, buttonSize, buttonSize, 8)
      ctx.fill()

      // 绘制图标
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 24px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(config.icon, bx + buttonSize / 2, by + buttonSize / 2)

      // 绘制边框
      ctx.strokeStyle = isActive ? '#FF1493' : 'rgba(255,255,255,0.5)'
      ctx.lineWidth = isActive ? 3 : 2
      ctx.stroke()
    })
  }

  /**
   * 渲染冰冻效果
   */
  renderFreezeEffect(ctx, width, height) {
    if (!this.isFrozen) return

    const timeLeft = this.getFreezeTimeLeft()
    const alpha = 0.3 + Math.sin(Date.now() / 200) * 0.1

    ctx.save()
    ctx.fillStyle = `rgba(135, 206, 235, ${alpha})`
    ctx.fillRect(0, 0, width, height)

    // 绘制冰晶图案
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.lineWidth = 2
    for (let i = 0; i < 20; i++) {
      const x = (i * width) / 20 + Math.sin(Date.now() / 1000 + i) * 20
      const y = Math.sin(Date.now() / 800 + i * 0.5) * height
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + 10, y)
      ctx.stroke()
    }

    // 绘制剩余时间
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 36px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = '#87CEEB'
    ctx.shadowBlur = 10
    ctx.fillText(`❄️ ${Math.ceil(timeLeft)}s`, width / 2, height / 2)

    ctx.restore()
  }

  /**
   * 检查点击是否在道具按钮上
   */
  hitPowerUpButton(x, y, startX, startY, availablePowerUps) {
    const buttonSize = 50
    const gap = 10

    for (let i = 0; i < availablePowerUps.length; i++) {
      const bx = startX + i * (buttonSize + gap)
      const by = startY

      if (x >= bx && x <= bx + buttonSize && y >= by && y <= by + buttonSize) {
        return availablePowerUps[i]
      }
    }

    return null
  }
}

module.exports = {
  PowerUpManager,
  POWERUP_TYPES,
  POWERUP_CONFIG
}
