/**
 * 道具图标生成器
 * 支持两种方式：
 * 1. 使用项目中已有的图片素材
 * 2. 使用Canvas动态绘制（备用）
 */

const POWERUP_TYPES = {
  FREEZE: 'freeze',
  HAMMER: 'hammer',
  REFRESH: 'refresh',
  BOMB: 'bomb',
  RAINBOW: 'rainbow',
  SHUFFLE: 'shuffle',
  PLUS_FIVE: 'plus_five'
}

// 外部图片路径配置（使用项目中已有的素材）
const EXTERNAL_ICON_PATHS = {
  [POWERUP_TYPES.FREEZE]: 'assets/images/items/item_freeze.png',
  [POWERUP_TYPES.HAMMER]: 'assets/images/items/item_hammer.png',
  [POWERUP_TYPES.REFRESH]: 'assets/images/items/item_refresh.png',
  [POWERUP_TYPES.BOMB]: 'assets/images/items/item_bomb.png',
  [POWERUP_TYPES.RAINBOW]: 'assets/images/items/item_rainbow.png',
  [POWERUP_TYPES.SHUFFLE]: 'assets/images/items/item_shuffle.png',
  [POWERUP_TYPES.PLUS_FIVE]: 'assets/images/items/item_plus5.png'
}

const EXISTING_ASSET_MAPPING = EXTERNAL_ICON_PATHS

class PowerUpIconGenerator {
  constructor() {
    this.iconCache = {}
    this.externalImages = {}
    this.useExternalImages = true // 默认尝试使用外部图片
    this.loadExternalImages()
  }

  /**
   * 加载外部图片资源
   */
  loadExternalImages() {
    // 检查是否在小程序环境
    if (typeof wx === 'undefined' || !wx.createImage) {
      console.log('[PowerUpIcon] 非小程序环境，跳过图片加载')
      return
    }

    Object.keys(EXISTING_ASSET_MAPPING).forEach(type => {
      const path = EXISTING_ASSET_MAPPING[type]
      const image = wx.createImage()

      image.onload = () => {
        image.ready = true
        console.log(`[PowerUpIcon] 加载成功: ${type}`)
      }

      image.onerror = () => {
        console.warn(`[PowerUpIcon] 加载失败: ${path}，将使用Canvas绘制`)
        image.ready = false
      }

      image.src = path
      this.externalImages[type] = image
    })
  }

  /**
   * 获取道具图标
   * 优先使用外部图片，失败时使用Canvas绘制
   */
  getIcon(type, size = 64) {
    // 如果外部图片可用，直接返回图片
    if (this.useExternalImages && this.externalImages[type]?.ready) {
      return this.externalImages[type]
    }

    // 否则使用Canvas绘制
    const cacheKey = `${type}_${size}`
    if (this.iconCache[cacheKey]) {
      return this.iconCache[cacheKey]
    }

    const canvas = wx.createCanvas()
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    this.drawIcon(ctx, type, size)

    this.iconCache[cacheKey] = canvas
    return canvas
  }

  /**
   * 检查是否可以使用外部图片
   */
  hasExternalImage(type) {
    return this.externalImages[type]?.ready === true
  }

  /**
   * 绘制图标（Canvas备用方案）
   */
  drawIcon(ctx, type, size) {
    const center = size / 2
    const radius = size * 0.42

    // 绘制图标内容
    switch (type) {
      case POWERUP_TYPES.FREEZE:
        this.drawSnowflake(ctx, center, center, radius * 0.6)
        break
      case POWERUP_TYPES.HAMMER:
        this.drawHammer(ctx, center, center, radius * 0.7)
        break
      case POWERUP_TYPES.REFRESH:
        this.drawRefresh(ctx, center, center, radius * 0.6)
        break
      case POWERUP_TYPES.BOMB:
        this.drawBomb(ctx, center, center, radius * 0.6)
        break
      case POWERUP_TYPES.RAINBOW:
        this.drawRainbow(ctx, center, center, radius * 0.65)
        break
      case POWERUP_TYPES.SHUFFLE:
        this.drawShuffle(ctx, center, center, radius * 0.6)
        break
      case POWERUP_TYPES.PLUS_FIVE:
        this.drawPlusFive(ctx, center, center, radius * 0.7)
        break
    }
  }

