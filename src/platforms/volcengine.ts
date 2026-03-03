export class VolcenginePlatform {
  id = "volcengine";
  name = "火山引擎方舟";
  apiKeyUrl = "https://console.volcengine.com/ark";
  baseUrl = "https://ark.cn-beijing.volces.com/api/v3";
  defaultModel = "doubao-pro-256k";

  getCompatibleTools(): string[] {
    return ["cline", "cursor", "claude-code"];
  }

  getConfigTemplate(tool: string): Record<string, any> {
    switch (tool) {
      case "cline":
        return {
          "cline.anthropicApiKey": "${API_KEY}",
          "cline.anthropicBaseUrl": "https://ark.cn-beijing.volces.com/api/v3",
          "cline.model": "doubao-pro-256k"
        };
      case "cursor":
        return {
          "apiKey": "${API_KEY}",
          "baseURL": "https://ark.cn-beijing.volces.com/api/v3",
          "model": "doubao-pro-256k"
        };
      case "claude-code":
        return {
          "apiKey": "${API_KEY}",
          "apiUrl": "https://ark.cn-beijing.volces.com/api/v3",
          "model": "doubao-pro-256k"
        };
      default:
        return {};
    }
  }
}