const CHAPTER_6_LEVELS = [
  {
    id: 51,
    localId: 1,
    title: '星空之门',
    chapter: 6,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 26,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 2600,
    background: 'assets/images/ui/backgrounds/chapter_6_bg.png',
    bgm: 'chapter6_stars',
    objectives: [
      { type: 'collect', pieceType: 1, name: '星星草莓', target: 20, current: 0 }
    ]
  },
  {
    id: 52,
    localId: 2,
    title: '双子星的考验',
    chapter: 6,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 27,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3000,
    background: 'assets/images/ui/backgrounds/chapter_6_bg.png',
    bgm: 'chapter6_twin',
    objectives: [
      { type: 'collect', pieceType: 2, name: '星光柠檬', target: 22, current: 0 }
    ]
  },
  {
    id: 53,
    localId: 3,
    title: 'Kiki和Lala',
    chapter: 6,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 28,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3400,
    background: 'assets/images/ui/backgrounds/chapter_6_bg.png',
    bgm: 'chapter6_kiki',
    objectives: [
      { type: 'collect', pieceType: 4, name: '月亮苹果', target: 22, current: 0 }
    ],
    obstacles: [
      { type: 'star', row: 3, col: 3 },
      { type: 'star', row: 3, col: 4 },
      { type: 'star', row: 4, col: 3 },
      { type: 'star', row: 4, col: 4 }
    ]
  },
  {
    id: 54,
    localId: 4,
    title: '星光之路',
    chapter: 6,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 29,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3800,
    background: 'assets/images/ui/backgrounds/chapter_6_bg.png',
    bgm: 'chapter6_path',
    objectives: [
      { type: 'score', name: '分数', target: 3800, current: 0 }
    ]
  },
  {
    id: 55,
    localId: 5,
    title: '分离的危机',
    chapter: 6,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 29,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4200,
    background: 'assets/images/ui/backgrounds/chapter_6_bg.png',
    bgm: 'chapter6_crisis',
    objectives: [
      { type: 'collect', pieceType: 5, name: '星光蓝莓', target: 24, current: 0 }
    ]
  },
  {
    id: 56,
    localId: 6,
    title: '重逢的力量',
    chapter: 6,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 30,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4600,
    background: 'assets/images/ui/backgrounds/chapter_6_bg.png',
    bgm: 'chapter6_reunion',
    objectives: [
      { type: 'special', name: '特殊糖果', target: 5, current: 0 }
    ]
  },
  {
    id: 57,
    localId: 7,
    title: '银河之心',
    chapter: 6,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 31,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 5000,
    background: 'assets/images/ui/backgrounds/chapter_6_bg.png',
    bgm: 'chapter6_galaxy',
    objectives: [
      { type: 'collect', pieceType: 3, name: '银河葡萄', target: 26, current: 0 }
    ]
  },
  {
    id: 58,
    localId: 8,
    title: '星之记忆',
    chapter: 6,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 31,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 5400,
    background: 'assets/images/ui/backgrounds/chapter_6_bg.png',
    bgm: 'chapter6_memory',
    objectives: [
      { type: 'collect', pieceType: 6, name: '星光橘子', target: 26, current: 0 },
      { type: 'collect', pieceType: 1, name: '星星草莓', target: 24, current: 0 }
    ]
  },
  {
    id: 59,
    localId: 9,
    title: '最后的星光',
    chapter: 6,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 32,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 5800,
    background: 'assets/images/ui/backgrounds/chapter_6_bg.png',
    bgm: 'chapter6_final',
    objectives: [
      { type: 'score', name: '分数', target: 5800, current: 0 }
    ]
  },
  {
    id: 60,
    localId: 10,
    title: '梦想之星',
    chapter: 6,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 35,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 7000,
    background: 'assets/images/ui/backgrounds/chapter_6_bg.png',
    bgm: 'chapter6_boss',
    objectives: [
      { type: 'collect', pieceType: 1, name: '星星草莓', target: 30, current: 0 },
      { type: 'collect', pieceType: 2, name: '星光柠檬', target: 30, current: 0 },
      { type: 'collect', pieceType: 4, name: '月亮苹果', target: 30, current: 0 }
    ],
    boss: true
  }
]

