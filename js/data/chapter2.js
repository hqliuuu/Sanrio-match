const CHAPTER_2_LEVELS = [
  {
    id: 11,
    localId: 1,
    title: '新的旅程',
    chapter: 2,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 22,
    availablePieces: [1, 2, 3, 4, 5],
    targetScore: 1800,
    background: 'assets/images/ui/backgrounds/chapter_2_bg.png',
    bgm: 'chapter2_musicbox',
    objectives: [
      { type: 'collect', pieceType: 2, name: '音符柠檬', target: 12, current: 0 }
    ]
  },
  {
    id: 12,
    localId: 2,
    title: '大耳狗的眼睛',
    chapter: 2,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 23,
    availablePieces: [1, 2, 3, 4, 5],
    targetScore: 2200,
    background: 'assets/images/ui/backgrounds/chapter_2_bg.png',
    bgm: 'chapter2_musicbox',
    objectives: [
      { type: 'collect', pieceType: 5, name: '蓝色音符', target: 14, current: 0 }
    ]
  },
  {
    id: 13,
    localId: 3,
    title: '被封印的力量',
    chapter: 2,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 24,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 2600,
    background: 'assets/images/ui/backgrounds/chapter_2_bg.png',
    bgm: 'chapter2_musicbox',
    objectives: [
      { type: 'special', name: '特殊糖果', target: 2, current: 0 }
    ],
    obstacles: [
      { type: 'cage', row: 3, col: 3 },
      { type: 'cage', row: 3, col: 4 },
      { type: 'cage', row: 4, col: 3 },
      { type: 'cage', row: 4, col: 4 }
    ]
  },
  {
    id: 14,
    localId: 4,
    title: '森林的指引',
    chapter: 2,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 25,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3000,
    background: 'assets/images/ui/backgrounds/chapter_2_bg.png',
    bgm: 'chapter2_explore',
    objectives: [
      { type: 'collect', pieceType: 3, name: '紫色旋律', target: 16, current: 0 }
    ]
  },
  {
    id: 15,
    localId: 5,
    title: 'Kitty的智慧',
    chapter: 2,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 25,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3400,
    background: 'assets/images/ui/backgrounds/chapter_2_bg.png',
    bgm: 'chapter2_warm',
    objectives: [
      { type: 'score', name: '分数', target: 3400, current: 0 }
    ]
  },
  {
    id: 16,
    localId: 6,
    title: '失落的节拍',
    chapter: 2,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 26,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3800,
    background: 'assets/images/ui/backgrounds/chapter_2_bg.png',
    bgm: 'chapter2_explore',
    objectives: [
      { type: 'collect', pieceType: 1, name: '红色节拍', target: 14, current: 0 },
      { type: 'collect', pieceType: 6, name: '橙色节拍', target: 14, current: 0 }
    ]
  },
  {
    id: 17,
    localId: 7,
    title: '大家的声音',
    chapter: 2,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 27,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4200,
    background: 'assets/images/ui/backgrounds/chapter_2_bg.png',
    bgm: 'chapter2_explore',
    objectives: [
      { type: 'special', name: '特殊糖果', target: 3, current: 0 }
    ]
  },
  {
    id: 18,
    localId: 8,
    title: '最后的音符在哪里',
    chapter: 2,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 28,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4700,
    background: 'assets/images/ui/backgrounds/chapter_2_bg.png',
    bgm: 'chapter2_musicbox',
    objectives: [
      { type: 'collect', pieceType: 2, name: '音符柠檬', target: 18 },
      { type: 'collect', pieceType: 5, name: '蓝色音符', target: 18 }
    ]
  },
  {
    id: 19,
    localId: 9,
    title: '共同的练习',
    chapter: 2,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 29,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 5200,
    background: 'assets/images/ui/backgrounds/chapter_2_bg.png',
    bgm: 'chapter2_warm',
    objectives: [
      { type: 'score', name: '分数', target: 5200, current: 0 }
    ]
  },
  {
    id: 20,
    localId: 10,
    title: '梦想交响曲',
    chapter: 2,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 32,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 6000,
    background: 'assets/images/ui/backgrounds/chapter_2_bg.png',
    bgm: 'chapter2_boss',
    objectives: [
      { type: 'collect', pieceType: 2, name: '音符柠檬', target: 20, current: 0 },
      { type: 'collect', pieceType: 3, name: '紫色旋律', target: 18, current: 0 },
      { type: 'special', name: '特殊糖果', target: 3, current: 0 }
    ],
    boss: true
  }
]

