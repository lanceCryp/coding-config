<https://bailian.console.aliyun.com/cn-beijing/?spm=5176.6660585.sfm_codingplan_public_cn-content.3.6cb57992O8b5YB&tab=doc#/doc/?type=model&url=3023091>

安装qwen
执行npm install -g @qwen-code/qwen-code@latest

编辑或新建 settings.json 文件，写入下面的内容，将 YOUR_API_KEY 替换为Coding Plan 专属 API Key，具体路径如下：

macOS / Linux: ~/.qwen/settings.json

Windows: C:\Users\您的用户名\.qwen\settings.json

如果您已经安装了 Qwen Code CLI 并配置了Coding Plan，请忽略此步，Qwen Code已自动完成配置。

{
  "env": {
    "BAILIAN_CODING_PLAN_API_KEY": "YOUR_API_KEY"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "qwen3.5-plus",
        "name": "[Bailian Coding Plan] qwen3.5-plus",
        "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
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
        "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
        "envKey": "BAILIAN_CODING_PLAN_API_KEY"
      },
      {
        "id": "qwen3-coder-next",
        "name": "[Bailian Coding Plan] qwen3-coder-next",
        "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
        "envKey": "BAILIAN_CODING_PLAN_API_KEY"
      },
      {
        "id": "qwen3-max-2026-01-23",
        "name": "[Bailian Coding Plan] qwen3-max-2026-01-23",
        "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
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
        "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
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
        "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
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
        "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
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
        "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
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
    "name": "qwen3.5-plus"
  },
  "$version": 3
}
