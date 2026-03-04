import { ToolAdapter } from './base';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs-extra';
import * as path from 'path';

const execAsync = promisify(exec);

export class ClaudeCodeTool extends ToolAdapter {
  id = "claude-code";
  name = "Claude Code (CLI)";

  configPath(): string {
    return `${process.env.HOME || require('os').homedir()}/.claude/settings.json`;
  }

  async isInstalled(): Promise<boolean> {
    try {
      const { stdout } = await execAsync('claude --version');
      return stdout.includes('claude') || stdout.length > 0;
    } catch (error) {
      return false;
    }
  }

  async writeConfig(platformConfig: Record<string, any>): Promise<void> {
    const existing = await this.readConfig();

    // 创建 .claude 目录（如果不存在）
    const configDir = path.dirname(this.configPath());
    await fs.ensureDir(configDir);

    // 设置Claude Code的主要配置
    const newConfig = {
      ...existing,
      "env": {
        "ANTHROPIC_AUTH_TOKEN": platformConfig.apiKey,
        "ANTHROPIC_BASE_URL": platformConfig.baseUrl,
        "ANTHROPIC_MODEL": platformConfig.model,
      }
    };

    await this.writeConfigFile(newConfig);

    // 同时更新 .claude.json 文件以完成 onboarding
    await this.updateOnboardingConfig();
  }

  private async writeConfigFile(config: Record<string, any>): Promise<void> {
    const fullPath = this.configPath();
    const dir = path.dirname(fullPath);

    await fs.ensureDir(dir);
    await fs.writeJson(fullPath, config, { spaces: 2 });
  }

  private async updateOnboardingConfig(): Promise<void> {
    const onboardingPath = `${process.env.HOME || require('os').homedir()}/.claude.json`;
    try {
      const onboardingExists = await fs.pathExists(onboardingPath);
      let onboardingConfig = {};

      if (onboardingExists) {
        onboardingConfig = await fs.readJson(onboardingPath);
      }

      const updatedConfig = {
        ...onboardingConfig,
        "hasCompletedOnboarding": true
      };

      await fs.writeJson(onboardingPath, updatedConfig, { spaces: 2 });
    } catch (error) {
      // 如果无法更新 onboarding 配置，记录错误但不中断主要配置过程
      console.warn('Warning: Could not update onboarding configuration:', error);
    }
  }
}