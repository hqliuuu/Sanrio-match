const CHAPTER_1_LEVELS = [
  {
    id: 1,
    title: '初次试炼',
    chapter: 1,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 20,
    availablePieces: [1, 2, 3, 4, 5],
    targetScore: 1000,
    objectives: [
      { type: 'collect', pieceType: 1, name: '草莓', target: 10, current: 0 }
    ],
    bgm: 'chapter1_warm'
  },
  {
    id: 2,
    title: '新朋友大耳狗',
    chapter: 1,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 22,
    availablePieces: [1, 2, 3, 4, 5],
    targetScore: 1500,
    objectives: [
      { type: 'collect', pieceType: 3, name: '巧克力', target: 12, current: 0 }
    ],
    bgm: 'chapter1_warm'
  },
  {
    id: 3,
    title: '意外的相遇',
    chapter: 1,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 22,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 1800,
    objectives: [
      { type: 'collect', pieceType: 2, name: '奶油柠檬', target: 14, current: 0 }
    ],
    bgm: 'chapter1_warm'
  },
  {
    id: 4,
    title: '小危机！',
    chapter: 1,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 24,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 2200,
    objectives: [
      { type: 'collect', pieceType: 4, name: '青苹果', target: 12, current: 0 },
      { type: 'collect', pieceType: 6, name: '橘子', target: 12, current: 0 }
    ],
    obstacles: [
      { type: 'ice', row: 3, col: 3 },
      { type: 'ice', row: 3, col: 4 },
      { type: 'ice', row: 4, col: 3 },
      { type: 'ice', row: 4, col: 4 }
    ],
    bgm: 'chapter1_normal'
  },
  {
    id: 5,
    title: '团队合作',
    chapter: 1,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 24,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 2600,
    objectives: [
      { type: 'score', name: '分数', target: 2600, current: 0 }
    ],
    bgm: 'chapter1_normal'
  },
  {
    id: 6,
    title: '烤箱危机',
    chapter: 1,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 25,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3000,
    objectives: [
      { type: 'collect', pieceType: 5, name: '蓝莓', target: 18, current: 0 }
    ],
    obstacles: [
      { type: 'rock', row: 2, col: 2 },
      { type: 'rock', row: 2, col: 5 },
      { type: 'rock', row: 5, col: 2 },
      { type: 'rock', row: 5, col: 5 }
    ],
    bgm: 'chapter1_normal'
  },
  {
    id: 7,
    title: '装饰魔法',
    chapter: 1,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 26,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3400,
    objectives: [
      { type: 'special', name: '特殊糖果', target: 2, current: 0 }
    ],
    bgm: 'chapter1_normal'
  },
  {
    id: 8,
    title: '最后一搏',
    chapter: 1,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 27,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 3800,
    objectives: [
      { type: 'collect', pieceType: 1, name: '草莓', target: 16, current: 0 },
      { type: 'collect', pieceType: 3, name: '巧克力', target: 16, current: 0 }
    ],
    bgm: 'chapter1_normal'
  },
  {
    id: 9,
    title: '派对前夕',
    chapter: 1,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 28,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 4300,
    objectives: [
      { type: 'score', name: '分数', target: 4300, current: 0 }
    ],
    bgm: 'chapter1_warm'
  },
  {
    id: 10,
    title: '甜品派对大成功！',
    chapter: 1,
    boardRows: 8,
    boardCols: 8,
    maxMoves: 30,
    availablePieces: [1, 2, 3, 4, 5, 6],
    targetScore: 5000,
    objectives: [
      { type: 'collect', pieceType: 1, name: '草莓', target: 20, current: 0 },
      { type: 'collect', pieceType: 3, name: '巧克力', target: 15, current: 0 },
      { type: 'collect', pieceType: 2, name: '奶油', target: 10, current: 0 }
    ],
    boss: true,
    bgm: 'chapter1_boss'
  }
]

