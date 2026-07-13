# 🎨 三丽鸥梦幻消消乐 - AI素材生成完整指南

## 📋 项目视觉规范

### 核心风格定义
- **画风**: 2D卡通插画，扁平化设计
- **色调**: 温暖柔和的pastel色系（马卡龙色）
- **质感**:  matte质感，禁止光线渲染和玻璃材质
- **线条**: 柔和圆润，无尖锐边角
- **氛围**: 可爱、温馨、治愈、甜美

### 禁止事项 ❌
- 3D渲染、光线追踪、反射材质
- 玻璃、金属、镜面等反光材质
- 写实风格、照片级真实感
- 角色设定混合（如Hello Kitty有嘴巴）
- 食材/物品拟人化（如草莓有表情）
- 暗黑色调、恐怖、写实血腥

### 必须事项 ✅
- 保持角色官方设定一致性
- 2D手绘风格
- 柔和配色
- 圆润可爱的造型

---

## 🎯 一、消除元素素材 (Pieces)

### 基础提示词模板（所有消除元素通用）
```
2D cute game asset, hand-drawn illustration style, Sanrio-inspired, 
soft pastel colors, matte texture, no lighting effects, no glass material, 
flat design, rounded shapes, kawaii aesthetic, white background, 
simple and clean, mobile game icon
```

### 1.1 普通消除元素（6种基础）

#### 🍓 草莓 (Strawberry) - 红色元素
**文件名**: `piece_strawberry.png`
**关卡关联**: 第1关（收集草莓）、第10关（制作蛋糕）

**Bing/DALL-E 3 提示词**:
```
2D cute strawberry game piece icon, hand-drawn illustration style, 
Sanrio-inspired kawaii aesthetic, soft pastel red color, matte texture, 
rounded plump shape with small green leaves on top, simple facial features 
(only dot eyes if any), no lighting effects, no glass material, flat design, 
white background, game asset, simple and clean
```

**Stable Diffusion 提示词**:
```
masterpiece, best quality, 2D strawberry icon, hand-drawn style, 
Sanrio aesthetic, pastel red, matte texture, round cute shape, 
green leaves, no 3D render, no lighting, flat illustration, 
white background, simple, game asset, kawaii
Negative prompt: 3D, realistic, lighting, glass, metal, reflection, 
shadow, photorealistic, render
```

**Leonardo.AI 设置**:
- Model: DreamShaper v7 / Anime
- Width: 512, Height: 512
- Guidance Scale: 7
- Steps: 30

---

#### 🍋 柠檬 (Lemon) - 黄色元素
**文件名**: `piece_lemon.png`

**提示词**:
```
2D cute lemon game piece icon, hand-drawn illustration style, 
Sanrio-inspired kawaii aesthetic, soft pastel yellow color, matte texture, 
oval rounded shape, small leaf on top, simple and clean design, 
no lighting effects, no glass material, flat design, white background, 
game asset
```

---

#### 🍇 葡萄 (Grape) - 紫色元素
**文件名**: `piece_grape.png`

**提示词**:
```
2D cute grape cluster game piece icon, hand-drawn illustration style, 
Sanrio-inspired kawaii aesthetic, soft pastel purple color, matte texture, 
three round berries connected together, simple leaf decoration, 
no lighting effects, no glass material, flat design, white background, 
game asset
```

---

#### 🍏 苹果 (Apple) - 绿色元素
**文件名**: `piece_apple.png`

**提示词**:
```
2D cute green apple game piece icon, hand-drawn illustration style, 
Sanrio-inspired kawaii aesthetic, soft pastel green color, matte texture, 
round shape with small brown stem and leaf, simple and clean design, 
no lighting effects, no glass material, flat design, white background, 
game asset
```

---

#### 🫐 蓝莓 (Blueberry) - 蓝色元素
**文件名**: `piece_blueberry.png`

**提示词**:
```
2D cute blueberry game piece icon, hand-drawn illustration style, 
Sanrio-inspired kawaii aesthetic, soft pastel blue color, matte texture, 
small round berry shape with tiny crown on top, simple and clean design, 
no lighting effects, no glass material, flat design, white background, 
game asset
```

---

