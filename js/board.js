const Piece = require('./piece.js')
const { ObstacleManager } = require('./obstacles.js')

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

class Board {
  constructor(config) {
    this.rows = config.rows
    this.cols = config.cols
    this.cellSize = config.cellSize
    this.offsetX = config.offsetX
    this.offsetY = config.offsetY
    this.pieceTypes = config.pieceTypes
    this.chapter = config.chapter || 1
    this.grid = []

    // 障碍物系统
    this.obstacleManager = new ObstacleManager(this)

    this.init()
  }

  init() {
    for (let row = 0; row < this.rows; row++) {
      this.grid[row] = []
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = this.createPiece(row, col)
      }
    }
  }

  createPiece(row, col) {
    const type = this.pieceTypes[Math.floor(Math.random() * this.pieceTypes.length)]
    return new Piece(row, col, type, this)
  }

  ensureNoInitialMatches() {
    let guard = 0
    while (guard < 80) {
      const matches = this.findRawMatches()
      if (!matches.length) return

      matches.flat().forEach((piece) => {
        this.grid[piece.row][piece.col] = this.createPiece(piece.row, piece.col)
      })
      guard++
    }
  }

  findRawMatches() {
    const matches = []

    for (let row = 0; row < this.rows; row++) {
      let run = [this.grid[row][0]]
      for (let col = 1; col < this.cols; col++) {
        const piece = this.grid[row][col]
        const prev = run[run.length - 1]
        if (piece && prev && piece.type === prev.type) {
          run.push(piece)
        } else {
          if (run.length >= 3) matches.push([...run])
          run = [piece]
        }
      }
      if (run.length >= 3) matches.push([...run])
    }

    for (let col = 0; col < this.cols; col++) {
      let run = [this.grid[0][col]]
      for (let row = 1; row < this.rows; row++) {
        const piece = this.grid[row][col]
        const prev = run[run.length - 1]
        if (piece && prev && piece.type === prev.type) {
          run.push(piece)
        } else {
          if (run.length >= 3) matches.push([...run])
          run = [piece]
        }
      }
      if (run.length >= 3) matches.push([...run])
    }

    return matches
  }

  render(ctx) {
    ctx.save()

    // 绘制棋盘背景
    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)'
    ctx.strokeStyle = 'rgba(255, 128, 171, 0.55)'
    ctx.lineWidth = 3
    this.drawRoundRect(ctx,
      this.offsetX - 8,
      this.offsetY - 8,
      this.cols * this.cellSize + 16,
      this.rows * this.cellSize + 16,
      18
    )
    ctx.fill()
    ctx.stroke()

    // 绘制格子背景
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const x = this.offsetX + col * this.cellSize
        const y = this.offsetY + row * this.cellSize
        ctx.fillStyle = (row + col) % 2 === 0 ? 'rgba(255, 240, 245, 0.72)' : 'rgba(255, 255, 255, 0.72)'
        this.drawRoundRect(ctx, x + 2, y + 2, this.cellSize - 4, this.cellSize - 4, 10)
        ctx.fill()
      }
    }

    // 绘制所有棋子
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const piece = this.grid[row][col]
        if (piece) piece.render(ctx)
      }
    }

    // 绘制障碍物
    if (this.obstacleManager) {
      this.obstacleManager.render(ctx)
    }

    ctx.restore()
  }

  containsPoint(x, y) {
    return x >= this.offsetX &&
      x <= this.offsetX + this.cols * this.cellSize &&
      y >= this.offsetY &&
      y <= this.offsetY + this.rows * this.cellSize
  }

  getPieceAt(x, y) {
    const col = Math.floor((x - this.offsetX) / this.cellSize)
    const row = Math.floor((y - this.offsetY) / this.cellSize)
    return (this.grid[row] && this.grid[row][col]) || null
  }

  isAdjacent(pieceA, pieceB) {
    const rowDiff = Math.abs(pieceA.row - pieceB.row)
    const colDiff = Math.abs(pieceA.col - pieceB.col)
    return rowDiff + colDiff === 1
  }

  async swapPieces(pieceA, pieceB) {
    const aRow = pieceA.row
    const aCol = pieceA.col
    const bRow = pieceB.row
    const bCol = pieceB.col

    // 交换网格位置
    this.grid[aRow][aCol] = pieceB
    this.grid[bRow][bCol] = pieceA

    // 设置目标位置（触发滑动动画）
    pieceA.setTargetPosition(bRow, bCol)
    pieceB.setTargetPosition(aRow, aCol)

    // 等待动画完成（约200ms）
    await wait(200)
  }

  // 更新所有棋子的动画
  updatePieces(deltaTime) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const piece = this.grid[row][col]
        if (piece) piece.update(deltaTime)
      }
    }
  }

  async removeMatches(matches, effectManager) {
    const removed = []
    matches.flat().forEach((piece) => {
      if (!piece || !this.grid[piece.row] || !this.grid[piece.row][piece.col]) return

      // 创建消除动画效果
      if (effectManager) {
        const x = this.offsetX + piece.col * this.cellSize + this.cellSize / 2
        const y = this.offsetY + piece.row * this.cellSize + this.cellSize / 2
        effectManager.createMatchEffect(x, y, piece.type)
      }

      removed.push({ type: piece.type, special: piece.special, row: piece.row, col: piece.col })
      this.grid[piece.row][piece.col] = null
    })
    await wait(120)
    return removed
  }

  async applyGravity() {
    for (let col = 0; col < this.cols; col++) {
      const stack = []
      for (let row = this.rows - 1; row >= 0; row--) {
        const piece = this.grid[row][col]
        if (piece) stack.push(piece)
      }

      for (let row = this.rows - 1; row >= 0; row--) {
        const piece = stack.shift() || null
        this.grid[row][col] = piece
        if (piece) {
          piece.row = row
          piece.col = col
          piece.updatePosition()
        }
      }
    }
    await wait(120)
  }

  async fillEmptyCells() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (!this.grid[row][col]) {
          this.grid[row][col] = this.createPiece(row, col)
        }
      }
    }
    await wait(120)
  }

  createSpecialPiece(piece, specialType) {
    if (!piece) return
    const target = this.grid[piece.row] && this.grid[piece.row][piece.col]
    if (target) target.special = specialType
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
}

module.exports = Board
