/**
 * 动画系统使用示例
 */

const { AnimationManager } = require('./index')

// 示例1：游戏初始化时创建动画管理器
class GameWithAnimation {
  constructor() {
    this.animations = new AnimationManager()
  }

  update() {
    // 每帧更新动画
    this.animations.update()
  }

  render(ctx) {
    // 渲染粒子效果
    this.animations.render(ctx)
  }
}

// 示例2：消除时的动画效果
function onMatch(game, matches) {
  matches.forEach(match => {
    match.forEach(piece => {
      // 在消除位置创建爆炸效果
      const x = piece.x + piece.width / 2
      const y = piece.y + piece.height / 2
      const color = piece.getColor()

      game.animations.explosion(x, y, color)
    })

    // 连击效果
    if (match.length > 3) {
      const centerPiece = match[Math.floor(match.length / 2)]
      game.animations.combo(
        centerPiece.x,
        centerPiece.y,
        match.length
      )
    }
  })

  // 分数飘字
  const totalScore = calculateScore(matches)
  game.animations.scorePopup(
    game.width / 2,
    game.height / 2,
    totalScore
  )
}

// 示例3：道具使用动画
function onPowerUp(game, type, x, y) {
  game.animations.powerUp(type, x, y)

  // 屏幕震动效果（炸弹）
  if (type === 'bomb') {
    game.animations.shake(game.camera, 15, 300)
  }
}

// 示例4：UI动画
function onButtonClick(button, animations) {
  animations.buttonPress(button)
}

function showPopup(popup, animations) {
  animations.popup(popup)
}

function animateLevelStart(levelIcon, animations) {
  // 关卡图标弹跳进入
  animations.scaleIn(levelIcon)
  animations.float(levelIcon)  // 然后持续浮动
}

// 示例5：角色动画
function onCharacterHappy(character, animations) {
  // 角色弹跳
  animations.bounce(character)

  // 周围出现爱心粒子
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      animations.particles.createExplosion(
        character.x + Math.random() * 50,
        character.y + Math.random() * 50,
        '#FF69B4',
        3
      )
    }, i * 100)
  }
}

// 示例6：环境氛围
function updateAmbience(game, animations) {
  animations.ambient(game.width, game.height)
}

// 示例7：复杂的组合动画
function onLevelComplete(game) {
  const { animations } = game

  // 1. 所有元素淡出
  game.board.pieces.forEach((piece, i) => {
    setTimeout(() => {
      animations.fadeOut(piece, 300)
    }, i * 50)
  })

  // 2. 显示胜利文字
  setTimeout(() => {
    const victoryText = { x: game.width / 2, y: -50, alpha: 0 }
    animations.popup(victoryText)
    animations.moveTo(victoryText, game.width / 2, game.height / 2, 800, 'easeOutBounce')
  }, 500)

  // 3. 烟花效果
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = Math.random() * game.width
        const y = Math.random() * game.height / 2
        const colors = ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB']
        animations.explosion(x, y, colors[i % colors.length])
      }, i * 200)
    }
  }, 1000)
}

module.exports = {
  GameWithAnimation,
  onMatch,
  onPowerUp,
  onButtonClick,
  showPopup,
  animateLevelStart,
  onCharacterHappy,
  updateAmbience,
  onLevelComplete
}
