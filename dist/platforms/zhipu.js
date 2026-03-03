"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZhipuPlatform = void 0;
class ZhipuPlatform {
    constructor() {
        this.id = "zhipu";
        this.name = "智谱 GLM";
        this.apiKeyUrl = "https://open.bigmodel.cn/usercenter/apikeys";
        this.baseUrl = "https://open.bigmodel.cn/api/paas/v4";
        this.defaultModel = "glm-4.7";
    }
    getCompatibleTools() {
        return ["cline", "cursor", "claude-code"];
    }
    getConfigTemplate(tool) {
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
exports.ZhipuPlatform = ZhipuPlatform;
