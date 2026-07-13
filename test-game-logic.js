/**
 * 游戏逻辑单元测试
 * 验证核心功能是否正常工作
 */

// 模拟 wx 对象
const mockCanvas = {
  getContext: () => ({
    fillRect: () => {},
    fillText: () => {},
    beginPath: () => {},
    closePath: () => {},
    arc: () => {},
    fill: () => {},
    stroke: () => {},
    drawImage: () => {},
    save: () => {},
    restore: () => {},
    createLinearGradient: () => ({ addColorStop: () => {} }),
    measureText: () => ({ width: 0 }),
    roundRect: () => {}
  })
}

global.wx = {
  createCanvas: () => mockCanvas,
  createImage: () => ({ src: '', complete: false }),
  getSystemInfoSync: () => ({ windowWidth: 375, windowHeight: 667 }),
  setStorageSync: () => {},
  getStorageSync: () => null,
  createInnerAudioContext: () => ({
    src: '',
    play: () => {},
    stop: () => {},
    pause: () => {},
    destroy: () => {},
    seek: () => {}
  })
}

// 加载模块
const Board = require('./js/board.js')
const Piece = require('./js/piece.js')
const Matcher = require('./js/matcher.js')
const Level = require('./js/level.js')
const { getChapter1Level, getChapter1Story } = require('./js/data/chapter1.js')
const StoryManager = require('./js/story/storyManager.js')
const AudioManager = require('./js/utils/audio.js')
const StorageManager = require('./js/utils/storage.js')

console.log('🎮 三丽鸥消消乐 - 游戏逻辑测试\n')

let passed = 0
let failed = 0

function test(name, fn) {
  try {
    fn()
    console.log(`✅ ${name}`)
    passed++
  } catch (e) {
    console.log(`❌ ${name}: ${e.message}`)
    failed++
  }
}

// 测试 1: Board 初始化
test('Board 模块可以创建', () => {
  const board = new Board({
    rows: 8,
    cols: 8,
    cellSize: 50,
    offsetX: 20,
    offsetY: 100,
    pieceTypes: [1, 2, 3, 4, 5]
  })
  if (!board || board.rows !== 8) throw new Error('Board 初始化失败')
})

// 测试 2: Piece 创建
test('Piece 模块可以创建', () => {
  const mockBoard = { offsetX: 0, offsetY: 0, cellSize: 50 }
  const piece = new Piece(0, 0, 1, mockBoard)
  if (!piece || piece.type !== 1) throw new Error('Piece 初始化失败')
})

// 测试 3: Matcher 初始化
test('Matcher 模块可以创建', () => {
  const board = new Board({
    rows: 8, cols: 8, cellSize: 50, offsetX: 20, offsetY: 100,
    pieceTypes: [1, 2, 3]
  })
  const matcher = new Matcher(board)
  if (!matcher) throw new Error('Matcher 初始化失败')
})

// 测试 4: Level 初始化
test('Level 模块可以创建', () => {
  const level = new Level({ id: 1 })
  if (!level || level.id !== 1) throw new Error('Level 初始化失败')
})

// 测试 5: 获取第一章关卡数据
test('可以获取第1关数据', () => {
  const level = getChapter1Level(1)
  if (!level || level.id !== 1) throw new Error('无法获取关卡1数据')
  if (!level.objectives || level.objectives.length === 0) {
    throw new Error('关卡1缺少目标')
  }
})

// 测试 6: 获取第10关数据（Boss关）
test('可以获取第10关(Boss)数据', () => {
  const level = getChapter1Level(10)
  if (!level || level.id !== 10) throw new Error('无法获取关卡10数据')
  if (!level.boss) throw new Error('关卡10应该是Boss关')
})

// 测试 7: 获取关卡故事
test('可以获取关卡故事', () => {
  const story = getChapter1Story(1)
  if (!story || !story.pre_dialogue) throw new Error('关卡1缺少故事')
})

// 测试 8: StoryManager 初始化
test('StoryManager 模块可以创建', () => {
  const manager = new StoryManager()
  if (!manager) throw new Error('StoryManager 初始化失败')
})

// 测试 9: AudioManager 初始化
test('AudioManager 模块可以创建', () => {
  const manager = new AudioManager()
  if (!manager) throw new Error('AudioManager 初始化失败')
})

// 测试 10: StorageManager 初始化
test('StorageManager 模块可以创建', () => {
  const manager = new StorageManager()
  if (!manager) throw new Error('StorageManager 初始化失败')
})

// 测试 11: 所有10个关卡都存在
test('第一章10个关卡都存在', () => {
  for (let i = 1; i <= 10; i++) {
    const level = getChapter1Level(i)
    if (!level) throw new Error(`关卡${i}不存在`)
  }
})

// 测试 12: 关卡1目标正确
test('关卡1目标配置正确', () => {
  const level = getChapter1Level(1)
  const obj = level.objectives[0]
  if (obj.type !== 'collect') throw new Error('关卡1目标类型错误')
  if (obj.pieceType !== 1) throw new Error('关卡1目标类型ID错误')
  if (obj.target !== 10) throw new Error('关卡1目标数量错误')
})

console.log(`\n📊 测试结果: ${passed} 通过, ${failed} 失败`)

if (failed === 0) {
  console.log('\n🎉 所有测试通过！游戏核心模块工作正常。')
  process.exit(0)
} else {
  console.log('\n⚠️ 部分测试失败，请检查代码。')
  process.exit(1)
}
