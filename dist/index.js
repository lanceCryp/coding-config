#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const platforms_1 = require("./platforms");
const tools_1 = require("./tools");
const program = new commander_1.Command();
program
    .name('coding-config')
    .description('快速配置国产 AI 平台到主流 AI 编程工具')
    .version('0.1.0');
program
    .command('init')
    .description('初始化配置')
    .action(async () => {
    console.log(chalk_1.default.cyan.bold('\n🚀 欢迎使用 coding-config！\n'));
    // 步骤 2：选择平台
    const { platform } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'platform',
            message: '请选择 AI 平台：',
            choices: [
                { name: '智谱 GLM', value: 'zhipu' },
                { name: '阿里云百炼', value: 'ali' },
                { name: '火山引擎方舟', value: 'volcengine' },
            ],
        },
    ]);
    // 步骤 3：输入 API Key
    console.log(chalk_1.default.yellow(`\n请先获取 ${platforms_1.PLATFORMS[platform].name} 的 API Key：`));
    console.log(chalk_1.default.blue(platforms_1.PLATFORMS[platform].apiKeyUrl));
    const { apiKey } = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'apiKey',
            message: '请输入您的 API Key：',
            validate: (input) => {
                if (!input || input.length < 10) {
                    return 'API Key 格式不正确，请检查后重试';
                }
                return true;
            },
        },
    ]);
    // 步骤 4：选择工具
    const { tool } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'tool',
            message: '请选择要配置的 AI 编程工具：',
            choices: [
                { name: 'Cline (VS Code 插件)', value: 'cline' },
                { name: 'Cursor (AI 编辑器)', value: 'cursor' },
                { name: 'Claude Code (CLI)', value: 'claude-code' },
            ],
        },
    ]);
    // 步骤 5：检测工具是否已安装
    const spinner = (0, ora_1.default)('检测工具安装状态...').start();
    const selectedTool = tools_1.TOOLS[tool];
    const isInstalled = await selectedTool.isInstalled();
    spinner.stop();
    if (!isInstalled) {
        console.log(chalk_1.default.yellow(`\n⚠️  检测到 ${selectedTool.name} 未安装`));
        console.log(chalk_1.default.gray('请先手动安装该工具，然后重新运行此命令\n'));
        process.exit(0);
    }
    // 步骤 6：生成配置
    const configTemplate = platforms_1.PLATFORMS[platform].getConfigTemplate(tool);
    const finalConfig = {
        ...configTemplate,
        apiKey: apiKey, // 替换占位符
    };
    // 步骤 7：写入配置
    spinner.text = '写入配置...';
    spinner.start();
    await selectedTool.writeConfig(finalConfig);
    spinner.stop();
    // 步骤 8：成功提示
    console.log(chalk_1.default.green(`\n✅ 配置成功！`));
    console.log(chalk_1.default.cyan(`${selectedTool.name} 已配置使用 ${platforms_1.PLATFORMS[platform].name}\n`));
});
program.parse();
