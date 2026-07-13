const { getChapter1Story } = require('../data/chapter1.js')
const { getChapter2Story } = require('../data/chapter2.js')
const { getChapter3Story } = require('../data/chapter3.js')
const { getChapter4Story } = require('../data/chapter4.js')
const { getChapter5Story } = require('../data/chapter5.js')
const { getChapter6Story } = require('../data/chapter6.js')

/**
 * 故事线管理器
 * 负责加载和管理游戏的故事剧情
 */
class StoryManager {
  constructor() {
    this.currentStory = null
    this.currentScene = null
    this.dialogQueue = []
    this.currentDialogIndex = 0
  }

  /**
   * 加载故事
   */
  loadStory(storyData) {
    console.log('加载故事:', storyData)

    const { chapter, level } = storyData
    switch (Number(chapter)) {
      case 1:
        this.currentStory = getChapter1Story(level)
        break
      case 2:
        this.currentStory = getChapter2Story(level)
        break
      case 3:
        this.currentStory = getChapter3Story(level)
        break
      case 4:
        this.currentStory = getChapter4Story(level)
        break
      case 5:
        this.currentStory = getChapter5Story(level)
        break
      case 6:
        this.currentStory = getChapter6Story(level)
        break
      default:
        this.currentStory = this.getMockStory(storyData)
    }
    this.dialogQueue = this.currentStory.pre_dialogue || []
    this.currentDialogIndex = 0

    return this.currentStory
  }

  /**
   * 获取下一个对话
   */
  getNextDialog() {
    if (this.currentDialogIndex < this.dialogQueue.length) {
      const dialog = this.dialogQueue[this.currentDialogIndex]
      this.currentDialogIndex++
      return dialog
    }
    return null
  }

  /**
   * 检查是否还有对话
   */
  hasMoreDialog() {
    return this.currentDialogIndex < this.dialogQueue.length
  }

  /**
   * 加载关卡后对话
   */
  loadPostDialogue() {
    if (this.currentStory && this.currentStory.post_dialogue) {
      this.dialogQueue = this.currentStory.post_dialogue
      this.currentDialogIndex = 0
      return true
    }
    return false
  }

  /**
   * 获取章节信息
   */
  getChapterInfo(chapterId) {
    const chapters = {
      1: {
        title: 'Hello Kitty的甜品派对',
        description: '帮助Kitty准备盛大的甜品派对',
        character: 'hello_kitty',
        theme: 'sweets',
        color: '#FFB6C1'
      },
      2: {
        title: '美乐蒂的音乐盒',
        description: '寻找丢失的音乐盒零件',
        character: 'my_melody',
        theme: 'music',
        color: '#FF69B4'
      },
      3: {
        title: '大耳狗的云端冒险',
        description: '和大耳狗一起遨游云端',
        character: 'cinnamonroll',
        theme: 'sky',
        color: '#87CEEB'
      },
      4: {
        title: '布丁狗的悠闲午后',
        description: '享受布丁狗的美味时光',
        character: 'pompompurin',
        theme: 'relax',
        color: '#FFE4B5'
      },
      5: {
        title: '库洛米的恶作剧',
        description: '库洛米又在计划什么？',
        character: 'kuromi',
        theme: 'mischief',
        color: '#DDA0DD'
      },
      6: {
        title: '双子星的星空之旅',
        description: '和双子星一起探索星空',
        character: 'little_twin_stars',
        theme: 'stars',
        color: '#B0C4DE'
      }
    }

    return chapters[chapterId] || chapters[1]
  }

  /**
   * 获取角色信息
   */
  getCharacterInfo(characterId) {
    const characters = {
      hello_kitty: {
        name: 'Hello Kitty',
        color: '#FF69B4',
        icon: 'hello_kitty_icon.png'
      },
      my_melody: {
        name: '美乐蒂',
        color: '#FF1493',
        icon: 'my_melody_icon.png'
      },
      cinnamonroll: {
        name: '大耳狗',
        color: '#87CEEB',
        icon: 'cinnamonroll_icon.png'
      },
      pompompurin: {
        name: '布丁狗',
        color: '#FFD700',
        icon: 'pompompurin_icon.png'
      },
      kuromi: {
        name: '库洛米',
        color: '#9370DB',
        icon: 'kuromi_icon.png'
      },
      keroppi: {
        name: '大眼蛙',
        color: '#32CD32',
        icon: 'keroppi_icon.png'
      },
      badtz_maru: {
        name: '酷企鹅',
        color: '#000000',
        icon: 'badtz_maru_icon.png'
      },
      little_twin_stars: {
        name: '双子星',
        color: '#B0C4DE',
        icon: 'little_twin_stars_icon.png'
      }
    }

    return characters[characterId] || characters.hello_kitty
  }

  /**
   * 模拟故事数据（实际应从文件加载）
   */
  getMockStory(storyData) {
    return {
      level_id: storyData.level,
      chapter_id: storyData.chapter,
      title: `关卡 ${storyData.level}`,
      pre_dialogue: [
        {
          character: 'hello_kitty',
          expression: 'happy',
          text: '欢迎来到三丽鸥世界！',
          animation: 'wave'
        },
        {
          character: 'hello_kitty',
          expression: 'excited',
          text: '让我们一起开始这段奇妙的旅程吧！',
          animation: 'jump'
        }
      ],
      post_dialogue: [
        {
          character: 'hello_kitty',
          expression: 'joy',
          text: '太棒了！你完成得很出色！',
          animation: 'clap'
        }
      ],
      objective: {
        description: '达到目标分数',
        hint: '尽量创造更多连击！'
      }
    }
  }
}

module.exports = StoryManager