  /**
   * 绘制背景
   */
  drawBackground(ctx, type, x, y, r, size) {
    const colors = {
      [POWERUP_TYPES.FREEZE]: { from: '#E0F7FA', to: '#4FC3F7', border: '#29B6F6' },
      [POWERUP_TYPES.HAMMER]: { from: '#FFE0B2', to: '#FF9800', border: '#F57C00' },
      [POWERUP_TYPES.REFRESH]: { from: '#E1BEE7', to: '#9C27B0', border: '#7B1FA2' },
      [POWERUP_TYPES.BOMB]: { from: '#FFCDD2', to: '#F44336', border: '#D32F2F' },
      [POWERUP_TYPES.RAINBOW]: { from: '#FFF9C4', to: '#FFD700', border: '#FFA000' },
      [POWERUP_TYPES.SHUFFLE]: { from: '#C8E6C9', to: '#4CAF50', border: '#388E3C' },
      [POWERUP_TYPES.PLUS_FIVE]: { from: '#B2DFDB', to: '#009688', border: '#00796B' }
    }

    const color = colors[type] || colors[POWERUP_TYPES.FREEZE]

    // 绘制阴影
    ctx.fillStyle = 'rgba(0,0,0,0.15)'
    ctx.beginPath()
    ctx.arc(x + 2, y + 2, r, 0, Math.PI * 2)
    ctx.fill()

    // 绘制渐变背景
    const gradient = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r)
    gradient.addColorStop(0, color.from)
    gradient.addColorStop(1, color.to)

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()

