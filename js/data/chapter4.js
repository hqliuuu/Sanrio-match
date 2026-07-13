const CHAPTER_4_LEVELS = [
  {
    id: 31,
    localId: 1,
    title: '布丁广场',
    chapter: 4,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 24,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 2200,
    background: 'assets/images/ui/backgrounds/chapter_4_bg.png',
    bgm: 'chapter4_relax',
    objectives: [
      { type: 'collect', pieceType: 2, name: '布丁柠檬', target: 16, current: 0 }
    ]
  },
  {
    id: 32,
    localId: 2,
    title: '悠闲的下午',
    chapter: 4,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 25,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 2600,
    background: 'assets/images/ui/backgrounds/chapter_4_bg.png',
    bgm: 'chapter4_relax',
    objectives: [
      { type: 'score', name: '分数', target: 2600, current: 0 }
    ]
  },
  {
    id: 33,
    localId: 3,
    title: '午睡危机',
    chapter: 4,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 26,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3000,
    background: 'assets/images/ui/backgrounds/chapter_4_bg.png',
    bgm: 'chapter4_sleepy',
    objectives: [
      { type: 'collect', pieceType: 4, name: '午睡苹果', target: 18, current: 0 }
    ],
    obstacles: [
      { type: 'sleep', row: 3, col: 3 },
      { type: 'sleep', row: 3, col: 4 },
      { type: 'sleep', row: 4, col: 3 },
      { type: 'sleep', row: 4, col: 4 }
    ]
  },
  {
    id: 34,
    localId: 4,
    title: '饼干塔',
    chapter: 4,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 27,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3400,
    background: 'assets/images/ui/backgrounds/chapter_4_bg.png',
    bgm: 'chapter4_cookie',
    objectives: [
      { type: 'collect', pieceType: 1, name: '草莓饼干', target: 20, current: 0 }
    ]
  },
  {
    id: 35,
    localId: 5,
    title: '甜蜜的梦',
    chapter: 4,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 28,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3800,
    background: 'assets/images/ui/backgrounds/chapter_4_bg.png',
    bgm: 'chapter4_dream',
    objectives: [
      { type: 'special', name: '特殊糖果', target: 4, current: 0 }
    ]
  },
  {
    id: 36,
    localId: 6,
    title: '咖啡时间',
    chapter: 4,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 28,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4200,
    background: 'assets/images/ui/backgrounds/chapter_4_bg.png',
    bgm: 'chapter4_coffee',
    objectives: [
      { type: 'collect', pieceType: 3, name: '咖啡豆', target: 22, current: 0 }
    ]
  },
  {
    id: 37,
    localId: 7,
    title: '布丁制作',
    chapter: 4,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 29,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4600,
    background: 'assets/images/ui/backgrounds/chapter_4_bg.png',
    bgm: 'chapter4_pudding',
    objectives: [
      { type: 'collect', pieceType: 5, name: '布丁蓝莓', target: 24, current: 0 }
    ]
  },
  {
    id: 38,
    localId: 8,
    title: '午后的危机',
    chapter: 4,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 30,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 5000,
    background: 'assets/images/ui/backgrounds/chapter_4_bg.png',
    bgm: 'chapter4_tension',
    objectives: [
      { type: 'collect', pieceType: 6, name: '焦糖橘子', target: 24, current: 0 },
      { type: 'collect', pieceType: 2, name: '布丁柠檬', target: 20, current: 0 }
    ]
  },
  {
    id: 39,
    localId: 9,
    title: '最后的悠闲',
    chapter: 4,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 30,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 5400,
    background: 'assets/images/ui/backgrounds/chapter_4_bg.png',
    bgm: 'chapter4_relax',
    objectives: [
      { type: 'score', name: '分数', target: 5400, current: 0 }
    ]
  },
  {
    id: 40,
    localId: 10,
    title: '布丁大作战',
    chapter: 4,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 32,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 6200,
    background: 'assets/images/ui/backgrounds/chapter_4_bg.png',
    bgm: 'chapter4_boss',
    objectives: [
      { type: 'collect', pieceType: 2, name: '布丁柠檬', target: 25, current: 0 },
      { type: 'collect', pieceType: 3, name: '咖啡豆', target: 25, current: 0 },
      { type: 'collect', pieceType: 5, name: '布丁蓝莓', target: 25, current: 0 }
    ],
    boss: true
  }
]

