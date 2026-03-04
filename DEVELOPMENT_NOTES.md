# 开发笔记

## 项目概述
ai-coding-config 是一个用于快速配置国产 AI 平台到主流 AI 编程工具的 CLI 工具。

## 当前支持的平台
- 智谱 GLM (zhipu)
- 阿里云百炼 (ali) 
- 火山引擎方舟 (volcengine)

## 当前支持的工具
- Claude Code (claude-code)
- OpenCode (opencode)
- Codex (codex)
- Qwen Code (qwen)
- Kilo CLI (kilo)

## 工具配置详情

### Claude Code
- 配置文件: `~/.claude/settings.json`
- 配置格式: JSON with env object
- API Key 存储在: `ANTHROPIC_AUTH_TOKEN`
- Base URL: `https://coding.dashscope.aliyuncs.com/apps/anthropic`

### OpenCode
- 配置文件: `~/.config/opencode/opencode.json`
- 配置格式: JSON with provider schema
- Base URL: `https://coding.dashscope.aliyuncs.com/apps/anthropic/v1`

### Codex
- 配置文件: `~/.codex/config.toml`
- 配置格式: TOML
- Base URL: `https://coding.dashscope.aliyuncs.com/v1`

### Qwen Code
- 配置文件: `~/.qwen/settings.json`
- 配置格式: JSON with modelProviders
- Base URL: `https://coding.dashscope.aliyuncs.com/v1`

### Kilo CLI
- 配置文件: `~/.config/kilo/config.json`
- 配置格式: JSON with provider schema
- Base URL: `https://coding.dashscope.aliyuncs.com/apps/anthropic/v1`

## 功能特性
- 交互式配置界面
- 自动检测工具安装状态
- 平台切换功能 (switch)
- API Key 更新功能 (update-key)
- 本地存储管理不同平台的配置
- 赞助信息展示 (包含支付宝和微信支付二维码)

## 重要实现细节
- 使用 `claude --version` 检测 Claude Code 安装
- 使用 `opencode -v` 检测 OpenCode 安装
- 使用 `kilo --version` 检测 Kilo CLI 安装
- 使用 `codex --version` 检测 Codex 安装
- 使用 `qwen --version` 检测 Qwen Code 安装
- 阿里云百炼 API Key 获取地址: https://bailian.console.aliyun.com/cn-beijing/?tab=coding-plan#/efm/detail

## 本地存储
- 配置文件: `~/.ai-coding-config.json`
- 存储各平台的 API Key、Base URL 和模型信息
- 记录当前使用的平台

## 赞助功能
- 支付宝二维码: https://qr.alipay.com/fkx17818lnt00uxbccps857
- 微信支付二维码: wxp://f2f0_ZoYUHPocEV5TWOBve6kLc4qvR6cDdKkjT90a3RL3DRbF9-FILt2Z8MF5Xhy5CIh
- 二维码在所有成功操作后显示

## 代码结构
- `src/index.ts`: 主入口文件，包含所有命令逻辑
- `src/platforms/`: 平台适配器
- `src/tools/`: 工具适配器
- `src/config/storage.ts`: 本地存储管理
- `src/utils/`: 工具函数

## 已知问题与注意事项
- 配置文件路径在 Windows 和 Unix 系统上略有不同
- 不同工具需要不同的配置格式 (JSON, TOML)
- 某些工具需要特定版本才能支持 Coding Plan