const { getChapter1Level } = require('./data/chapter1.js')
const { getChapter2Level } = require('./data/chapter2.js')
const { getChapter3Level } = require('./data/chapter3.js')
const { getChapter4Level } = require('./data/chapter4.js')
const { getChapter5Level } = require('./data/chapter5.js')
const { getChapter6Level } = require('./data/chapter6.js')
const { POWERUP_TYPES } = require('./powerups.js')

class Level {
  constructor(levelData = {}) {
    const levelId = levelData.id || levelData.level || 1
    const chapterId = levelData.chapter || 1

    // 根据章节获取对应的数据
    let source
    switch (Number(chapterId)) {
      case 2:
        source = getChapter2Level(levelId)
        break
      case 3:
        source = getChapter3Level(levelId)
        break
      case 4:
        source = getChapter4Level(levelId)
        break
      case 5:
        source = getChapter5Level(levelId)
        break
      case 6:
        source = getChapter6Level(levelId)
        break
      default:
        source = getChapter1Level(levelId)
    }

    Object.assign(this, source, levelData)
    this.boardRows = this.boardRows || (this.boardSize && this.boardSize.rows) || 8
    this.boardCols = this.boardCols || (this.boardSize && this.boardSize.cols) || 8
    this.maxMoves = this.maxMoves || this.moves || 20
    this.availablePieces = this.availablePieces || [1, 2, 3, 4, 5, 6]
    this.targetScore = this.targetScore || 1000
    this.objectives = (this.objectives || []).map((objective) => ({
      ...objective,
      current: objective.current || 0
    }))

    // 道具配置 - 根据关卡进度解锁更多道具
    this.availablePowerUps = this.generatePowerUpsForLevel(levelId, chapterId)
  }

  /**
   * 根据关卡生成可用道具
   */
  generatePowerUpsForLevel(levelId, chapterId) {
    const basePowerUps = [POWERUP_TYPES.PLUS_FIVE]

    // 第1关后解锁：锤子
    if (levelId >= 2) basePowerUps.push(POWERUP_TYPES.HAMMER)

    // 第3关后解锁：刷新
    if (levelId >= 3) basePowerUps.push(POWERUP_TYPES.REFRESH)

    // 第5关后解锁：冰冻
    if (levelId >= 5) basePowerUps.push(POWERUP_TYPES.FREEZE)

    // 第7关后解锁：炸弹
    if (levelId >= 7) basePowerUps.push(POWERUP_TYPES.BOMB)

    // 第10关(Boss关)解锁：彩虹
    if (levelId >= 10) basePowerUps.push(POWERUP_TYPES.RAINBOW)

    // 第2章解锁所有道具
    if (Number(chapterId) >= 2) {
      return [
        POWERUP_TYPES.PLUS_FIVE,
        POWERUP_TYPES.HAMMER,
        POWERUP_TYPES.REFRESH,
        POWERUP_TYPES.FREEZE,
        POWERUP_TYPES.BOMB,
        POWERUP_TYPES.RAINBOW
      ]
    }

    return basePowerUps
  }

  recordRemovedPieces(pieces, score, specialCreated = 0) {
    this.objectives.forEach((objective) => {
      if (objective.type === 'score') {
        objective.current = Math.max(objective.current, score)
        return
      }

      if (objective.type === 'collect') {
        const count = pieces.filter((piece) => piece.type === objective.pieceType).length
        objective.current = Math.min(objective.target, objective.current + count)
        return
      }

      if (objective.type === 'special') {
        const count = specialCreated + pieces.filter((piece) => piece.special).length
        objective.current = Math.min(objective.target, objective.current + count)
      }
    })
  }
}

module.exports = Level
