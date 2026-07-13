/**
 * 障碍物系统 - Obstacle System
 * 包含各种障碍物的定义、特性和交互逻辑
 */

const OBSTACLE_TYPES = {
  ROCK: 'rock',           // 岩石 - 需要消除周围元素来破坏
  ICE: 'ice',             // 冰块 - 覆盖元素，消除一次后解除
  CAGE: 'cage',           // 笼子 - 锁住元素，不能直接移动
  CHOCOLATE: 'chocolate', // 巧克力 - 每回合会蔓延
  CREAM: 'cream',         // 奶油 - 双层，需要消除两次
  JELLY: 'jelly'          // 果冻 - 必须消除才能过关
}

const OBSTACLE_CONFIG = {
  [OBSTACLE_TYPES.ROCK]: {
    name: '岩石',
    description: '需要消除周围元素来破坏',
    icon: '🪨',
    color: '#808080',
    health: 1,          // 需要被消除周围元素次数
    blocksMatch: true,  // 是否阻止匹配
    blocksMove: true,   // 是否阻止移动
    score: 50           // 破坏得分
  },
  [OBSTACLE_TYPES.ICE]: {
    name: '冰块',
    description: '消除一次后解除',
    icon: '🧊',
    color: '#B0E0E6',
    health: 1,
    blocksMatch: false,
    blocksMove: false,
    score: 30
  },
  [OBSTACLE_TYPES.CAGE]: {
    name: '笼子',
    description: '锁住元素，不能直接移动',
    icon: '🔒',
    color: '#FFD700',
    health: 1,
    blocksMatch: false,
    blocksMove: true,
    score: 40
  },
  [OBSTACLE_TYPES.CHOCOLATE]: {
    name: '巧克力',
    description: '每回合会蔓延',
    icon: '🍫',
    color: '#8B4513',
    health: 1,
    blocksMatch: true,
    blocksMove: true,
    spreads: true,      // 会蔓延
    score: 60
  },
  [OBSTACLE_TYPES.CREAM]: {
    name: '奶油',
    description: '双层，需要消除两次',
    icon: '🥛',
    color: '#FFF8DC',
    health: 2,          // 双层
    blocksMatch: false,
    blocksMove: false,
    score: 25
  },
  [OBSTACLE_TYPES.JELLY]: {
    name: '果冻',
    description: '必须消除才能过关',
    icon: '🍮',
    color: '#FF69B4',
    health: 1,
    blocksMatch: false,
    blocksMove: false,
    isObjective: true,  // 是关卡目标
    score: 100
  }
}

class Obstacle {
  constructor(type, row, col) {
    this.type = type
    this.row = row
    this.col = col
    this.config = OBSTACLE_CONFIG[type]
    this.health = this.config ? this.config.health : 1
    this.maxHealth = this.health
  }

  /**
   * 受到伤害（被消除周围元素）
   * @returns {boolean} 是否被完全破坏
   */
  takeDamage() {
    this.health--
    return this.health <= 0
  }

  /**
   * 检查是否阻止匹配
   */
  blocksMatch() {
    return this.config && this.config.blocksMatch
  }

  /**
   * 检查是否阻止移动
   */
  blocksMove() {
    return this.config && this.config.blocksMove
  }

  /**
   * 是否会蔓延（巧克力）
   */
  canSpread() {
    return this.config && this.config.spreads && this.health > 0
  }

  /**
   * 是否是关卡目标
   */
  isObjective() {
    return this.config && this.config.isObjective
  }

  /**
   * 获取得分
   */
  getScore() {
    return this.config ? this.config.score : 0
  }

