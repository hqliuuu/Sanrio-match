/**
 * 精灵动画系统
 * 序列帧动画和骨骼动画支持
 */

class SpriteAnimation {
  constructor(config) {
    this.frames = config.frames || []  // 帧数组或单张图
    this.frameWidth = config.frameWidth || 0
    this.frameHeight = config.frameHeight || 0
    this.frameCount = config.frameCount || 1
    this.fps = config.fps || 12
    this.loop = config.loop !== false
    this.currentFrame = 0
    this.lastFrameTime = 0
    this.isPlaying = false
    this.isFinished = false
    this.onComplete = config.onComplete || null

    // 如果是单张精灵图，计算帧位置
    this.isSpriteSheet = config.isSpriteSheet || false
    this.sheetColumns = config.sheetColumns || 1
  }

  play() {
    this.isPlaying = true
    this.isFinished = false
    this.currentFrame = 0
    this.lastFrameTime = Date.now()
  }

  pause() {
    this.isPlaying = false
  }

  resume() {
    this.isPlaying = true
    this.lastFrameTime = Date.now()
  }

  stop() {
    this.isPlaying = false
    this.currentFrame = 0
  }

  update() {
    if (!this.isPlaying || this.isFinished) return

    const now = Date.now()
    const frameInterval = 1000 / this.fps

    if (now - this.lastFrameTime >= frameInterval) {
      this.currentFrame++
      this.lastFrameTime = now

      if (this.currentFrame >= this.frameCount) {
        if (this.loop) {
          this.currentFrame = 0
        } else {
          this.currentFrame = this.frameCount - 1
          this.isFinished = true
          this.isPlaying = false
          if (this.onComplete) this.onComplete()
        }
      }
    }
  }

  render(ctx, x, y, width, height) {
    if (this.frames.length === 0) return

    let frameImage, sx, sy, sw, sh

    if (this.isSpriteSheet) {
      // 精灵图模式
      frameImage = this.frames[0]
      const col = this.currentFrame % this.sheetColumns
      const row = Math.floor(this.currentFrame / this.sheetColumns)
      sx = col * this.frameWidth
      sy = row * this.frameHeight
      sw = this.frameWidth
      sh = this.frameHeight
    } else {
      // 独立帧模式
      frameImage = this.frames[this.currentFrame]
      sx = 0
      sy = 0
      sw = frameImage.width
      sh = frameImage.height
    }

    if (frameImage && frameImage.complete) {
      ctx.drawImage(frameImage, sx, sy, sw, sh, x, y, width, height)
    }
  }

  // 获取当前帧的裁剪区域（用于精灵图）
  getCurrentFrameRect() {
    if (!this.isSpriteSheet) return null

    const col = this.currentFrame % this.sheetColumns
    const row = Math.floor(this.currentFrame / this.sheetColumns)

    return {
      x: col * this.frameWidth,
      y: row * this.frameHeight,
      width: this.frameWidth,
      height: this.frameHeight
    }
  }
}

// 角色动画状态机
class CharacterAnimator {
  constructor() {
    this.animations = new Map()
    this.currentAnimation = null
    this.currentState = 'idle'
  }

  addAnimation(name, animation) {
    this.animations.set(name, animation)
  }

  play(name) {
    if (this.currentAnimation) {
      this.currentAnimation.pause()
    }

    this.currentState = name
    this.currentAnimation = this.animations.get(name)

    if (this.currentAnimation) {
      this.currentAnimation.play()
    }
  }

  update() {
    if (this.currentAnimation) {
      this.currentAnimation.update()
    }
  }

  render(ctx, x, y, width, height) {
    if (this.currentAnimation) {
      this.currentAnimation.render(ctx, x, y, width, height)
    }
  }

  // 预设角色动画
  static createHelloKittyAnimations() {
    const animator = new CharacterAnimator()

    // 待机动画
    animator.addAnimation('idle', new SpriteAnimation({
      frames: [], // 实际使用时加载图片
      fps: 8,
      loop: true
    }))

    // 开心动画
    animator.addAnimation('happy', new SpriteAnimation({
      frames: [],
      fps: 12,
      loop: false
    }))

    // 思考动画
    animator.addAnimation('think', new SpriteAnimation({
      frames: [],
      fps: 6,
      loop: true
    }))

    return animator
  }
}

// 特效动画集合
const EffectAnimations = {
  // 创建消除闪光
  createMatchFlash: () => {
    return new SpriteAnimation({
      frames: [], // 闪光序列帧
      fps: 20,
      loop: false
    })
  },

  // 创建星星收集
  createStarCollect: () => {
    return new SpriteAnimation({
      frames: [],
      fps: 15,
      loop: false
    })
  },

  // 创建特殊糖果生成
  createSpecialCreate: () => {
    return new SpriteAnimation({
      frames: [],
      fps: 12,
      loop: false
    })
  }
}

module.exports = {
  SpriteAnimation,
  CharacterAnimator,
  EffectAnimations
}
