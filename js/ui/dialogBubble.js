/**
 * 游戏内对话气泡系统
 * 角色在游戏中显示鼓励对话
 */

const CHARACTER_DIALOGS = {
  hello_kitty: {
    combo: [
      '太棒了！连击成功！✨',
      '哇~ 好厉害的连击！',
      '继续保持！你是最棒的！',
      '连击达人就是你！'
    ],
    goodMove: [
      '这一步走得真好！',
      '聪明的选择！',
      '我看到你在用心思考~',
      '这就是消消乐高手！'
    ],
    encouragement: [
      '别灰心，再试一次！',
      '我相信你可以的！',
      '慢慢来，找到最好的步数~',
      '加油！胜利就在眼前！'
    ],
    specialCreated: [
      '哇！特殊糖果出现了！',
      '太厉害了！制造了超级糖果！',
      '这个糖果会有大作用哦！'
    ],
    levelStart: [
      '让我们一起开始吧！',
      '准备好了吗？出发！',
      '新的挑战开始了！'
    ],
    almostComplete: [
      '快要成功了！再加把劲！',
      '目标就在前方！',
      '最后冲刺！你可以的！'
    ],
    powerUpUsed: [
      '道具用得恰到好处！',
      '好聪明的道具选择！',
      '这个道具会带来好运的！'
    ]
  },
  my_melody: {
    combo: [
      '连击真漂亮~🎵',
      '像音乐一样流畅！',
      '你的节奏感真好！',
      '美妙的连击旋律~'
    ],
    goodMove: [
      '这一步像音符一样完美~',
      '好优雅的选择！',
      '我觉得这步会很棒！',
      '你越来越顺手了！'
    ],
    encouragement: [
      '没关系的，再想想看~',
      '音乐需要练习，游戏也是~',
      '我相信你的直觉！',
      '慢慢来，享受游戏~'
    ],
    specialCreated: [
      '哇~闪闪发光的糖果！',
      '这个糖果好可爱！',
      '美味的特殊糖果诞生了~'
    ],
    levelStart: [
      '让我们一起演奏胜利的乐章！',
      '准备好了吗？开始吧~',
      '新的冒险在等着我们！'
    ],
    almostComplete: [
      '胜利的乐章即将奏响！',
      '只差一点点了！',
      '坚持到底就是胜利~'
    ],
    powerUpUsed: [
      '道具帮了大忙呢~',
      '用得好巧妙！',
      '这就是智慧的体现~'
    ]
  },
  cinnamonroll: {
    combo: [
      '哇哦！连击好厉害！',
      '你比云朵还轻盈！',
      '飘飘然的连击感~',
      '像飞行一样顺畅！'
    ],
    goodMove: [
      '这步走得真稳！',
      '眼睛真尖！',
      '我都没想到呢！',
      '越来越厉害了！'
    ],
    encouragement: [
      '深呼吸，再来一次~',
      '失败是成功之母！',
      '相信自己！',
      '调整好心态继续~'
    ],
    specialCreated: [
      '哇！超特别的糖果！',
      '这个糖果会飞吗？',
      '好厉害的创造！'
    ],
    levelStart: [
      '起飞！开始冒险！',
      '云朵上的挑战开始了！',
      '跟我一起飞翔吧！'
    ],
    almostComplete: [
      '马上就要着陆成功了！',
      '终点线就在前面！',
      '最后一搏！冲呀！'
    ],
    powerUpUsed: [
      '道具用得恰到好处！',
      '好聪明的道具选择！',
      '这个道具会带来好运的！'
    ]
  },
  pompompurin: {
    combo: [
      '布丁布丁~连击好棒！',
      '好顺滑的连击呀！',
      '就像吃布丁一样丝滑！',
      '太厉害了！'
    ],
    goodMove: [
      '这步走得好稳重！',
      '明智的选择~',
      '我都看呆了！',
      '越来越熟练了！'
    ],
    encouragement: [
      '休息一下吧，然后再来~',
      '不要急，慢慢来~',
      '你一定可以的！',
      '加油加油！'
    ],
    specialCreated: [
      '哇！像布丁一样可爱的糖果！',
      '这个糖果看起来好好吃！',
      '超级糖果诞生了！'
    ],
    levelStart: [
      '开始悠闲的游戏时间~',
      '准备好享受了吗？',
      '让我们一起放松地玩吧~'
    ],
    almostComplete: [
      '马上就完成了！',
      '坚持就是胜利！',
      '最后一点点了！'
    ],
    powerUpUsed: [
      '道具用得真好！',
      '聪明的选择！',
      '帮了大忙呢！'
    ]
  },
  kuromi: {
    combo: [
      '哼，连击还不错嘛！',
      '比我想象的要强！',
      '这可是高难度操作！',
      '算你厉害！'
    ],
    goodMove: [
      '这步...还算可以！',
      '眼光不错！',
      '意外地聪明！',
      '进步了不少嘛！'
    ],
    encouragement: [
      '别放弃了，再来！',
      '失败算什么，继续！',
      '拿出你的斗志来！',
      '我可不会看不起努力的人！'
    ],
    specialCreated: [
      '哼，制造了不错的糖果！',
      '这还差不多！',
      '有点本事！'
    ],
    levelStart: [
      '接受我的挑战吧！',
      '准备好了就開始！',
      '让我看看你的实力！'
    ],
    almostComplete: [
      '别得意，还没结束呢！',
      '最后关头更要认真！',
      '完成给我看！'
    ],
    powerUpUsed: [
      '道具用得挺聪明！',
      '这选择还不错！',
      '算你会用道具！'
    ]
  },
  little_twin_stars: {
    combo: [
      '星星般闪耀的连击！✨',
      '双子星为你鼓掌！',
      '像星光一样连贯！',
      '美丽的连击轨迹~'
    ],
    goodMove: [
      '这一步星光闪闪！',
      '好梦幻的选择~',
      'Kiki和Lala都喜欢！',
      '你真有天赋！'
    ],
    encouragement: [
      '星星会守护你的~',
      '不要放弃希望！',
      '相信自己像相信星星一样~',
      '黑暗之后必有星光~'
    ],
    specialCreated: [
      '像星星一样闪耀的糖果！',
      '星光糖果出现了！',
      '这是奇迹的糖果~'
    ],
    levelStart: [
      '星光之旅开始了~',
      '和星星一起冒险吧！',
      '星空下的挑战~'
    ],
    almostComplete: [
      '星光就在前方！',
      '马上就要摘到星星了！',
      '坚持住，星光在为你加油！'
    ],
    powerUpUsed: [
      '道具如星光般闪耀！',
      '用得好漂亮！',
      '星光的力量与你同在！'
    ]
  }
}

