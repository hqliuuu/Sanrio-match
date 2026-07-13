const CHAPTER_3_LEVELS = [
  {
    id: 21,
    localId: 1,
    title: '云端之城',
    chapter: 3,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 23,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 2000,
    background: 'assets/images/ui/backgrounds/chapter_3_bg.png',
    bgm: 'chapter3_sky',
    objectives: [
      { type: 'collect', pieceType: 1, name: '云朵草莓', target: 15, current: 0 }
    ]
  },
  {
    id: 22,
    localId: 2,
    title: '飘浮的困惑',
    chapter: 3,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 24,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 2400,
    background: 'assets/images/ui/backgrounds/chapter_3_bg.png',
    bgm: 'chapter3_sky',
    objectives: [
      { type: 'collect', pieceType: 5, name: '天空蓝莓', target: 16, current: 0 }
    ],
    obstacles: [
      { type: 'cloud', row: 2, col: 2 },
      { type: 'cloud', row: 2, col: 5 },
      { type: 'cloud', row: 5, col: 2 },
      { type: 'cloud', row: 5, col: 5 }
    ]
  },
  {
    id: 23,
    localId: 3,
    title: '风之试炼',
    chapter: 3,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 25,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 2800,
    background: 'assets/images/ui/backgrounds/chapter_3_bg.png',
    bgm: 'chapter3_wind',
    objectives: [
      { type: 'score', name: '分数', target: 2800, current: 0 }
    ]
  },
  {
    id: 24,
    localId: 4,
    title: '彩虹桥',
    chapter: 3,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 26,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3200,
    background: 'assets/images/ui/backgrounds/chapter_3_bg.png',
    bgm: 'chapter3_rainbow',
    objectives: [
      { type: 'collect', pieceType: 2, name: '彩虹柠檬', target: 18, current: 0 },
      { type: 'collect', pieceType: 3, name: '云朵葡萄', target: 18, current: 0 }
    ]
  },
  {
    id: 25,
    localId: 5,
    title: '大耳狗的勇气',
    chapter: 3,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 27,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3600,
    background: 'assets/images/ui/backgrounds/chapter_3_bg.png',
    bgm: 'chapter3_courage',
    objectives: [
      { type: 'special', name: '特殊糖果', target: 3, current: 0 }
    ]
  },
  {
    id: 26,
    localId: 6,
    title: ' Thunder Cloud',
    chapter: 3,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 28,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4000,
    background: 'assets/images/ui/backgrounds/chapter_3_bg.png',
    bgm: 'chapter3_storm',
    objectives: [
      { type: 'collect', pieceType: 6, name: '雷云橘子', target: 20, current: 0 }
    ],
    obstacles: [
      { type: 'storm', row: 3, col: 3 },
      { type: 'storm', row: 3, col: 4 },
      { type: 'storm', row: 4, col: 3 },
      { type: 'storm', row: 4, col: 4 }
    ]
  },
  {
    id: 27,
    localId: 7,
    title: ' Sunlight',
    chapter: 3,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 28,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4400,
    background: 'assets/images/ui/backgrounds/chapter_3_bg.png',
    bgm: 'chapter3_sunny',
    objectives: [
      { type: 'collect', pieceType: 4, name: '阳光苹果', target: 22, current: 0 }
    ]
  },
  {
    id: 28,
    localId: 8,
    title: ' Cloud Castle',
    chapter: 3,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 29,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4800,
    background: 'assets/images/ui/backgrounds/chapter_3_bg.png',
    bgm: 'chapter3_castle',
    objectives: [
      { type: 'collect', pieceType: 1, name: '云朵草莓', target: 20, current: 0 },
      { type: 'collect', pieceType: 5, name: '天空蓝莓', target: 20, current: 0 }
    ]
  },
  {
    id: 29,
    localId: 9,
    title: ' Flying Practice',
    chapter: 3,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 30,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 5200,
    background: 'assets/images/ui/backgrounds/chapter_3_bg.png',
    bgm: 'chapter3_practice',
    objectives: [
      { type: 'score', name: '分数', target: 5200, current: 0 }
    ]
  },
  {
    id: 30,
    localId: 10,
    title: ' Cloud Guardian',
    chapter: 3,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 32,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 6000,
    background: 'assets/images/ui/backgrounds/chapter_3_bg.png',
    bgm: 'chapter3_boss',
    objectives: [
      { type: 'collect', pieceType: 1, name: '云朵草莓', target: 25, current: 0 },
      { type: 'collect', pieceType: 2, name: '彩虹柠檬', target: 20, current: 0 },
      { type: 'special', name: '特殊糖果', target: 4, current: 0 }
    ],
    boss: true
  }
]

