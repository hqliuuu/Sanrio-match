const CHAPTER_5_LEVELS = [
  {
    id: 41,
    localId: 1,
    title: '暗黑森林',
    chapter: 5,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 25,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 2400,
    background: 'assets/images/ui/backgrounds/chapter_5_bg.png',
    bgm: 'chapter5_mystery',
    objectives: [
      { type: 'collect', pieceType: 3, name: '暗影葡萄', target: 18, current: 0 }
    ]
  },
  {
    id: 42,
    localId: 2,
    title: '恶作剧的开始',
    chapter: 5,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 26,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 2800,
    background: 'assets/images/ui/backgrounds/chapter_5_bg.png',
    bgm: 'chapter5_mystery',
    objectives: [
      { type: 'score', name: '分数', target: 2800, current: 0 }
    ]
  },
  {
    id: 43,
    localId: 3,
    title: '库洛米的试炼',
    chapter: 5,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 27,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3200,
    background: 'assets/images/ui/backgrounds/chapter_5_bg.png',
    bgm: 'chapter5_challenge',
    objectives: [
      { type: 'collect', pieceType: 5, name: '魔法蓝莓', target: 20, current: 0 }
    ],
    obstacles: [
      { type: 'magic', row: 2, col: 2 },
      { type: 'magic', row: 2, col: 5 },
      { type: 'magic', row: 5, col: 2 },
      { type: 'magic', row: 5, col: 5 }
    ]
  },
  {
    id: 44,
    localId: 4,
    title: '暗黑魔法',
    chapter: 5,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 28,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3600,
    background: 'assets/images/ui/backgrounds/chapter_5_bg.png',
    bgm: 'chapter5_magic',
    objectives: [
      { type: 'special', name: '特殊糖果', target: 5, current: 0 }
    ]
  },
  {
    id: 45,
    localId: 5,
    title: '意外的朋友',
    chapter: 5,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 28,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4000,
    background: 'assets/images/ui/backgrounds/chapter_5_bg.png',
    bgm: 'chapter5_friendship',
    objectives: [
      { type: 'collect', pieceType: 1, name: '暗黑草莓', target: 22, current: 0 }
    ]
  },
  {
    id: 46,
    localId: 6,
    title: '库洛米的秘密',
    chapter: 5,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 29,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4400,
    background: 'assets/images/ui/backgrounds/chapter_5_bg.png',
    bgm: 'chapter5_secret',
    objectives: [
      { type: 'collect', pieceType: 6, name: '暗夜橘子', target: 24, current: 0 }
    ]
  },
  {
    id: 47,
    localId: 7,
    title: '魔法对决',
    chapter: 5,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 30,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4800,
    background: 'assets/images/ui/backgrounds/chapter_5_bg.png',
    bgm: 'chapter5_battle',
    objectives: [
      { type: 'collect', pieceType: 2, name: '魔法柠檬', target: 24, current: 0 },
      { type: 'collect', pieceType: 4, name: '暗影苹果', target: 24, current: 0 }
    ]
  },
  {
    id: 48,
    localId: 8,
    title: '真正的恶作剧',
    chapter: 5,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 30,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 5200,
    background: 'assets/images/ui/backgrounds/chapter_5_bg.png',
    bgm: 'chapter5_truth',
    objectives: [
      { type: 'score', name: '分数', target: 5200, current: 0 }
    ]
  },
  {
    id: 49,
    localId: 9,
    title: '和解之路',
    chapter: 5,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 31,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 5600,
    background: 'assets/images/ui/backgrounds/chapter_5_bg.png',
    bgm: 'chapter5_reconciliation',
    objectives: [
      { type: 'collect', pieceType: 3, name: '和解葡萄', target: 26, current: 0 }
    ]
  },
  {
    id: 50,
    localId: 10,
    title: '库洛米加入',
    chapter: 5,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 33,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 6500,
    background: 'assets/images/ui/backgrounds/chapter_5_bg.png',
    bgm: 'chapter5_boss',
    objectives: [
      { type: 'collect', pieceType: 1, name: '暗黑草莓', target: 28, current: 0 },
      { type: 'collect', pieceType: 5, name: '魔法蓝莓', target: 28, current: 0 },
      { type: 'special', name: '特殊糖果', target: 5, current: 0 }
    ],
    boss: true
  }
]

