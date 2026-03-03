import { ToolAdapter } from './base';

export class CursorTool extends ToolAdapter {
  id = "cursor";
  name = "Cursor (AI 编辑器)";

  configPath(): string {
    return `${process.env.HOME || require('os').homedir()}/.cursor/settings.json`;
  }

  async writeConfig(platformConfig: Record<string, any>): Promise<void> {
    const existing = await this.readConfig();
    const newConfig = {
      ...existing,
      "apiKey": platformConfig.apiKey,
      "baseURL": platformConfig.baseUrl,
      "model": platformConfig.model,
    };
    await super.writeConfig(newConfig);
  }
}