const CHAPTER_2_STORIES = {
  11: {
    level_id: 11,
    chapter_id: 2,
    title: '新的旅程',
    pre_dialogue: [
      { character: 'hello_kitty', text: '派对结束了...但是我们的旅程才刚开始！' },
      { character: 'my_melody', text: '谢谢你们愿意帮我...' },
      { character: 'cinnamonroll', text: '美乐蒂的音乐盒对她很重要！' },
      { character: 'my_melody', text: '嗯...那是奶奶送给我的，里面装着美好的回忆。' },
      { character: 'hello_kitty', text: '我们一定会帮你修好的！' },
      { character: 'my_melody', text: '首先...需要找到失落的音符。它们散落在音乐盒花园里。' }
    ],
    post_dialogue: [
      { character: 'my_melody', text: '第一个音符...找到了！' },
      { character: 'my_melody', text: '听...音乐盒发出了一点点声音...' },
      { character: 'cinnamonroll', text: '太好了！继续找其他的！' },
      { character: 'hello_kitty', text: '只要有守护者在，一定能全部找回来的！' }
    ]
  },
  12: {
    level_id: 12,
    chapter_id: 2,
    title: '大耳狗的眼睛',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '守护者！我发现了！' },
      { character: 'cinnamonroll', text: '在云朵上面，有蓝色的光芒！' },
      { character: 'my_melody', text: '那是蓝色音符！但是在好高的地方...' },
      { character: 'cinnamonroll', text: '交给我吧！我的云朵可以飞上去！' },
      { character: 'hello_kitty', text: '大耳狗，小心点哦！' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '拿到了！云朵配送成功！' },
      { character: 'my_melody', text: '谢谢你，大耳狗...多亏有你在。' },
      { character: 'cinnamonroll', text: '嘿嘿，能帮到大家我很开心！' },
      { character: 'hello_kitty', text: '每个人都很重要呢。' }
    ]
  },
  13: {
    level_id: 13,
    chapter_id: 2,
    title: '被封印的力量',
    pre_dialogue: [
      { character: 'my_melody', text: '下一个音符...在花园的中心。' },
      { character: 'hello_kitty', text: '但是...被笼子锁住了！' },
      { character: 'my_melody', text: '这是迷雾设置的障碍...' },
      { character: 'my_melody', text: '需要用特殊的消除魔法才能打破。' },
      { character: 'cinnamonroll', text: '守护者，用你的特殊糖果！' }
    ],
    post_dialogue: [
      { character: 'my_melody', text: '笼子打开了！' },
      { character: 'hello_kitty', text: '守护者的特殊糖果好厉害！' },
      { character: 'my_melody', text: '感觉音乐盒的力量在慢慢恢复...' },
      { character: 'cinnamonroll', text: '我们继续前进吧！' }
    ]
  },
  14: {
    level_id: 14,
    chapter_id: 2,
    title: '森林的指引',
    pre_dialogue: [
      { character: 'my_melody', text: '下一个音符...我不知道在哪里。' },
      { character: 'hello_kitty', text: '迷雾太浓了，看不清路...' },
      { character: 'cinnamonroll', text: '等等...你们听！' },
      { character: 'my_melody', text: '是森林的声音...它们在指引我们！' },
      { character: 'hello_kitty', text: '跟着声音走，一定能找到的！' }
    ],
    post_dialogue: [
      { character: 'my_melody', text: '找到了...森林一直在守护这些音符。' },
      { character: 'cinnamonroll', text: '森林也在帮助我们呢！' },
      { character: 'hello_kitty', text: '只要心怀希望，就不会迷失方向。' },
      { character: 'my_melody', text: '谢谢大家...我不会放弃的。' }
    ]
  },
  15: {
    level_id: 15,
    chapter_id: 2,
    title: 'Kitty的智慧',
    pre_dialogue: [
      { character: 'hello_kitty', text: '美乐蒂，我在想...' },
      { character: 'hello_kitty', text: '音乐盒需要的不是普通的音符，而是"心意"。' },
      { character: 'my_melody', text: '心意？' },
      { character: 'hello_kitty', text: '就像派对那样，大家一起努力创造的美好回忆！' },
      { character: 'cinnamonroll', text: '那我们要怎么做？' },
      { character: 'hello_kitty', text: '用我们的梦想碎片，创造属于我们的旋律！' }
    ],
    post_dialogue: [
      { character: 'my_melody', text: '好温暖的光芒...这就是大家的心意吗？' },
      { character: 'hello_kitty', text: '我们是一个团队，一个人的力量是有限的，但大家在一起就无限大！' },
      { character: 'cinnamonroll', text: '我能感觉到...音乐盒在回应我们！' },
      { character: 'my_melody', text: 'Kitty...谢谢你，让我明白了重要的东西。' }
    ]
  },
  16: {
    level_id: 16,
    chapter_id: 2,
    title: '失落的节拍',
    pre_dialogue: [
      { character: 'my_melody', text: '还差...最重要的节拍。' },
      { character: 'my_melody', text: '没有它们，音乐就没有节奏。' },
      { character: 'hello_kitty', text: '不会没有的，我们一起找！' },
      { character: 'cinnamonroll', text: '我在云朵上看到远处有红色的光！' },
      { character: 'cinnamonroll', text: '还有橙色的！在不同的地方！' },
      { character: 'my_melody', text: '那就是节拍音符...拜托了，守护者！' }
    ],
    post_dialogue: [
      { character: 'my_melody', text: '找到了...红色和橙色的节拍...' },
      { character: 'my_melody', text: '音乐盒开始发出完整的旋律了！' },
      { character: 'hello_kitty', text: '太好了！就快成功了！' },
      { character: 'cinnamonroll', text: '我快要感动得哭了...' },
      { character: 'my_melody', text: '还不能哭哦，大耳狗，还有最后一步。' }
    ]
  },
  17: {
    level_id: 17,
    chapter_id: 2,
    title: '大家的声音',
    pre_dialogue: [
      { character: 'my_melody', text: '最后一个问题...' },
      { character: 'my_melody', text: '音乐盒需要一个"核心旋律"。' },
      { character: 'hello_kitty', text: '那是什么？' },
      { character: 'my_melody', text: '是属于我们四个人的，独特的声音。' },
      { character: 'cinnamonroll', text: '那我们一起来创造吧！' },
      { character: 'hello_kitty', text: '守护者，请用你的特殊糖果，编织我们的旋律！' }
    ],
    post_dialogue: [
      { character: 'my_melody', text: '听...这是我们的旋律...' },
      { character: 'my_melody', text: 'Kitty的活泼、大耳狗的温柔、守护者的坚定...' },
      { character: 'hello_kitty', text: '还有美乐蒂的善良！' },
      { character: 'cinnamonroll', text: '我们四个人...不，我们所有人在一起！' },
      { character: 'my_melody', text: '这就是...我们的梦想交响曲。' }
    ]
  },
  18: {
    level_id: 18,
    chapter_id: 2,
    title: '最后的音符在哪里',
    pre_dialogue: [
      { character: 'my_melody', text: '还差最后几个音符...' },
      { character: 'my_melody', text: '但是迷雾变得好浓，我看不清了...' },
      { character: 'hello_kitty', text: '美乐蒂，冷静下来。' },
      { character: 'hello_kitty', text: '你还记得奶奶是怎么说的吗？' },
      { character: 'my_melody', text: '奶奶说..."音乐在心里，不在盒子里"...' },
      { character: 'cinnamonroll', text: '那我们就用心去找！' }
    ],
    post_dialogue: [
      { character: 'my_melody', text: '找到了...原来它们一直在这里。' },
      { character: 'my_melody', text: '在我的心里，在大家的心里...' },
      { character: 'hello_kitty', text: '我们从来没有分开过。' },
      { character: 'cinnamonroll', text: '最后的音符...是我们之间的羁绊！' },
      { character: 'my_melody', text: '谢谢你们...我的朋友们。' }
    ]
  },
  19: {
    level_id: 19,
    chapter_id: 2,
    title: '共同的练习',
    pre_dialogue: [
      { character: 'my_melody', text: '所有的音符都找到了...' },
      { character: 'my_melody', text: '但是要让音乐盒完全恢复，还需要最后一次调试。' },
      { character: 'hello_kitty', text: '就像我们派对前的准备一样！' },
      { character: 'cinnamonroll', text: '这次让我来帮忙！我要确保每个音符都在正确的位置！' },
      { character: 'hello_kitty', text: '我们一起做最后的练习吧！' }
    ],
    post_dialogue: [
      { character: 'my_melody', text: '完美了...所有的音符都在正确的位置。' },
      { character: 'cinnamonroll', text: '我检查了三遍，绝对没问题！' },
      { character: 'hello_kitty', text: '那么...是时候让音乐盒重新唱起来了。' },
      { character: 'my_melody', text: '守护者...请见证这一刻。' }
    ]
  },
  20: {
    level_id: 20,
    chapter_id: 2,
    title: '梦想交响曲',
    pre_dialogue: [
      { character: 'my_melody', text: '最后的时刻到了。' },
      { character: 'hello_kitty', text: '我们准备好了！' },
      { character: 'cinnamonroll', text: '我也准备好了！' },
      { character: 'my_melody', text: '守护者，请用你的魔法，唤醒音乐盒的灵魂。' },
      { character: 'my_melody', text: '让我们一起...演奏梦想交响曲！' },
      { character: 'all', text: '一、二、三——开始！' }
    ],
    post_dialogue: [
      { character: 'narrator', text: '美妙的旋律在梦幻小镇上空回荡...' },
      { character: 'my_melody', text: '听...这是奶奶教我的歌...' },
      { character: 'my_melody', text: '也是属于我们大家的歌...' },
      { character: 'hello_kitty', text: '美乐蒂...你哭了？' },
      { character: 'my_melody', text: '这是幸福的眼泪...' },
      { character: 'my_melody', text: '谢谢你们，我的朋友们。' },
      { character: 'my_melody', text: '谢谢守护者，让我明白了羁绊的意义。' },
      { character: 'cinnamonroll', text: '我们是一辈子的好朋友！' },
      { character: 'hello_kitty', text: '不管遇到什么困难，我们都会一起面对！' },
      { character: 'my_melody', text: '嗯！迷雾也好，困难也好，都不可怕。' },
      { character: 'my_melody', text: '因为有大家在一起。' },
      { character: 'narrator', text: '就这样，梦幻小镇的第一个危机解除了。' },
      { character: 'narrator', text: '但是，更大的冒险还在等待着他们...' },
      { character: 'narrator', text: '守护者，你的旅程才刚刚开始。' }
    ]
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function getChapter2Level(levelId) {
  const level = CHAPTER_2_LEVELS.find((item) => item.id === Number(levelId)) || CHAPTER_2_LEVELS[0]
  return clone(level)
}

function getChapter2Story(levelId) {
  const level = getChapter2Level(levelId)
  const story = CHAPTER_2_STORIES[level.id] || {
    level_id: level.id,
    chapter_id: 2,
    title: level.title,
    pre_dialogue: [
      { character: 'my_melody', text: `第 ${level.localId} 步，${level.title}，我们继续吧。` }
    ],
    post_dialogue: [
      { character: 'my_melody', text: '又向前迈进一步，音乐盒越来越近了。' }
    ],
    objective: { description: level.objectives.map((obj) => `${obj.name} ${obj.target}`).join('，') }
  }

  return clone(story)
}

module.exports = {
  CHAPTER_2_LEVELS,
  CHAPTER_2_STORIES,
  getChapter2Level,
  getChapter2Story
}
