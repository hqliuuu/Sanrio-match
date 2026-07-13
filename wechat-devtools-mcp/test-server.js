#!/usr/bin/env node
/**
 * 测试微信开发者工具 MCP 服务器
 */

const { spawn } = require('child_process');

// 启动 MCP 服务器
const server = spawn('node', [__dirname + '/server.js'], {
  stdio: ['pipe', 'pipe', 'pipe'],
});

let output = '';
let errorOutput = '';

server.stdout.on('data', (data) => {
  output += data.toString();
});

server.stderr.on('data', (data) => {
  errorOutput += data.toString();
  console.log('Server log:', data.toString().trim());
});

// 等待服务器启动
setTimeout(() => {
  console.log('\n=== 测试 1: 检查安装 ===');

  // 发送检查安装请求
  const checkRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'check_installation',
      arguments: {},
    },
  };

  const listRequest = {
    jsonrpc: '2.0',
    id: 0,
    method: 'tools/list',
    params: {},
  };

  // 先发送 list 请求
  server.stdin.write(JSON.stringify(listRequest) + '\n');

  setTimeout(() => {
    server.stdin.write(JSON.stringify(checkRequest) + '\n');
  }, 1000);

  setTimeout(() => {
    console.log('\n=== 测试 2: 获取项目信息 ===');
    const projectRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'get_project_info',
        arguments: {
          projectPath: '/Users/didi/sanrio-match',
        },
      },
    };
    server.stdin.write(JSON.stringify(projectRequest) + '\n');
  }, 2000);

  // 5秒后关闭
  setTimeout(() => {
    console.log('\n=== 关闭测试 ===');
    server.kill();
    console.log('\n✅ 测试完成');
  }, 5000);
}, 1000);

server.on('close', (code) => {
  console.log(`\nServer exited with code ${code}`);
});
