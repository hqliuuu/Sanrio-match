# 微信开发者工具 MCP 服务器

为 Claude Code 提供微信开发者工具自动化功能的 MCP 服务器。

## 功能

- ✅ 检查微信开发者工具安装状态
- 🔓 打开/关闭项目
- 📦 编译 npm 包
- 🔨 编译项目（debug/release 模式）
- 📱 生成预览二维码
- 🚀 一键自动编译并预览
- 📋 获取项目信息

## 工具列表

### check_installation
检查微信开发者工具是否已安装

### open_project
在微信开发者工具中打开项目
- 参数: `projectPath` (string) - 项目绝对路径

### build_npm
编译项目中的 npm 包
- 参数: `projectPath` (string) - 项目绝对路径

### compile
编译项目
- 参数:
  - `projectPath` (string) - 项目绝对路径
  - `mode` (string) - 编译模式: "debug" 或 "release" (默认: debug)

### preview
生成预览二维码
- 参数: `projectPath` (string) - 项目绝对路径

### auto_compile
自动编译并预览（开发模式）
- 参数:
  - `projectPath` (string) - 项目绝对路径
  - `enableAutoPreview` (boolean) - 是否自动生成预览二维码 (默认: true)

### get_project_info
获取项目信息
- 参数: `projectPath` (string) - 项目绝对路径

### close_project
关闭项目
- 参数: `projectPath` (string) - 项目绝对路径

## 配置

项目根目录已创建 `.mcp.json` 文件，Claude Code 会自动加载此 MCP 服务器。

## 使用示例

### 检查安装
```
使用 wechat-devtools 检查微信开发者工具是否安装
```

### 自动编译当前项目
```
使用 wechat-devtools 的 auto_compile 工具，项目路径为 /Users/didi/sanrio-match
```

### 编译并预览
```
使用 wechat-devtools 编译 sanrio-match 项目并生成预览二维码
```

## 技术细节

- 基于 MCP SDK 1.0.0 构建
- 使用微信开发者工具 CLI: `/Applications/wechatwebdevtools.app/Contents/MacOS/cli`
- 支持 macOS（可通过修改 CLI 路径适配其他平台）
