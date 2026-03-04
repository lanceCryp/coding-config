#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import qrcode from 'qrcode-terminal';
import { PLATFORMS } from './platforms';
import { TOOLS } from './tools';
import { LocalStorageManager } from './config/storage';

// 赞助信息函数
function showSponsorInfo(): void {
  console.log(chalk.yellow('\n💝 感谢支持！'));
  console.log(chalk.blue('\n用微信扫描以下二维码赞助开发者：\n'));
  
  console.log(chalk.blue('支付宝 (Alipay):'));
  qrcode.generate('https://qr.alipay.com/fkx17818lnt00uxbccps857', {small: true});
  
  console.log(chalk.green('\n微信支付 (WeChat Pay):'));
  qrcode.generate('wxp://f2f0_ZoYUHPocEV5TWOBve6kLc4qvR6cDdKkjT90a3RL3DRbF9-FILt2Z8MF5Xhy5CIh', {small: true});
  
  console.log(chalk.gray('\n💡 扫描上方二维码支持项目发展\n'));
}

const program = new Command();
const localStorageManager = new LocalStorageManager();

program
  .name('ai-coding-config')
  .description('快速配置国产 AI 平台到主流 AI 编程工具')
  .version('0.1.0');

program
  .command('init')
  .description('初始化配置')
  .action(async () => {
    console.log(chalk.cyan.bold('\n🚀 欢迎使用 ai-coding-config！\n'));

    // 步骤 2：选择平台
    const { platform } = await inquirer.prompt([
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

    // 检查是否已有该平台的配置
    const existingPlatformConfig = await localStorageManager.getPlatformConfig(platform);
    let apiKey: string;

    if (existingPlatformConfig) {
      // 如果已有配置，询问用户是否使用现有API Key或录入新的
      const { useExisting } = await inquirer.prompt([
        {
          type: 'list',
          name: 'useExisting',
          message: `检测到 ${PLATFORMS[platform].name} 已有配置，是否使用现有API Key？`,
          choices: [
            { name: '是，使用现有API Key', value: true },
            { name: '否，录入新的API Key', value: false },
          ],
        },
      ]);

      if (useExisting) {
        // 使用现有API Key，选择要配置的工具
        const { tool: selectedToolId } = await inquirer.prompt([
          {
            type: 'list',
            name: 'tool',
            message: '请选择要配置的工具：',
            choices: [
              { name: 'Claude Code (CLI)', value: 'claude-code' },
              { name: 'OpenCode (CLI)', value: 'opencode' },
              { name: 'Codex (CLI)', value: 'codex' },
              { name: 'Qwen Code (CLI)', value: 'qwen' },
              { name: 'Kilo CLI (AI)', value: 'kilo' },
            ],
          },
        ]);

        // 使用现有API Key，直接切换平台
        const spinner = ora('正在切换到现有配置...').start();
        
        // 检测工具是否已安装
        const selectedTool = TOOLS[selectedToolId];
        const isInstalled = await selectedTool.isInstalled();
        
        if (!isInstalled) {
          spinner.stop();
          console.log(chalk.yellow(`\n⚠️  检测到 ${selectedTool.name} 未安装`));
          console.log(chalk.gray(`请先安装 ${selectedTool.name} 工具\n`));
          process.exit(0);
        }

        // 更新所选工具的配置 - 使用特定工具的配置模板
        const configTemplate = PLATFORMS[platform].getConfigTemplate(selectedToolId);
        const finalConfig = {
          ...configTemplate,
          apiKey: existingPlatformConfig.apiKey,
        };

        await selectedTool.writeConfig(finalConfig);
        await localStorageManager.setCurrentPlatform(platform);
        
        spinner.stop();
        console.log(chalk.green(`\n✅ 成功切换到 ${PLATFORMS[platform].name}！`));
        console.log(chalk.cyan(`${selectedTool.name} 现在使用 ${PLATFORMS[platform].name} 平台\n`));
        console.log(chalk.gray(`API Key: ${existingPlatformConfig.apiKey.substring(0, 4)}...${existingPlatformConfig.apiKey.slice(-4)}\n`));
        
        // 赞助信息
        showSponsorInfo();
        
        return; // 结束流程
      } else {
        // 录入新的API Key
        console.log(chalk.yellow(`\n请获取 ${PLATFORMS[platform].name} 的新 API Key：`));
        console.log(chalk.blue(PLATFORMS[platform].apiKeyUrl));

        const apiKeyResponse = await inquirer.prompt([
          {
            type: 'input',
            name: 'apiKey',
            message: '请输入新的 API Key：',
            validate: (input: string) => {
              if (!input || input.length < 10) {
                return 'API Key 格式不正确，请检查后重试';
              }
              return true;
            },
          },
        ]);
        apiKey = apiKeyResponse.apiKey;
      }
    } else {
      // 没有现有配置，需要录入API Key
      console.log(chalk.yellow(`\n请获取 ${PLATFORMS[platform].name} 的 API Key：`));
      console.log(chalk.blue(PLATFORMS[platform].apiKeyUrl));

      const apiKeyResponse = await inquirer.prompt([
        {
          type: 'input',
          name: 'apiKey',
          message: '请输入您的 API Key：',
          validate: (input: string) => {
            if (!input || input.length < 10) {
              return 'API Key 格式不正确，请检查后重试';
            }
            return true;
          },
        },
      ]);
      apiKey = apiKeyResponse.apiKey;
    }

    // 步骤 4：选择工具
    const { tool } = await inquirer.prompt([
      {
        type: 'list',
        name: 'tool',
        message: '请选择要配置的 AI 编程工具：',
        choices: [
          { name: 'Claude Code (CLI)', value: 'claude-code' },
          { name: 'OpenCode (CLI)', value: 'opencode' },
          { name: 'Codex (CLI)', value: 'codex' },
          { name: 'Qwen Code (CLI)', value: 'qwen' },
          { name: 'Kilo CLI (AI)', value: 'kilo' },
        ],
      },
    ]);

    console.log(chalk.cyan(`\n将配置工具: ${TOOLS[tool].name}\n`));

    // 步骤 5：检测工具是否已安装
    const spinner = ora('检测工具安装状态...').start();
    const selectedTool = TOOLS[tool];
    const isInstalled = await selectedTool.isInstalled();
    spinner.stop();

    if (!isInstalled) {
      console.log(chalk.yellow(`\n⚠️  检测到 ${selectedTool.name} 未安装`));
      console.log(chalk.gray('请先运行: npm install -g @anthropic-ai/claude-cli'));
      console.log(chalk.gray('然后重新运行此命令\n'));
      process.exit(0);
    }

    // 步骤 6：生成配置
    const configTemplate = PLATFORMS[platform].getConfigTemplate(tool);
    const finalConfig = {
      ...configTemplate,
      apiKey: apiKey,  // 替换占位符
    };

    // 步骤 7：写入配置
    spinner.text = '写入配置...';
    spinner.start();
    await selectedTool.writeConfig(finalConfig);
    
    // 保存到本地存储 - 使用特定工具的配置模板
    const toolConfigTemplate = PLATFORMS[platform].getConfigTemplate(tool);
    await localStorageManager.savePlatformConfig(platform, {
      apiKey: apiKey,
      baseUrl: toolConfigTemplate.baseUrl,
      model: toolConfigTemplate.model,
    });
    
    // 设置当前平台
    await localStorageManager.setCurrentPlatform(platform);
    
    spinner.stop();

    // 步骤 8：成功提示
    console.log(chalk.green(`\n✅ 配置成功！`));
    console.log(chalk.cyan(`${selectedTool.name} 已配置使用 ${PLATFORMS[platform].name}\n`));
    console.log(chalk.gray(`平台信息已保存，可使用 'ai-coding-config switch' 命令切换平台\n`));
    
    // 赞助信息
    showSponsorInfo();
  });

program
  .command('switch')
  .description('切换当前使用的 AI 平台')
  .action(async () => {
    console.log(chalk.cyan.bold('\n🔄 切换 AI 平台\n'));

    const storedConfig = await localStorageManager.readConfig();
    
    if (Object.keys(storedConfig.platforms).length === 0) {
      console.log(chalk.yellow('⚠️  您还没有配置任何平台，请先运行: ai-coding-config init\n'));
      process.exit(0);
    }

    const platformChoices = Object.entries(storedConfig.platforms).map(([id, config]) => ({
      name: `${PLATFORMS[id]?.name || id} ${config.lastUsed ? `(最后使用: ${new Date(config.lastUsed).toLocaleDateString()})` : ''}`,
      value: id,
    }));

    const { platform } = await inquirer.prompt([
      {
        type: 'list',
        name: 'platform',
        message: '请选择要切换到的平台：',
        choices: platformChoices,
      },
    ]);

    const platformConfig = storedConfig.platforms[platform];
    if (!platformConfig) {
      console.log(chalk.red('❌ 选定的平台配置不存在\n'));
      process.exit(1);
    }

    // 选择要配置的工具
    const { tool: selectedToolId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'tool',
        message: '请选择要配置的工具：',
        choices: [
          { name: 'Claude Code (CLI)', value: 'claude-code' },
          { name: 'OpenCode (CLI)', value: 'opencode' },
          { name: 'Codex (CLI)', value: 'codex' },
          { name: 'Qwen Code (CLI)', value: 'qwen' },
          { name: 'Kilo CLI (AI)', value: 'kilo' },
        ],
      },
    ]);

    // 更新所选工具的配置
    const spinner = ora('正在切换平台...').start();
    
    try {
      const selectedTool = TOOLS[selectedToolId];
      const isInstalled = await selectedTool.isInstalled();
      
      if (!isInstalled) {
        spinner.stop();
        console.log(chalk.yellow(`\n⚠️  检测到 ${selectedTool.name} 未安装`));
        console.log(chalk.gray(`请先安装 ${selectedTool.name} 工具\n`));
        process.exit(0);
      }

      const configTemplate = PLATFORMS[platform].getConfigTemplate(selectedToolId);
      const finalConfig = {
        ...configTemplate,
        apiKey: platformConfig.apiKey,
      };

      await selectedTool.writeConfig(finalConfig);
      await localStorageManager.setCurrentPlatform(platform);
      
      spinner.stop();
      console.log(chalk.green(`\n✅ 成功切换到 ${PLATFORMS[platform].name}！`));
      console.log(chalk.cyan(`${selectedTool.name} 现在使用 ${PLATFORMS[platform].name} 平台\n`));
      
      // 赞助信息
      showSponsorInfo();
    } catch (error) {
      spinner.stop();
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(chalk.red('❌ 切换平台失败:', errorMessage));
      process.exit(1);
    }
  });

