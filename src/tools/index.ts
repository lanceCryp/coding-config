import { ClaudeCodeTool } from './claude-code';
import { OpenCodeTool } from './opencode';
import { CodexTool } from './codex';
import { QwenTool } from './qwen';
import { KiloTool } from './kilo';

export { ToolAdapter } from './base';
export { ClaudeCodeTool, OpenCodeTool, CodexTool, QwenTool, KiloTool };

// 工具注册表
export const TOOLS: Record<string, any> = {
  'claude-code': new ClaudeCodeTool(),
  'opencode': new OpenCodeTool(),
  'codex': new CodexTool(),
  'qwen': new QwenTool(),
  'kilo': new KiloTool(),
};