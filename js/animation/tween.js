/**
 * 补间动画系统 (Tween Animation)
 * 类似CSS transition，用于UI动效和元素动画
 */

const Easing = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOutBounce: t => {
    if (t < 1 / 2.75) return 7.5625 * t * t
    if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
    if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
  },
  easeOutElastic: t => {
    if (t === 0) return 0
    if (t === 1) return 1
    return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1
  },
  easeInBack: t => { const c1 = 1.70158; const c3 = c1 + 1; return c3 * t * t * t - c1 * t * t }
}

class Tween {
  constructor(target, duration, to, options = {}) {
    this.target = target
    this.duration = duration
    this.to = to
    this.from = {}
    this.easing = Easing[options.easing] || Easing.easeOutQuad
    this.onUpdate = options.onUpdate || null
    this.onComplete = options.onComplete || null
    this.delay = options.delay || 0
    this.yoyo = options.yoyo || false
    this.repeat = options.repeat || 0
    this.repeatCount = 0
    this.reversed = false

    // 记录起始值
    for (let key in to) {
      this.from[key] = target[key]
    }

    this.startTime = Date.now() + this.delay
    this.isPlaying = true
    this.isPaused = false
    this.pauseTime = 0
  }

  update() {
    if (!this.isPlaying || this.isPaused) return true

    const now = Date.now()
    if (now < this.startTime) return true

    let elapsed = now - this.startTime
    let progress = Math.min(elapsed / this.duration, 1)
    progress = this.easing(progress)

    // 如果反向播放（yoyo效果）
    if (this.reversed) {
      progress = 1 - progress
    }

    // 更新目标属性
    for (let key in this.to) {
      const start = this.from[key]
      const end = this.to[key]
      this.target[key] = start + (end - start) * progress
    }

    if (this.onUpdate) this.onUpdate(this.target)

    // 动画完成
    if (progress >= 1 && !this.reversed) {
      if (this.yoyo && !this.reversed) {
        this.reversed = true
        this.startTime = now
        return true
      }

      if (this.repeatCount < this.repeat) {
        this.repeatCount++
        this.reversed = false
        this.startTime = now
        return true
      }

      if (this.onComplete) this.onComplete()
      return false
    }

    if (progress <= 0 && this.reversed) {
      this.reversed = false
      if (this.repeatCount < this.repeat) {
        this.repeatCount++
        this.startTime = now
        return true
      }
      if (this.onComplete) this.onComplete()
      return false
    }

    return true
  }

  pause() {
    this.isPaused = true
    this.pauseTime = Date.now()
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false
      const pausedDuration = Date.now() - this.pauseTime
      this.startTime += pausedDuration
    }
  }

  stop() {
    this.isPlaying = false
  }
}

class TweenManager {
  constructor() {
    this.tweens = []
  }

  add(target, duration, to, options) {
    const tween = new Tween(target, duration, to, options)
    this.tweens.push(tween)
    return tween
  }

  // 常用动画快捷方法
  fadeIn(target, duration = 500, onComplete) {
    target.alpha = 0
    return this.add(target, duration, { alpha: 1 }, {
      easing: 'easeOutQuad',
      onComplete
    })
  }

  fadeOut(target, duration = 500, onComplete) {
    return this.add(target, duration, { alpha: 0 }, {
      easing: 'easeInQuad',
      onComplete
    })
  }

  scaleIn(target, duration = 400) {
    target.scale = 0
    return this.add(target, duration, { scale: 1 }, {
      easing: 'easeOutElastic'
    })
  }

  bounce(target, duration = 600) {
    const originalY = target.y
    return this.add(target, duration / 2, { y: originalY - 30 }, {
      easing: 'easeOutQuad',
      yoyo: true,
      repeat: 1
    })
  }

  pulse(target, duration = 800) {
    const originalScale = target.scale || 1
    return this.add(target, duration, { scale: originalScale * 1.2 }, {
      easing: 'easeInOutQuad',
      yoyo: true,
      repeat: Infinity
    })
  }

  shake(target, intensity = 10, duration = 500) {
    const originalX = target.x
    return this.add(target, duration, { x: originalX }, {
      easing: 'easeInOutQuad',
      onUpdate: (t) => {
        t.x = originalX + (Math.random() - 0.5) * intensity * 2
      }
    })
  }

  moveTo(target, x, y, duration = 500, easing = 'easeOutQuad') {
    return this.add(target, duration, { x, y }, { easing })
  }

  update() {
    this.tweens = this.tweens.filter(tween => tween.update())
  }

  clear() {
    this.tweens = []
  }

  pauseAll() {
    this.tweens.forEach(t => t.pause())
  }

  resumeAll() {
    this.tweens.forEach(t => t.resume())
  }
}

// 预设动画组合
const Animations = {
  // 按钮点击反馈
  buttonPress: (target, tweenManager) => {
    const originalScale = target.scale || 1
    tweenManager.add(target, 100, { scale: originalScale * 0.9 }, {
      easing: 'easeInQuad',
      onComplete: () => {
        tweenManager.add(target, 200, { scale: originalScale }, {
          easing: 'easeOutElastic'
        })
      }
    })
  },

  // 卡片翻转
  cardFlip: (target, tweenManager, onHalfway) => {
    tweenManager.add(target, 200, { scaleX: 0 }, {
      easing: 'easeInQuad',
      onComplete: () => {
        if (onHalfway) onHalfway()
        tweenManager.add(target, 200, { scaleX: 1 }, {
          easing: 'easeOutQuad'
        })
      }
    })
  },

  // 弹出提示
  popup: (target, tweenManager) => {
    target.scale = 0
    target.alpha = 0
    tweenManager.add(target, 300, { scale: 1, alpha: 1 }, {
      easing: 'easeOutElastic'
    })
  },

  // 浮动效果（持续）
  float: (target, tweenManager) => {
    const originalY = target.y
    tweenManager.add(target, 2000, { y: originalY - 10 }, {
      easing: 'easeInOutQuad',
      yoyo: true,
      repeat: Infinity
    })
  }
}

module.exports = { TweenManager, Tween, Easing, Animations }
