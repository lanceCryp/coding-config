import { ToolAdapter } from './base';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

const execAsync = promisify(exec);

export class QwenTool extends ToolAdapter {
  id = "qwen";
  name = "Qwen Code (CLI)";

  configPath(): string {
    const homeDir = os.homedir();
    return path.join(homeDir, '.qwen', 'settings.json');
  }

  async isInstalled(): Promise<boolean> {
    try {
      const { stdout } = await execAsync('qwen --version');
      return stdout.includes('qwen') || stdout.length > 0;
    } catch (error) {
      return false;
    }
  }

  async writeConfig(platformConfig: Record<string, any>): Promise<void> {
    const existing = await this.readConfig();

    // 创建 .qwen 目录（如果不存在）
    const configDir = path.dirname(this.configPath());
    await fs.ensureDir(configDir);

    // 设置Qwen Code的配置
    const newConfig = {
      "env": {
        "BAILIAN_CODING_PLAN_API_KEY": platformConfig.apiKey
      },
      "modelProviders": {
        "openai": [
          {
            "id": platformConfig.model,
            "name": `[Bailian Coding Plan] ${platformConfig.model}`,
            "baseUrl": platformConfig.baseUrl,
            "envKey": "BAILIAN_CODING_PLAN_API_KEY",
            "generationConfig": {
              "extra_body": {
                "enable_thinking": true
              }
            }
          },
          {
            "id": "qwen3-coder-plus",
            "name": "[Bailian Coding Plan] qwen3-coder-plus",
            "baseUrl": platformConfig.baseUrl,
            "envKey": "BAILIAN_CODING_PLAN_API_KEY"
          },
          {
            "id": "qwen3-coder-next",
            "name": "[Bailian Coding Plan] qwen3-coder-next",
            "baseUrl": platformConfig.baseUrl,
            "envKey": "BAILIAN_CODING_PLAN_API_KEY"
          },
          {
            "id": "qwen3-max-2026-01-23",
            "name": "[Bailian Coding Plan] qwen3-max-2026-01-23",
            "baseUrl": platformConfig.baseUrl,
            "envKey": "BAILIAN_CODING_PLAN_API_KEY",
            "generationConfig": {
              "extra_body": {
                "enable_thinking": true
              }
            }
          },
          {
            "id": "glm-4.7",
            "name": "[Bailian Coding Plan] glm-4.7",
            "baseUrl": platformConfig.baseUrl,
            "envKey": "BAILIAN_CODING_PLAN_API_KEY",
            "generationConfig": {
              "extra_body": {
                "enable_thinking": true
              }
            }
          },
          {
            "id": "glm-5",
            "name": "[Bailian Coding Plan] glm-5",
            "baseUrl": platformConfig.baseUrl,
            "envKey": "BAILIAN_CODING_PLAN_API_KEY",
            "generationConfig": {
              "extra_body": {
                "enable_thinking": true
              }
            }
          },
          {
            "id": "MiniMax-M2.5",
            "name": "[Bailian Coding Plan] MiniMax-M2.5",
            "baseUrl": platformConfig.baseUrl,
            "envKey": "BAILIAN_CODING_PLAN_API_KEY",
            "generationConfig": {
              "extra_body": {
                "enable_thinking": true
              }
            }
          },
          {
            "id": "kimi-k2.5",
            "name": "[Bailian Coding Plan] kimi-k2.5",
            "baseUrl": platformConfig.baseUrl,
            "envKey": "BAILIAN_CODING_PLAN_API_KEY",
            "generationConfig": {
              "extra_body": {
                "enable_thinking": true
              }
            }
          }
        ]
      },
      "security": {
        "auth": {
          "selectedType": "openai"
        }
      },
      "codingPlan": {
        "region": "china",
        "version": "f875d4c67d50946244a15d15b2a273a755d0d0c1fef1f4b23d7ee3572884b890"
      },
      "model": {
        "name": platformConfig.model
      },
      "$version": 3,
      ...existing // 保留其他现有配置
    };

    // 使用基类的writeConfig方法写入配置
    await super.writeConfig(newConfig);
  }
}