class DialogBubble {
  constructor(game) {
    this.game = game
    this.activeBubbles = []
    this.lastDialogTime = 0
    this.dialogCooldown = 3000 // 对话冷却时间（毫秒）
    this.comboCount = 0
    this.lastComboTime = 0
  }

  /**
   * 获取当前章节的角色
   */
  getCurrentCharacter() {
    const chapter = this.game.level?.chapter || 1
    const characters = [
      'hello_kitty',      // 第1章
      'my_melody',        // 第2章
      'cinnamonroll',     // 第3章
      'pompompurin',      // 第4章
      'kuromi',           // 第5章
      'little_twin_stars' // 第6章
    ]
    return characters[chapter - 1] || 'hello_kitty'
  }

  /**
   * 获取随机对话
   */
  getRandomDialog(type) {
    const character = this.getCurrentCharacter()
    const dialogs = CHARACTER_DIALOGS[character]?.[type] || CHARACTER_DIALOGS.hello_kitty[type]
    if (!dialogs || dialogs.length === 0) return ''
    return dialogs[Math.floor(Math.random() * dialogs.length)]
  }

  /**
   * 检查是否可以显示新对话
   */
  canShowDialog() {
    const now = Date.now()
    return now - this.lastDialogTime > this.dialogCooldown
  }

  /**
   * 显示对话气泡
   */
  showDialog(type, customText = null) {
    if (!this.canShowDialog() && !customText) return false

    const text = customText || this.getRandomDialog(type)
    if (!text) return false

    const character = this.getCurrentCharacter()
    const helperConfig = this.game.helperImages?.[this.game.level?.chapter || 1]

    const bubble = {
      text,
      character,
      portrait: helperConfig?.portrait,
      startTime: Date.now(),
      duration: 3000, // 显示3秒
      opacity: 0,
      y: 100,
      targetY: 80
    }

    this.activeBubbles.push(bubble)
    this.lastDialogTime = Date.now()

    // 限制同时显示的对话数量
    if (this.activeBubbles.length > 2) {
      this.activeBubbles.shift()
    }

    return true
  }

  /**
   * 处理连击
   */
  onCombo(comboCount) {
    const now = Date.now()

    // 连击判定（1.5秒内）
    if (now - this.lastComboTime < 1500) {
      this.comboCount++
    } else {
      this.comboCount = 1
    }
    this.lastComboTime = now

    // 根据连击数触发不同对话
    if (this.comboCount >= 3) {
      return this.showDialog('combo')
    }

    return false
  }

  /**
   * 处理好棋
   */
  onGoodMove() {
    // 30%概率显示鼓励
    if (Math.random() < 0.3) {
      this.showDialog('goodMove')
    }
  }

  /**
   * 处理特殊糖果创建
   */
  onSpecialCreated() {
    this.showDialog('specialCreated')
  }

  /**
   * 关卡开始
   */
  onLevelStart() {
    this.showDialog('levelStart')
  }

  /**
   * 关卡即将完成
   */
  onAlmostComplete() {
    this.showDialog('almostComplete')
  }

  /**
   * 使用道具
   */
  onPowerUpUsed() {
    this.showDialog('powerUpUsed')
  }

