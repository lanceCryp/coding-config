"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliPlatform = void 0;
class AliPlatform {
    constructor() {
        this.id = "ali";
        this.name = "阿里云百炼";
        this.apiKeyUrl = "https://bailian.console.aliyun.com/#/apikey";
        this.baseUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1";
        this.defaultModel = "qwen-coder-plus";
    }
    getCompatibleTools() {
        return ["cline", "cursor", "claude-code"];
    }
    getConfigTemplate(tool) {
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
exports.AliPlatform = AliPlatform;