#### 🍊 橘子 (Orange) - 橙色元素
**文件名**: `piece_orange.png`

**提示词**:
```
2D cute orange game piece icon, hand-drawn illustration style, 
Sanrio-inspired kawaii aesthetic, soft pastel orange color, matte texture, 
round shape with small green leaf, simple and clean design, 
no lighting effects, no glass material, flat design, white background, 
game asset
```

---

### 1.2 特殊消除元素

#### ⭐ 横向条纹糖果
**文件名**: `piece_striped_h.png`

**提示词**:
```
2D cute wrapped candy game piece with horizontal rainbow stripes, 
hand-drawn illustration style, Sanrio-inspired kawaii aesthetic, 
soft pastel colors (pink, yellow, blue, green stripes), matte texture, 
rectangular wrapped shape with twisted ends, sparkle decoration effects, 
no lighting effects, no glass material, flat design, white background, 
game asset, special power-up
```

#### ⭐ 纵向条纹糖果
**文件名**: `piece_striped_v.png`

**提示词**:
```
2D cute wrapped candy game piece with vertical rainbow stripes, 
hand-drawn illustration style, Sanrio-inspired kawaii aesthetic, 
soft pastel colors (pink, yellow, blue, green vertical stripes), matte texture, 
rectangular wrapped shape with twisted ends, sparkle decoration effects, 
no lighting effects, no glass material, flat design, white background, 
game asset, special power-up
```

#### 🎁 包装糖果
**文件名**: `piece_wrapped.png`

**提示词**:
```
2D cute gift-wrapped candy game piece, hand-drawn illustration style, 
Sanrio-inspired kawaii aesthetic, soft pink wrapping with white ribbon bow, 
matte texture, square wrapped shape, small heart decorations, 
no lighting effects, no glass material, flat design, white background, 
game asset, special candy
```

#### 🌈 彩虹炸弹
**文件名**: `piece_color_bomb.png`

**提示词**:
```
2D cute rainbow sphere game piece, hand-drawn illustration style, 
Sanrio-inspired kawaii aesthetic, rainbow colored stripes (red, orange, yellow, 
green, blue, purple), matte texture, round ball shape with small stars around, 
no lighting effects, no glass material, flat design, white background, 
game asset, special power-up
```

---

## 👑 二、角色立绘素材 (Characters)

### 角色生成逻辑
**结构**: 人物美工基础 → 服饰设定 → 人物动作/表情

### 2.1 Hello Kitty (凯蒂猫)

#### 基础设定（所有Kitty图片必须包含）
- 白色小猫，无嘴巴（这是核心设定！）
- 椭圆形脸蛋，黑色豆豆眼
- 黄色鼻子，六根胡须（每边三根）
- 左耳红色蝴蝶结（标志性）
- 身材圆润，没有手指细节

#### 🎀 基础头像（对话用）
**文件名**: `hello_kitty_portrait_normal.png`

**提示词**:
```
Hello Kitty character portrait, official Sanrio design, 
2D hand-drawn illustration style, white cat with oval face, 
NO MOUTH (absolutely no mouth), black oval eyes, yellow nose, 
whiskers on cheeks, iconic RED BOW on left ear, 
soft pastel color palette, matte texture, no lighting effects, 
simple clean lines, rounded shapes, character avatar, 
white background, cute and friendly expression
```

#### 🎀 开心表情
**文件名**: `hello_kitty_portrait_happy.png`

**提示词**:
```
Hello Kitty character portrait, happy expression with sparkling eyes, 
official Sanrio design, 2D hand-drawn illustration style, 
white cat with oval face, NO MOUTH, black oval eyes with shine marks, 
yellow nose, whiskers, RED BOW on left ear, 
soft pink pastel background, matte texture, no lighting effects, 
simple clean lines, character avatar
```

#### 🎀 思考表情
**文件名**: `hello_kitty_portrait_thinking.png`

**提示词**:
```
Hello Kitty character portrait, thinking expression with one paw near face, 
official Sanrio design, 2D hand-drawn illustration style, 
white cat with oval face, NO MOUTH, black oval eyes looking up, 
yellow nose, whiskers, RED BOW on left ear, 
question mark bubble near head, soft blue pastel background, 
matte texture, no lighting effects, character avatar
```

