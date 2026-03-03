import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

export async function detectToolInstallation(toolId: string): Promise<boolean> {
  let configPath = '';
  
  switch (toolId) {
    case 'cline':
      configPath = path.join(os.homedir(), '.vscode', 'settings.json');
      break;
    case 'cursor':
      configPath = path.join(os.homedir(), '.cursor', 'settings.json');
      break;
    case 'claude-code':
      configPath = path.join(os.homedir(), '.claude', 'config.json');
      break;
    default:
      return false;
  }
  
  return await fs.pathExists(configPath);
}

export async function getAllInstalledTools(): Promise<string[]> {
  const tools = ['cline', 'cursor', 'claude-code'];
  const installed: string[] = [];
  
  for (const tool of tools) {
    if (await detectToolInstallation(tool)) {
      installed.push(tool);
    }
  }
  
  return installed;
}