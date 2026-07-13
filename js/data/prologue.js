/**
 * 序章：梦想守护者
 * 建立世界观和玩家身份
 */

const PROLOGUE_STORY = {
  id: 'prologue',
  title: '梦想守护者',
  pre_dialogue: [
    {
      character: 'narrator',
      text: '在遥远的彩虹尽头，有一个被阳光亲吻的小镇——梦幻小镇。'
    },
    {
      character: 'narrator',
      text: '这里的居民都是可爱的三丽鸥伙伴们，他们每天快乐地生活着。'
    },
    {
      character: 'narrator',
      text: '但是有一天，一股神秘的迷雾笼罩了小镇...'
    },
    {
      character: 'hello_kitty',
      text: '哎呀！派对用的材料都不见了！'
    },
    {
      character: 'my_melody',
      text: '我的音乐盒也发不出声音了...'
    },
    {
      character: 'cinnamonroll',
      text: '云朵变得灰蒙蒙的，飞不起来了...'
    },
    {
      character: 'narrator',
      text: '就在这时，传说中的"梦想守护者"出现了——那就是你！'
    },
    {
      character: 'hello_kitty',
      text: '哇！你就是传说中的梦想守护者吗？'
    },
    {
      character: 'my_melody',
      text: '请帮帮我们！通过消除魔法，收集失落的梦想碎片！'
    },
    {
      character: 'cinnamonroll',
      text: '我们会和你一起努力的！'
    }
  ],
  tutorial: [
    {
      step: 1,
      character: 'hello_kitty',
      text: '守护者，让我来教你消除魔法吧！'
    },
    {
      step: 2,
      character: 'hello_kitty',
      text: '点击一个元素选中它，然后点击相邻的元素交换位置。'
    },
    {
      step: 3,
      character: 'hello_kitty',
      text: '当三个或更多相同元素连成一线时，就会发生消除！'
    },
    {
      step: 4,
      character: 'my_melody',
      text: '消除后会收集到梦想碎片，用来恢复小镇的光彩。'
    },
    {
      step: 5,
      character: 'cinnamonroll',
      text: ' special candies can help us clear obstacles faster!'
    }
  ]
}

// 序章后的首个任务
const FIRST_MISSION = {
  id: 1,
  title: '初次试炼',
  description: '帮助Hello Kitty准备派对，证明自己的守护者身份',
  unlocks: 'chapter_1'
}

module.exports = {
  PROLOGUE_STORY,
  FIRST_MISSION
}
