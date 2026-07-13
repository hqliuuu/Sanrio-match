/**
 * 粒子特效系统
 * 用于消除爆炸、道具效果、环境氛围等
 */

class Particle {
  constructor(config) {
    this.x = config.x
    this.y = config.y
    this.vx = config.vx || 0
    this.vy = config.vy || 0
    this.life = config.life || 60
    this.maxLife = this.life
    this.size = config.size || 5
    this.color = config.color || '#FFD700'
    this.type = config.type || 'circle'
    this.gravity = config.gravity || 0
    this.alpha = 1
    this.rotation = 0
    this.rotationSpeed = config.rotationSpeed || 0
    this.scale = 1
    this.scaleSpeed = config.scaleSpeed || 0
  }

  update() {
    // 物理运动
    this.x += this.vx
    this.y += this.vy
    this.vy += this.gravity

    // 旋转
    this.rotation += this.rotationSpeed

    // 缩放
    this.scale += this.scaleSpeed

    // 生命周期
    this.life--
    this.alpha = this.life / this.maxLife

    return this.life > 0
  }

  render(ctx) {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    ctx.scale(this.scale, this.scale)

    ctx.fillStyle = this.color

    switch (this.type) {
      case 'circle':
        ctx.beginPath()
        ctx.arc(0, 0, this.size, 0, Math.PI * 2)
        ctx.fill()
        break
      case 'star':
        this.drawStar(ctx, 0, 0, this.size, 5)
        break
      case 'heart':
        this.drawHeart(ctx, 0, 0, this.size)
        break
      case 'square':
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size)
        break
      case 'sparkle':
        this.drawSparkle(ctx, 0, 0, this.size)
        break
    }

    ctx.restore()
  }

  drawStar(ctx, x, y, radius, points) {
    ctx.beginPath()
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2
      const r = i % 2 === 0 ? radius : radius / 2
      const px = x + Math.cos(angle) * r
      const py = y + Math.sin(angle) * r
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fill()
  }

  drawHeart(ctx, x, y, size) {
    ctx.beginPath()
    ctx.moveTo(x, y + size / 4)
    ctx.quadraticCurveTo(x, y, x + size / 4, y)
    ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4)
    ctx.quadraticCurveTo(x + size / 2, y + size / 2, x, y + size)
    ctx.quadraticCurveTo(x - size / 2, y + size / 2, x - size / 2, y + size / 4)
    ctx.quadraticCurveTo(x - size / 2, y, x - size / 4, y)
    ctx.quadraticCurveTo(x, y, x, y + size / 4)
    ctx.fill()
  }

  drawSparkle(ctx, x, y, size) {
    ctx.strokeStyle = this.color
    ctx.lineWidth = 2
    ctx.beginPath()
    // 十字星
    ctx.moveTo(x - size, y)
    ctx.lineTo(x + size, y)
    ctx.moveTo(x, y - size)
    ctx.lineTo(x, y + size)
    ctx.stroke()
  }
}

class ParticleSystem {
  constructor() {
    this.particles = []
    this.effects = []
  }

  // 创建消除爆炸效果
  createExplosion(x, y, color, count = 8) {
    const colors = Array.isArray(color) ? color : [color]

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
      const speed = 3 + Math.random() * 4

      this.particles.push(new Particle({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 30 + Math.random() * 20,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.5 ? 'star' : 'circle',
        gravity: 0.2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        scaleSpeed: -0.02
      }))
    }
  }

  // 创建连击特效
  createComboEffect(x, y, combo) {
    const count = Math.min(combo * 3, 20)
    const colors = ['#FFD700', '#FF69B4', '#00CED1', '#FF6347']

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 3

      this.particles.push(new Particle({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 40 + Math.random() * 20,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: 'star',
        gravity: 0.15,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      }))
    }
  }

  // 创建道具使用特效
  createPowerUpEffect(type, x, y) {
    switch (type) {
      case 'freeze':
        this.createFreezeEffect(x, y)
        break
      case 'bomb':
        this.createBombEffect(x, y)
        break
      case 'rainbow':
        this.createRainbowEffect(x, y)
        break
      case 'hammer':
        this.createHammerEffect(x, y)
        break
    }
  }

  createFreezeEffect(x, y) {
    // 冰晶爆发
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12
      this.particles.push(new Particle({
        x: x,
        y: y,
        vx: Math.cos(angle) * 2,
        vy: Math.sin(angle) * 2,
        life: 60,
        size: 8,
        color: '#B0E0E6',
        type: 'sparkle',
        rotationSpeed: 0.1
      }))
    }
  }

  createBombEffect(x, y) {
    // 爆炸火球
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 5 + Math.random() * 5

      this.particles.push(new Particle({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 30,
        size: 6 + Math.random() * 8,
        color: Math.random() > 0.5 ? '#FF4500' : '#FFD700',
        type: 'circle',
        gravity: 0.1,
        scaleSpeed: -0.03
      }))
    }
  }

  createRainbowEffect(x, y) {
    // 彩虹粒子
    const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']

    rainbowColors.forEach((color, i) => {
      const angle = (Math.PI * 2 * i) / rainbowColors.length
      for (let j = 0; j < 3; j++) {
        this.particles.push(new Particle({
          x: x,
          y: y,
          vx: Math.cos(angle) * (2 + j),
          vy: Math.sin(angle) * (2 + j),
          life: 50,
          size: 5,
          color: color,
          type: 'circle',
          rotationSpeed: 0.2
        }))
      }
    })
  }

  createHammerEffect(x, y) {
    // 锤击震动粒子
    for (let i = 0; i < 8; i++) {
      this.particles.push(new Particle({
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 5,
        life: 20,
        size: 4,
        color: '#888888',
        type: 'square',
        gravity: 0.3
      }))
    }
  }

  // 创建环境氛围粒子（背景飘落）
  createAmbientParticles(width, height) {
    // 偶尔添加漂浮粒子
    if (Math.random() < 0.02) {
      this.particles.push(new Particle({
        x: Math.random() * width,
        y: -10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: 1 + Math.random(),
        life: 200,
        size: 2 + Math.random() * 3,
        color: 'rgba(255, 255, 255, 0.6)',
        type: 'circle'
      }))
    }
  }

  // 创建分数飘字
  createScorePopup(x, y, score) {
    this.effects.push({
      type: 'scorePopup',
      x: x,
      y: y,
      score: score,
      life: 60,
      maxLife: 60,
      vy: -2
    })
  }

  update() {
    // 更新粒子
    this.particles = this.particles.filter(particle => particle.update())

    // 更新特效
    this.effects = this.effects.filter(effect => {
      effect.y += effect.vy
      effect.life--
      return effect.life > 0
    })
  }

  render(ctx) {
    // 渲染粒子
    this.particles.forEach(particle => particle.render(ctx))

    // 渲染特效
    this.effects.forEach(effect => {
      if (effect.type === 'scorePopup') {
        this.renderScorePopup(ctx, effect)
      }
    })
  }

  renderScorePopup(ctx, effect) {
    const alpha = effect.life / effect.maxLife
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = '#FFD700'
    ctx.font = 'bold 24px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(`+${effect.score}`, effect.x, effect.y)
    ctx.restore()
  }

  clear() {
    this.particles = []
    this.effects = []
  }
}

module.exports = { ParticleSystem, Particle }