#### 🎀 派对服装全身立绘
**文件名**: `hello_kitty_fullbody_party.png`
**章节关联**: 第一章甜品派对

**提示词**:
```
Hello Kitty full body illustration, wearing pink pastry chef outfit, 
white apron with strawberry pattern, chef hat with red bow, 
holding a cake, official Sanrio design, 2D hand-drawn style, 
white cat with NO MOUTH, black oval eyes, yellow nose, 
RED BOW on left ear, standing pose, bakery background with pastel colors, 
matte texture, no lighting effects, no glass material, 
simple clean lines, rounded shapes, cute and cheerful
```

---

### 2.2 My Melody (美乐蒂)

#### 基础设定
- 白兔，粉色头巾（覆盖整个头部和耳朵）
- 头巾上有白色蝴蝶结
- 圆圆的脸，温和的表情
- 通常穿粉色/红色连身裙

#### 🐰 基础头像
**文件名**: `my_melody_portrait_normal.png`

**提示词**:
```
My Melody character portrait, official Sanrio design, 
2D hand-drawn illustration style, white rabbit with pink hood covering head, 
long floppy ears with pink exterior, white face with oval black eyes, 
yellow nose, pink hood with white bow decoration, 
NO MOUTH, gentle and sweet expression, soft pastel pink background, 
matte texture, no lighting effects, simple clean lines, 
character avatar, cute and innocent
```

#### 🐰 音乐盒主题服装
**文件名**: `my_melody_fullbody_music.png`
**章节关联**: 第二章音乐盒

**提示词**:
```
My Melody full body illustration, wearing music note pattern dress, 
pink hood with music symbol decoration, holding small music box, 
official Sanrio design, 2D hand-drawn style, white rabbit, 
pink floppy ears, gentle smile, NO MOUTH, standing in musical forest, 
flowers and musical notes around, pastel pink and white color scheme, 
matte texture, no lighting effects, simple clean lines
```

---

### 2.3 Cinnamoroll (大耳狗/玉桂狗)

#### 基础设定
- 白色小狗，长耳朵（像肉桂卷）
- 蓝色眼睛
- 卷曲的尾巴
- 性格温和，会飞

#### ☁️ 基础头像
**文件名**: `cinnamonroll_portrait_normal.png`

**提示词**:
```
Cinnamoroll character portrait, official Sanrio design, 
2D hand-drawn illustration style, white puppy with long floppy ears 
like cinnamon rolls, big blue eyes, small pink mouth, 
blush marks on cheeks, tiny body, curled tail, 
soft cloud background in light blue, matte texture, 
no lighting effects, simple clean lines, character avatar, 
cute and sleepy expression
```

#### ☁️ 云端主题服装
**文件名**: `cinnamonroll_fullbody_cloud.png`
**章节关联**: 第三章云端冒险

**提示词**:
```
Cinnamoroll full body illustration, wearing blue sky-themed cape 
with cloud patterns, sitting on fluffy white cloud, 
official Sanrio design, 2D hand-drawn style, white puppy, 
long floppy ears, big blue eyes, small pink mouth, curled tail, 
flying pose, rainbow and stars around, pastel blue and white color scheme, 
matte texture, no lighting effects, simple clean lines
```

---

### 2.4 Pompompurin (布丁狗)

#### 基础设定
- 金毛寻回犬，黄色
- 棕色贝雷帽
- 耷拉的耳朵
- 圆圆的眼睛

#### 🍮 基础头像
**文件名**: `pompompurin_portrait_normal.png`

**提示词**:
```
Pompompurin character portrait, official Sanrio design, 
2D hand-drawn illustration style, yellow golden retriever puppy, 
round chubby body, floppy ears, wearing brown beret, 
black dot eyes, small mouth, simple nose, 
sleepy relaxed expression, soft yellow pastel background, 
matte texture, no lighting effects, simple clean lines, 
character avatar, cute and laid-back
```

---

### 2.5 Kuromi (库洛米)

#### 基础设定
- 黑兔，粉色骷髅头蝴蝶结
- 恶魔/淘气但善良的性格
- 白色脸部

#### 🎭 基础头像
**文件名**: `kuromi_portrait_normal.png`

