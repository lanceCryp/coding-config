"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOOLS = exports.ClaudeCodeTool = exports.CursorTool = exports.ClineTool = exports.ToolAdapter = void 0;
const cline_1 = require("./cline");
Object.defineProperty(exports, "ClineTool", { enumerable: true, get: function () { return cline_1.ClineTool; } });
const cursor_1 = require("./cursor");
Object.defineProperty(exports, "CursorTool", { enumerable: true, get: function () { return cursor_1.CursorTool; } });
const claude_code_1 = require("./claude-code");
Object.defineProperty(exports, "ClaudeCodeTool", { enumerable: true, get: function () { return claude_code_1.ClaudeCodeTool; } });
var base_1 = require("./base");
Object.defineProperty(exports, "ToolAdapter", { enumerable: true, get: function () { return base_1.ToolAdapter; } });
// 工具注册表
exports.TOOLS = {
    cline: new cline_1.ClineTool(),
    cursor: new cursor_1.CursorTool(),
    'claude-code': new claude_code_1.ClaudeCodeTool(),
};
