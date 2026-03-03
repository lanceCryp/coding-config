export class ZhipuPlatform {
  id = "zhipu";
  name = "智谱 GLM";
  apiKeyUrl = "https://open.bigmodel.cn/usercenter/apikeys";
  baseUrl = "https://open.bigmodel.cn/api/paas/v4";
  defaultModel = "glm-4.7";

  getCompatibleTools(): string[] {
    return ["cline", "cursor", "claude-code"];
  }

  getConfigTemplate(tool: string): Record<string, any> {
    switch (tool) {
      case "cline":
        return {
          "cline.anthropicApiKey": "${API_KEY}",
          "cline.anthropicBaseUrl": "https://open.bigmodel.cn/api/paas/v4",
          "cline.model": "glm-4.7"
        };
      case "cursor":
        return {
          "apiKey": "${API_KEY}",
          "baseURL": "https://open.bigmodel.cn/api/paas/v4",
          "model": "glm-4.7"
        };
      case "claude-code":
        return {
          "apiKey": "${API_KEY}",
          "apiUrl": "https://open.bigmodel.cn/api/paas/v4",
          "model": "glm-4.7"
        };
      default:
        return {};
    }
  }
}