**提示词**:
```
Kuromi character portrait, official Sanrio design, 
2D hand-drawn illustration style, black rabbit with white face, 
pink skull bow on head, pointed ears with pink interior, 
white oval eyes with black pupils, pink nose, 
small mischievous smile, purple and black color scheme with pink accents, 
matte texture, no lighting effects, simple clean lines, 
character avatar, naughty but cute expression
```

---

### 2.6 Little Twin Stars (双子星 - Kiki & Lala)

#### 基础设定
- Kiki：蓝发男孩，星星魔法棒
- Lala：粉发女孩，星星魔法棒
- 来自星星国度

#### ⭐ 头像
**文件名**: `twinstars_portrait.png`

**提示词**:
```
Little Twin Stars Kiki and Lala character portrait, official Sanrio design, 
2D hand-drawn illustration style, Kiki with short blue hair holding star wand, 
Lala with long pink hair holding star wand, both wearing star-themed outfits, 
sweet gentle expressions, pastel blue and pink color scheme, 
sparkle decorations around, starry background, matte texture, 
no lighting effects, simple clean lines, character avatar
```

---

## 🖼️ 三、背景素材 (Backgrounds)

### 背景提示词模板
```
2D cute game background, hand-drawn illustration style, Sanrio-inspired, 
[具体场景描述], soft pastel color palette, matte texture, 
no lighting effects, no glass material, flat design, 
rounded shapes everywhere, kawaii aesthetic, mobile game background, 
vertical composition 9:16, cozy and warm atmosphere
```

### 3.1 主菜单背景
**文件名**: `bg_main_menu.png`
**规格**: 1080x1920px (竖屏)

**提示词**:
```
2D cute game main menu background, hand-drawn illustration style, 
Sanrio-inspired dreamland, Hello Kitty's house in distance, 
rolling hills with pastel pink and lavender colors, 
soft fluffy clouds, rainbow arch, candy trees and flowers, 
butterflies and small birds, heart-shaped bushes, 
matte texture, no lighting effects, flat design, 
rounded shapes everywhere, warm and welcoming atmosphere, 
cozy and cheerful, vertical composition, mobile game background
```

---

### 3.2 第一章背景 - 甜品派对
**文件名**: `bg_chapter1.png`
**关卡关联**: 第1-10关

**提示词**:
```
2D cute bakery kitchen background, hand-drawn illustration style, 
Sanrio-inspired sweets shop, Hello Kitty's bakery interior, 
pink and white walls with heart patterns, wooden shelves with cakes and pastries, 
mixing bowls and baking tools, flour bags with cute faces, 
oven with window showing baking cookies, pastel color palette, 
pink and cream and light brown, matte texture, no lighting effects, 
flat design, rounded furniture, cozy warm atmosphere, 
vertical composition, mobile game background
```

---

### 3.3 第二章背景 - 音乐盒
**文件名**: `bg_chapter2.png`
**章节**: 美乐蒂的音乐盒

**提示词**:
```
2D cute music box world background, hand-drawn illustration style, 
Sanrio-inspired enchanted forest, giant music boxes scattered around, 
flowers that look like musical notes, My Melody's garden, 
pink and lavender color scheme, spinning ballerina figurines, 
butterflies with music note wings, soft clouds, matte texture, 
no lighting effects, flat design, rounded trees and bushes, 
dreamy and magical atmosphere, vertical composition, mobile game background
```

---

### 3.4 第三章背景 - 云端冒险
**文件名**: `bg_chapter3.png`
**章节**: 大耳狗的云端世界

**提示词**:
```
2D cute cloud kingdom background, hand-drawn illustration style, 
Sanrio-inspired sky world, floating islands made of cotton candy clouds, 
Cinnamoroll's home in clouds, rainbow bridges connecting platforms, 
hot air balloons shaped like animals, blue sky with soft white clouds, 
pastel blue and white color scheme, small stars twinkling, 
matte texture, no lighting effects, flat design, 
rounded cloud shapes, peaceful and dreamy atmosphere, 
vertical composition, mobile game background
```

---

### 3.5 第四章背景 - 悠闲午后
**文件名**: `bg_chapter4.png`
**章节**: 布丁狗的午后时光