const CHAPTER_1_STORIES = {
  1: {
    level_id: 1,
    chapter_id: 1,
    title: '初次试炼',
    pre_dialogue: [
      { character: 'hello_kitty', text: '守护者！你愿意先帮我准备派对吗？' },
      { character: 'hello_kitty', text: '派对需要很多草莓，但是迷雾让草莓园变得混乱了。' },
      { character: 'hello_kitty', text: '用你的消除魔法，收集10个草莓吧！' }
    ],
    post_dialogue: [
      { character: 'hello_kitty', text: '哇！你真的做到了！' },
      { character: 'hello_kitty', text: '消除魔法太神奇了，失落的梦想碎片在发光呢！' },
      { character: 'hello_kitty', text: '不过...还有其他材料需要收集。' },
      { character: 'cinnamonroll', text: 'Kitty！听说有新的守护者来了？' },
      { character: 'cinnamonroll', text: '我也想帮忙！我的云朵可以飞到很多地方！' }
    ],
    objective: { description: '收集10个草莓，证明守护者的能力' }
  },
  2: {
    level_id: 2,
    chapter_id: 1,
    title: '新朋友大耳狗',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '你好呀，守护者！我是大耳狗！' },
      { character: 'cinnamonroll', text: '别看我这样，我可是云朵配送专家哦！' },
      { character: 'hello_kitty', text: '大耳狗，你能帮忙找巧克力吗？' },
      { character: 'cinnamonroll', text: '当然！让我飞到巧克力工厂看看！' }
    ],
    post_dialogue: [
      { character: 'cinnamonroll', text: '找到了！但是迷雾让巧克力都散乱了...' },
      { character: 'hello_kitty', text: '没关系，守护者帮我们收集好了！' },
      { character: 'cinnamonroll', text: '太棒了！有守护者在，感觉什么困难都能解决！' },
      { character: 'my_melody', text: '我听说有守护者来了...是真的吗？' }
    ],
    objective: { description: '帮助大耳狗收集12份巧克力' }
  },
  3: {
    level_id: 3,
    chapter_id: 1,
    title: '意外的相遇',
    pre_dialogue: [
      { character: 'my_melody', text: '你好...我是美乐蒂。' },
      { character: 'my_melody', text: '我的音乐盒被迷雾笼罩，发不出声音了...' },
      { character: 'hello_kitty', text: '美乐蒂！别担心，守护者会帮我们的！' },
      { character: 'my_melody', text: '真的吗？那...请帮我收集奶油柠檬好吗？' },
      { character: 'my_melody', text: '我想做柠檬蛋糕，让Kitty的派对更完美。' }
    ],
    post_dialogue: [
      { character: 'my_melody', text: '谢谢你...你真的是个温柔的守护者。' },
      { character: 'hello_kitty', text: '美乐蒂做的柠檬蛋糕最好吃了！' },
      { character: 'cinnamonroll', text: '我也要吃！等派对开始，我要吃三块！' },
      { character: 'my_melody', text: '呵呵，大耳狗真是的...' },
      { character: 'my_melody', text: '（小声）有守护者和大家在，感觉音乐盒也快恢复了呢。' }
    ],
    objective: { description: '帮助美乐蒂收集14个奶油柠檬' }
  },
  4: {
    level_id: 4,
    chapter_id: 1,
    title: '小危机！',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '不好了！守护者！' },
      { character: 'cinnamonroll', text: '我从农场回来时，发现水果都被冻住了！' },
      { character: 'hello_kitty', text: '这是迷雾造成的影响...' },
      { character: 'my_melody', text: '我们必须救出那些水果！' },
      { character: 'hello_kitty', text: '守护者，用消除魔法打破冰块吧！' }
    ],
    post_dialogue: [
      { character: 'hello_kitty', text: '太好了！水果都救出来了！' },
      { character: 'cinnamonroll', text: '呼...吓死我了，还以为拿不到水果了。' },
      { character: 'my_melody', text: '守护者好厉害...迷雾造成的冰块都能打破。' },
      { character: 'hello_kitty', text: '只要我们在一起，什么困难都能克服！' }
    ],
    objective: { description: '打破冰块，收集12个青苹果和12个橘子' }
  },
  5: {
    level_id: 5,
    chapter_id: 1,
    title: '团队合作',
    pre_dialogue: [
      { character: 'cinnamonroll', text: '食材收集得差不多了！' },
      { character: 'hello_kitty', text: '但是要把它们做成好吃的甜品，还需要更多梦想碎片。' },
      { character: 'my_melody', text: '我们一起努力吧！' },
      { character: 'hello_kitty', text: '守护者，这次让我们看看你的真正实力！' }
    ],
    post_dialogue: [
      { character: 'hello_kitty', text: '太厉害了！这么多梦想碎片！' },
      { character: 'cinnamonroll', text: '守护者认真起来好帅气！' },
      { character: 'my_melody', text: '感觉我们越来越有默契了呢...' },
      { character: 'hello_kitty', text: '接下来就可以开始制作甜品了！' },
      { character: 'hello_kitty', text: '烤箱...应该没问题吧？' }
    ],
    objective: { description: '收集2600分梦想碎片' }
  },
  6: {
    level_id: 6,
    chapter_id: 1,
    title: '烤箱危机',
    pre_dialogue: [
      { character: 'hello_kitty', text: '糟、糟了！' },
      { character: 'my_melody', text: '怎么了，Kitty？' },
      { character: 'hello_kitty', text: '烤箱被岩石堵住了！迷雾把石头都聚集过来了！' },
      { character: 'cinnamonroll', text: '没有烤箱就做不了蛋糕了！' },
      { character: 'hello_kitty', text: '守护者，拜托了！我们需要蓝莓来做马芬蛋糕，还要清除岩石！' }
    ],
    post_dialogue: [
      { character: 'hello_kitty', text: '岩石被清除了！蓝莓也收集够了！' },
      { character: 'my_melody', text: '好险啊...差点就没有甜品了。' },
      { character: 'cinnamonroll', text: '守护者真的好可靠...' },
      { character: 'hello_kitty', text: '嗯！有守护者在，我就不担心了！' },
      { character: 'my_melody', text: '（微笑）Kitty很信任守护者呢。' }
    ],
    objective: { description: '清除岩石障碍，收集18个蓝莓' }
  },
  7: {
    level_id: 7,
    chapter_id: 1,
    title: '装饰魔法',
    pre_dialogue: [
      { character: 'my_melody', text: '甜品做得差不多了...' },
      { character: 'my_melody', text: '但是派对场地还需要装饰。' },
      { character: 'hello_kitty', text: '守护者，据说特殊的消除可以创造出装饰品！' },
      { character: 'cinnamonroll', text: '就是那种闪闪发光的特殊糖果！' },
      { character: 'my_melody', text: '能请你制作2个特殊糖果吗？' }
    ],
    post_dialogue: [
      { character: 'my_melody', text: '好漂亮...特殊糖果发出的光芒...' },
      { character: 'hello_kitty', text: '派对场地变得亮晶晶的！' },
      { character: 'cinnamonroll', text: '我也想学这个魔法！' },
      { character: 'my_melody', text: '守护者，谢谢你。没有你的话，派对不会这么完美。' }
    ],
    objective: { description: '制作2个特殊糖果来装饰场地' }
  },
  8: {
    level_id: 8,
    chapter_id: 1,
    title: '最后一搏',
    pre_dialogue: [
      { character: 'hello_kitty', text: '就差最后一点了！' },
      { character: 'cinnamonroll', text: '但是剩下的材料...' },
      { character: 'my_melody', text: '迷雾变得更浓了，材料都被吹散了。' },
      { character: 'hello_kitty', text: '守护者，这是最后的挑战！' },
      { character: 'hello_kitty', text: '只要我们齐心协力，一定能成功！' }
    ],
    post_dialogue: [
      { character: 'hello_kitty', text: '做到了！材料都集齐了！' },
      { character: 'cinnamonroll', text: '守护者，你太厉害了！' },
      { character: 'my_melody', text: '终于...派对可以开始了。' },
      { character: 'hello_kitty', text: '谢谢大家...谢谢守护者。' },
      { character: 'hello_kitty', text: '这是我最开心的时刻。' }
    ],
    objective: { description: '收集16个草莓和16个巧克力，完成最后的准备' }
  },
  9: {
    level_id: 9,
    chapter_id: 1,
    title: '派对前夕',
    pre_dialogue: [
      { character: 'my_melody', text: '所有的甜品都做好了。' },
      { character: 'cinnamonroll', text: '场地也布置得很漂亮！' },
      { character: 'hello_kitty', text: '但是...在派对开始前...' },
      { character: 'hello_kitty', text: '我想收集更多梦想碎片，让这场派对成为大家最美好的回忆。' },
      { character: 'my_melody', text: 'Kitty...' },
      { character: 'cinnamonroll', text: '我们一起帮忙吧！' }
    ],
    post_dialogue: [
      { character: 'hello_kitty', text: '哇...这么多梦想碎片在发光...' },
      { character: 'my_melody', text: '这是大家的心意呢。' },
      { character: 'cinnamonroll', text: '守护者，辛苦了！' },
      { character: 'hello_kitty', text: '那么...派对正式开始！' }
    ],
    objective: { description: '收集4300分梦想碎片，为派对增添光彩' }
  },
  10: {
    level_id: 10,
    chapter_id: 1,
    title: '甜品派对大成功！',
    pre_dialogue: [
      { character: 'hello_kitty', text: '终于...最重要的时刻到了！' },
      { character: 'my_melody', text: '派对蛋糕...还差最后一步。' },
      { character: 'cinnamonroll', text: '所有的食材都准备好了！' },
      { character: 'hello_kitty', text: '守护者，请用你的魔法，让派对蛋糕诞生吧！' },
      { character: 'all', text: '一起加油！' }
    ],
    post_dialogue: [
      { character: 'hello_kitty', text: '完成了！史上最漂亮的派对蛋糕！' },
      { character: 'my_melody', text: '好美...像是梦想的结晶...' },
      { character: 'cinnamonroll', text: '我都快流口水了...' },
      { character: 'hello_kitty', text: '守护者，谢谢你。' },
      { character: 'hello_kitty', text: '因为有你在，我们才能一起完成这场派对。' },
      { character: 'my_melody', text: '我们不再是独自面对迷雾...' },
      { character: 'cinnamonroll', text: '我们是团队！最好的团队！' },
      { character: 'hello_kitty', text: '但是...我的派对完成了，美乐蒂的音乐盒还没修好。' },
      { character: 'my_melody', text: '没关系的，Kitty的派对对我来说也很重要。' },
      { character: 'hello_kitty', text: '那接下来...' },
      { character: 'all', text: '一起帮美乐蒂修复音乐盒吧！' }
    ],
    objective: { description: '收集所有材料，完成派对蛋糕' }
  }
}

function getChapter1Level(levelId) {
  const level = CHAPTER_1_LEVELS.find((item) => item.id === Number(levelId)) || CHAPTER_1_LEVELS[0]
  return JSON.parse(JSON.stringify(level))
}

function getChapter1Story(levelId) {
  const level = getChapter1Level(levelId)
  const story = CHAPTER_1_STORIES[level.id] || {
    level_id: level.id,
    chapter_id: 1,
    title: level.title,
    pre_dialogue: [
      { character: 'hello_kitty', text: `第 ${level.id} 关，${level.title}，一起加油吧！` }
    ],
    post_dialogue: [
      { character: 'hello_kitty', text: '做得好！派对又向前一步！' }
    ],
    objective: { description: level.objectives.map((obj) => `${obj.name} ${obj.target}`).join('，') }
  }

  return JSON.parse(JSON.stringify(story))
}

module.exports = {
  CHAPTER_1_LEVELS,
  CHAPTER_1_STORIES,
  getChapter1Level,
  getChapter1Story
}
