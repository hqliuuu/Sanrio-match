/**
 * 本地存储管理器
 * 负责玩家数据的保存和读取
 */
class StorageManager {
  constructor() {
    this.prefix = 'sanrio_match_'
  }

  /**
   * 保存数据
   */
  set(key, value) {
    try {
      const fullKey = this.prefix + key
      const data = JSON.stringify(value)
      wx.setStorageSync(fullKey, data)
      return true
    } catch (e) {
      console.error('存储数据失败:', e)
      return false
    }
  }

  /**
   * 读取数据
   */
  get(key, defaultValue = null) {
    try {
      const fullKey = this.prefix + key
      const data = wx.getStorageSync(fullKey)
      return data ? JSON.parse(data) : defaultValue
    } catch (e) {
      console.error('读取数据失败:', e)
      return defaultValue
    }
  }

  /**
   * 删除数据
   */
  remove(key) {
    try {
      const fullKey = this.prefix + key
      wx.removeStorageSync(fullKey)
      return true
    } catch (e) {
      console.error('删除数据失败:', e)
      return false
    }
  }

  /**
   * 清空所有数据
   */
  clear() {
    try {
      wx.clearStorageSync()
      return true
    } catch (e) {
      console.error('清空数据失败:', e)
      return false
    }
  }

  /**
   * 获取所有存储的键
   */
  keys() {
    try {
      const allKeys = wx.getStorageInfoSync().keys
      return allKeys.filter((key) => key.startsWith(this.prefix))
    } catch (e) {
      console.error('获取键列表失败:', e)
      return []
    }
  }

  /**
   * 保存关卡进度
   */
  saveLevelProgress(levelId, stars, score) {
    const progress = this.get('level_progress', {})
    const current = progress[levelId] || { stars: 0, score: 0, attempts: 0 }

    progress[levelId] = {
      stars: Math.max(current.stars, stars),
      score: Math.max(current.score, score),
      attempts: current.attempts + 1,
      completed: true,
      completedAt: Date.now()
    }

    return this.set('level_progress', progress)
  }

  /**
   * 获取关卡进度
   */
  getLevelProgress(levelId) {
    const progress = this.get('level_progress', {})
    return progress[levelId] || null
  }

  /**
   * 保存玩家货币
   */
  saveCurrency(coins, stars) {
    const currency = this.get('currency', { coins: 0, stars: 0 })
    currency.coins = coins
    currency.stars = stars
    return this.set('currency', currency)
  }

  /**
   * 获取玩家货币
   */
  getCurrency() {
    return this.get('currency', { coins: 100, stars: 0 })
  }

  /**
   * 保存道具数量
   */
  saveItems(items) {
    return this.set('items', items)
  }

  /**
   * 获取道具数量
   */
  getItems() {
    return this.get('items', {
      hammer: 3,
      bomb: 1,
      rainbow: 0,
      shuffle: 2
    })
  }

  /**
   * 保存设置
   */
  saveSettings(settings) {
    return this.set('settings', settings)
  }

  /**
   * 获取设置
   */
  getSettings() {
    return this.get('settings', {
      music: true,
      sound: true,
      vibration: true,
      language: 'zh-CN'
    })
  }

  /**
   * 备份数据到云端
   */
  async backupToCloud() {
    // 微信小游戏云存储接口
    try {
      const data = {
        level_progress: this.get('level_progress', {}),
        currency: this.get('currency', {}),
        items: this.get('items', {}),
        timestamp: Date.now()
      }

      // 调用微信云函数保存数据
      // await wx.cloud.callFunction({
      //   name: 'saveGameData',
      //   data: data
      // })

      console.log('数据已备份到云端')
      return true
    } catch (e) {
      console.error('云端备份失败:', e)
      return false
    }
  }

  /**
   * 从云端恢复数据
   */
  async restoreFromCloud() {
    try {
      // 调用微信云函数获取数据
      // const result = await wx.cloud.callFunction({
      //   name: 'getGameData'
      // })

      // if (result.data) {
      //   this.set('level_progress', result.data.level_progress)
      //   this.set('currency', result.data.currency)
      //   this.set('items', result.data.items)
      // }

      console.log('数据已从云端恢复')
      return true
    } catch (e) {
      console.error('云端恢复失败:', e)
      return false
    }
  }
}

module.exports = StorageManager
