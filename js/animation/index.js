/**
 * 动画系统入口
 * 整合所有动画模块，提供简单易用的API
 */

const { ParticleSystem } = require('./particleSystem')
const { TweenManager, Animations } = require('./tween')
const { SpriteAnimation, CharacterAnimator } = require('./sprite')

class AnimationManager {
  constructor() {
    this.particles = new ParticleSystem()
    this.tweens = new TweenManager()
  }

  update() {
    this.particles.update()
    this.tweens.update()
  }

  render(ctx) {
    this.particles.render(ctx)
  }

  // ========== 粒子特效快捷方法 ==========

  // 消除爆炸
  explosion(x, y, color) {
    this.particles.createExplosion(x, y, color, 12)
  }

  // 连击特效
  combo(x, y, count) {
    this.particles.createComboEffect(x, y, count)
  }

  // 分数飘字
  scorePopup(x, y, score) {
    this.particles.createScorePopup(x, y, score)
  }

  // 道具特效
  powerUp(type, x, y) {
    this.particles.createPowerUpEffect(type, x, y)
  }

  // 环境粒子
  ambient(width, height) {
    this.particles.createAmbientParticles(width, height)
  }

  // ========== 补间动画快捷方法 ==========

  // 弹跳
  bounce(target) {
    return Animations.bounce(target, this.tweens)
  }

  // 脉冲
  pulse(target) {
    return Animations.pulse(target, this.tweens)
  }

  // 淡入
  fadeIn(target, duration, onComplete) {
    return this.tweens.fadeIn(target, duration, onComplete)
  }

  // 淡出
  fadeOut(target, duration, onComplete) {
    return this.tweens.fadeOut(target, duration, onComplete)
  }

  // 缩放进入
  scaleIn(target) {
    return this.tweens.scaleIn(target)
  }

  // 移动
  moveTo(target, x, y, duration) {
    return this.tweens.moveTo(target, x, y, duration)
  }

  // 按钮点击
  buttonPress(target) {
    return Animations.buttonPress(target, this.tweens)
  }

  // 弹出
  popup(target) {
    return Animations.popup(target, this.tweens)
  }

  // 持续浮动
  float(target) {
    return Animations.float(target, this.tweens)
  }

  // 震动
  shake(target, intensity, duration) {
    return this.tweens.shake(target, intensity, duration)
  }

  // ========== 管理方法 ==========

  pause() {
    this.tweens.pauseAll()
  }

  resume() {
    this.tweens.resumeAll()
  }

  clear() {
    this.particles.clear()
    this.tweens.clear()
  }
}

// 导出所有模块
module.exports = {
  AnimationManager,
  ParticleSystem,
  TweenManager,
  SpriteAnimation,
  CharacterAnimator,
  Animations
}
