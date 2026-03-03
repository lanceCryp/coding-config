"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClineTool = void 0;
const base_1 = require("./base");
class ClineTool extends base_1.ToolAdapter {
    constructor() {
        super(...arguments);
        this.id = "cline";
        this.name = "Cline (VS Code Plugin)";
    }
    configPath() {
        return `${process.env.HOME || require('os').homedir()}/.vscode/settings.json`;
    }
    async writeConfig(platformConfig) {
        const existing = await this.readConfig();
        const newConfig = {
            ...existing,
            "cline.anthropicApiKey": platformConfig.apiKey,
            "cline.anthropicBaseUrl": platformConfig.baseUrl,
            "cline.model": platformConfig.model,
        };
        await super.writeConfig(newConfig);
    }
}
exports.ClineTool = ClineTool;
