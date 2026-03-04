# QWEN.md - ai-coding-config 项目指南

## 项目概述

**ai-coding-config** 是一个 Node.js CLI 工具，旨在帮助开发者快速将国产 AI 平台（如智谱 GLM、阿里云百炼、火山引擎方舟）配置到主流 AI 编程工具（如 Cline、Cursor、Claude Code）中。

### 核心功能
- 支持智谱 GLM、阿里云百炼、火山引擎方舟等国产 AI 平台
- 支持 Cline、Cursor、Claude Code 等主流 AI 编程工具
- 提供交互式配置界面，简单易用
- 自动检测工具安装状态
- 通过适配器模式灵活扩展新平台和工具

### 技术栈
- **语言**: TypeScript
- **运行环境**: Node.js
- **CLI 框架**: commander.js
- **交互界面**: inquirer.js
- **样式美化**: chalk, ora
- **文件操作**: fs-extra

## 项目架构

### 目录结构
```
coding-config/
├── package.json              # 项目配置
├── tsconfig.json             # TypeScript 配置
├── README.md                 # 项目说明
├── src/
│   ├── index.ts              # CLI 入口文件
│   ├── platforms/            # 平台适配器
│   │   ├── index.ts          # 平台接口定义 + 导出
│   │   ├── zhipu.ts          # 智谱 GLM 适配器
│   │   ├── ali.ts            # 阿里云百炼适配器
│   │   └── volcengine.ts     # 火山引擎方舟适配器
│   ├── tools/                # 工具适配器
│   │   ├── index.ts          # 工具接口定义 + 导出
│   │   ├── base.ts           # 工具基类
│   │   ├── cline.ts          # Cline 适配器
│   │   ├── cursor.ts         # Cursor 适配器
│   │   └── claude-code.ts    # Claude Code 适配器
│   ├── config/               # 配置管理
│   │   ├── storage.ts        # 本地配置存储
│   │   └── validator.ts      # API Key 验证
│   └── utils/                # 工具函数
└── dist/                     # 编译输出目录
```

### 核心设计模式

#### 平台适配器模式
- **PlatformAdapter 接口**: 定义了平台适配器的标准接口
- **支持平台**: 智谱 GLM (zhipu)、阿里云百炼 (ali)、火山引擎方舟 (volcengine)
- **功能**: 提供 API Key 获取地址、Base URL、默认模型和配置模板

#### 工具适配器模式
- **ToolAdapter 基类**: 定义了工具适配器的基础功能
- **支持工具**: Cline、Cursor、Claude Code
- **功能**: 配置文件路径管理、安装状态检测、配置读写

## 构建和运行

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
# 实时编译并运行
npm run dev
```

### 生产构建
```bash
# 编译 TypeScript 到 JavaScript
npm run build
```

### 运行
```bash
# 全局安装
npm install -g ai-coding-config

# 或者本地运行
npm start

# 初始化配置
ai-coding-config init
```

## 开发约定

### 代码风格
- 使用 TypeScript 编写，遵循严格模式
- 使用 ESLint 和 Prettier 进行代码格式化
- 函数和变量命名使用 camelCase
- 类名使用 PascalCase

### 测试
- 单元测试使用 Jest
- 集成测试覆盖主要功能流程
- 在提交前确保所有测试通过

### 贡献指南
1. Fork 仓库
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 主要命令

### 初始化配置
```bash
ai-coding-config init
```
交互式地选择 AI 平台、输入 API Key、选择编程工具并完成配置。

### 支持的平台
| 平台 | ID | 默认模型 |
|------|----|----------|
| 智谱 GLM | zhipu | glm-4.7 |
| 阿里云百炼 | ali | qwen-coder-plus |
| 火山引擎方舟 | volcengine | doubao-pro-256k |

### 支持的工具
| 工具 | ID | 配置文件 |
|------|----|----------|
| Cline | cline | ~/.vscode/settings.json |
| Cursor | cursor | ~/.cursor/settings.json |
| Claude Code | claude-code | ~/.claude/config.json |

## 扩展开发

### 添加新平台
1. 在 `src/platforms/` 创建新的平台适配器
2. 实现 `PlatformAdapter` 接口
3. 在 `src/platforms/index.ts` 中导出并注册

### 添加新工具
1. 在 `src/tools/` 创建新的工具适配器
2. 继承 `ToolAdapter` 基类
3. 在 `src/tools/index.ts` 中导出并注册

## 注意事项

- API Key 以明文形式存储在本地配置文件中
- 配置文件路径使用 `os.homedir()` 确保跨平台兼容性
- 错误处理采用友好的用户提示
- 使用 chalk 和 ora 提升用户体验