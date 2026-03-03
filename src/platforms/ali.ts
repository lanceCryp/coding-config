export class AliPlatform {
  id = "ali";
  name = "阿里云百炼";
  apiKeyUrl = "https://bailian.console.aliyun.com/#/apikey";
  baseUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1";
  defaultModel = "qwen-coder-plus";

  getCompatibleTools(): string[] {
    return ["cline", "cursor", "claude-code"];
  }

  getConfigTemplate(tool: string): Record<string, any> {
    switch (tool) {
      case "cline":
        return {
          "cline.anthropicApiKey": "${API_KEY}",
          "cline.anthropicBaseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
          "cline.model": "qwen-coder-plus"
        };
      case "cursor":
        return {
          "apiKey": "${API_KEY}",
          "baseURL": "https://dashscope.aliyuncs.com/compatible-mode/v1",
          "model": "qwen-coder-plus"
        };
      case "claude-code":
        return {
          "apiKey": "${API_KEY}",
          "apiUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
          "model": "qwen-coder-plus"
        };
      default:
        return {};
    }
  }
}