const CHAPTER_5_STORIES = {
  41: {
    level_id: 41,
    chapter_id: 5,
    title: '暗黑森林',
    pre_dialogue: [
      { character: 'kuromi', text: '欢迎来到暗黑森林，这里是我的领地！' },
      { character: 'kuromi', text: '想过去的话，先过我的试炼吧！' },
      { character: 'hello_kitty', text: '库洛米，我们不是来打架的！' },
      { character: 'kuromi', text: '少废话！想要暗影葡萄？那就证明你们的实力！' }
    ],
    post_dialogue: [
      { character: 'kuromi', text: '哼，还算有点本事。' },
      { character: 'kuromi', text: '但接下来可没这么简单了！' }
    ]
  },
  42: {
    level_id: 42,
    chapter_id: 5,
    title: '恶作剧的开始',
    pre_dialogue: [
      { character: 'kuromi', text: '让我想想...下一个恶作剧是什么呢？' },
      { character: 'kuromi', text: '把云朵变成黑色的？还是让布丁永远变硬？' },
      { character: 'pompompurin', text: '不、不要！软软才好吃！' },
      { character: 'kuromi', text: '哈哈哈！那就看你们能不能阻止我了！' }
    ],
    post_dialogue: [
      { character: 'kuromi', text: '切，被你们抢先了一步。' },
      { character: 'kuromi', text: '不过这只是开始！' }
    ]
  },
  43: {
    level_id: 43,
    chapter_id: 5,
    title: '库洛米的试炼',
    pre_dialogue: [
      { character: 'kuromi', text: '真正的试炼现在才开始！' },
      { character: 'kuromi', text: '看你们能不能破解我的魔法阵！' },
      { character: 'my_melody', text: '库洛米，为什么要这样做...' },
      { character: 'kuromi', text: '因为...因为这样很好玩啊！' }
    ],
    post_dialogue: [
      { character: 'kuromi', text: '可恶，居然破解了...' },
      { character: 'kuromi', text: '你们到底是什么人？' }
    ]
  },
  44: {
    level_id: 44,
    chapter_id: 5,
    title: '暗黑魔法',
    pre_dialogue: [
      { character: 'kuromi', text: '尝尝我的暗黑魔法！' },
      { character: 'kuromi', text: '把普通的糖果变成特殊的，吓你们一跳！' },
      { character: 'cinnamonroll', text: '但是特殊的糖果对我们有帮助啊...' },
      { character: 'kuromi', text: '诶？啊！这不是我想要的结果！' }
    ],
    post_dialogue: [
      { character: 'kuromi', text: '怎么会这样...' },
      { character: 'kuromi', text: '我的魔法反而帮了你们...' },
      { character: 'hello_kitty', text: '谢谢你，库洛米！' },
      { character: 'kuromi', text: '谁、谁要你们感谢啊！' }
    ]
  },
  45: {
    level_id: 45,
    chapter_id: 5,
    title: '意外的朋友',
    pre_dialogue: [
      { character: 'kuromi', text: '等等...你们为什么要帮我收集草莓？' },
      { character: 'hello_kitty', text: '因为你看起来很想要啊。' },
      { character: 'kuromi', text: '但、但是我在捉弄你们...' },
      { character: 'my_melody', text: '朋友之间不需要计较那么多。' },
      { character: 'kuromi', text: '朋...朋友？' }
    ],
    post_dialogue: [
      { character: 'kuromi', text: '哼...别以为这样我就会感激你们。' },
      { character: 'kuromi', text: '但...谢谢...' },
      { character: 'hello_kitty', text: '库洛米害羞了，好可爱！' },
      { character: 'kuromi', text: '才、才没有！' }
    ]
  },
  46: {
    level_id: 46,
    chapter_id: 5,
    title: '库洛米的秘密',
    pre_dialogue: [
      { character: 'kuromi', text: '其实...我有事情想告诉你们。' },
      { character: 'kuromi', text: '迷雾不是我自己弄出来的...' },
      { character: 'cinnamonroll', text: '那是谁？' },
      { character: 'kuromi', text: '我也不清楚，但它让我感到很不安...' },
      { character: 'my_melody', text: '库洛米...原来你一直在独自承受...' }
    ],
    post_dialogue: [
      { character: 'kuromi', text: '帮大忙了...' },
      { character: 'kuromi', text: '原来你们...是可以信任的...' }
    ]
  },
  47: {
    level_id: 47,
    chapter_id: 5,
    title: '魔法对决',
    pre_dialogue: [
      { character: 'kuromi', text: '守护者，和我来一场魔法对决吧！' },
      { character: 'kuromi', text: '让我看看你的真正实力！' },
      { character: 'hello_kitty', text: '库洛米认真起来了！' },
      { character: 'kuromi', text: '这是我最强的试炼，不要让我失望！' }
    ],
    post_dialogue: [
      { character: 'kuromi', text: '太精彩了！' },
      { character: 'kuromi', text: '你确实配得上"守护者"这个名字。' },
      { character: 'kuromi', text: '我认可你了！' }
    ]
  },
  48: {
    level_id: 48,
    chapter_id: 5,
    title: '真正的恶作剧',
    pre_dialogue: [
      { character: 'kuromi', text: '其实...我有一件事要坦白。' },
      { character: 'kuromi', text: '我一直在恶作剧，是因为...' },
      { character: 'kuromi', text: '太寂寞了...想要有人关注我...' },
      { character: 'hello_kitty', text: '库洛米...' },
      { character: 'my_melody', text: '以后不会再让你寂寞了。' }
    ],
    post_dialogue: [
      { character: 'kuromi', text: '你们...真的是笨蛋...' },
      { character: 'kuromi', text: '但是...谢谢...' },
      { character: 'kuromi', text: '这是我收到的最好的礼物。' }
    ]
  },
  49: {
    level_id: 49,
    chapter_id: 5,
    title: '和解之路',
    pre_dialogue: [
      { character: 'kuromi', text: '我决定不再恶作剧了。' },
      { character: 'kuromi', text: '但是...我需要大家的原谅。' },
      { character: 'pompompurin', text: '库洛米愿意改变，我们很开心的！' },
      { character: 'kuromi', text: '那...我们一起收集和解的葡萄吧。' }
    ],
    post_dialogue: [
      { character: 'kuromi', text: '谢谢大家...愿意原谅我...' },
      { character: 'kuromi', text: '从今天起，我要做一个更好的库洛米！' }
    ]
  },
  50: {
    level_id: 50,
    chapter_id: 5,
    title: '库洛米加入',
    pre_dialogue: [
      { character: 'kuromi', text: '最后的试炼！' },
      { character: 'kuromi', text: '让我看看你们所有人的力量！' },
      { character: 'hello_kitty', text: '库洛米，我们一起！' },
      { character: 'my_melody', text: '大家在一起的话，什么都不怕！' },
      { character: 'cinnamonroll', text: '加油！' },
      { character: 'pompompurin', text: '我、我也会努力的！' },
      { character: 'kuromi', text: '哈哈哈！这才是我认可的团队！' }
    ],
    post_dialogue: [
      { character: 'kuromi', text: '太棒了！这就是团队的力量！' },
      { character: 'kuromi', text: '守护者，我正式请求加入你们的队伍！' },
      { character: 'hello_kitty', text: '当然欢迎！' },
      { character: 'kuromi', text: '咳咳...那我就勉为其难地加入吧。' },
      { character: 'kuromi', text: '但是！我要当副队长！' },
      { character: 'all', text: '哈哈哈！' },
      { character: 'narrator', text: '库洛米正式成为了团队的一员。' },
      { character: 'narrator', text: '但是，还有最后一个谜团等待着他们...' },
      { character: 'kuromi', text: '对了，听说双子星遇到了麻烦...' },
      { character: 'hello_kitty', text: '那我们快去吧！' }
    ]
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function getChapter5Level(levelId) {
  const level = CHAPTER_5_LEVELS.find((item) => item.id === Number(levelId)) || CHAPTER_5_LEVELS[0]
  return clone(level)
}

function getChapter5Story(levelId) {
  const level = getChapter5Level(levelId)
  const story = CHAPTER_5_STORIES[level.id] || {
    level_id: level.id,
    chapter_id: 5,
    title: level.title,
    pre_dialogue: [
      { character: 'kuromi', text: `第 ${level.localId} 关，可别拖我后腿！` }
    ],
    post_dialogue: [
      { character: 'kuromi', text: '哼，做得还不错嘛。' }
    ],
    objective: { description: level.objectives.map((obj) => `${obj.name} ${obj.target}`).join('，') }
  }

  return clone(story)
}

module.exports = {
  CHAPTER_5_LEVELS,
  CHAPTER_5_STORIES,
  getChapter5Level,
  getChapter5Story
}
