export class VolcenginePlatform {
  id = "volcengine";
  name = "火山引擎方舟";
  apiKeyUrl = "https://console.volcengine.com/ark";
  baseUrl = "https://ark.cn-beijing.volces.com/api/v3";
  defaultModel = "doubao-pro-256k";

  getCompatibleTools(): string[] {
    return ["claude-code", "opencode", "codex", "qwen", "kilo"];
  }

  getConfigTemplate(tool: string): Record<string, any> {
    switch (tool) {
      case "claude-code":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://ark.cn-beijing.volces.com/api/v3",
          "model": "doubao-pro-256k"
        };
      case "opencode":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://ark.cn-beijing.volces.com/api/v3",
          "model": "doubao-pro-256k"
        };
      case "codex":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://ark.cn-beijing.volces.com/api/v3",
          "model": "doubao-pro-256k"
        };
      case "qwen":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://ark.cn-beijing.volces.com/api/v3",
          "model": "doubao-pro-256k"
        };
      case "kilo":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://ark.cn-beijing.volces.com/api/v3",
          "model": "doubao-pro-256k"
        };
      default:
        return {};
    }
  }
}
