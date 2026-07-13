/**
 * 模块验证脚本
 * 确保所有新增的系统模块可以正确加载
 */

console.log('🔍 验证游戏模块...\n')

let errors = []
let warnings = []
const fs = require('fs')
const CHAPTER_PIECES = {1: ["piece_1_strawberry_shortcake.png", "piece_2_lemon_cream_tart.png", "piece_3_chocolate_heart.png", "piece_4_green_apple_candy.png", "piece_5_blueberry_macaron.png", "piece_6_orange_jelly.png"], 2: ["piece_1_pink_metronome.png", "piece_2_golden_note.png", "piece_3_purple_treble.png", "piece_4_music_box_key.png", "piece_5_blue_music_note.png", "piece_6_tambourine_cookie.png"], 3: ["piece_1_cloud_strawberry.png", "piece_2_rainbow_lemon.png", "piece_3_grape_cloud.png", "piece_4_sunny_apple_balloon.png", "piece_5_sky_blueberry.png", "piece_6_storm_orange.png"], 4: ["piece_1_strawberry_cookie.png", "piece_2_pudding_lemon.png", "piece_3_coffee_bean.png", "piece_4_sleepy_apple_pillow.png", "piece_5_blueberry_pudding.png", "piece_6_caramel_orange.png"], 5: ["piece_1_dark_strawberry_potion.png", "piece_2_magic_lemon_crescent.png", "piece_3_shadow_grape_crystal.png", "piece_4_apple_spell_envelope.png", "piece_5_purple_blueberry_gem.png", "piece_6_night_orange_moon.png"], 6: ["piece_1_shooting_star_berry.png", "piece_2_starlight_lemon.png", "piece_3_galaxy_grape_planet.png", "piece_4_crescent_moon_apple.png", "piece_5_constellation_blueberry.png", "piece_6_orange_comet.png"]}
const chapterPieceAssets = Object.entries(CHAPTER_PIECES).flatMap(([chapter, pieces]) => (
  pieces.map((piece) => `assets/images/pieces/chapter_${chapter}/${piece}`)
))

// 模拟微信小程序环境
global.wx = {
  createCanvas: () => ({
    getContext: () => ({})
  }),
  getSystemInfoSync: () => ({
    windowWidth: 375,
    windowHeight: 667
  }),
  createImage: () => ({
    onload: null,
    onerror: null,
    src: ''
  }),
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {},
  createInnerAudioContext: () => ({
    src: '',
    play: () => {},
    pause: () => {},
    stop: () => {},
    destroy: () => {},
    seek: () => {}
  })
}

// 测试模块加载
try {
  const { PowerUpManager, POWERUP_TYPES, POWERUP_CONFIG } = require('./js/powerups.js')
  console.log('✅ powerups.js 加载成功')
  console.log('   - 道具类型:', Object.keys(POWERUP_TYPES).length, '种')
  console.log('   - PowerUpManager:', typeof PowerUpManager)
} catch (e) {
  errors.push({ file: 'powerups.js', error: e.message })
}

try {
  const { ObstacleManager, Obstacle, OBSTACLE_TYPES, OBSTACLE_CONFIG } = require('./js/obstacles.js')
  console.log('✅ obstacles.js 加载成功')
  console.log('   - 障碍物类型:', Object.keys(OBSTACLE_TYPES).length, '种')
  console.log('   - ObstacleManager:', typeof ObstacleManager)
} catch (e) {
  errors.push({ file: 'obstacles.js', error: e.message })
}

try {
  const chapters = [
    { id: 1, startLevel: 1, module: require('./js/data/chapter1.js'), getLevel: 'getChapter1Level', getStory: 'getChapter1Story' },
    { id: 2, startLevel: 11, module: require('./js/data/chapter2.js'), getLevel: 'getChapter2Level', getStory: 'getChapter2Story' },
    { id: 3, startLevel: 21, module: require('./js/data/chapter3.js'), getLevel: 'getChapter3Level', getStory: 'getChapter3Story' },
    { id: 4, startLevel: 31, module: require('./js/data/chapter4.js'), getLevel: 'getChapter4Level', getStory: 'getChapter4Story' },
    { id: 5, startLevel: 41, module: require('./js/data/chapter5.js'), getLevel: 'getChapter5Level', getStory: 'getChapter5Story' },
    { id: 6, startLevel: 51, module: require('./js/data/chapter6.js'), getLevel: 'getChapter6Level', getStory: 'getChapter6Story' }
  ]

  chapters.forEach((chapter) => {
    const level = chapter.module[chapter.getLevel](chapter.startLevel)
    const story = chapter.module[chapter.getStory](chapter.startLevel)
    console.log(`✅ chapter${chapter.id}.js 加载成功`)
    console.log(`   - 第${chapter.startLevel}关标题:`, level.title)
    console.log('   - 对话数:', story.pre_dialogue.length)
  })
} catch (e) {
  errors.push({ file: 'chapter data', error: e.message })
}

try {
  const Level = require('./js/level.js')
  console.log('✅ level.js 加载成功')
  // 测试道具生成
  const testLevel = new Level({ id: 10, chapter: 1 })
  console.log('   - 第10关可用道具数:', testLevel.availablePowerUps.length)
} catch (e) {
  errors.push({ file: 'level.js', error: e.message })
}

