"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolcenginePlatform = void 0;
class VolcenginePlatform {
    constructor() {
        this.id = "volcengine";
        this.name = "火山引擎方舟";
        this.apiKeyUrl = "https://console.volcengine.com/ark";
        this.baseUrl = "https://ark.cn-beijing.volces.com/api/v3";
        this.defaultModel = "doubao-pro-256k";
    }
    getCompatibleTools() {
        return ["cline", "cursor", "claude-code"];
    }
    getConfigTemplate(tool) {
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
exports.VolcenginePlatform = VolcenginePlatform;