program
  .command('update-key')
  .description('更新指定平台的 API Key')
  .action(async () => {
    console.log(chalk.cyan.bold('\n🔑 更新 API Key\n'));

    const storedConfig = await localStorageManager.readConfig();
    
    if (Object.keys(storedConfig.platforms).length === 0) {
      console.log(chalk.yellow('⚠️  您还没有配置任何平台，请先运行: ai-coding-config init\n'));
      process.exit(0);
    }

    const platformChoices = Object.entries(storedConfig.platforms).map(([id, config]) => ({
      name: `${PLATFORMS[id]?.name || id} ${config.lastUsed ? `(最后使用: ${new Date(config.lastUsed).toLocaleDateString()})` : ''}`,
      value: id,
    }));

    const { platform } = await inquirer.prompt([
      {
        type: 'list',
        name: 'platform',
        message: '请选择要更新 API Key 的平台：',
        choices: platformChoices,
      },
    ]);

    console.log(chalk.yellow(`\n请先获取 ${PLATFORMS[platform].name} 的 API Key：`));
    console.log(chalk.blue(PLATFORMS[platform].apiKeyUrl));

    const { apiKey } = await inquirer.prompt([
      {
        type: 'input',
        name: 'apiKey',
        message: '请输入新的 API Key：',
        validate: (input: string) => {
          if (!input || input.length < 10) {
            return 'API Key 格式不正确，请检查后重试';
          }
          return true;
        },
      },
    ]);

    // 更新存储的配置
    const existingConfig = await localStorageManager.getPlatformConfig(platform);
    if (!existingConfig) {
      console.log(chalk.red('❌ 平台配置不存在\n'));
      process.exit(1);
    }

    const updatedConfig = {
      ...existingConfig,
      apiKey: apiKey,
      lastUsed: new Date().toISOString(),
    };

    const spinner = ora('正在更新 API Key...').start();
    
    try {
      // 保存更新后的配置
      await localStorageManager.savePlatformConfig(platform, updatedConfig);
      
      // 如果当前平台就是要更新的平台，则同时更新当前工具的配置
      const currentPlatform = await localStorageManager.getCurrentPlatform();
      if (currentPlatform === platform) {
        // 获取当前使用的工具（这里我们假设用户想要更新当前工具的配置）
        // 为了更好的用户体验，我们可以询问用户要更新哪个工具
        const { tool: selectedToolId } = await inquirer.prompt([
          {
            type: 'list',
            name: 'tool',
            message: '请选择要更新配置的工具：',
            choices: [
              { name: 'Claude Code (CLI)', value: 'claude-code' },
              { name: 'OpenCode (CLI)', value: 'opencode' },
              { name: 'Codex (CLI)', value: 'codex' },
              { name: 'Qwen Code (CLI)', value: 'qwen' },
              { name: 'Kilo CLI (AI)', value: 'kilo' },
            ],
          },
        ]);

        const selectedTool = TOOLS[selectedToolId];
        const isInstalled = await selectedTool.isInstalled();
        
        if (!isInstalled) {
          spinner.stop();
          console.log(chalk.yellow(`\n⚠️  检测到 ${selectedTool.name} 未安装`));
          console.log(chalk.gray(`请先安装 ${selectedTool.name} 工具\n`));
          process.exit(0);
        }

        const configTemplate = PLATFORMS[platform].getConfigTemplate(selectedToolId);
        const finalConfig = {
          ...configTemplate,
          apiKey: apiKey,
        };

        await selectedTool.writeConfig(finalConfig);
      }
      
      spinner.stop();
      console.log(chalk.green(`\n✅ ${PLATFORMS[platform].name} 的 API Key 已更新！`));
      
      if (currentPlatform === platform) {
        console.log(chalk.cyan(`当前活动平台的配置已同步更新\n`));
      } else {
        console.log(chalk.gray(`请注意：当前活动平台不是 ${PLATFORMS[platform].name}，如需使用新密钥请运行: ai-coding-config switch\n`));
      }
      
      // 赞助信息
      showSponsorInfo();
    } catch (error) {
      spinner.stop();
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(chalk.red('❌ 更新 API Key 失败:', errorMessage));
      process.exit(1);
    }
  });

program.parse();