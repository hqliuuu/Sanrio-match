#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
三丽鸥梦幻消消乐 - AI音乐自动下载脚本

这个脚本会帮你：
1. 生成所有音乐文件的完整配置
2. 提供下载链接模板
3. 创建文件命名和存放指南

作者: Claude
日期: 2024
"""

import json
import os
import shutil
from datetime import datetime

# 音乐配置数据
MUSIC_CONFIG = {
    "project_name": "三丽鸥梦幻消消乐",
    "version": "1.0",
    "total_tracks": 30,
    "total_sfx": 15,
    "output_dir": "/Users/didi/sanrio-match/assets/audio",
    "tracks": [
        # 主菜单
        {
            "id": "BGM_001",
            "filename": "bgm_main_theme.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "欢迎来到三丽鸥世界",
            "suno_prompt": "Cute and dreamy opening theme for a Sanrio-themed mobile game, piano melody with gentle strings, magical fairy-tale atmosphere, warm and welcoming, G major, 120 BPM, Studio Ghibli-inspired, light bells, soft synth pads, heartwarming, instrumental only, no vocals",
            "style": "warm,dreamy,welcoming",
            "tempo": 120,
            "key": "G major",
            "duration": "90s"
        },
        # 第一章 - Hello Kitty
        {
            "id": "BGM_002",
            "filename": "bgm_chapter1_normal.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "甜品派对准备",
            "suno_prompt": "Upbeat and cheerful background music for a baking party scene, cute mobile game BGM, xylophone and glockenspiel melody, light electronic beat, pink and sweet atmosphere, F major, 128 BPM, playful and anticipation, Kawaii future bass elements, sugar rush feeling, instrumental",
            "style": "cheerful,playful,sweet",
            "tempo": 128,
            "key": "F major",
            "duration": "60s"
        },
        {
            "id": "BGM_003",
            "filename": "bgm_chapter1_explore.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "寻找食材",
            "suno_prompt": "Playful adventure music for searching ingredients, accordion and pizzicato strings, light-hearted exploration, European bakery vibes, quirky and curious, G major, 125 BPM, walking pace, warm acoustic feeling, gentle drums, instrumental",
            "style": "curious,playful,adventurous",
            "tempo": 125,
            "key": "G major",
            "duration": "60s"
        },
        {
            "id": "BGM_004",
            "filename": "bgm_chapter1_warm.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "派对布置",
            "suno_prompt": "Warm and cozy preparation music, string quartet with piano, collaborative and heartwarming, pastel colors atmosphere, C major, 118 BPM, flowing melody, orchestral but light, friendship theme, studio ghibli style orchestration, instrumental",
            "style": "warm,cozy,heartwarming",
            "tempo": 118,
            "key": "C major",
            "duration": "60s"
        },
        {
            "id": "BGM_005",
            "filename": "bgm_chapter1_boss.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "派对开始！",
            "suno_prompt": "Celebration climax music for party finale, full band arrangement, brass section with strings, triumphant and joyful, upbeat party atmosphere, confetti and balloons feeling, D major, 132 BPM, energetic and festive, carnival elements, bright and colorful, instrumental",
            "style": "triumphant,energetic,celebratory",
            "tempo": 132,
            "key": "D major",
            "duration": "90s"
        },
        # 第二章 - 美乐蒂
        {
            "id": "BGM_006",
            "filename": "bgm_chapter2_musicbox.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "音乐盒的秘密",
            "suno_prompt": "Dreamy music box theme, celesta and glockenspiel, ethereal and magical, fairytale forest atmosphere, A minor, 100 BPM, delicate and fragile, sparkling sound effects, innocence and wonder, classical music box melody, instrumental",
            "style": "dreamy,ethereal,magical",
            "tempo": 100,
            "key": "A minor",
            "duration": "60s"
        },
        {
            "id": "BGM_007",
            "filename": "bgm_chapter2_explore.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "寻找音符",
            "suno_prompt": "Exploration music with music box elements, searching for notes, pizzicato strings with soft electronic beat, whimsical and curious, magical journey, E minor, 115 BPM, gentle drive, sparkle effects, mystery but cute, instrumental",
            "style": "curious,whimsical,magical",
            "tempo": 115,
            "key": "E minor",
            "duration": "60s"
        },
        {
            "id": "BGM_008",
            "filename": "bgm_chapter2_warm.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "旋律拼图",
            "suno_prompt": "Heartwarming puzzle completion music, building melody layers, strings and woodwinds, satisfying progression, healing atmosphere, warm sunset feeling, C major, 108 BPM, gentle and rewarding, emotional resolution, friends helping theme, instrumental",
            "style": "heartwarming,rewarding,healing",
            "tempo": 108,
            "key": "C major",
            "duration": "60s"
        },
        {
            "id": "BGM_009",
            "filename": "bgm_chapter2_boss.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "音乐盒演奏",
            "suno_prompt": "Grand orchestral finale, My Melody theme variation, full string section with harp, emotional climax, magical concert atmosphere, dreams coming true, F major, 120 BPM, cinematic but cute, waltz rhythm, enchanted garden, instrumental",
            "style": "grand,emotional,cinematic",
            "tempo": 120,
            "key": "F major",
            "duration": "90s"
        },
        # 第三章 - 大耳狗
        {
            "id": "BGM_010",
            "filename": "bgm_chapter3_cloud.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "云端漫步",
            "suno_prompt": "Ethereal cloud walking music, airy and floating sensation, synthesizer pads with wind chimes, peaceful and dreamy, soft pan flute, vast sky atmosphere, A major, 90 BPM, slow and relaxing, ambient nature sounds, cotton candy clouds, instrumental",
            "style": "peaceful,ethereal,relaxing",
            "tempo": 90,
            "key": "A major",
            "duration": "60s"
        },
        {
            "id": "BGM_011",
            "filename": "bgm_chapter3_wind.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "风之试炼",
            "suno_prompt": "Wind adventure music, flowing and breezy, flute and strings, gentle movement, soaring feeling, open sky, D major, 118 BPM, forward momentum, nature elements, free and light, instrumental",
            "style": "adventurous,flowing,uplifting",
            "tempo": 118,
            "key": "D major",
            "duration": "60s"
        },
        {
            "id": "BGM_012",
            "filename": "bgm_chapter3_starry.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "星空接近",
            "suno_prompt": "Dreamy starry sky approach, twinkling sound effects, celestial bells with soft bass, magical night atmosphere, gentle arpeggios, wonder and beauty, E minor, 100 BPM, floating in space, cosmic but cute, constellation theme, instrumental",
            "style": "wonderful,dreamy,cosmic",
            "tempo": 100,
            "key": "E minor",
            "duration": "60s"
        },
        {
            "id": "BGM_013",
            "filename": "bgm_chapter3_boss.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "云端城堡",
            "suno_prompt": "Cloud kingdom finale, grand but gentle, piano and orchestra, Cinnamoroll theme, epic sky castle, fluffy and majestic, C major, 125 BPM, triumphant and soft, heavenly choir, cotton cloud orchestra, instrumental",
            "style": "majestic,triumphant,heavenly",
            "tempo": 125,
            "key": "C major",
            "duration": "90s"
        },
        # 第四章 - 布丁狗
        {
            "id": "BGM_014",
            "filename": "bgm_chapter4_lazy.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "午后的阳光",
            "suno_prompt": "Lazy afternoon jazz, warm and cozy, double bass with soft brushes, relaxed vibe, sunny garden, coffee shop atmosphere, F major, 85 BPM, slow and comfortable, lo-fi hip hop elements, napping under tree, instrumental",
            "style": "relaxed,cozy,jazzy",
            "tempo": 85,
            "key": "F major",
            "duration": "60s"
        },
        {
            "id": "BGM_015",
            "filename": "bgm_chapter4_garden.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "花园散步",
            "suno_prompt": "Garden stroll music, acoustic guitar and whistle, light and carefree, flower blooming, walking pace, nature sounds, G major, 110 BPM, casual and happy, bird chirping, gentle breeze, instrumental",
            "style": "carefree,happy,natural",
            "tempo": 110,
            "key": "G major",
            "duration": "60s"
        },
        {
            "id": "BGM_016",
            "filename": "bgm_chapter4_tea.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "下午茶时光",
            "suno_prompt": "Tea party background music, elegant and cute, harpsichord with strings, Victorian but kawaii, pastry and tea, friends chatting, C major, 105 BPM, genteel and sweet, porcelain cups, macarons and cakes, instrumental",
            "style": "elegant,cute,refined",
            "tempo": 105,
            "key": "C major",
            "duration": "60s"
        },
        {
            "id": "BGM_017",
            "filename": "bgm_chapter4_boss.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "完美的午后",
            "suno_prompt": "Perfect afternoon finale, satisfying conclusion, full acoustic band, Pompompurin theme, fulfillment and happiness, golden hour, F major, 112 BPM, warm and complete, contented sigh, best day ever, instrumental",
            "style": "fulfilling,warm,happy",
            "tempo": 112,
            "key": "F major",
            "duration": "90s"
        },
        # 第五章 - 库洛米
        {
            "id": "BGM_018",
            "filename": "bgm_chapter5_mischief.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "捣蛋计划",
            "suno_prompt": "Mischievous prank music, playful and slightly naughty, clarinet and xylophone, cartoon villain vibes, but cute and funny, not scary, D minor, 130 BPM, sneaky but adorable, Kuromi theme, prankster energy, instrumental",
            "style": "mischievous,playful,naughty",
            "tempo": 130,
            "key": "D minor",
            "duration": "60s"
        },
        {
            "id": "BGM_019",
            "filename": "bgm_chapter5_chase.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "追逐游戏",
            "suno_prompt": "Cartoon chase music, fast and exciting, classic cartoon orchestration, Tom and Jerry style, but kawaii version, running and hiding, C minor, 140 BPM, energetic chase, comedic tension, slapstick elements, instrumental",
            "style": "energetic,exciting,comedic",
            "tempo": 140,
            "key": "C minor",
            "duration": "60s"
        },
        {
            "id": "BGM_020",
            "filename": "bgm_chapter5_truth.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "真相浮现",
            "suno_prompt": "Emotional revelation music, transformation from mischief to heart, piano solo building to strings, touching moment, character growth, friendship understanding, A major, 95 BPM, emotional and warm, tears of joy, misunderstood but kind, instrumental",
            "style": "emotional,touching,warm",
            "tempo": 95,
            "key": "A major",
            "duration": "60s"
        },
        {
            "id": "BGM_021",
            "filename": "bgm_chapter5_boss.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "和解与友情",
            "suno_prompt": "Friendship reconciliation finale, emotional climax, orchestral emotional theme, redemption arc, friendship prevails, group hug feeling, D major, 120 BPM, heartfelt and moving, Kuromi joins the friends, happy ending, instrumental",
            "style": "heartfelt,moving,triumphant",
            "tempo": 120,
            "key": "D major",
            "duration": "90s"
        },
        # 第六章 - 双子星
        {
            "id": "BGM_022",
            "filename": "bgm_chapter6_entrance.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "星空入口",
            "suno_prompt": "Dreamy starry entrance, cosmic but kawaii, synthesizer arpeggios with bells, vast space, Little Twin Stars theme, magical portal, E major, 100 BPM, floating in galaxy, shooting stars, nebula colors, instrumental",
            "style": "cosmic,dreamy,magical",
            "tempo": 100,
            "key": "E major",
            "duration": "60s"
        },
        {
            "id": "BGM_023",
            "filename": "bgm_chapter6_galaxy.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "银河漫步",
            "suno_prompt": "Galaxy walking music, weightless and beautiful, ambient electronic with orchestra, space wonder, shimmering sounds, aurora borealis, A major, 95 BPM, slow and majestic, starlight journey, cosmic beauty, instrumental",
            "style": "majestic,beautiful,weightless",
            "tempo": 95,
            "key": "A major",
            "duration": "60s"
        },
        {
            "id": "BGM_024",
            "filename": "bgm_chapter6_constellation.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "星座连线",
            "suno_prompt": "Constellation puzzle music, elegant and smart, connecting dots with sound, geometric beauty, harp and celesta, star patterns, C major, 108 BPM, satisfying connections, puzzle solving, light bulb moments, instrumental",
            "style": "elegant,intelligent,satisfying",
            "tempo": 108,
            "key": "C major",
            "duration": "60s"
        },
        {
            "id": "BGM_025",
            "filename": "bgm_chapter6_final.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "星光庆典",
            "suno_prompt": "Grand finale celebration, all characters together, full orchestral epic with choir, ultimate climax, fireworks and joy, graduation ceremony feeling, C major, 135 BPM, triumphant and emotional, all Sanrio friends, dream come true, best ending ever, instrumental",
            "style": "epic,triumphant,celebratory",
            "tempo": 135,
            "key": "C major",
            "duration": "120s"
        },
        # 特别活动
        {
            "id": "BGM_026",
            "filename": "bgm_event_christmas.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "三丽鸥圣诞派对",
            "suno_prompt": "Christmas Sanrio theme, jingle bells and cute elements, winter wonderland, snowflakes and decorations, classic Christmas melody with kawaii twist, F major, 120 BPM, festive and warm, Hello Kitty Christmas party, instrumental",
            "style": "festive,warm,joyful",
            "tempo": 120,
            "key": "F major",
            "duration": "90s"
        },
        {
            "id": "BGM_027",
            "filename": "bgm_event_halloween.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "三丽鸥万圣节",
            "suno_prompt": "Halloween Sanrio theme, spooky but cute, organ and theremin, trick or treat, not scary, just fun and costumes, D minor, 115 BPM, playful Halloween, Kuromi leading the fun, instrumental",
            "style": "playful,spooky,cute",
            "tempo": 115,
            "key": "D minor",
            "duration": "90s"
        },
        {
            "id": "BGM_028",
            "filename": "bgm_event_valentine.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "三丽鸥情人节",
            "suno_prompt": "Valentine Sanrio theme, romantic and sweet, violin and piano, love letters and chocolates, pink hearts everywhere, confession scene, F major, 100 BPM, heartwarming romance, My Melody's love story, instrumental",
            "style": "romantic,sweet,heartwarming",
            "tempo": 100,
            "key": "F major",
            "duration": "90s"
        },
        # 通用
        {
            "id": "BGM_029",
            "filename": "bgm_story_scene.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "剧情对话BGM",
            "suno_prompt": "Gentle story dialogue background music, emotional and supportive, soft piano with strings, character conversation atmosphere, heartwarming and gentle, C major, 80 BPM, calm and peaceful, story telling music, instrumental",
            "style": "gentle,emotional,calm",
            "tempo": 80,
            "key": "C major",
            "duration": "60s"
        },
        {
            "id": "BGM_030",
            "filename": "bgm_victory.mp3",
            "category": "bgm",
            "folder": "bgm",
            "title": "关卡完成庆祝",
            "suno_prompt": "Victory celebration jingle, triumphant and happy, bright brass with chimes, level complete feeling, satisfying reward sound, C major, 130 BPM, short and impactful, game victory music, instrumental",
            "style": "triumphant,happy,victorious",
            "tempo": 130,
            "key": "C major",
            "duration": "10s"
        }
    ],
    "sfx": [
        {
            "id": "SFX_001",
            "filename": "sfx_match_1.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "消除音效(3连)",
            "elevenlabs_prompt": "Cute pop sound, bubble burst, satisfying mobile game match sound, high pitch ding, magical sparkle, short and sweet, kawaii game effect",
            "duration": "0.5s",
            "volume_db": -8
        },
        {
            "id": "SFX_002",
            "filename": "sfx_match_2.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "消除音效(4连)",
            "elevenlabs_prompt": "Magical chime, ascending scale, sparkle sound, more satisfying than simple pop, fairy dust magic, mobile game power match, cute and impressive",
            "duration": "0.8s",
            "volume_db": -7
        },
        {
            "id": "SFX_003",
            "filename": "sfx_match_3.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "消除音效(5连)",
            "elevenlabs_prompt": "Epic magical explosion, triumphant chime, rainbow sparkle sound, special achievement, combo celebration, spectacular game effect, cascading joy",
            "duration": "1.2s",
            "volume_db": -6
        },
        {
            "id": "SFX_004",
            "filename": "sfx_special_match.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "特殊元素激活",
            "elevenlabs_prompt": "Power-up activation, electric spark, whoosh and zap, special ability ready, magical transformation, energy charge, super power sound",
            "duration": "1.0s",
            "volume_db": -6
        },
        {
            "id": "SFX_005",
            "filename": "sfx_click.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "按钮点击",
            "elevenlabs_prompt": "Cute button click, soft pop, UI selection sound, kawaii interface feedback, gentle tap, mobile game menu click",
            "duration": "0.2s",
            "volume_db": -10
        },
        {
            "id": "SFX_006",
            "filename": "sfx_level_complete.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "关卡完成",
            "elevenlabs_prompt": "Victory fanfare, level complete celebration, triumphant music jingle, achievement unlocked, stars appearing sound, happy and rewarding, mobile game win",
            "duration": "3.0s",
            "volume_db": -5
        },
        {
            "id": "SFX_007",
            "filename": "sfx_level_fail.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "关卡失败",
            "elevenlabs_prompt": "Soft defeat sound, gentle failure jingle, try again encouragement, not scary, cute game over, hopeful retry, uplifting failure",
            "duration": "2.0s",
            "volume_db": -8
        },
        {
            "id": "SFX_008",
            "filename": "sfx_star_get.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "获得星星",
            "elevenlabs_prompt": "Star collection sound, sparkling chime, achievement ping, magical star appear, twinkle and shine, reward acquisition",
            "duration": "0.6s",
            "volume_db": -7
        },
        {
            "id": "SFX_009",
            "filename": "sfx_coin_get.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "获得金币",
            "elevenlabs_prompt": "Coin collection, gold pickup sound, treasure acquisition, satisfying money sound, ching ching, cute coins",
            "duration": "0.4s",
            "volume_db": -8
        },
        {
            "id": "SFX_010",
            "filename": "sfx_swap.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "元素交换",
            "elevenlabs_prompt": "Swap sound, whoosh slide, element exchange, smooth transition, quick movement, game piece slide",
            "duration": "0.3s",
            "volume_db": -10
        },
        {
            "id": "SFX_011",
            "filename": "sfx_swap_fail.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "无效交换",
            "elevenlabs_prompt": "Invalid move sound, gentle error notification, soft buzz, not allowed action, cute rejection, try again hint",
            "duration": "0.4s",
            "volume_db": -10
        },
        {
            "id": "SFX_012",
            "filename": "sfx_piece_drop.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "元素下落",
            "elevenlabs_prompt": "Gentle drop sound, soft thud, candy falling, cute landing, game piece settle, light impact",
            "duration": "0.2s",
            "volume_db": -12
        },
        {
            "id": "SFX_013",
            "filename": "sfx_ice_break.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "冰块破碎",
            "elevenlabs_prompt": "Ice breaking sound, crystal shatter, frozen block cracking, magical ice melt, glass breaking but cute, frosty destruction",
            "duration": "0.5s",
            "volume_db": -8
        },
        {
            "id": "SFX_014",
            "filename": "sfx_chocolate_clear.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "巧克力清除",
            "elevenlabs_prompt": "Chocolate melting sound, cocoa dissolve, sweet dessert destruction, gooey splash, yummy break",
            "duration": "0.6s",
            "volume_db": -8
        },
        {
            "id": "SFX_015",
            "filename": "sfx_dialogue_pop.mp3",
            "category": "sfx",
            "folder": "sfx",
            "title": "对话框弹出",
            "elevenlabs_prompt": "Dialogue box appear, cute popup sound, speech bubble notification, character talk start, friendly alert",
            "duration": "0.3s",
            "volume_db": -10
        }
    ]
}


def create_directory_structure():
    """创建音频文件夹结构"""
    base_dir = MUSIC_CONFIG["output_dir"]

    dirs = [
        f"{base_dir}/bgm",
        f"{base_dir}/sfx",
        f"{base_dir}/voices/hello_kitty",
        f"{base_dir}/voices/my_melody",
        f"{base_dir}/voices/cinnamonroll",
        f"{base_dir}/voices/pompompurin",
        f"{base_dir}/voices/kuromi",
        f"{base_dir}/voices/keroppi",
        f"{base_dir}/voices/badtz_maru",
        f"{base_dir}/voices/little_twin_stars",
    ]

    for d in dirs:
        os.makedirs(d, exist_ok=True)
        print(f"✅ 创建文件夹: {d}")


def generate_suno_commands():
    """生成Suno AI批量生成命令"""
    commands = []

    for track in MUSIC_CONFIG["tracks"]:
        cmd = {
            "title": track["title"],
            "filename": track["filename"],
            "prompt": track["suno_prompt"],
            "style": track["style"],
            "tempo": track["tempo"],
            "key": track["key"]
        }
        commands.append(cmd)

    return commands


def generate_elevenlabs_commands():
    """生成ElevenLabs音效命令"""
    commands = []

    for sfx in MUSIC_CONFIG["sfx"]:
        cmd = {
            "title": sfx["title"],
            "filename": sfx["filename"],
            "prompt": sfx["elevenlabs_prompt"],
            "duration": sfx["duration"]
        }
        commands.append(cmd)

    return commands


def create_download_script():
    """创建下载/整理脚本"""
    script_content = '''#!/bin/bash
# 三丽鸥梦幻消消乐 - 音频文件整理脚本
# 使用方法: 将从AI工具下载的文件放在downloads文件夹，然后运行此脚本

echo "🎵 开始整理音频文件..."

# 创建下载目录
mkdir -p downloads/bgm
mkdir -p downloads/sfx

# 提示用户
echo ""
echo "📥 请将下载的音频文件放入对应文件夹:"
echo "  - BGM文件 → downloads/bgm/"
echo "  - 音效文件 → downloads/sfx/"
echo ""
read -p "放好后按回车键继续..."

# 复制并重命名BGM
echo "🎼 整理背景音乐..."
cp downloads/bgm/* bgm/ 2>/dev/null || echo "⚠️ 未找到BGM文件"

# 复制并重命名音效
echo "🔊 整理音效..."
cp downloads/sfx/* sfx/ 2>/dev/null || echo "⚠️ 未找到音效文件"

# 检查文件
echo ""
echo "📊 文件整理完成:"
echo "BGM文件数: $(ls -1 bgm/*.mp3 2>/dev/null | wc -l)"
echo "音效文件数: $(ls -1 sfx/*.mp3 2>/dev/null | wc -l)"

echo ""
echo "✅ 完成！"
'''

    with open(f"{MUSIC_CONFIG['output_dir']}/organize_files.sh", "w") as f:
        f.write(script_content)

    os.chmod(f"{MUSIC_CONFIG['output_dir']}/organize_files.sh", 0o755)
    print("✅ 创建文件整理脚本: organize_files.sh")


def create_batch_generator_html():
    """创建增强版HTML生成器"""
    html_content = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎵 三丽鸥消消乐 - AI音乐批量生成器</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1400px; margin: 0 auto; }
        header {
            text-align: center;
            margin-bottom: 30px;
            color: white;
        }
        h1 { font-size: 2.5em; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .subtitle { opacity: 0.9; font-size: 1.1em; }

        .batch-controls {
            background: white;
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .batch-controls h2 {
            color: #667eea;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .control-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1em;
            font-weight: bold;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102,126,234,0.4);
        }

        .btn-secondary {
            background: #f0f0f0;
            color: #333;
            border: 2px solid #667eea;
            padding: 12px 25px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.3s;
        }

        .btn-secondary:hover {
            background: #667eea;
            color: white;
        }

        .progress-section {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }

        .progress-bar {
            height: 30px;
            background: #e0e0e0;
            border-radius: 15px;
            overflow: hidden;
            margin-bottom: 10px;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            width: 0%;
            transition: width 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        .music-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
        }

        .track-card {
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .track-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .track-card.generated {
            border-color: #4CAF50;
            background: #f1f8f4;
        }

        .track-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .track-title {
            font-weight: bold;
            color: #333;
            font-size: 1.1em;
        }

        .track-badge {
            background: #667eea;
            color: white;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.75em;
        }

        .track-meta {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }

        .meta-tag {
            background: #f0f0f0;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.8em;
            color: #666;
        }

        .prompt-preview {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 12px;
            font-size: 0.85em;
            color: #666;
            margin-bottom: 15px;
            max-height: 80px;
            overflow: hidden;
            position: relative;
            line-height: 1.5;
        }

        .prompt-preview::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: linear-gradient(transparent, #f8f9fa);
        }

        .track-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }

        .btn-copy {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.85em;
            transition: all 0.3s;
        }

        .btn-copy:hover { background: #5568d3; }

        .btn-generate {
            background: #764ba2;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.85em;
            transition: all 0.3s;
        }

        .btn-generate:hover { background: #6a4190; }

        .status-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
        }

        .status-pending { background: #ffc107; }
        .status-generated { background: #4CAF50; }

        .category-section {
            margin-bottom: 40px;
        }

        .category-title {
            color: white;
            font-size: 1.5em;
            margin-bottom: 20px;
            padding: 10px 20px;
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
            display: inline-block;
        }

        .toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #333;
            color: white;
            padding: 15px 30px;
            border-radius: 30px;
            opacity: 0;
            transition: all 0.3s;
            z-index: 1000;
            font-weight: bold;
        }

        .toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }

        .instructions {
            background: rgba(255,255,255,0.95);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 30px;
            color: #333;
        }

        .instructions h3 {
            color: #667eea;
            margin-bottom: 15px;
        }

        .instructions ol {
            margin-left: 20px;
            line-height: 2;
        }

        .instructions li {
            margin-bottom: 5px;
        }

        @media (max-width: 768px) {
            h1 { font-size: 1.8em; }
            .music-grid { grid-template-columns: 1fr; }
            .track-actions { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🎀 三丽鸥梦幻消消乐</h1>
            <p class="subtitle">AI音乐批量生成器 | 30首BGM + 15个音效一键生成</p>
        </header>

        <div class="instructions">
            <h3>📖 使用说明</h3>
            <ol>
                <li><strong>单个生成</strong>：点击任意曲目的"🎵 去Suno生成"按钮，会自动跳转到Suno AI并复制提示词</li>
                <li><strong>批量生成</strong>：点击下方的"📋 复制全部提示词"，然后使用Suno AI的批量功能</li>
                <li><strong>生成设置</strong>：在Suno AI中选择 <strong>Custom Mode</strong> → <strong>Instrumental</strong>（无歌词）</li>
                <li><strong>下载整理</strong>：生成完成后下载MP3文件，按照右侧显示的文件夹结构存放</li>
            </ol>
            <p style="margin-top: 15px; color: #667eea; font-weight: bold;">
                💡 提示：建议按章节分批生成，每批4-5首，避免浏览器卡顿
            </p>
        </div>

        <div class="batch-controls">
            <h2>🚀 批量操作</h2>
            <div class="control-grid">
                <button class="btn-primary" onclick="copyAllBGM()">
                    📋 复制全部BGM提示词
                </button>
                <button class="btn-primary" onclick="copyAllSFX()">
                    📋 复制全部音效提示词
                </button>
                <button class="btn-secondary" onclick="openSuno()">
                    🎵 打开 Suno AI
                </button>
                <button class="btn-secondary" onclick="openElevenLabs()">
                    🔊 打开 ElevenLabs
                </button>
            </div>

            <div class="progress-section">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>生成进度</span>
                    <span id="progressText">0 / 45</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill">0%</div>
                </div>
                <p style="color: #666; font-size: 0.9em; margin-top: 10px;">
                    已生成: <span id="generatedCount">0</span> | 待生成: <span id="pendingCount">45</span>
                </p>
            </div>
        </div>

        <div id="musicContainer"></div>
    </div>

    <div class="toast" id="toast"></div>

    <script>
        // 音乐数据
        const musicData = ''' + json.dumps(MUSIC_CONFIG, ensure_ascii=False) + ''';

        let generatedTracks = new Set();

        // 渲染音乐列表
        function renderMusicList() {
            const container = document.getElementById('musicContainer');
            let html = '';

            // BGM部分
            html += '<div class="category-section">';
            html += '<div class="category-title">🎼 背景音乐 (30首)</div>';
            html += '<div class="music-grid">';

            musicData.tracks.forEach((track, index) => {
                html += createTrackCard(track, 'bgm', index);
            });

            html += '</div></div>';

            // 音效部分
            html += '<div class="category-section">';
            html += '<div class="category-title">🔊 游戏音效 (15个)</div>';
            html += '<div class="music-grid">';

            musicData.sfx.forEach((sfx, index) => {
                html += createSFXCard(sfx, index);
            });

            html += '</div></div>';

            container.innerHTML = html;
        }

        // 创建BGM卡片
        function createTrackCard(track, type, index) {
            const isGenerated = generatedTracks.has(track.id);
            const statusClass = isGenerated ? 'generated' : '';
            const statusIcon = isGenerated ? '✅' : '⏳';

            return `
                <div class="track-card ${statusClass}" id="track-${track.id}">
                    <div class="track-header">
                        <span class="track-title">${statusIcon} ${track.title}</span>
                        <span class="track-badge">${track.key}</span>
                    </div>
                    <div class="track-meta">
                        <span class="meta-tag">⏱️ ${track.tempo}</span>
                        <span class="meta-tag">🎵 ${track.style}</span>
                        <span class="meta-tag">📁 ${track.folder}</span>
                    </div>
                    <div class="prompt-preview">${track.suno_prompt}</div>
                    <div class="track-actions">
                        <button class="btn-copy" onclick="copyPrompt('${track.suno_prompt.replace(/'/g, "\\'")}', '${track.id}')">
                            📋 复制
                        </button>
                        <button class="btn-generate" onclick="openSuno('${track.suno_prompt.replace(/'/g, "\\'")}')">
                            🎵 去Suno生成
                        </button>
                    </div>
                </div>
            `;
        }

        // 创建音效卡片
        function createSFXCard(sfx, index) {
            const isGenerated = generatedTracks.has(sfx.id);
            const statusClass = isGenerated ? 'generated' : '';
            const statusIcon = isGenerated ? '✅' : '⏳';

            return `
                <div class="track-card ${statusClass}" id="track-${sfx.id}">
                    <div class="track-header">
                        <span class="track-title">${statusIcon} ${sfx.title}</span>
                        <span class="track-badge">SFX</span>
                    </div>
                    <div class="track-meta">
                        <span class="meta-tag">⏱️ ${sfx.duration}</span>
                        <span class="meta-tag">🔊 ${sfx.volume_db}dB</span>
                        <span class="meta-tag">📁 ${sfx.folder}</span>
                    </div>
                    <div class="prompt-preview">${sfx.elevenlabs_prompt}</div>
                    <div class="track-actions">
                        <button class="btn-copy" onclick="copyPrompt('${sfx.elevenlabs_prompt.replace(/'/g, "\\'")}', '${sfx.id}')">
                            📋 复制
                        </button>
                        <button class="btn-generate" onclick="openElevenLabs()">
                            🔊 去ElevenLabs
                        </button>
                    </div>
                </div>
            `;
        }

        // 复制提示词
        function copyPrompt(text, trackId) {
            navigator.clipboard.writeText(text).then(() => {
                if (trackId) {
                    generatedTracks.add(trackId);
                    updateProgress();
                    highlightCard(trackId);
                }
                showToast('✅ 提示词已复制！');
            });
        }

        // 复制全部BGM
        function copyAllBGM() {
            let allPrompts = '🎵 三丽鸥消消乐 - BGM提示词列表\\n\\n';
            musicData.tracks.forEach((track, i) => {
                allPrompts += `${i+1}. ${track.title}\\n`;
                allPrompts += `文件名: ${track.filename}\\n`;
                allPrompts += `提示词: ${track.suno_prompt}\\n\\n`;
            });

            navigator.clipboard.writeText(allPrompts).then(() => {
                showToast('✅ 全部BGM提示词已复制！');
            });
        }

        // 复制全部音效
        function copyAllSFX() {
            let allPrompts = '🔊 三丽鸥消消乐 - 音效提示词列表\\n\\n';
            musicData.sfx.forEach((sfx, i) => {
                allPrompts += `${i+1}. ${sfx.title}\\n`;
                allPrompts += `文件名: ${sfx.filename}\\n`;
                allPrompts += `提示词: ${sfx.elevenlabs_prompt}\\n\\n`;
            });

            navigator.clipboard.writeText(allPrompts).then(() => {
                showToast('✅ 全部音效提示词已复制！');
            });
        }

        // 打开Suno AI
        function openSuno(prompt) {
            if (prompt) {
                copyPrompt(prompt);
                setTimeout(() => {
                    window.open('https://suno.ai', '_blank');
                }, 500);
            } else {
                window.open('https://suno.ai', '_blank');
            }
        }

        // 打开ElevenLabs
        function openElevenLabs() {
            window.open('https://elevenlabs.io/sound-effects', '_blank');
        }

        // 高亮卡片
        function highlightCard(trackId) {
            const card = document.getElementById(`track-${trackId}`);
            if (card) {
                card.classList.add('generated');
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        // 更新进度
        function updateProgress() {
            const total = musicData.tracks.length + musicData.sfx.length;
            const generated = generatedTracks.size;
            const percentage = Math.round((generated / total) * 100);

            document.getElementById('progressText').textContent = `${generated} / ${total}`;
            document.getElementById('progressFill').style.width = `${percentage}%`;
            document.getElementById('progressFill').textContent = `${percentage}%`;
            document.getElementById('generatedCount').textContent = generated;
            document.getElementById('pendingCount').textContent = total - generated;
        }

        // 显示提示
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // 初始化
        document.addEventListener('DOMContentLoaded', () => {
            renderMusicList();
            updateProgress();
        });
    </script>
</body>
</html>
'''

    filepath = f"{MUSIC_CONFIG['output_dir']}/batch_generator.html"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"✅ 创建批量生成器: {filepath}")


def main():
    """主函数"""
    print("=" * 60)
    print("🎵 三丽鸥梦幻消消乐 - AI音乐生成工具")
    print("=" * 60)
    print()

    # 创建文件夹结构
    print("📁 创建音频文件夹结构...")
    create_directory_structure()
    print()

    # 生成配置文件
    print("📝 生成配置文件...")

    # 保存完整配置
    config_path = f"{MUSIC_CONFIG['output_dir']}/music_config.json"
    with open(config_path, "w", encoding="utf-8") as f:
        json.dump(MUSIC_CONFIG, f, ensure_ascii=False, indent=2)
    print(f"✅ 音乐配置: {config_path}")

    # 生成批量生成器HTML
    create_batch_generator_html()

    # 创建文件整理脚本
    create_download_script()

    print()
    print("=" * 60)
    print("🎉 完成！请按以下步骤操作:")
    print("=" * 60)
    print()
    print("1️⃣ 打开批量生成器:")
    print(f"   open {MUSIC_CONFIG['output_dir']}/batch_generator.html")
    print()
    print("2️⃣ 在浏览器中:")
    print("   - 点击'复制全部BGM提示词'")
    print("   - 或逐个点击'去Suno生成'")
    print()
    print("3️⃣ 在Suno AI中:")
    print("   - 选择 Custom Mode")
    print("   - 选择 Instrumental (无歌词)")
    print("   - 粘贴提示词生成")
    print()
    print("4️⃣ 下载文件到对应文件夹:")
    print("   - BGM → assets/audio/bgm/")
    print("   - 音效 → assets/audio/sfx/")
    print()
    print("📊 统计:")
    print(f"   - 背景音乐: {len(MUSIC_CONFIG['tracks'])} 首")
    print(f"   - 游戏音效: {len(MUSIC_CONFIG['sfx'])} 个")
    print(f"   - 总计: {len(MUSIC_CONFIG['tracks']) + len(MUSIC_CONFIG['sfx'])} 个音频文件")
    print()


if __name__ == "__main__":
    main()
