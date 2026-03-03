import { ClineTool } from './cline';
import { CursorTool } from './cursor';
import { ClaudeCodeTool } from './claude-code';

export { ToolAdapter } from './base';
export { ClineTool, CursorTool, ClaudeCodeTool };

// 工具注册表
export const TOOLS: Record<string, any> = {
  cline: new ClineTool(),
  cursor: new CursorTool(),
  'claude-code': new ClaudeCodeTool(),
};