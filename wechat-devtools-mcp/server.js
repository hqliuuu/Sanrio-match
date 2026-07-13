#!/usr/bin/env node
/**
 * 微信开发者工具 MCP 服务器
 * 提供自动化编译、预览、上传等功能
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');
const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const util = require('util');
const execAsync = util.promisify(exec);

// 微信开发者工具 CLI 路径
const WECHAT_DEVTOOLS_CLI = '/Applications/wechatwebdevtools.app/Contents/MacOS/cli';

// 检查微信开发者工具是否安装
async function checkWechatDevtools() {
  try {
    await execAsync(`test -f "${WECHAT_DEVTOOLS_CLI}"`);
    return true;
  } catch {
    return false;
  }
}

// 执行微信开发者工具命令（自动处理服务端口开启提示）
async function runWechatCli(args, projectPath) {
  const fullArgs = projectPath ? [...args, '--project', projectPath] : args;
  return new Promise((resolve, reject) => {
    const child = spawn(WECHAT_DEVTOOLS_CLI, fullArgs, {
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: false
    });

    let stdout = '';
    let stderr = '';
    let stdinWrite = false;

    // 自动回答"是否开启服务端口"的提示
    const checkAndRespond = (data) => {
      const text = data.toString();
      // 检测到服务端口提示时自动输入 y
      if (text.includes('Enable IDE Service') ||
          text.includes('服务端口') ||
          text.includes('Enable IDE') ||
          text.includes('y/N')) {
        if (!stdinWrite && child.stdin.writable) {
          child.stdin.write('y\n');
          stdinWrite = true;
          console.error('📝 自动确认开启服务端口');
        }
      }
    };

    child.stdout.on('data', (data) => {
      const text = data.toString();
      stdout += text;
      checkAndRespond(data);
    });

    child.stderr.on('data', (data) => {
      const text = data.toString();
      stderr += text;
      checkAndRespond(data);
    });

    child.on('close', (code) => {
      // 检查 stderr 中是否有服务端口相关的错误
      if (stderr.includes('服务端口已关闭') || stderr.includes('service port disabled')) {
        resolve({
          success: false,
          code: 1,
          stdout,
          stderr: '❌ 工具的服务端口已关闭。请手动打开微信开发者工具 -> 设置 -> 安全设置 -> 开启服务端口',
          needsPort: true
        });
      } else {
        resolve({ success: code === 0, code, stdout, stderr });
      }
    });

    child.on('error', (err) => {
      reject(err);
    });

    // 30秒超时
    setTimeout(() => {
      child.kill();
      reject(new Error('Command timeout after 30s'));
    }, 30000);
  });
}

// 创建 MCP 服务器
const server = new Server(
  {
    name: 'wechat-devtools-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 定义可用工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'check_installation',
        description: '检查微信开发者工具是否已安装',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      {
        name: 'enable_service_port',
        description: '启用微信开发者工具的服务端口（需要手动在微信开发者工具中开启）',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      {
        name: 'open_project',
        description: '在微信开发者工具中打开项目',
        inputSchema: {
          type: 'object',
          properties: {
            projectPath: {
              type: 'string',
              description: '项目绝对路径',
            },
          },
          required: ['projectPath'],
        },
      },
      {
        name: 'build_npm',
        description: '编译项目中的 npm 包',
        inputSchema: {
          type: 'object',
          properties: {
            projectPath: {
              type: 'string',
              description: '项目绝对路径',
            },
          },
          required: ['projectPath'],
        },
      },
      {
        name: 'compile',
        description: '编译项目（构建）',
        inputSchema: {
          type: 'object',
          properties: {
            projectPath: {
              type: 'string',
              description: '项目绝对路径',
            },
            mode: {
              type: 'string',
              enum: ['debug', 'release'],
              description: '编译模式：debug 或 release',
              default: 'debug',
            },
          },
          required: ['projectPath'],
        },
      },
      {
        name: 'preview',
        description: '生成预览二维码',
        inputSchema: {
          type: 'object',
          properties: {
            projectPath: {
              type: 'string',
              description: '项目绝对路径',
            },
          },
          required: ['projectPath'],
        },
      },
      {
        name: 'auto_compile',
        description: '自动编译并预览（开发模式）',
        inputSchema: {
          type: 'object',
          properties: {
            projectPath: {
              type: 'string',
              description: '项目绝对路径',
            },
            enableAutoPreview: {
              type: 'boolean',
              description: '是否自动生成预览二维码',
              default: true,
            },
          },
          required: ['projectPath'],
        },
      },
      {
        name: 'get_project_info',
        description: '获取项目信息',
        inputSchema: {
          type: 'object',
          properties: {
            projectPath: {
              type: 'string',
              description: '项目绝对路径',
            },
          },
          required: ['projectPath'],
        },
      },
      {
        name: 'close_project',
        description: '关闭项目',
        inputSchema: {
          type: 'object',
          properties: {
            projectPath: {
              type: 'string',
              description: '项目绝对路径',
            },
          },
          required: ['projectPath'],
        },
      },
    ],
  };
});

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'check_installation': {
        const installed = await checkWechatDevtools();
        return {
          content: [
            {
              type: 'text',
              text: installed
                ? `✅ 微信开发者工具已安装\n路径: ${WECHAT_DEVTOOLS_CLI}\n\n⚠️ 注意：使用 CLI 前需要手动开启服务端口：\n1. 打开微信开发者工具\n2. 点击菜单栏「设置」->「安全设置」\n3. 勾选「开启服务端口」`
                : `❌ 微信开发者工具未安装\n请从 https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html 下载安装`,
            },
          ],
        };
      }

      case 'enable_service_port': {
        return {
          content: [
            {
              type: 'text',
              text: `📋 开启服务端口步骤：

1. 打开微信开发者工具
2. 点击顶部菜单「设置」->「安全设置」
3. 在「安全」选项卡中找到「服务端口」
4. 勾选「开启服务端口」
5. 重启微信开发者工具

开启后，CLI 命令就可以正常使用了。

参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html`,
            },
          ],
        };
      }

      case 'open_project': {
        const { projectPath } = args;
        if (!fs.existsSync(projectPath)) {
          return {
            content: [
              { type: 'text', text: `❌ 项目路径不存在: ${projectPath}` },
            ],
            isError: true,
          };
        }
        const result = await runWechatCli(['--open', projectPath]);
        return {
          content: [
            {
              type: 'text',
              text: result.success
                ? `✅ 项目已打开\n${result.stdout}`
                : result.needsPort
                ? `❌ ${result.stderr}`
                : `❌ 打开项目失败\n${result.stderr}`,
            },
          ],
          isError: !result.success,
        };
      }

      case 'build_npm': {
        const { projectPath } = args;
        const result = await runWechatCli(['--build-npm'], projectPath);
        return {
          content: [
            {
              type: 'text',
              text: result.success
                ? `✅ npm 编译成功\n${result.stdout}`
                : result.needsPort
                ? `❌ ${result.stderr}`
                : `❌ npm 编译失败\n${result.stderr}`,
            },
          ],
          isError: !result.success,
        };
      }

      case 'compile': {
        const { projectPath, mode = 'debug' } = args;
        // 微信开发者工具没有直接的 compile 命令，使用 preview 触发编译
        const result = await runWechatCli(['preview'], projectPath);
        return {
          content: [
            {
              type: 'text',
              text: result.success
                ? `✅ ${mode === 'release' ? '发布' : '调试'}编译成功\n${result.stdout}`
                : result.needsPort
                ? `❌ ${result.stderr}`
                : `❌ 编译失败（可能是网络问题或项目文件过大）\n${result.stderr}`,
            },
          ],
          isError: !result.success,
        };
      }

      case 'preview': {
        const { projectPath } = args;
        const result = await runWechatCli(['--preview'], projectPath);
        return {
          content: [
            {
              type: 'text',
              text: result.success
                ? `✅ 预览二维码已生成\n${result.stdout}`
                : result.needsPort
                ? `❌ ${result.stderr}`
                : `❌ 生成预览二维码失败\n${result.stderr}`,
            },
          ],
          isError: !result.success,
        };
      }

      case 'auto_compile': {
        const { projectPath, enableAutoPreview = true } = args;
        const steps = [];

        // 1. 检查项目路径
        if (!fs.existsSync(projectPath)) {
          return {
            content: [
              { type: 'text', text: `❌ 项目路径不存在: ${projectPath}` },
            ],
            isError: true,
          };
        }
        steps.push('✅ 项目路径验证通过');

        // 2. 检查是否有 package.json 需要构建 npm
        const packageJsonPath = path.join(projectPath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          steps.push('📦 检测到 package.json，正在编译 npm...');
          const npmResult = await runWechatCli(['--build-npm'], projectPath);
          if (npmResult.success) {
            steps.push('✅ npm 编译完成');
          } else if (npmResult.needsPort) {
            return {
              content: [
                {
                  type: 'text',
                  text: steps.join('\n') + `\n❌ ${npmResult.stderr}`,
                },
              ],
              isError: true,
            };
          } else {
            steps.push(`⚠️ npm 编译警告: ${npmResult.stderr}`);
          }
        }

        // 3. 编译项目
        steps.push('🔨 正在编译项目...');
        const compileResult = await runWechatCli(['preview'], projectPath);
        if (compileResult.success) {
          steps.push('✅ 项目编译成功');
        } else if (compileResult.needsPort) {
          return {
            content: [
              {
                type: 'text',
                text: steps.join('\n') + `\n❌ ${compileResult.stderr}`,
              },
            ],
            isError: true,
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: steps.join('\n') + `\n❌ 编译失败:\n${compileResult.stderr}`,
              },
            ],
            isError: true,
          };
        }

        // 4. 生成预览（可选）
        if (enableAutoPreview) {
          steps.push('📱 正在生成预览二维码...');
          const previewResult = await runWechatCli(['--preview'], projectPath);
          if (previewResult.success) {
            steps.push('✅ 预览二维码已生成');
          } else if (previewResult.needsPort) {
            steps.push(`⚠️ 预览生成警告: ${previewResult.stderr}`);
          } else {
            steps.push(`⚠️ 预览生成警告: ${previewResult.stderr}`);
          }
        }

        return {
          content: [
            {
              type: 'text',
              text: steps.join('\n') + '\n\n🎉 自动编译完成！',
            },
          ],
        };
      }

      case 'get_project_info': {
        const { projectPath } = args;
        const projectConfigPath = path.join(projectPath, 'project.config.json');
        const gameJsonPath = path.join(projectPath, 'game.json');
        const appJsonPath = path.join(projectPath, 'app.json');

        let info = [`项目路径: ${projectPath}`];

        if (fs.existsSync(projectConfigPath)) {
          const config = JSON.parse(fs.readFileSync(projectConfigPath, 'utf8'));
          info.push(`\n📋 project.config.json:`);
          info.push(`  - 项目名称: ${config.projectname || 'N/A'}`);
          info.push(`  - AppID: ${config.appid || 'N/A'}`);
          info.push(`  - 描述: ${config.description || 'N/A'}`);
        }

        if (fs.existsSync(gameJsonPath)) {
          const gameConfig = JSON.parse(fs.readFileSync(gameJsonPath, 'utf8'));
          info.push(`\n🎮 game.json:`);
          info.push(`  - 游戏名称: ${gameConfig.name || 'N/A'}`);
          info.push(`  - 方向: ${gameConfig.deviceOrientation || 'N/A'}`);
        }

        if (fs.existsSync(appJsonPath)) {
          const appConfig = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
          info.push(`\n📱 app.json:`);
          info.push(`  - 页面数: ${appConfig.pages?.length || 0}`);
        }

        return {
          content: [
            { type: 'text', text: info.join('\n') },
          ],
        };
      }

      case 'close_project': {
        const { projectPath } = args;
        const result = await runWechatCli(['--close'], projectPath);
        return {
          content: [
            {
              type: 'text',
              text: result.success
                ? `✅ 项目已关闭\n${result.stdout}`
                : result.needsPort
                ? `❌ ${result.stderr}`
                : `❌ 关闭项目失败\n${result.stderr}`,
            },
          ],
          isError: !result.success,
        };
      }

      default:
        return {
          content: [{ type: 'text', text: `未知工具: ${name}` }],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        { type: 'text', text: `❌ 执行出错: ${error.message}` },
      ],
      isError: true,
    };
  }
});

// 启动服务器
async function main() {
  // 检查微信开发者工具
  const installed = await checkWechatDevtools();
  if (!installed) {
    console.error('⚠️ 警告: 微信开发者工具未安装或路径不正确');
    console.error(`期望路径: ${WECHAT_DEVTOOLS_CLI}`);
  } else {
    console.error('✅ 微信开发者工具 MCP 服务器已启动');
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
