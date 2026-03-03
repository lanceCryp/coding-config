import { ToolAdapter } from './base';

export class ClaudeCodeTool extends ToolAdapter {
  id = "claude-code";
  name = "Claude Code (CLI)";

  configPath(): string {
    return `${process.env.HOME || require('os').homedir()}/.claude/config.json`;
  }

  async writeConfig(platformConfig: Record<string, any>): Promise<void> {
    const existing = await this.readConfig();
    const newConfig = {
      ...existing,
      "apiKey": platformConfig.apiKey,
      "apiUrl": platformConfig.baseUrl,
      "model": platformConfig.model,
    };
    await super.writeConfig(newConfig);
  }
}