  /**
   * 渲染障碍物
   */
  render(ctx, x, y, size) {
    if (!this.config) return

    const padding = 4
    const innerSize = size - padding * 2

    ctx.save()

    // 绘制背景
    ctx.fillStyle = this.config.color
    ctx.globalAlpha = 0.3 + (this.health / this.maxHealth) * 0.5
    ctx.beginPath()
    ctx.roundRect(x + padding, y + padding, innerSize, innerSize, 8)
    ctx.fill()

    // 绘制图标
    ctx.globalAlpha = 1
    ctx.font = `${innerSize * 0.6}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(this.config.icon, x + size / 2, y + size / 2)

    // 如果是双层，显示层数
    if (this.maxHealth > 1 && this.health > 1) {
      ctx.fillStyle = '#FF1493'
      ctx.font = 'bold 12px sans-serif'
      ctx.fillText(`${this.health}`, x + size - 10, y + 12)
    }

    ctx.restore()
  }
}

class ObstacleManager {
  constructor(board) {
    this.board = board
    this.obstacles = []  // 障碍物列表
    this.spreadCount = 0 // 巧克力蔓延计数
  }

  /**
   * 添加障碍物
   */
  addObstacle(type, row, col) {
    // 检查位置是否已有障碍物
    const existing = this.getObstacleAt(row, col)
    if (existing) {
      // 如果是奶油或冰块，可以叠加
      if (existing.type === type && (type === OBSTACLE_TYPES.CREAM || type === OBSTACLE_TYPES.ICE)) {
        existing.health++
        existing.maxHealth = existing.health
      }
      return existing
    }

    const obstacle = new Obstacle(type, row, col)
    this.obstacles.push(obstacle)
    return obstacle
  }

  /**
   * 移除障碍物
   */
  removeObstacle(row, col) {
    const index = this.obstacles.findIndex(o => o.row === row && o.col === col)
    if (index !== -1) {
      const obstacle = this.obstacles[index]
      this.obstacles.splice(index, 1)
      return obstacle
    }
    return null
  }

  /**
   * 获取指定位置的障碍物
   */
  getObstacleAt(row, col) {
    return this.obstacles.find(o => o.row === row && o.col === col)
  }

  /**
   * 检查指定位置是否有障碍物
   */
  hasObstacle(row, col) {
    return this.obstacles.some(o => o.row === row && o.col === col && o.health > 0)
  }

  /**
   * 检查指定位置是否阻止移动
   */
  blocksMoveAt(row, col) {
    const obstacle = this.getObstacleAt(row, col)
    return obstacle && obstacle.blocksMove()
  }

  /**
   * 检查指定位置是否阻止匹配
   */
  blocksMatchAt(row, col) {
    const obstacle = this.getObstacleAt(row, col)
    return obstacle && obstacle.blocksMatch()
  }

  /**
   * 处理匹配消除对障碍物的影响
   * @param {Array} matches - 匹配的元素
   * @returns {Array} 被破坏的障碍物
   */
  processMatches(matches) {
    const destroyedObstacles = []
    const affectedPositions = new Set()

    // 收集所有受影响的格子（匹配的元素及其周围）
    matches.flat().forEach(piece => {
      affectedPositions.add(`${piece.row},${piece.col}`)
      // 周围8个方向
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          affectedPositions.add(`${piece.row + dr},${piece.col + dc}`)
        }
      }
    })

    // 检查每个受影响的格子上的障碍物
    affectedPositions.forEach(pos => {
      const [row, col] = pos.split(',').map(Number)
      const obstacle = this.getObstacleAt(row, col)
      if (obstacle) {
        // 冰块、笼子、奶油可以被直接消除
        if (obstacle.type === OBSTACLE_TYPES.ICE ||
            obstacle.type === OBSTACLE_TYPES.CAGE ||
            obstacle.type === OBSTACLE_TYPES.CREAM ||
            obstacle.type === OBSTACLE_TYPES.JELLY) {
          if (obstacle.takeDamage()) {
            this.removeObstacle(row, col)
            destroyedObstacles.push(obstacle)
          }
        }
      }
    })

    return destroyedObstacles
  }

  /**
   * 蔓延巧克力（在玩家移动后调用）
   */
  spreadChocolate() {
    this.spreadCount++
    if (this.spreadCount % 3 !== 0) return [] // 每3步蔓延一次

    const newChocolates = []
    const existingChocolates = this.obstacles.filter(o => o.type === OBSTACLE_TYPES.CHOCOLATE && o.health > 0)

    existingChocolates.forEach(chocolate => {
      // 找到相邻的空格子
      const adjacentCells = [
        { row: chocolate.row - 1, col: chocolate.col },
        { row: chocolate.row + 1, col: chocolate.col },
        { row: chocolate.row, col: chocolate.col - 1 },
        { row: chocolate.row, col: chocolate.col + 1 }
      ]

      const emptyCells = adjacentCells.filter(cell => {
        return cell.row >= 0 && cell.row < this.board.rows &&
               cell.col >= 0 && cell.col < this.board.cols &&
               !this.hasObstacle(cell.row, cell.col) &&
               this.board.grid[cell.row] && this.board.grid[cell.row][cell.col]
      })

      if (emptyCells.length > 0) {
        // 随机选择一个空格子蔓延
        const target = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        const newChocolate = this.addObstacle(OBSTACLE_TYPES.CHOCOLATE, target.row, target.col)
        newChocolates.push(newChocolate)
      }
    })

    return newChocolates
  }

  /**
   * 处理特殊糖果对障碍物的破坏
   * @param {string} specialType - 特殊糖果类型
   * @param {number} row - 行
   * @param {number} col - 列
   */
  processSpecialEffect(specialType, row, col) {
    const destroyedObstacles = []

    if (specialType === 'striped_h') {
      // 横向消除整行障碍物
      for (let c = 0; c < this.board.cols; c++) {
        const obstacle = this.getObstacleAt(row, c)
        if (obstacle) {
          if (obstacle.takeDamage()) {
            this.removeObstacle(row, c)
            destroyedObstacles.push(obstacle)
          }
        }
      }
    } else if (specialType === 'striped_v') {
      // 纵向消除整列障碍物
      for (let r = 0; r < this.board.rows; r++) {
        const obstacle = this.getObstacleAt(r, col)
        if (obstacle) {
          if (obstacle.takeDamage()) {
            this.removeObstacle(r, col)
            destroyedObstacles.push(obstacle)
          }
        }
      }
    } else if (specialType === 'color_bomb') {
      // 彩色炸弹消除所有障碍物
      const allObstacles = [...this.obstacles]
      allObstacles.forEach(obstacle => {
        this.removeObstacle(obstacle.row, obstacle.col)
        destroyedObstacles.push(obstacle)
      })
    }

    return destroyedObstacles
  }

  /**
   * 从关卡数据初始化障碍物
   */
  initFromLevelData(levelData) {
    if (!levelData.obstacles) return

    levelData.obstacles.forEach(obs => {
      this.addObstacle(obs.type, obs.row, obs.col)
    })
  }

  /**
   * 获取剩余障碍物数量（用于关卡目标）
   */
  getRemainingCount(type) {
    if (type) {
      return this.obstacles.filter(o => o.type === type && o.health > 0).length
    }
    return this.obstacles.filter(o => o.health > 0).length
  }

  /**
   * 渲染所有障碍物
   */
  render(ctx) {
    this.obstacles.forEach(obstacle => {
      if (obstacle.health > 0) {
        const x = this.board.offsetX + obstacle.col * this.board.cellSize
        const y = this.board.offsetY + obstacle.row * this.board.cellSize
        obstacle.render(ctx, x, y, this.board.cellSize)
      }
    })
  }
}

module.exports = {
  ObstacleManager,
  Obstacle,
  OBSTACLE_TYPES,
  OBSTACLE_CONFIG
}
