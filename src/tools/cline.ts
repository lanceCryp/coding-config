import { ToolAdapter } from './base';

export class ClineTool extends ToolAdapter {
  id = "cline";
  name = "Cline (VS Code Plugin)";

  configPath(): string {
    return `${process.env.HOME || require('os').homedir()}/.vscode/settings.json`;
  }

  async writeConfig(platformConfig: Record<string, any>): Promise<void> {
    const existing = await this.readConfig();
    const newConfig = {
      ...existing,
      "cline.anthropicApiKey": platformConfig.apiKey,
      "cline.anthropicBaseUrl": platformConfig.baseUrl,
      "cline.model": platformConfig.model,
    };
    await super.writeConfig(newConfig);
  }
}