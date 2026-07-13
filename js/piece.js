const PIECE_IMAGES = {
  default: {
    1: 'assets/images/pieces/normal/piece_1_strawberry.png',
    2: 'assets/images/pieces/normal/piece_2_lemon.png',
    3: 'assets/images/pieces/normal/piece_3_grape.png',
    4: 'assets/images/pieces/normal/piece_4_apple.png',
    5: 'assets/images/pieces/normal/piece_5_blueberry.png',
    6: 'assets/images/pieces/normal/piece_6_orange.png'
  },
  1: {
    1: 'assets/images/pieces/chapter_1/piece_1_strawberry_shortcake.png',
    2: 'assets/images/pieces/chapter_1/piece_2_lemon_cream_tart.png',
    3: 'assets/images/pieces/chapter_1/piece_3_chocolate_heart.png',
    4: 'assets/images/pieces/chapter_1/piece_4_green_apple_candy.png',
    5: 'assets/images/pieces/chapter_1/piece_5_blueberry_macaron.png',
    6: 'assets/images/pieces/chapter_1/piece_6_orange_jelly.png'
  },
  2: {
    1: 'assets/images/pieces/chapter_2/piece_1_pink_metronome.png',
    2: 'assets/images/pieces/chapter_2/piece_2_golden_note.png',
    3: 'assets/images/pieces/chapter_2/piece_3_purple_treble.png',
    4: 'assets/images/pieces/chapter_2/piece_4_music_box_key.png',
    5: 'assets/images/pieces/chapter_2/piece_5_blue_music_note.png',
    6: 'assets/images/pieces/chapter_2/piece_6_tambourine_cookie.png'
  },
  3: {
    1: 'assets/images/pieces/chapter_3/piece_1_cloud_strawberry.png',
    2: 'assets/images/pieces/chapter_3/piece_2_rainbow_lemon.png',
    3: 'assets/images/pieces/chapter_3/piece_3_grape_cloud.png',
    4: 'assets/images/pieces/chapter_3/piece_4_sunny_apple_balloon.png',
    5: 'assets/images/pieces/chapter_3/piece_5_sky_blueberry.png',
    6: 'assets/images/pieces/chapter_3/piece_6_storm_orange.png'
  },
  4: {
    1: 'assets/images/pieces/chapter_4/piece_1_strawberry_cookie.png',
    2: 'assets/images/pieces/chapter_4/piece_2_pudding_lemon.png',
    3: 'assets/images/pieces/chapter_4/piece_3_coffee_bean.png',
    4: 'assets/images/pieces/chapter_4/piece_4_sleepy_apple_pillow.png',
    5: 'assets/images/pieces/chapter_4/piece_5_blueberry_pudding.png',
    6: 'assets/images/pieces/chapter_4/piece_6_caramel_orange.png'
  },
  5: {
    1: 'assets/images/pieces/chapter_5/piece_1_dark_strawberry_potion.png',
    2: 'assets/images/pieces/chapter_5/piece_2_magic_lemon_crescent.png',
    3: 'assets/images/pieces/chapter_5/piece_3_shadow_grape_crystal.png',
    4: 'assets/images/pieces/chapter_5/piece_4_apple_spell_envelope.png',
    5: 'assets/images/pieces/chapter_5/piece_5_purple_blueberry_gem.png',
    6: 'assets/images/pieces/chapter_5/piece_6_night_orange_moon.png'
  },
  6: {
    1: 'assets/images/pieces/chapter_6/piece_1_shooting_star_berry.png',
    2: 'assets/images/pieces/chapter_6/piece_2_starlight_lemon.png',
    3: 'assets/images/pieces/chapter_6/piece_3_galaxy_grape_planet.png',
    4: 'assets/images/pieces/chapter_6/piece_4_crescent_moon_apple.png',
    5: 'assets/images/pieces/chapter_6/piece_5_constellation_blueberry.png',
    6: 'assets/images/pieces/chapter_6/piece_6_orange_comet.png'
  }
}

const SPECIAL_IMAGES = {
  striped_h: 'assets/images/pieces/special/striped_h.png',
  striped_v: 'assets/images/pieces/special/striped_v.png',
  wrapped: 'assets/images/pieces/special/wrapped.png',
  color_bomb: 'assets/images/pieces/special/color_bomb.png',
  fish: 'assets/images/pieces/special/fish.png'
}

