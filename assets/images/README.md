# 🎨 素材文件夹说明

本文件夹存放游戏所需的所有图片资源。

## 文件夹结构

### `characters/` - 三丽鸥角色图片
每个角色文件夹包含：
- `portrait/` - 头像（对话用）
  - `normal.png` - 默认表情
  - `happy.png` - 开心
  - `excited.png` - 兴奋
  - `sad.png` - 伤心
  - `surprised.png` - 惊讶
  - `thinking.png` - 思考
  - `determined.png` - 坚定
  - `joy.png` - 喜悦
  - `loving.png` - 喜爱
  - `sleepy.png` - 困倦
  
- `fullbody/` - 全身立绘（活动页用）
  
- `chibi/` - Q版形象（小图标用）

### `ui/` - 界面元素
- `backgrounds/` - 背景图
  - `main_menu_bg.png` - 主菜单背景
  - `level_select_bg.png` - 关卡选择背景
  - `game_bg_default.png` - 默认游戏背景
  - `chapter_1_bg.png` ~ `chapter_6_bg.png` - 各章节背景
  - `story_bg.png` - 故事展示背景

- `buttons/` - 按钮
  - `btn_start.png` / `btn_start_pressed.png` - 开始按钮
  - `btn_back.png` / `btn_back_pressed.png` - 返回按钮
  - `btn_home.png` / `btn_home_pressed.png` - 主页按钮
  - `btn_retry.png` / `btn_retry_pressed.png` - 重试按钮
  - `btn_pause.png` - 暂停按钮
  - `btn_sound_on.png` / `btn_sound_off.png` - 音效开关
  - `btn_music_on.png` / `btn_music_off.png` - 音乐开关

- `icons/` - 图标
  - `icon_star.png` - 星星图标
  - `icon_coin.png` - 金币图标
  - `icon_heart.png` - 生命/体力图标
  - `icon_moves.png` - 步数图标
  - `icon_goal.png` - 目标图标
  - `icon_lock.png` - 锁定图标

- `frames/` - 边框和相框
  - `dialog_frame.png` - 对话框边框
  - `avatar_frame.png` - 头像框
  - `level_frame.png` - 关卡边框
  - `chapter_frame.png` - 章节边框

- `effects/` - 特效元素
  - `sparkle_1.png` ~ `sparkle_3.png` - 闪光效果
  - `glow.png` - 发光效果
  - `line_glow.png` - 连线光效
  - `confetti.png` - 彩纸效果

### `pieces/` - 消除元素
- `normal/` - 普通元素（6种基本元素）
  - `piece_1_strawberry.png` - 草莓（红色）
  - `piece_2_lemon.png` - 柠檬（黄色）
  - `piece_3_grape.png` - 葡萄（紫色）
  - `piece_4_apple.png` - 苹果（绿色）
  - `piece_5_blueberry.png` - 蓝莓（蓝色）
  - `piece_6_orange.png` - 橘子（橙色）

- `special/` - 特殊元素
  - `striped_h.png` - 横向条纹糖果
  - `striped_v.png` - 纵向条纹糖果
  - `wrapped.png` - 包装糖果
  - `color_bomb.png` - 彩色炸弹
  - `fish.png` - 小鱼糖果

- `effects/` - 消除特效
  - `match_effect_1.png` ~ `match_effect_4.png` - 匹配特效帧
  - `explosion_effect_1.png` ~ `explosion_effect_6.png` - 爆炸特效帧
  - `special_combine.png` - 特殊组合特效

### `items/` - 道具图片
- `hammer.png` - 锤子（消除单个元素）
- `bomb.png` - 炸弹（消除3x3区域）
- `rainbow.png` - 彩虹（消除所有同色元素）
- `shuffle.png` - 洗牌（重置棋盘）
- `extra_moves.png` - 额外步数
- `extra_time.png` - 额外时间

## 图片规格建议

### 分辨率
- 角色头像：256x256 px
- 全身立绘：512x768 px
- UI按钮：128x128 px
- 消除元素：100x100 px
- 背景图：750x1334 px（iPhone标准）或 1080x1920 px

### 格式
- 静态图：PNG（带透明通道）
- 大图背景：JPG
- 动画序列：PNG序列帧或图集（Sprite Sheet）

### 命名规范
- 使用小写字母
- 单词间用下划线分隔
- 状态变化使用后缀：`_normal`, `_pressed`, `_disabled`