try {
  const AudioManager = require('./js/utils/audio.js')
  const audioManager = new AudioManager()
  const chapters = [
    { start: 1, end: 10, module: require('./js/data/chapter1.js'), getLevel: 'getChapter1Level' },
    { start: 11, end: 20, module: require('./js/data/chapter2.js'), getLevel: 'getChapter2Level' },
    { start: 21, end: 30, module: require('./js/data/chapter3.js'), getLevel: 'getChapter3Level' },
    { start: 31, end: 40, module: require('./js/data/chapter4.js'), getLevel: 'getChapter4Level' },
    { start: 41, end: 50, module: require('./js/data/chapter5.js'), getLevel: 'getChapter5Level' },
    { start: 51, end: 60, module: require('./js/data/chapter6.js'), getLevel: 'getChapter6Level' }
  ]

  const referencedBgm = new Set(['main_theme', 'story_scene', 'story_bgm', 'victory'])
  chapters.forEach((chapter) => {
    for (let levelId = chapter.start; levelId <= chapter.end; levelId++) {
      const level = chapter.module[chapter.getLevel](levelId)
      if (level && level.bgm) referencedBgm.add(level.bgm)
    }
  })

  const missingBgmKeys = Array.from(referencedBgm).filter((key) => !audioManager.bgmList[key])
  if (missingBgmKeys.length) {
    throw new Error(`缺少BGM映射: ${missingBgmKeys.join(', ')}`)
  }

  const missingBgmFiles = Object.entries(audioManager.bgmList)
    .filter(([, path]) => !fs.existsSync(path))
    .map(([key, path]) => `${key} -> ${path}`)
  if (missingBgmFiles.length) {
    throw new Error(`缺少BGM文件: ${missingBgmFiles.join(', ')}`)
  }

  const bgmFiles = fs.readdirSync('assets/audio/bgm')
    .filter((file) => file.endsWith('.mp3'))
    .map((file) => `assets/audio/bgm/${file}`)
  const mappedFiles = new Set(Object.values(audioManager.bgmList))
  const unmappedBgmFiles = bgmFiles.filter((file) => !mappedFiles.has(file))
  if (unmappedBgmFiles.length) {
    warnings.push({ file: 'bgm', warning: `存在未映射BGM文件: ${unmappedBgmFiles.join(', ')}` })
  }

  console.log('✅ BGM配置完整')
  console.log('   - BGM映射数:', Object.keys(audioManager.bgmList).length)
  console.log('   - 关卡引用BGM数:', referencedBgm.size)
} catch (e) {
  errors.push({ file: 'audio bgm', error: e.message })
}

try {
  const requiredAssets = [
    'assets/images/ui/backgrounds/prologue_bg.png',
    'assets/images/ui/backgrounds/chapter_1_bg.png',
    'assets/images/ui/backgrounds/chapter_2_bg.png',
    'assets/images/ui/backgrounds/chapter_3_bg.png',
    'assets/images/ui/backgrounds/chapter_4_bg.png',
    'assets/images/ui/backgrounds/chapter_5_bg.png',
    'assets/images/ui/backgrounds/chapter_6_bg.png',
    'assets/images/ui/topbars/topbar_chapter_1.png',
    'assets/images/ui/topbars/topbar_chapter_2.png',
    'assets/images/ui/topbars/topbar_chapter_3.png',
    'assets/images/ui/topbars/topbar_chapter_4.png',
    'assets/images/ui/topbars/topbar_chapter_5.png',
    'assets/images/ui/topbars/topbar_chapter_6.png',
    'assets/images/ui/story/chapter_1_story_bg.png',
    'assets/images/ui/story/chapter_2_story_bg.png',
    'assets/images/ui/story/chapter_3_story_bg.png',
    'assets/images/ui/story/chapter_4_story_bg.png',
    'assets/images/ui/story/chapter_5_story_bg.png',
    'assets/images/ui/story/chapter_6_story_bg.png',
    'assets/images/ui/title/main_title_ai.png',
    'assets/images/characters/hello_kitty/fullbody/cutout.png',
    'assets/images/characters/my_melody/fullbody/cutout.png',
    'assets/images/characters/cinnamonroll/fullbody/cutout.png',
    'assets/images/characters/pompompurin/fullbody/cutout.png',
    'assets/images/characters/kuromi/fullbody/cutout.png',
    'assets/images/characters/little_twin_stars/fullbody/cutout.png',
    'assets/images/pieces/normal/piece_1_strawberry.png',
    'assets/images/pieces/normal/piece_2_lemon.png',
    'assets/images/pieces/normal/piece_3_grape.png',
    'assets/images/pieces/normal/piece_4_apple.png',
    'assets/images/pieces/normal/piece_5_blueberry.png',
    'assets/images/pieces/normal/piece_6_orange.png',
    ...chapterPieceAssets
  ]
  const missingAssets = requiredAssets.filter((asset) => !fs.existsSync(asset))
  if (missingAssets.length) throw new Error(`缺少素材: ${missingAssets.join(', ')}`)
  console.log('✅ 核心美术素材存在')
  console.log('   - 素材数:', requiredAssets.length)
} catch (e) {
  errors.push({ file: 'assets', error: e.message })
}

// 输出结果
console.log('\n' + '='.repeat(40))

if (errors.length === 0) {
  if (warnings.length > 0) {
    console.log('⚠️ 发现', warnings.length, '个警告:')
    warnings.forEach(({ file, warning }) => {
      console.log(`   - ${file}: ${warning}`)
    })
  }
  console.log('🎉 所有模块验证通过！')
  process.exit(0)
} else {
  console.log('❌ 发现', errors.length, '个错误:')
  errors.forEach(({ file, error }) => {
    console.log(`   - ${file}: ${error}`)
  })
  process.exit(1)
}