const CHAPTER_3_STORIES = {
  21: {
    level_id: 21,
    chapter_id: 3,
    title: '云端之城',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '欢迎来到我的家——云端之城！' },
      { character: 'cinnamonroll', text: '但是...最近云朵变得很奇怪，不再听我的话了。' },
      { character: 'hello_kitty', text: '大耳狗，别担心，我们会帮你的！' },
      { character: 'my_melody', text: '音乐盒修复后，我的力量也恢复了一些，可以帮上忙。' },
      { character: 'cinnamonroll', text: '谢谢大家...我们先收集一些云朵草莓吧。' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '太好了！云朵草莓让天空变得更明亮了。' },
      { character: 'hello_kitty', text: '大耳狗，你看起来开心多了。' },
      { character: 'cinnamonroll', text: '有大家在，我感觉勇敢多了...' }
    ]
  },
  22: {
    level_id: 22,
    chapter_id: 3,
    title: '飘浮的困惑',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '有些云朵被迷雾困住了，变成了"浮云"。' },
      { character: 'cinnamonroll', text: '它们飘来飘去，不再稳定...' },
      { character: 'my_melody', text: '就像迷路的小羊一样。' },
      { character: 'hello_kitty', text: '那我们帮它们找回方向吧！' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '浮云们安静下来了呢。' },
      { character: 'cinnamonroll', text: '谢谢你们，我的云朵朋友们也很开心。' }
    ]
  },
  23: {
    level_id: 23,
    chapter_id: 3,
    title: '风之试炼',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '云端之城有风之试炼，只有通过才能继续前进。' },
      { character: 'hello_kitty', text: '试炼？听起来很刺激！' },
      { character: 'cinnamonroll', text: '需要收集足够的梦想碎片来证明我们的决心。' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '通过了！风之精灵认可了我们。' },
      { character: 'my_melody', text: '风的声音变得好温柔...' }
    ]
  },
  24: {
    level_id: 24,
    chapter_id: 3,
    title: '彩虹桥',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '看！那边有彩虹桥！' },
      { character: 'hello_kitty', text: '好漂亮！但是颜色有点淡...' },
      { character: 'cinnamonroll', text: '需要用彩虹柠檬和云朵葡萄来重新点亮它。' },
      { character: 'my_melody', text: '我们一起让彩虹恢复光彩吧！' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '彩虹桥亮起来了！' },
      { character: 'hello_kitty', text: '七种颜色都好鲜艳！' },
      { character: 'cinnamonroll', text: '这是通往云端深处的路...' }
    ]
  },
  25: {
    level_id: 25,
    chapter_id: 3,
    title: '大耳狗的勇气',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '我...我有点害怕。' },
      { character: 'cinnamonroll', text: '前面的路很危险，我从来不敢一个人去。' },
      { character: 'hello_kitty', text: '大耳狗，你不是一个人啊！' },
      { character: 'my_melody', text: '对啊，我们都在你身边。' },
      { character: 'cinnamonroll', text: '真的吗...那、那我试试看！' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '我做到了！' },
      { character: 'cinnamonroll', text: '有大家陪着我，我觉得什么困难都能克服。' },
      { character: 'hello_kitty', text: '大耳狗好棒！' }
    ]
  },
  26: {
    level_id: 26,
    chapter_id: 3,
    title: '雷云危机',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '不好！是雷云区！' },
      { character: 'my_melody', text: '天空变得好暗...' },
      { character: 'cinnamonroll', text: '雷云被迷雾影响，变得暴躁了。' },
      { character: 'hello_kitty', text: '我们得想办法让它们冷静下来。' },
      { character: 'cinnamonroll', text: '用雷云橘子！那是它们最喜欢的食物。' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '雷云平静下来了...' },
      { character: 'my_melody', text: '刚才好可怕，但是大耳狗很勇敢呢。' },
      { character: 'cinnamonroll', text: '我想...我可以成为真正的云端守护者。' }
    ]
  },
  27: {
    level_id: 27,
    chapter_id: 3,
    title: '阳光普照',
    pre_dialogue: [
      { character: 'hello_kitty', text: '雨过天晴了！' },
      { character: 'my_melody', text: '阳光好温暖...' },
      { character: 'cinnamonroll', text: '阳光苹果在发光！这是云端最珍贵的果实。' },
      { character: 'hello_kitty', text: '收集起来，带给需要阳光的人吧！' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '阳光苹果收集够了！' },
      { character: 'cinnamonroll', text: '有了这些，迷雾就不敢靠近云端了。' }
    ]
  },
  28: {
    level_id: 28,
    chapter_id: 3,
    title: '云端城堡',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '那是云端城堡，我的家！' },
      { character: 'hello_kitty', text: '哇，好大的云朵城堡！' },
      { character: 'cinnamonroll', text: '但是城堡的基石松动了，需要云朵草莓和天空蓝莓来加固。' },
      { character: 'my_melody', text: '我们来帮忙修复！' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '城堡恢复了！' },
      { character: 'cinnamonroll', text: '谢谢你们...我的家又安全了。' }
    ]
  },
  29: {
    level_id: 29,
    chapter_id: 3,
    title: '飞翔练习',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '守护者，让我教你飞翔的技巧吧！' },
      { character: 'hello_kitty', text: '我们也能飞吗？' },
      { character: 'cinnamonroll', text: '在云端，只要有梦想碎片，谁都能飞！' },
      { character: 'my_melody', text: '好期待在空中漂浮的感觉...' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '大家飞得都很好！' },
      { character: 'hello_kitty', text: '云端的世界好美...' },
      { character: 'cinnamonroll', text: '这是只有勇敢者才能看到的风景。' }
    ]
  },
  30: {
    level_id: 30,
    chapter_id: 3,
    title: '云端守护者',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '最后的挑战了。' },
      { character: 'cinnamonroll', text: '我要证明自己配得上"云端守护者"的称号。' },
      { character: 'hello_kitty', text: '大耳狗，你一定可以的！' },
      { character: 'my_melody', text: '我们会一直支持你。' },
      { character: 'cinnamonroll', text: '那么...为了云端之城，为了所有朋友！' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '我做到了！' },
      { character: 'cinnamonroll', text: '谢谢你，守护者。谢谢你，我的朋友们。' },
      { character: 'cinnamonroll', text: '我终于成为了真正的云端守护者。' },
      { character: 'hello_kitty', text: '我们为你骄傲！' },
      { character: 'my_melody', text: '大耳狗变得好可靠...' },
      { character: 'narrator', text: '云端之城恢复了往日的平静。' },
      { character: 'narrator', text: '但是，在远方，还有新的挑战等待着他们...' },
      { character: 'cinnamonroll', text: '布丁狗好像遇到了麻烦，我们去帮他吧！' }
    ]
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function getChapter3Level(levelId) {
  const level = CHAPTER_3_LEVELS.find((item) => item.id === Number(levelId)) || CHAPTER_3_LEVELS[0]
  return clone(level)
}

function getChapter3Story(levelId) {
  const level = getChapter3Level(levelId)
  const story = CHAPTER_3_STORIES[level.id] || {
    level_id: level.id,
    chapter_id: 3,
    title: level.title,
    pre_dialogue: [
      { character: 'cinnamonroll', text: `第 ${level.localId} 关，云端冒险继续！` }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '又完成了一关，向着云端深处前进！' }
    ],
    objective: { description: level.objectives.map((obj) => `${obj.name} ${obj.target}`).join('，') }
  }

  return clone(story)
}

module.exports = {
  CHAPTER_3_LEVELS,
  CHAPTER_3_STORIES,
  getChapter3Level,
  getChapter3Story
}
