/**
 * 音频管理器
 * 负责背景音乐和音效的播放控制
 */
class AudioManager {
  constructor() {
    this.bgm = null
    this.currentBGMName = null
    this.bgmEnabled = true
    this.sfxEnabled = true
    this.volume = 1.0

    this.bgmList = {
      // 主菜单和通用BGM
      main_theme: 'assets/audio/bgm/bgm_main_theme.mp3',
      level_bgm: 'assets/audio/bgm/bgm_chapter1_normal.mp3',
      story_bgm: 'assets/audio/bgm/bgm_story_scene.mp3',
      story_scene: 'assets/audio/bgm/bgm_story_scene.mp3',
      victory: 'assets/audio/bgm/bgm_victory.mp3',

      // 第一章：Hello Kitty的甜品派对
      chapter1_normal: 'assets/audio/bgm/bgm_chapter1_normal.mp3',
      chapter1_warm: 'assets/audio/bgm/bgm_chapter1_warm.mp3',
      chapter1_explore: 'assets/audio/bgm/bgm_chapter1_explore.mp3',
      chapter1_boss: 'assets/audio/bgm/bgm_chapter1_boss.mp3',

      // 第二章：美乐蒂的音乐盒
      chapter2_musicbox: 'assets/audio/bgm/bgm_chapter2_musicbox.mp3',
      chapter2_explore: 'assets/audio/bgm/bgm_chapter2_explore.mp3',
      chapter2_warm: 'assets/audio/bgm/bgm_chapter2_warm.mp3',
      chapter2_boss: 'assets/audio/bgm/bgm_chapter2_boss.mp3',

      // 第三章：大耳狗的云端冒险
      chapter3_sky: 'assets/audio/bgm/bgm_chapter3_cloud.mp3',
      chapter3_cloud: 'assets/audio/bgm/bgm_chapter3_cloud.mp3',
      chapter3_wind: 'assets/audio/bgm/bgm_chapter3_wind.mp3',
      chapter3_rainbow: 'assets/audio/bgm/bgm_chapter3_cloud.mp3',
      chapter3_courage: 'assets/audio/bgm/bgm_chapter3_wind.mp3',
      chapter3_storm: 'assets/audio/bgm/bgm_chapter3_wind.mp3',
      chapter3_sunny: 'assets/audio/bgm/bgm_chapter3_cloud.mp3',
      chapter3_castle: 'assets/audio/bgm/bgm_chapter3_starry.mp3',
      chapter3_practice: 'assets/audio/bgm/bgm_chapter3_wind.mp3',
      chapter3_starry: 'assets/audio/bgm/bgm_chapter3_starry.mp3',
      chapter3_boss: 'assets/audio/bgm/bgm_chapter3_boss.mp3',

      // 第四章：布丁狗的悠闲午后
      chapter4_relax: 'assets/audio/bgm/bgm_chapter4_lazy.mp3',
      chapter4_sleepy: 'assets/audio/bgm/bgm_chapter4_lazy.mp3',
      chapter4_cookie: 'assets/audio/bgm/bgm_chapter4_garden.mp3',
      chapter4_dream: 'assets/audio/bgm/bgm_chapter4_tea.mp3',
      chapter4_coffee: 'assets/audio/bgm/bgm_chapter4_lazy.mp3',
      chapter4_pudding: 'assets/audio/bgm/bgm_chapter4_tea.mp3',
      chapter4_tension: 'assets/audio/bgm/bgm_chapter4_boss.mp3',
      chapter4_lazy: 'assets/audio/bgm/bgm_chapter4_lazy.mp3',
      chapter4_garden: 'assets/audio/bgm/bgm_chapter4_garden.mp3',
      chapter4_tea: 'assets/audio/bgm/bgm_chapter4_tea.mp3',
      chapter4_boss: 'assets/audio/bgm/bgm_chapter4_boss.mp3',

      // 第五章：库洛米的挑战
      chapter5_mystery: 'assets/audio/bgm/bgm_chapter5_mischief.mp3',
      chapter5_challenge: 'assets/audio/bgm/bgm_chapter5_chase.mp3',
      chapter5_magic: 'assets/audio/bgm/bgm_chapter5_mischief.mp3',
      chapter5_friendship: 'assets/audio/bgm/bgm_chapter5_truth.mp3',
      chapter5_secret: 'assets/audio/bgm/bgm_chapter5_truth.mp3',
      chapter5_battle: 'assets/audio/bgm/bgm_chapter5_chase.mp3',
      chapter5_truth: 'assets/audio/bgm/bgm_chapter5_truth.mp3',
      chapter5_reconciliation: 'assets/audio/bgm/bgm_chapter5_boss.mp3',
      chapter5_mischief: 'assets/audio/bgm/bgm_chapter5_mischief.mp3',
      chapter5_chase: 'assets/audio/bgm/bgm_chapter5_chase.mp3',
      chapter5_boss: 'assets/audio/bgm/bgm_chapter5_boss.mp3',

      // 第六章：双子星的星空之旅（新增的第六章专用BGM）
      chapter6_stars: 'assets/audio/bgm/bgm_chapter6_entrance.mp3',
      chapter6_twin: 'assets/audio/bgm/bgm_chapter6_entrance.mp3',
      chapter6_kiki: 'assets/audio/bgm/bgm_chapter6_galaxy.mp3',
      chapter6_path: 'assets/audio/bgm/bgm_chapter6_galaxy.mp3',
      chapter6_crisis: 'assets/audio/bgm/bgm_chapter6_galaxy.mp3',
      chapter6_reunion: 'assets/audio/bgm/bgm_chapter6_constellation.mp3',
      chapter6_galaxy: 'assets/audio/bgm/bgm_chapter6_galaxy.mp3',
      chapter6_memory: 'assets/audio/bgm/bgm_chapter6_constellation.mp3',
      chapter6_final: 'assets/audio/bgm/bgm_chapter6_final.mp3',
      chapter6_boss: 'assets/audio/bgm/bgm_chapter6_final.mp3',
      chapter6_entrance: 'assets/audio/bgm/bgm_chapter6_entrance.mp3',
      chapter6_constellation: 'assets/audio/bgm/bgm_chapter6_constellation.mp3',

      // 活动BGM
      event_christmas: 'assets/audio/bgm/bgm_event_christmas.mp3',
      event_halloween: 'assets/audio/bgm/bgm_event_halloween.mp3',
      event_valentine: 'assets/audio/bgm/bgm_event_valentine.mp3'
    }

    this.sfxList = {
      select: 'assets/audio/sfx/click.mp3',
      dialogue: 'assets/audio/sfx/dialogue.mp3',
      swap: 'assets/audio/sfx/swap.mp3',
      swap_success: 'assets/audio/sfx/match_1.mp3',
      swap_fail: 'assets/audio/sfx/click.mp3',
      match_1: 'assets/audio/sfx/match_1.mp3',
      match_2: 'assets/audio/sfx/match_2.mp3',
      match_3: 'assets/audio/sfx/match_3.mp3',
      special_match: 'assets/audio/sfx/special_match.mp3',
      level_complete: 'assets/audio/sfx/level_complete.mp3',
      level_fail: 'assets/audio/sfx/level_fail.mp3',
      star_get: 'assets/audio/sfx/star_get.mp3',
      // 道具音效
      freeze: 'assets/audio/sfx/special_match.mp3',
      hammer: 'assets/audio/sfx/match_2.mp3',
      refresh: 'assets/audio/sfx/special_match.mp3',
      bomb: 'assets/audio/sfx/match_3.mp3',
      rainbow: 'assets/audio/sfx/special_match.mp3',
      shuffle: 'assets/audio/sfx/swap.mp3',
      plus_five: 'assets/audio/sfx/star_get.mp3',
      // 角色连击庆祝音效
      celebrate_hello_kitty: 'assets/audio/sfx/celebrate_hello_kitty.wav',
      celebrate_my_melody: 'assets/audio/sfx/celebrate_my_melody.wav',
      celebrate_cinnamonroll: 'assets/audio/sfx/celebrate_cinnamonroll.wav',
      celebrate_pompompurin: 'assets/audio/sfx/celebrate_pompompurin.wav',
      celebrate_kuromi: 'assets/audio/sfx/celebrate_kuromi.wav',
      celebrate_little_twin_stars: 'assets/audio/sfx/celebrate_little_twin_stars.wav',
      // 备用映射，用于处理可能缺失的音效
      click: 'assets/audio/sfx/click.mp3'
    }

    this.loadedSounds = {}
  }

