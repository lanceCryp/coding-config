<https://bailian.console.aliyun.com/cn-beijing/?spm=5176.6660585.sfm_codingplan_public_cn-content.3.6cb57992O8b5YB&tab=doc#/doc/?type=model&url=3023088>

本文介绍如何在 Kilo CLI 中配置与使用阿里云百炼 Coding Plan。

接入Kilo CLI需要修改配置文件~/.config/kilo/config.json 中的模型提供商，下面在 Kilo CLI 中配置 Coding Plan章节提供了具体配置信息。

安装 Kilo CLI
安装 Node.js（v18.0 或更高版本）。

在终端中执行以下命令安装 Kilo CLI：

npm install -g @kilocode/cli
运行以下命令验证安装。若有版本号输出，则表示安装成功。

kilo --version
在 Kilo CLI 中配置 Coding Plan
使用文本编辑器打开配置文件 ~/.config/kilo/config.json。

vim ~/.config/kilo/config.json
复制并粘贴以下配置内容，将YOUR_API_KEY替换为 Coding Plan 专属 API Key。您可以自行设置并切换Coding Plan概述中的模型。

{
  "$schema": "<https://kilo.ai/config.json>",
  "provider": {
    "bailian": {
      "npm": "@ai-sdk/anthropic",
      "name": "Alibaba Cloud Model Studio",
      "options": {
        "baseURL": "<https://coding.dashscope.aliyuncs.com/apps/anthropic/v1>",
        "apiKey": "YOUR_API_KEY"
      },
      "models": {
        "qwen3.5-plus": {
          "name": "Qwen3.5 Plus",
          "options": {
            "thinking": {
              "type": "enabled",
              "budgetTokens": 1024
            }
          }
        },
        "qwen3-max-2026-01-23": {
          "name": "Qwen3 Max 0123"
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