**提示词**:
```
2D cute garden afternoon background, hand-drawn illustration style, 
Sanrio-inspired peaceful garden, Pompompurin's favorite napping spot, 
picnic blanket with snacks, willow tree with hanging branches, 
sunflowers and daisies, small pond with lily pads, 
pastel yellow and green color scheme, warm afternoon feeling, 
matte texture, no lighting effects, flat design, 
rounded tree shapes, relaxed cozy atmosphere, 
vertical composition, mobile game background
```

---

### 3.6 第五章背景 - 恶作剧之夜
**文件名**: `bg_chapter5.png`
**章节**: 库洛米的恶作剧

**提示词**:
```
2D cute Halloween-themed background, hand-drawn illustration style, 
Sanrio-inspired not-scary Halloween, Kuromi's hideout, 
purple and black color scheme with pink accents, 
cute pumpkins with bows, candy corn decorations, 
black cat (not scary), spider webs with hearts, 
moon with smiling face, stars in sky, 
matte texture, no lighting effects, flat design, 
playful and fun atmosphere (not scary), 
vertical composition, mobile game background
```

---

### 3.7 第六章背景 - 星空之旅
**文件名**: `bg_chapter6.png`
**章节**: 双子星的星空

**提示词**:
```
2D cute starry sky background, hand-drawn illustration style, 
Sanrio-inspired cosmic dreamland, Little Twin Stars' galaxy, 
soft purple and blue night sky, twinkling stars of various sizes, 
crescent moon with face, shooting stars with rainbow trails, 
constellation patterns, clouds made of cotton candy, 
pastel purple blue and pink color scheme, matte texture, 
no lighting effects, flat design, rounded star shapes, 
magical and dreamy atmosphere, vertical composition, mobile game background
```

---

## 🎯 四、UI界面素材 (UI)

### 4.1 按钮素材

#### 开始按钮
**文件名**: `btn_start.png`, `btn_start_pressed.png`
**规格**: 400x120px

**提示词**:
```
2D cute game button "START", hand-drawn illustration style, 
Sanrio-inspired design, rounded rectangle shape with scalloped edges, 
pink gradient (light pink to darker pink), white text "START" in rounded font, 
small heart decorations on corners, ribbon bow on top, 
matte texture, no lighting effects, flat design, 
cute and inviting, white background, game UI element
```

#### 按下状态
**提示词**:
```
2D cute game button "START" pressed state, hand-drawn illustration style, 
Sanrio-inspired design, rounded rectangle shape slightly compressed, 
darker pink color, white text "START", 
matte texture, no lighting effects, flat design, 
game UI element, white background
```

---

#### 返回按钮
**文件名**: `btn_back.png`
**规格**: 120x120px

**提示词**:
```
2D cute circular back button, hand-drawn illustration style, 
Sanrio-inspired design, pink circle with white arrow pointing left, 
small heart decorations around edge, 
matte texture, no lighting effects, flat design, 
rounded and soft, game UI element, white background
```

---

### 4.2 图标素材

#### 星星图标
**文件名**: `icon_star.png`
**规格**: 64x64px

**提示词**:
```
2D cute star icon, hand-drawn illustration style, 
Sanrio-inspired design, five-pointed star with rounded tips, 
yellow color with small pink heart in center, 
sparkle effects around, matte texture, no lighting effects, 
flat design, game UI icon, white background
```

#### 金币图标
**文件名**: `icon_coin.png`

**提示词**:
```
2D cute gold coin icon, hand-drawn illustration style, 
Sanrio-inspired design, round coin with heart pattern in center, 
gold color, small sparkles, 
matte texture (no metallic shine), no lighting effects, 
flat design, game UI icon, white background
```

#### 爱心/生命图标
**文件名**: `icon_heart.png`

**提示词**:
```
2D cute heart icon, hand-drawn illustration style, 
Sanrio-inspired design, rounded heart shape, 
pink color with small highlight mark, 
matte texture, no lighting effects, flat design, 
game UI icon, white background
```

#### 草莓图标（关卡目标）
**文件名**: `icon_strawberry.png`

**提示词**:
```
2D cute small strawberry icon, hand-drawn illustration style, 
Sanrio-inspired design, tiny strawberry with leaf, 
pastel red color, matte texture, 
no lighting effects, flat design, 
game UI icon, white background
```

