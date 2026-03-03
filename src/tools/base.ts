import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

export abstract class ToolAdapter {
  abstract id: string;
  abstract name: string;

  abstract configPath(): string;

  async isInstalled(): Promise<boolean> {
    const fullPath = this.configPath();
    return await fs.pathExists(fullPath);
  }

  async readConfig(): Promise<Record<string, any>> {
    const fullPath = this.configPath();
    try {
      const exists = await fs.pathExists(fullPath);
      if (!exists) {
        return {};
      }
      return await fs.readJson(fullPath);
    } catch (error) {
      return {};
    }
  }

  async writeConfig(config: Record<string, any>): Promise<void> {
    const fullPath = this.configPath();
    const dir = path.dirname(fullPath);
    
    await fs.ensureDir(dir);
    await fs.writeJson(fullPath, config, { spaces: 2 });
  }
}