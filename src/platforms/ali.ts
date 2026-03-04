export class AliPlatform {
  id = "ali";
  name = "阿里云百炼";
  apiKeyUrl = "https://bailian.console.aliyun.com/cn-beijing/?tab=coding-plan#/efm/detail";
  baseUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1";
  defaultModel = "qwen-coder-plus";

  getCompatibleTools(): string[] {
    return ["claude-code", "opencode", "codex", "qwen", "kilo"];
  }

  getConfigTemplate(tool: string): Record<string, any> {
    switch (tool) {
      case "claude-code":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://coding.dashscope.aliyuncs.com/apps/anthropic",
          "model": "qwen3.5-plus"  // 根据阿里云文档使用 qwen3.5-plus
        };
      case "opencode":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://coding.dashscope.aliyuncs.com/apps/anthropic/v1",
          "model": "qwen3.5-plus"
        };
      case "codex":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
          "model": "qwen3.5-plus"
        };
      case "qwen":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
          "model": "qwen3.5-plus"
        };
      case "kilo":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://coding.dashscope.aliyuncs.com/apps/anthropic/v1",
          "model": "qwen3.5-plus"
        };
      default:
        return {};
    }
  }
}