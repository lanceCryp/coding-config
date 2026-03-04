import { ToolAdapter } from './base';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

const execAsync = promisify(exec);

export class OpenCodeTool extends ToolAdapter {
  id = "opencode";
  name = "OpenCode (CLI)";

  configPath(): string {
    const homeDir = os.homedir();
    if (process.platform === 'win32') {
      return path.join(homeDir, '.config', 'opencode', 'opencode.json');
    } else {
      return path.join(homeDir, '.config', 'opencode', 'opencode.json');
    }
  }

  async isInstalled(): Promise<boolean> {
    try {
      const { stdout } = await execAsync('opencode -v');
      return stdout.includes('opencode') || stdout.length > 0;
    } catch (error) {
      return false;
    }
  }

  async writeConfig(platformConfig: Record<string, any>): Promise<void> {
    const existing = await this.readConfig();

    // 设置OpenCode的配置
    const newConfig = {
      "$schema": "https://opencode.ai/config.json",
      "provider": {
        "bailian-coding-plan": {
          "npm": "@ai-sdk/anthropic",
          "name": "Model Studio Coding Plan",
          "options": {
            "baseURL": platformConfig.baseUrl,
            "apiKey": platformConfig.apiKey
          },
          "models": {
            "qwen3.5-plus": {
              "name": "Qwen3.5 Plus",
              "modalities": {
                "input": [
                  "text",
                  "image"
                ],
                "output": [
                  "text"
                ]
              },
              "options": {
                "thinking": {
                  "type": "enabled",
                  "budgetTokens": 1024
                }
              }
            },
            "qwen3-max-2026-01-23": {
              "name": "Qwen3 Max 2026-01-23"
            },
            "qwen3-coder-next": {
              "name": "Qwen3 Coder Next"
            },
            "qwen3-coder-plus": {
              "name": "Qwen3 Coder Plus"
            },
            "MiniMax-M2.5": {
              "name": "MiniMax M2.5",
              "options": {
                "thinking": {
                  "type": "enabled",
                  "budgetTokens": 1024
                }
              }
            },
            "glm-5": {
              "name": "GLM-5",
              "options": {
                "thinking": {
                  "type": "enabled",
                  "budgetTokens": 1024
                }
              }
            },
            "glm-4.7": {
              "name": "GLM-4.7",
              "options": {
                "thinking": {
                  "type": "enabled",
                  "budgetTokens": 1024
                }
              }
            },
            "kimi-k2.5": {
              "name": "Kimi K2.5",
              "modalities": {
                "input": [
                  "text",
                  "image"
                ],
                "output": [
                  "text"
                ]
              },
              "options": {
                "thinking": {
                  "type": "enabled",
                  "budgetTokens": 1024
                }
              }
            }
          }
        }
      },
      ...existing // 保留其他现有配置
    };

    // 使用基类的writeConfig方法写入配置
    await super.writeConfig(newConfig);
  }
}