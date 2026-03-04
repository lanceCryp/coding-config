<https://bailian.console.aliyun.com/cn-beijing/?spm=5176.6660585.sfm_codingplan_public_cn-content.3.6cb57992O8b5YB&tab=doc#/doc/?type=model&url=3023086>

安装 OpenCode
安装或更新 Node.js（v18.0 或更高版本）。

在终端中执行以下命令安装 OpenCode。

npm install -g opencode-ai
在终端中执行以下命令，若输出版本号，则表示安装成功。

opencode -v
在 OpenCode 中配置 Coding Plan
复制以下内容，将YOUR_API_KEY替换为Coding Plan 专属 API Key，写入配置文件中并保存。如果路径中的文件夹或文件不存在，请手动创建。

macOS / Linux: ~/.config/opencode/opencode.json

Windows: C:\Users\您的用户名\.config\opencode\opencode.json

{
  "$schema": "<https://opencode.ai/config.json>",
  "provider": {
    "bailian-coding-plan": {
      "npm": "@ai-sdk/anthropic",
      "name": "Model Studio Coding Plan",
      "options": {
        "baseURL": "<https://coding.dashscope.aliyuncs.com/apps/anthropic/v1>",
        "apiKey": "YOUR_API_KEY"
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
  }
}
