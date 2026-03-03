"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorTool = void 0;
const base_1 = require("./base");
class CursorTool extends base_1.ToolAdapter {
    constructor() {
        super(...arguments);
        this.id = "cursor";
        this.name = "Cursor (AI 编辑器)";
    }
    configPath() {
        return `${process.env.HOME || require('os').homedir()}/.cursor/settings.json`;
    }
    async writeConfig(platformConfig) {
        const existing = await this.readConfig();
        const newConfig = {
            ...existing,
            "apiKey": platformConfig.apiKey,
            "baseURL": platformConfig.baseUrl,
            "model": platformConfig.model,
        };
        await super.writeConfig(newConfig);
    }
}
exports.CursorTool = CursorTool;