    // 绘制高光
    const highlight = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r * 0.8)
    highlight.addColorStop(0, 'rgba(255,255,255,0.6)')
    highlight.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = highlight
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()

    // 绘制边框
    ctx.strokeStyle = color.border
    ctx.lineWidth = Math.max(2, size * 0.03)
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.stroke()
  }

  /**
   * 绘制雪花（冰冻）
   */
  drawSnowflake(ctx, x, y, size) {
    ctx.save()
    ctx.translate(x, y)
    ctx.strokeStyle = 'white'
    ctx.lineWidth = size * 0.08
    ctx.lineCap = 'round'

    // 绘制六条臂
    for (let i = 0; i < 6; i++) {
      ctx.save()
      ctx.rotate((i * 60 * Math.PI) / 180)

      // 主臂
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -size)
      ctx.stroke()

      // 侧枝
      ctx.beginPath()
      ctx.moveTo(0, -size * 0.5)
      ctx.lineTo(-size * 0.25, -size * 0.7)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, -size * 0.5)
      ctx.lineTo(size * 0.25, -size * 0.7)
      ctx.stroke()

      // 端点装饰
      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.arc(0, -size, size * 0.1, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // 中心点
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  /**
   * 绘制锤子
   */
  drawHammer(ctx, x, y, size) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(-Math.PI / 4)

    // 锤柄
    ctx.fillStyle = '#8D6E63'
    const handleWidth = size * 0.15
    const handleHeight = size * 1.2
    ctx.fillRect(-handleWidth / 2, 0, handleWidth, handleHeight)

    // 锤头
    ctx.fillStyle = '#FF7043'
    const headWidth = size * 0.8
    const headHeight = size * 0.35
    ctx.fillRect(-headWidth / 2, -headHeight / 2, headWidth, headHeight)

    // 锤头高光
    ctx.fillStyle = '#FFAB91'
    ctx.fillRect(-headWidth / 2 + 2, -headHeight / 2 + 2, headWidth - 4, headHeight * 0.3)

    // 锤头顶部金属
    ctx.fillStyle = '#B0BEC5'
    ctx.fillRect(-headWidth / 2 - size * 0.05, -headHeight / 2, size * 0.1, headHeight)
    ctx.fillRect(headWidth / 2 - size * 0.05, -headHeight / 2, size * 0.1, headHeight)

    ctx.restore()
  }

  /**
   * 绘制刷新箭头
   */
  drawRefresh(ctx, x, y, size) {
    ctx.save()
    ctx.translate(x, y)

    const arrowSize = size * 0.35
    const radius = size * 0.5

    // 绘制环形箭头
    ctx.strokeStyle = 'white'
    ctx.lineWidth = size * 0.12
    ctx.lineCap = 'round'

    // 圆弧
    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, Math.PI * 1.5)
    ctx.stroke()

    // 箭头
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(0, -radius - arrowSize * 0.5)
    ctx.lineTo(-arrowSize * 0.5, -radius + arrowSize * 0.3)
    ctx.lineTo(arrowSize * 0.5, -radius + arrowSize * 0.3)
    ctx.closePath()
    ctx.fill()

    // 装饰星星
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    for (let i = 0; i < 3; i++) {
      const angle = (i * 120 * Math.PI) / 180
      const sx = Math.cos(angle) * radius * 0.6
      const sy = Math.sin(angle) * radius * 0.6
      ctx.beginPath()
      ctx.arc(sx, sy, size * 0.08, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
  }

  /**
   * 绘制炸弹
   */
  drawBomb(ctx, x, y, size) {
    ctx.save()
    ctx.translate(x, y)

    // 炸弹主体
    const bombGradient = ctx.createRadialGradient(-size * 0.2, -size * 0.2, 0, 0, 0, size)
    bombGradient.addColorStop(0, '#424242')
    bombGradient.addColorStop(1, '#212121')

    ctx.fillStyle = bombGradient
    ctx.beginPath()
    ctx.arc(0, size * 0.1, size * 0.65, 0, Math.PI * 2)
    ctx.fill()

    // 高光
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.beginPath()
    ctx.arc(-size * 0.2, -size * 0.15, size * 0.3, 0, Math.PI * 2)
    ctx.fill()

    // 引信
    ctx.strokeStyle = '#795548'
    ctx.lineWidth = size * 0.08
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.5)
    ctx.quadraticCurveTo(size * 0.3, -size * 0.8, size * 0.5, -size * 0.6)
    ctx.stroke()

    // 火花
    ctx.fillStyle = '#FF5722'
    ctx.beginPath()
    ctx.arc(size * 0.5, -size * 0.6, size * 0.12, 0, Math.PI * 2)
    ctx.fill()

    // 火花光芒
    ctx.fillStyle = 'rgba(255, 152, 0, 0.5)'
    ctx.beginPath()
    ctx.arc(size * 0.5, -size * 0.6, size * 0.2, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  /**
   * 绘制彩虹
   */
  drawRainbow(ctx, x, y, size) {
    ctx.save()
    ctx.translate(x, y)

    const colors = ['#FF5252', '#FFAB40', '#FFD740', '#69F0AE', '#40C4FF', '#7C4DFF', '#FF4081']
    const arcWidth = size * 0.1

    // 绘制彩虹弧线
    colors.forEach((color, i) => {
      ctx.strokeStyle = color
      ctx.lineWidth = arcWidth
      ctx.lineCap = 'round'

      ctx.beginPath()
      ctx.arc(0, size * 0.3, size * 0.5 - i * arcWidth * 0.8, Math.PI, 0)
      ctx.stroke()
    })

    // 绘制云朵
    this.drawCloud(ctx, -size * 0.45, size * 0.25, size * 0.3)
    this.drawCloud(ctx, size * 0.45, size * 0.25, size * 0.3)

    ctx.restore()
  }

  /**
   * 绘制云朵
   */
  drawCloud(ctx, x, y, size) {
    ctx.fillStyle = 'white'

    ctx.beginPath()
    ctx.arc(x, y, size * 0.4, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(x + size * 0.25, y - size * 0.15, size * 0.35, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(x - size * 0.25, y - size * 0.15, size * 0.35, 0, Math.PI * 2)
    ctx.fill()
  }

  /**
   * 绘制洗牌
   */
  drawShuffle(ctx, x, y, size) {
    ctx.save()
    ctx.translate(x, y)

    const colors = ['#FF5252', '#FFD740', '#40C4FF', '#69F0AE']
    const positions = [
      { x: -size * 0.3, y: -size * 0.3 },
      { x: size * 0.3, y: -size * 0.3 },
      { x: -size * 0.3, y: size * 0.3 },
      { x: size * 0.3, y: size * 0.3 }
    ]

    // 绘制交换箭头
    ctx.strokeStyle = 'white'
    ctx.lineWidth = size * 0.08
    ctx.lineCap = 'round'

    // 绘制连接线
    ctx.beginPath()
    ctx.moveTo(-size * 0.2, -size * 0.2)
    ctx.lineTo(size * 0.2, size * 0.2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(size * 0.2, -size * 0.2)
    ctx.lineTo(-size * 0.2, size * 0.2)
    ctx.stroke()

    // 绘制四个彩色方块
    positions.forEach((pos, i) => {
      ctx.fillStyle = colors[i]

      // 使用圆角矩形（如果不支持则使用普通矩形）
      if (ctx.roundRect) {
        ctx.beginPath()
        ctx.roundRect(pos.x - size * 0.15, pos.y - size * 0.15, size * 0.3, size * 0.3, size * 0.05)
        ctx.fill()
      } else {
        ctx.fillRect(pos.x - size * 0.15, pos.y - size * 0.15, size * 0.3, size * 0.3)
      }

      // 高光
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      if (ctx.roundRect) {
        ctx.beginPath()
        ctx.roundRect(pos.x - size * 0.1, pos.y - size * 0.12, size * 0.2, size * 0.12, size * 0.03)
        ctx.fill()
      } else {
        ctx.fillRect(pos.x - size * 0.1, pos.y - size * 0.12, size * 0.2, size * 0.12)
      }

      ctx.fillStyle = colors[i] // 恢复颜色
    })

    // 箭头
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(size * 0.35, 0)
    ctx.lineTo(size * 0.15, -size * 0.12)
    ctx.lineTo(size * 0.15, size * 0.12)
    ctx.closePath()
    ctx.fill()

    ctx.restore()
  }

  /**
   * 绘制+5步
   */
  drawPlusFive(ctx, x, y, size) {
    ctx.save()
    ctx.translate(x, y)

    // 绘制鞋子图标
    const shoeScale = size * 0.6

    // 鞋底
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    this.drawEllipse(ctx, 0, shoeScale * 0.3, shoeScale * 0.5, shoeScale * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()

    // 鞋面
    ctx.fillStyle = '#E0E0E0'
    ctx.beginPath()
    this.drawEllipse(ctx, 0, shoeScale * 0.1, shoeScale * 0.4, shoeScale * 0.25, 0, 0, Math.PI)
    ctx.fill()

    // +5文字
    ctx.fillStyle = '#FFFFFF'
    ctx.font = `bold ${size * 0.5}px "PingFang SC", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(0,0,0,0.3)'
    ctx.shadowBlur = 4
    ctx.fillText('+5', 0, -size * 0.15)
    ctx.shadowBlur = 0

    ctx.restore()
  }

  drawEllipse(ctx, x, y, radiusX, radiusY, rotation, startAngle, endAngle) {
    if (ctx.ellipse) {
      ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
      return
    }

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation || 0)
    ctx.scale(1, radiusY / radiusX)
    ctx.arc(0, 0, radiusX, startAngle, endAngle)
    ctx.restore()
  }

  /**
   * 绘制到指定上下文
   * 优先使用外部图片，否则使用Canvas绘制
   */
  drawToContext(ctx, type, x, y, size) {
    const icon = this.getIcon(type, size * 2) // 高分辨率
    ctx.drawImage(icon, x - size / 2, y - size / 2, size, size)
  }

  /**
   * 设置是否使用外部图片
   */
  setUseExternalImages(use) {
    this.useExternalImages = use
  }
}

module.exports = PowerUpIconGenerator
