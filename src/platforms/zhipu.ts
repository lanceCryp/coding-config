export class ZhipuPlatform {
  id = "zhipu";
  name = "智谱 GLM";
  apiKeyUrl = "https://open.bigmodel.cn/usercenter/apikeys";
  baseUrl = "https://open.bigmodel.cn/api/paas/v4";
  defaultModel = "glm-4.7";

  getCompatibleTools(): string[] {
    return ["claude-code", "opencode", "codex", "qwen", "kilo"];
  }

  getConfigTemplate(tool: string): Record<string, any> {
    switch (tool) {
      case "claude-code":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://open.bigmodel.cn/api/paas/v4",
          "model": "glm-4.7"
        };
      case "opencode":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://open.bigmodel.cn/api/paas/v4",
          "model": "glm-4.7"
        };
      case "codex":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://open.bigmodel.cn/api/paas/v4",
          "model": "glm-4.7"
        };
      case "qwen":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://open.bigmodel.cn/api/paas/v4",
          "model": "glm-4.7"
        };
      case "kilo":
        return {
          "apiKey": "${API_KEY}",
          "baseUrl": "https://open.bigmodel.cn/api/paas/v4",
          "model": "glm-4.7"
        };
      default:
        return {};
    }
  }
}
