# ai-coding-config

快速配置国产 AI 平台到主流 AI 编程工具的 CLI 工具。

## 功能特性

- 支持智谱 GLM、阿里云百炼、火山引擎方舟等国产 AI 平台
- 支持 Cline、Cursor、Claude Code 等主流 AI 编程工具
- 交互式配置，简单易用
- 自动检测工具安装状态

## 支持的平台

| 平台 | ID | 默认模型 |
|------|----|----------|
| 智谱 GLM | zhipu | glm-4.7 |
| 阿里云百炼 | ali | qwen-coder-plus |
| 火山引擎方舟 | volcengine | doubao-pro-256k |

## 支持的工具

| 工具 | ID | 配置文件 |
|------|----|----------|
| Cline | cline | ~/.vscode/settings.json |
| Cursor | cursor | ~/.cursor/settings.json |
| Claude Code | claude-code | ~/.claude/config.json |

## 安装

```bash
npm install -g ai-coding-config
```

## 使用方法

```bash
# 初始化配置
ai-coding-config init
```

按照交互式提示选择平台、输入 API Key、选择工具即可完成配置。

## 开发

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
npm install

# 编译
npm run build

# 开发模式运行
npm run dev
```

## 赞助

如果您觉得这个工具对您有帮助，欢迎赞助支持：

<div align="center">
  <h3>支付宝</h3>
  <img src="./sponsor/alipay.jpg" alt="支付宝收款码" width="200"/>
  
  <h3>微信支付</h3>
  <img src="./sponsor/wepay.jpg" alt="微信收款码" width="200"/>
</div>

## 许可证

MIT