---

### 4.3 边框与对话框

#### 对话框
**文件名**: `dialog_frame.png`
**规格**: 800x400px

**提示词**:
```
2D cute dialogue box frame, hand-drawn illustration style, 
Sanrio-inspired design, rectangular frame with rounded scalloped edges, 
pink border with white polka dots, small bow decorations at corners, 
lace pattern trim, empty white center area for text, 
matte texture, no lighting effects, flat design, 
cute and decorative, game UI frame, white background
```

#### 头像框
**文件名**: `avatar_frame.png`
**规格**: 280x280px

**提示词**:
```
2D cute circular avatar frame, hand-drawn illustration style, 
Sanrio-inspired design, round frame with flower decorations, 
pink and gold colors, small heart and star ornaments, 
empty center for character portrait, 
matte texture, no lighting effects, flat design, 
game UI frame, white background
```

---

## 🎁 五、道具与物品素材 (Items)

### 5.1 游戏道具

#### 锤子道具
**文件名**: `item_hammer.png`

**提示词**:
```
2D cute toy hammer power-up, hand-drawn illustration style, 
Sanrio-inspired design, pink handle with heart pattern, 
white hammer head with bow decoration, small sparkles around, 
matte texture, no lighting effects, flat design, 
game item icon, white background, kawaii
```

#### 炸弹道具
**文件名**: `item_bomb.png`

**提示词**:
```
2D cute cartoon bomb power-up, hand-drawn illustration style, 
Sanrio-inspired design, round black bomb with cute face, 
pink bow on top, small hearts instead of sparks, 
NOT scary, very cute and friendly, 
matte texture, no lighting effects, flat design, 
game item icon, white background
```

#### 彩虹道具
**文件名**: `item_rainbow.png`

**提示词**:
```
2D cute rainbow orb power-up, hand-drawn illustration style, 
Sanrio-inspired design, sphere with rainbow stripes, 
small clouds around, sparkle effects, 
matte texture, no lighting effects, flat design, 
game item icon, white background
```

---

### 5.2 关卡收集物（非拟人化！）

#### 草莓收集物
**文件名**: `collect_strawberry.png`
**关卡**: 第1关

**提示词**:
```
2D cute strawberry collectable item, hand-drawn illustration style, 
Sanrio-inspired design, fresh strawberry with green leaves, 
bright red color, small shine mark, 
NO FACE, NO EYES, not anthropomorphic, pure fruit item, 
matte texture, no lighting effects, flat design, 
game collectable item, white background
```

#### 巧克力收集物
**文件名**: `collect_chocolate.png`
**关卡**: 第2关（寻找巧克力）

**提示词**:
```
2D cute chocolate bar collectable item, hand-drawn illustration style, 
Sanrio-inspired design, rectangular chocolate bar with squares, 
brown color with lighter brown highlights, wrapper partially open, 
NO FACE, NO EYES, not anthropomorphic, pure food item, 
matte texture, no lighting effects, flat design, 
game collectable item, white background
```

#### 奶油收集物
**文件名**: `collect_cream.png`
**关卡**: 第10关（制作蛋糕）

**提示词**:
```
2D cute whipped cream collectable item, hand-drawn illustration style, 
Sanrio-inspired design, swirl of white whipped cream, 
pastel white color, soft fluffy appearance, 
NO FACE, NO EYES, not anthropomorphic, pure food item, 
matte texture, no lighting effects, flat design, 
game collectable item, white background
```

#### 冰块障碍物
**文件名**: `obstacle_ice.png`
**关卡**: 第2关

**提示词**:
```
2D cute ice block obstacle, hand-drawn illustration style, 
Sanrio-inspired design, square ice cube, light blue translucent appearance, 
frost patterns on surface, small snowflake decorations, 
NO FACE, NO EYES, not anthropomorphic, pure block item, 
matte texture (no glass-like shine), no lighting effects, flat design, 
game obstacle item, white background
```

---

## ✨ 六、特效素材 (Effects)

### 特效提示词模板
```
2D cute game effect, hand-drawn illustration style, Sanrio-inspired, 
[具体效果], flat design, no 3D, no realistic rendering, 
kawaii aesthetic, simple shapes, pastel colors
```

