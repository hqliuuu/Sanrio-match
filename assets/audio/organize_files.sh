#!/bin/bash
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