const CHAPTER_4_STORIES = {
  31: {
    level_id: 31,
    chapter_id: 4,
    title: '布丁广场',
    pre_dialogue: [
      { character: 'pompompurin', text: '哈~欠...欢迎来到布丁广场...' },
      { character: 'pompompurin', text: '这里是最适合午睡的地方...' },
      { character: 'cinnamonroll', text: '布丁狗！我们来找你玩了！' },
      { character: 'pompompurin', text: '是大耳狗啊...还有新朋友...' },
      { character: 'hello_kitty', text: '布丁狗，我们要收集布丁柠檬做甜品！' },
      { character: 'pompompurin', text: '好~慢慢来，不着急...' }
    ],
    post_dialogue: [
      { character: 'pompompurin', text: '收集好了吗...Zzz...' },
      { character: 'my_melody', text: '布丁狗睡着了...' },
      { character: 'hello_kitty', text: '呵呵，让他休息吧，我们继续。' }
    ]
  },
  32: {
    level_id: 32,
    chapter_id: 4,
    title: '悠闲的下午',
    pre_dialogue: [
      { character: 'pompompurin', text: '在布丁广场，什么都不用想...' },
      { character: 'pompompurin', text: '只需要收集梦想碎片就好...' },
      { character: 'cinnamonroll', text: '布丁狗的生活方式好悠闲啊。' },
      { character: 'pompompurin', text: '慢慢来，享受每一刻...这就是幸福...' }
    ],
    post_dialogue: [
      { character: 'pompompurin', text: '呼...收集得很顺利呢...' },
      { character: 'hello_kitty', text: '悠闲地进行也不错！' }
    ]
  },
  33: {
    level_id: 33,
    chapter_id: 4,
    title: '午睡危机',
    pre_dialogue: [
      { character: 'pompompurin', text: 'Zzz...Zzz...' },
      { character: 'my_melody', text: '布丁狗睡得好香...' },
      { character: 'cinnamonroll', text: '但是迷雾来了！布丁狗，快醒醒！' },
      { character: 'pompompurin', text: '唔...让我再睡五分钟...' },
      { character: 'hello_kitty', text: '不好了，迷雾把午睡苹果都困住了！' },
      { character: 'pompompurin', text: '什么？！我的午睡苹果！' }
    ],
    post_dialogue: [
      { character: 'pompompurin', text: '呼...救回来了...' },
      { character: 'pompompurin', text: '没有午睡苹果的话，午睡就不完美了...' },
      { character: 'hello_kitty', text: '为了午睡而努力的布丁狗也好可爱~' }
    ]
  },
  34: {
    level_id: 34,
    chapter_id: 4,
    title: '饼干塔',
    pre_dialogue: [
      { character: 'pompompurin', text: '看那座塔！是用饼干做的！' },
      { character: 'my_melody', text: '好香的味道...' },
      { character: 'cinnamonroll', text: '布丁狗，那是你的零食库吗？' },
      { character: 'pompompurin', text: '嘿嘿，是我珍藏的草莓饼干塔！' },
      { character: 'hello_kitty', text: '我们也想尝尝！' }
    ],
    post_dialogue: [
      { character: 'pompompurin', text: '收集到足够的草莓饼干了！' },
      { character: 'pompompurin', text: '作为感谢，请大家吃饼干！' },
      { character: 'all', text: '太好了！' }
    ]
  },
  35: {
    level_id: 35,
    chapter_id: 4,
    title: '甜蜜的梦',
    pre_dialogue: [
      { character: 'pompompurin', text: '午睡时间到了...' },
      { character: 'pompompurin', text: '但是今天想做一个特别的梦...' },
      { character: 'my_melody', text: '什么样的梦？' },
      { character: 'pompompurin', text: '一个充满彩色糖果的梦...需要特殊糖果的力量。' }
    ],
    post_dialogue: [
      { character: 'pompompurin', text: '哇...好美的梦...' },
      { character: 'pompompurin', text: '梦里大家都在一起，好开心...' },
      { character: 'hello_kitty', text: '我们在现实中也会一直在一起的！' }
    ]
  },
  36: {
    level_id: 36,
    chapter_id: 4,
    title: '咖啡时间',
    pre_dialogue: [
      { character: 'pompompurin', text: '呼...有点困了...' },
      { character: 'cinnamonroll', text: '布丁狗一直在睡，还会困吗？' },
      { character: 'pompompurin', text: '困是另一回事...需要咖啡来提神...' },
      { character: 'hello_kitty', text: '那我们收集咖啡豆吧！' }
    ],
    post_dialogue: [
      { character: 'pompompurin', text: '咖啡好香...精神多了...' },
      { character: 'pompompurin', text: '但是...喝完咖啡又想睡了...' },
      { character: 'my_melody', text: '布丁狗真是...' }
    ]
  },
  37: {
    level_id: 37,
    chapter_id: 4,
    title: '布丁制作',
    pre_dialogue: [
      { character: 'pompompurin', text: '我要做最好吃的布丁！' },
      { character: 'pompompurin', text: '需要很多布丁蓝莓...' },
      { character: 'hello_kitty', text: '布丁狗认真的样子好少见！' },
      { character: 'pompompurin', text: '因为...想做给大家吃...' }
    ],
    post_dialogue: [
      { character: 'pompompurin', text: '布丁做好了！' },
      { character: 'pompompurin', text: '请品尝...我的特制布丁...' },
      { character: 'cinnamonroll', text: '好好吃！滑滑嫩嫩的！' },
      { character: 'hello_kitty', text: '布丁狗的手艺真棒！' }
    ]
  },
  38: {
    level_id: 38,
    chapter_id: 4,
    title: '午后的危机',
    pre_dialogue: [
      { character: 'pompompurin', text: '不、不好了！' },
      { character: 'my_melody', text: '怎么了，布丁狗？' },
      { character: 'pompompurin', text: '迷雾变浓了，焦糖橘子要被偷走了！' },
      { character: 'hello_kitty', text: '我们快去帮忙！' },
      { character: 'pompompurin', text: '那是做布丁最重要的材料...！' }
    ],
    post_dialogue: [
      { character: 'pompompurin', text: '太好了...焦糖橘子保住了...' },
      { character: 'pompompurin', text: '谢谢你们...为了表达感谢...' },
      { character: 'pompompurin', text: '我决定了，要做一个超大布丁送给大家！' }
    ]
  },
  39: {
    level_id: 39,
    chapter_id: 4,
    title: '最后的悠闲',
    pre_dialogue: [
      { character: 'pompompurin', text: '在分别之前...' },
      { character: 'pompompurin', text: '让我们再享受一下悠闲的时光吧...' },
      { character: 'cinnamonroll', text: '说得对，休息一下也很重要。' },
      { character: 'hello_kitty', text: '一起收集梦想碎片，留作纪念！' }
    ],
    post_dialogue: [
      { character: 'pompompurin', text: '收集了好多...' },
      { character: 'pompompurin', text: '这些回忆，我会永远珍藏...' },
      { character: 'my_melody', text: '我们也不会忘记的...' }
    ]
  },
  40: {
    level_id: 40,
    chapter_id: 4,
    title: '布丁大作战',
    pre_dialogue: [
      { character: 'pompompurin', text: '超大布丁...需要好多材料...' },
      { character: 'pompompurin', text: '布丁柠檬、咖啡豆、布丁蓝莓...' },
      { character: 'hello_kitty', text: '大家一起帮忙！' },
      { character: 'cinnamonroll', text: '为了美味的布丁！' },
      { character: 'my_melody', text: '加油！' },
      { character: 'pompompurin', text: '谢谢你们...这是我第一次为朋友做这么大的布丁...' }
    ],
    post_dialogue: [
      { character: 'pompompurin', text: '完成了！超大特制布丁！' },
      { character: 'pompompurin', text: '这是我用心做的...送给最好的朋友...' },
      { character: 'hello_kitty', text: '好感动...布丁狗...' },
      { character: 'cinnamonroll', text: '我们一起来吃吧！' },
      { character: 'all', text: '开动啦！' },
      { character: 'narrator', text: '布丁广场充满了欢乐的气氛。' },
      { character: 'narrator', text: '但是，在小镇的另一边...' },
      { character: 'pompompurin', text: '我听说了，库洛米遇到了一些麻烦...' },
      { character: 'hello_kitty', text: '那我们快点去吧！' }
    ]
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function getChapter4Level(levelId) {
  const level = CHAPTER_4_LEVELS.find((item) => item.id === Number(levelId)) || CHAPTER_4_LEVELS[0]
  return clone(level)
}

function getChapter4Story(levelId) {
  const level = getChapter4Level(levelId)
  const story = CHAPTER_4_STORIES[level.id] || {
    level_id: level.id,
    chapter_id: 4,
    title: level.title,
    pre_dialogue: [
      { character: 'pompompurin', text: `第 ${level.localId} 关...慢慢来...Zzz...` }
    ],
    post_dialogue: [
      { character: 'pompompurin', text: '完成了...可以休息了吗...' }
    ],
    objective: { description: level.objectives.map((obj) => `${obj.name} ${obj.target}`).join('，') }
  }

  return clone(story)
}

module.exports = {
  CHAPTER_4_LEVELS,
  CHAPTER_4_STORIES,
  getChapter4Level,
  getChapter4Story
}
