"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaudeCodeTool = void 0;
const base_1 = require("./base");
class ClaudeCodeTool extends base_1.ToolAdapter {
    constructor() {
        super(...arguments);
        this.id = "claude-code";
        this.name = "Claude Code (CLI)";
    }
    configPath() {
        return `${process.env.HOME || require('os').homedir()}/.claude/config.json`;
    }
    async writeConfig(platformConfig) {
        const existing = await this.readConfig();
        const newConfig = {
            ...existing,
            "apiKey": platformConfig.apiKey,
            "apiUrl": platformConfig.baseUrl,
            "model": platformConfig.model,
        };
        await super.writeConfig(newConfig);
    }
}
exports.ClaudeCodeTool = ClaudeCodeTool;