  /**
   * 鼓励玩家
   */
  onEncourage() {
    this.showDialog('encouragement')
  }

  /**
   * 更新对话气泡
   */
  update(deltaTime) {
    const now = Date.now()

    this.activeBubbles = this.activeBubbles.filter(bubble => {
      const elapsed = now - bubble.startTime

      // 淡入淡出动画
      if (elapsed < 300) {
        // 淡入
        bubble.opacity = elapsed / 300
        bubble.y = bubble.targetY + 20 * (1 - bubble.opacity)
      } else if (elapsed > bubble.duration - 300) {
        // 淡出
        bubble.opacity = (bubble.duration - elapsed) / 300
      } else {
        // 保持
        bubble.opacity = 1
        bubble.y = bubble.targetY
      }

      return elapsed < bubble.duration
    })
  }

  /**
   * 渲染对话气泡
   */
  render(ctx) {
    if (this.activeBubbles.length === 0) return

    const w = this.game.width

    this.activeBubbles.forEach((bubble, index) => {
      const y = bubble.y + index * 70
      this.renderBubble(ctx, bubble, w - 20, y)
    })
  }

  /**
   * 渲染单个气泡
   */
  renderBubble(ctx, bubble, rightX, y) {
    const padding = 12
    const maxWidth = 200
    const lineHeight = 20

    // 计算文字尺寸
    ctx.font = '14px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    const lines = this.wrapText(ctx, bubble.text, maxWidth)
    const textWidth = Math.min(maxWidth, Math.max(...lines.map(line => ctx.measureText(line).width)))
    const textHeight = lines.length * lineHeight

    const bubbleWidth = textWidth + padding * 2 + 50 // 额外空间给头像
    const bubbleHeight = Math.max(60, textHeight + padding * 2)
    const x = rightX - bubbleWidth

    ctx.save()
    ctx.globalAlpha = bubble.opacity

    // 绘制气泡背景
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.strokeStyle = '#FF69B4'
    ctx.lineWidth = 2

    this.drawRoundRect(ctx, x, y, bubbleWidth, bubbleHeight, 15)
    ctx.fill()
    ctx.stroke()

    // 绘制小三角
    ctx.beginPath()
    ctx.moveTo(rightX - 10, y + bubbleHeight / 2 - 5)
    ctx.lineTo(rightX, y + bubbleHeight / 2)
    ctx.lineTo(rightX - 10, y + bubbleHeight / 2 + 5)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // 绘制头像背景
    const avatarSize = 40
    const avatarX = x + padding
    const avatarY = y + (bubbleHeight - avatarSize) / 2

    ctx.fillStyle = '#FFF0F5'
    ctx.beginPath()
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#FF69B4'
    ctx.lineWidth = 2
    ctx.stroke()

    // 绘制头像（如果有）
    const portrait = this.getCharacterPortrait(bubble.character)
    if (portrait && portrait.ready) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(portrait, avatarX, avatarY, avatarSize, avatarSize)
      ctx.restore()
    } else {
      // 绘制默认头像
      ctx.fillStyle = '#FFB6C1'
      ctx.font = '20px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('🎀', avatarX + avatarSize / 2, avatarY + avatarSize / 2)
    }

    // 绘制文字
    ctx.fillStyle = '#5d4350'
    ctx.font = '14px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'

    const textX = avatarX + avatarSize + 8
    const textY = y + (bubbleHeight - textHeight) / 2

    lines.forEach((line, index) => {
      ctx.fillText(line, textX, textY + index * lineHeight)
    })

    ctx.restore()
  }

  /**
   * 获取角色头像
   */
  getCharacterPortrait(character) {
    const chapterMap = {
      hello_kitty: 1,
      my_melody: 2,
      cinnamonroll: 3,
      pompompurin: 4,
      kuromi: 5,
      little_twin_stars: 6
    }
    const chapter = chapterMap[character] || 1
    return this.game.helperImages?.[chapter]
  }

  /**
   * 文字换行
   */
  wrapText(ctx, text, maxWidth) {
    const chars = text.split('')
    const lines = []
    let line = ''

    chars.forEach(char => {
      const test = line + char
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line)
        line = char
      } else {
        line = test
      }
    })

    if (line) lines.push(line)
    return lines.length > 0 ? lines : [text]
  }

  /**
   * 绘制圆角矩形
   */
  drawRoundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath()
    if (ctx.roundRect) {
      try {
        const r = Array.isArray(radius) ? radius : [radius, radius, radius, radius]
        ctx.roundRect(x, y, width, height, r)
      } catch (e) {
        this.drawRoundRectFallback(ctx, x, y, width, height, radius)
      }
    } else {
      this.drawRoundRectFallback(ctx, x, y, width, height, radius)
    }
  }

  drawRoundRectFallback(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2)
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + width - r, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + r)
    ctx.lineTo(x + width, y + height - r)
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
    ctx.lineTo(x + r, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }
}

module.exports = DialogBubble