const CHAPTER_6_STORIES = {
  51: {
    level_id: 51,
    chapter_id: 6,
    title: '星空之门',
    pre_dialogue: [
      { character: 'little_twin_stars', text: '欢迎来到星空...这里是双子星的家园...' },
      { character: 'hello_kitty', text: '双子星！我们来帮你们了！' },
      { character: 'little_twin_stars', text: '谢谢你们...但是星空被迷雾笼罩，星光正在消失...' },
      { character: 'kuromi', text: '哼，本大人倒要看看是什么在作怪！' },
      { character: 'cinnamonroll', text: '我们一起想办法！' }
    ],
    post_dialogue: [
      { character: 'little_twin_stars', text: '星光...稍微亮了一点...' },
      { character: 'little_twin_stars', text: '谢谢你们...继续加油...' }
    ]
  },
  52: {
    level_id: 52,
    chapter_id: 6,
    title: '双子星的考验',
    pre_dialogue: [
      { character: 'little_twin_stars', text: '要通过星空之门，需要通过我们的考验...' },
      { character: 'my_melody', text: '我们准备好了！' },
      { character: 'little_twin_stars', text: '收集星光柠檬...证明你们的决心...' }
    ],
    post_dialogue: [
      { character: 'little_twin_stars', text: '做得很好...你们确实有守护者的资质...' },
      { character: 'hello_kitty', text: '我们会努力的！' }
    ]
  },
  53: {
    level_id: 53,
    chapter_id: 6,
    title: 'Kiki和Lala',
    pre_dialogue: [
      { character: 'little_twin_stars', text: '我们是Kiki和Lala...双胞胎姐弟...' },
      { character: 'little_twin_stars', text: '但是迷雾让我们失去了联系...' },
      { character: 'pompompurin', text: '好可怜...一定要帮你们重逢！' },
      { character: 'little_twin_stars', text: '谢谢你们...收集月亮苹果...可以照亮道路...' }
    ],
    post_dialogue: [
      { character: 'little_twin_stars', text: '感觉到了...对方的气息...' },
      { character: 'little_twin_stars', text: '还差一点...就能相见了...' }
    ]
  },
  54: {
    level_id: 54,
    chapter_id: 6,
    title: '星光之路',
    pre_dialogue: [
      { character: 'little_twin_stars', text: '星光之路...是用梦想碎片铺成的...' },
      { character: 'kuromi', text: '那就收集一堆梦想碎片！' },
      { character: 'little_twin_stars', text: '大家一起...一定能成功...' }
    ],
    post_dialogue: [
      { character: 'little_twin_stars', text: '星光之路...越来越亮了...' },
      { character: 'little_twin_stars', text: '大家的心意...我们感受到了...' }
    ]
  },
  55: {
    level_id: 55,
    chapter_id: 6,
    title: '分离的危机',
    pre_dialogue: [
      { character: 'little_twin_stars', text: '不好了...迷雾正在把我们拉得更远...' },
      { character: 'little_twin_stars', text: 'Kiki...Lala...' },
      { character: 'hello_kitty', text: '我们马上收集星光蓝莓！坚持住！' },
      { character: 'my_melody', text: '不要放弃！' }
    ],
    post_dialogue: [
      { character: 'little_twin_stars', text: '得救了...暂时稳定下来了...' },
      { character: 'little_twin_stars', text: '谢谢你们...没有放弃我们...' }
    ]
  },
  56: {
    level_id: 56,
    chapter_id: 6,
    title: '重逢的力量',
    pre_dialogue: [
      { character: 'little_twin_stars', text: '我们想到了...重逢的方法...' },
      { character: 'little_twin_stars', text: '需要特殊糖果的力量...打破迷雾的屏障...' },
      { character: 'cinnamonroll', text: '特殊糖果？守护者最擅长了！' }
    ],
    post_dialogue: [
      { character: 'little_twin_stars', text: '力量...在增强...' },
      { character: 'little_twin_stars', text: '感觉对方越来越近了...' }
    ]
  },
  57: {
    level_id: 57,
    chapter_id: 6,
    title: '银河之心',
    pre_dialogue: [
      { character: 'little_twin_stars', text: '银河之心...是星空的核心...' },
      { character: 'little_twin_stars', text: '只要点亮它，整个星空都会恢复...' },
      { character: 'kuromi', text: '那就快点收集银河葡萄！' },
      { character: 'hello_kitty', text: '大家齐心协力！' }
    ],
    post_dialogue: [
      { character: 'little_twin_stars', text: '银河之心...开始发光了...' },
      { character: 'little_twin_stars', text: '好美...星光在跳舞...' }
    ]
  },
  58: {
    level_id: 58,
    chapter_id: 6,
    title: '星之记忆',
    pre_dialogue: [
      { character: 'little_twin_stars', text: '我们想起了...小时候的事...' },
      { character: 'little_twin_stars', text: '第一次见面...第一次牵手...' },
      { character: 'my_melody', text: '好温馨...' },
      { character: 'little_twin_stars', text: '收集星光橘子和星星草莓...让记忆更清晰...' }
    ],
    post_dialogue: [
      { character: 'little_twin_stars', text: '记忆...全部恢复了...' },
      { character: 'little_twin_stars', text: '我们在一起的点点滴滴...' }
    ]
  },
  59: {
    level_id: 59,
    chapter_id: 6,
    title: '最后的星光',
    pre_dialogue: [
      { character: 'little_twin_stars', text: '最后的时刻到了...' },
      { character: 'little_twin_stars', text: '收集足够的梦想碎片...我们就能看到彼此...' },
      { character: 'all', text: '一定要成功！' }
    ],
    post_dialogue: [
      { character: 'little_twin_stars', text: '看见了...终于看见了...' },
      { character: 'little_twin_stars', text: 'Kiki！Lala！' },
      { character: 'little_twin_stars', text: '我们...重逢了...' }
    ]
  },
  60: {
    level_id: 60,
    chapter_id: 6,
    title: '梦想之星',
    pre_dialogue: [
      { character: 'little_twin_stars', text: '最后的挑战...' },
      { character: 'little_twin_stars', text: '需要收集三种星光果实...创造梦想之星...' },
      { character: 'hello_kitty', text: '大家一起！' },
      { character: 'my_melody', text: '为了双子星！' },
      { character: 'cinnamonroll', text: '加油！' },
      { character: 'pompompurin', text: '我、我也会尽力的！' },
      { character: 'kuromi', text: '哼，让你们见识一下我的力量！' },
      { character: 'little_twin_stars', text: '谢谢你们...我们永远的...朋友...' }
    ],
    post_dialogue: [
      { character: 'narrator', text: '梦想之星诞生了！' },
      { character: 'narrator', text: '璀璨的星光驱散了所有的迷雾...' },
      { character: 'little_twin_stars', text: 'Kiki和Lala...永远在一起...' },
      { character: 'little_twin_stars', text: '谢谢你们...守护者们...' },
      { character: 'hello_kitty', text: '太好了！双子星终于重逢了！' },
      { character: 'all', text: '太好了！！！' },
      { character: 'narrator', text: '就这样，梦幻小镇的危机全部解除了。' },
      { character: 'narrator', text: '六位守护者守护着小镇的和平。' },
      { character: 'narrator', text: '而守护者的传说，将继续传承下去...' },
      { character: 'hello_kitty', text: '守护者，谢谢你！' },
      { character: 'my_melody', text: '永远的朋友！' },
      { character: 'cinnamonroll', text: '随时来云端玩哦！' },
      { character: 'pompompurin', text: 'Zzz...下次一起吃布丁...' },
      { character: 'kuromi', text: '哼，虽然有点不情愿，但是...谢谢。' },
      { character: 'little_twin_stars', text: '星光会永远守护着你...' },
      { character: 'all', text: '永远的梦想守护者！' }
    ]
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function getChapter6Level(levelId) {
  const level = CHAPTER_6_LEVELS.find((item) => item.id === Number(levelId)) || CHAPTER_6_LEVELS[0]
  return clone(level)
}

function getChapter6Story(levelId) {
  const level = getChapter6Level(levelId)
  const story = CHAPTER_6_STORIES[level.id] || {
    level_id: level.id,
    chapter_id: 6,
    title: level.title,
    pre_dialogue: [
      { character: 'little_twin_stars', text: `第 ${level.localId} 关...星光指引我们...` }
    ],
    post_dialogue: [
      { character: 'little_twin_stars', text: '星光...更加明亮了...' }
    ],
    objective: { description: level.objectives.map((obj) => `${obj.name} ${obj.target}`).join('，') }
  }

  return clone(story)
}

module.exports = {
  CHAPTER_6_LEVELS,
  CHAPTER_6_STORIES,
  getChapter6Level,
  getChapter6Story
}