#### 消除闪光效果
**文件名**: `effect_match_sparkle.png`

**提示词**:
```
2D cute sparkle burst effect, hand-drawn illustration style, 
Sanrio-inspired design, star-shaped sparkles bursting out, 
pink and yellow colors, simple flat shapes, 
no 3D rendering, no realistic lighting, 
kawaii game VFX, white background
```

#### 连击数字效果
**文件名**: `effect_combo_3.png`

**提示词**:
```
2D cute "COMBO x3" text effect, hand-drawn illustration style, 
Sanrio-inspired design, rounded bubbly font, 
pink to yellow gradient text, small stars around, 
no 3D, flat design, game UI effect, white background
```

---

## 📊 七、素材生成清单汇总

### P0 - 必须优先生成（核心玩法）

| 类别 | 数量 | 文件名示例 |
|------|------|-----------|
| 消除元素-普通 | 6 | piece_strawberry.png |
| 消除元素-特殊 | 4 | piece_color_bomb.png |
| Hello Kitty立绘 | 5 | hello_kitty_portrait_*.png |
| 主菜单背景 | 1 | bg_main_menu.png |
| 开始按钮 | 2 | btn_start.png |
| 基础UI图标 | 4 | icon_star.png |

**P0总计**: 22个文件

### P1 - 重要素材（完整体验）

| 类别 | 数量 | 说明 |
|------|------|------|
| 其他角色立绘 | 15 | My Melody, Cinnamoroll等 |
| 章节背景 | 6 | 每章一个背景 |
| UI按钮 | 8 | 各种功能按钮 |
| 道具图标 | 4 | 锤子、炸弹等 |
| 收集物品 | 8 | 草莓、巧克力等 |

**P1总计**: 41个文件

### P2 - 扩展素材（锦上添花）

| 类别 | 数量 | 说明 |
|------|------|------|
| 特效素材 | 10 | 消除特效、连击等 |
| 装饰元素 | 10 | 额外UI装饰 |
| 变体素材 | 20 | 不同表情/动作 |

**P2总计**: 40个文件

---

## 🎨 八、批量生成工作流

### 每日生成计划（使用免费工具）

#### 第1天：核心消除元素
- 上午：使用 Bing Image Creator 生成6个普通消除元素
- 下午：生成4个特殊消除元素
- 晚上：后期处理（去背景、调整大小）

#### 第2天：主角Hello Kitty
- 上午：生成Kitty的各种表情头像（5个）
- 下午：生成Kitty全身立绘
- 晚上：后期处理

#### 第3天：其他角色
- 生成My Melody、Cinnamoroll等角色
- 每个角色：头像+全身立绘

#### 第4天：背景图
- 生成7张背景图（主菜单+6章节）

#### 第5天：UI元素
- 按钮、图标、道具等

#### 第6天：收集物与特效
- 收集物品、障碍物、特效素材

**预计总时间**: 6天生成+2天后期 = 8天完成全部素材

---

## ⚠️ 九、质量检查清单

生成每个素材后检查：

- [ ] **风格一致性**: 是否2D手绘风格？
- [ ] **无3D渲染**: 没有光线、阴影、反射？
- [ ] **无玻璃材质**: 没有透明反光效果？
- [ ] **角色设定**: Kitty是否有嘴巴？（必须无）
- [ ] **物品拟人化**: 水果是否有表情？（必须无）
- [ ] **色调**: 是否pastel柔和色系？
- [ ] **线条**: 是否圆润无尖锐边角？
- [ ] **背景透明**: PNG是否有透明底？

---

## 🔧 十、免费生成工具推荐

| 素材类型 | 推荐工具 | 原因 |
|---------|---------|------|
| 消除元素 | Bing Image Creator | 风格稳定，免费无限 |
| 角色立绘 | Bing Image Creator | 角色一致性最好 |
| 背景图 | Leonardo.AI | 可放大到高清 |
| UI元素 | Playground AI | 批量生成快 |
| 后期处理 | Remove.bg + Photopea | 免费去背景+编辑 |

---

开始生成你的三丽鸥消消乐素材吧！记得遵守所有规范哦！🎀
