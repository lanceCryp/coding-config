import { ToolAdapter } from './base';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

const execAsync = promisify(exec);

export class CodexTool extends ToolAdapter {
  id = "codex";
  name = "Codex (CLI)";

  configPath(): string {
    const homeDir = os.homedir();
    return path.join(homeDir, '.codex', 'config.toml');
  }

  async isInstalled(): Promise<boolean> {
    try {
      const { stdout } = await execAsync('codex --version');
      return stdout.includes('codex') || stdout.length > 0;
    } catch (error) {
      return false;
    }
  }

  async writeConfig(platformConfig: Record<string, any>): Promise<void> {
    // 创建 .codex 目录（如果不存在）
    const configDir = path.dirname(this.configPath());
    await fs.ensureDir(configDir);

    // 生成 TOML 格式的配置
    const tomlConfig = `model_provider = "Model_Studio_Coding_Plan"
model = "${platformConfig.model}"
[model_providers.Model_Studio_Coding_Plan]
name = "Model_Studio_Coding_Plan"
base_url = "${platformConfig.baseUrl}"
env_key = "${platformConfig.apiKey}"
#wire_api = "chat"`;

    await fs.writeFile(this.configPath(), tomlConfig, 'utf8');
  }
}