  /**
   * 预加载音效
   */
  preload() {
    // 微信小游戏音频预加载
    Object.keys(this.sfxList).forEach((key) => {
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = this.sfxList[key]
      this.loadedSounds[key] = innerAudioContext
    })
  }

  /**
   * 播放背景音乐
   */
  playBGM(name) {
    if (!this.bgmEnabled) return

    const bgmPath = this.bgmList[name]
    if (!bgmPath) {
      console.warn('BGM not found:', name)
      return
    }

    if (this.bgm && this.currentBGMName === name) {
      this.bgm.play()
      return
    }

    // 停止当前BGM
    this.stopBGM()

    this.bgm = wx.createInnerAudioContext()
    this.currentBGMName = name
    this.bgm.src = bgmPath
    this.bgm.loop = true
    this.bgm.volume = this.volume * 0.5 // BGM音量小一些
    this.bgm.play()

    console.log('播放BGM:', name)
  }

  /**
   * 停止背景音乐
   */
  stopBGM() {
    if (this.bgm) {
      this.bgm.stop()
      this.bgm.destroy()
      this.bgm = null
      this.currentBGMName = null
    }
  }

  /**
   * 暂停背景音乐
   */
  pauseBGM() {
    if (this.bgm) {
      this.bgm.pause()
    }
  }

  /**
   * 恢复背景音乐
   */
  resumeBGM() {
    if (this.bgm && this.bgmEnabled) {
      this.bgm.play()
    }
  }

  /**
   * 播放音效
   */
  playSFX(name) {
    if (!this.sfxEnabled) return

    const sfxPath = this.sfxList[name]
    if (!sfxPath) {
      console.warn('SFX not found:', name)
      return
    }

    // 使用预加载的音效或创建新的
    let sound = this.loadedSounds[name]
    if (!sound) {
      sound = wx.createInnerAudioContext()
      sound.src = sfxPath
    }

    sound.volume = this.volume * 0.3 // 音效音量较小，不盖过背景音乐
    sound.seek(0)
    sound.play()

    console.log('播放音效:', name)
  }

  /**
   * 设置BGM开关
   */
  setBGMEnabled(enabled) {
    this.bgmEnabled = enabled
    if (!enabled) {
      this.stopBGM()
    }
  }

  /**
   * 设置音效开关
   */
  setSFXEnabled(enabled) {
    this.sfxEnabled = enabled
  }

  /**
   * 设置音量
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume))
    if (this.bgm) {
      this.bgm.volume = this.volume * 0.5
    }
  }
}

module.exports = AudioManager