const FALLBACK_COLORS = {
  1: '#ff7f9f',
  2: '#ffe073',
  3: '#b990ff',
  4: '#8bdc8b',
  5: '#7ec8ff',
  6: '#ffb36b'
}

const imageCache = {}

function getImage(src) {
  if (!imageCache[src]) {
    const image = wx.createImage()
    image.onload = () => {
      image.ready = true
    }
    image.src = src
    imageCache[src] = image
  }
  return imageCache[src]
}

function getPieceImageSrc(type, board) {
  const chapter = board && Number(board.chapter)
  const chapterImages = PIECE_IMAGES[chapter] || PIECE_IMAGES.default
  return chapterImages[type] || PIECE_IMAGES.default[type]
}

class Piece {
  constructor(row, col, type, board) {
    this.row = row
    this.col = col
    this.type = type
    this.special = null
    this.board = board

    // 动画属性
    this.x = 0
    this.y = 0
    this.targetX = 0
    this.targetY = 0
    this.scale = 1
    this.targetScale = 1
    this.opacity = 1
    this.isAnimating = false
    this.isRemoving = false

    this.updatePosition()
  }

  updatePosition() {
    this.targetX = this.board.offsetX + this.col * this.board.cellSize
    this.targetY = this.board.offsetY + this.row * this.board.cellSize

    // 如果不在动画中，直接设置当前位置
    if (!this.isAnimating) {
      this.x = this.targetX
      this.y = this.targetY
    }
  }

  // 更新动画（每帧调用）
  update(deltaTime) {
    const speed = 15 * deltaTime / 16 // 根据帧率调整速度

    // 位置动画（平滑移动）
    if (Math.abs(this.x - this.targetX) > 0.5 || Math.abs(this.y - this.targetY) > 0.5) {
      this.x += (this.targetX - this.x) * 0.2
      this.y += (this.targetY - this.y) * 0.2
      this.isAnimating = true
    } else {
      this.x = this.targetX
      this.y = this.targetY
      this.isAnimating = false
    }

    // 缩放动画（消除时的缩小效果）
    if (Math.abs(this.scale - this.targetScale) > 0.01) {
      this.scale += (this.targetScale - this.scale) * 0.15
    }

    // 透明度动画
    if (Math.abs(this.opacity - 1) > 0.01 && !this.isRemoving) {
      this.opacity += (1 - this.opacity) * 0.1
    }
  }

  // 开始消除动画
  startRemoveAnimation() {
    this.isRemoving = true
    this.targetScale = 0
  }

  // 设置目标位置（用于滑动动画）
  setTargetPosition(row, col) {
    this.row = row
    this.col = col
    this.updatePosition()
  }

  render(ctx) {
    const padding = Math.max(4, this.board.cellSize * 0.08)
    const baseSize = this.board.cellSize - padding * 2
    const size = baseSize * this.scale
    const offset = (baseSize - size) / 2

    ctx.save()
    ctx.globalAlpha = this.opacity

    const src = this.special ? SPECIAL_IMAGES[this.special] : getPieceImageSrc(this.type, this.board)
    const image = src ? getImage(src) : null

    if (image && (image.ready || image.complete || image.width)) {
      ctx.drawImage(image, this.x + padding + offset, this.y + padding + offset, size, size)
    } else {
      // 绘制圆形棋子作为备用
      ctx.fillStyle = FALLBACK_COLORS[this.type] || '#ffb6c1'
      ctx.beginPath()
      ctx.arc(this.x + this.board.cellSize / 2, this.y + this.board.cellSize / 2, size / 2, 0, Math.PI * 2)
      ctx.fill()

      // 添加高光效果让棋子更可爱
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.beginPath()
      if (ctx.ellipse) {
        ctx.ellipse(
          this.x + this.board.cellSize / 2 - size / 6,
          this.y + this.board.cellSize / 2 - size / 6,
          size / 5,
          size / 8,
          -Math.PI / 4,
          0,
          Math.PI * 2
        )
      } else {
        ctx.arc(
          this.x + this.board.cellSize / 2 - size / 6,
          this.y + this.board.cellSize / 2 - size / 6,
          size / 8,
          0,
          Math.PI * 2
        )
      }
      ctx.fill()
    }

    ctx.restore()
  }
}

Piece.getImage = getImage
Piece.getPieceImageSrc = getPieceImageSrc
Piece.FALLBACK_COLORS = FALLBACK_COLORS

module.exports = Piece
