import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs-extra';

const CONFIG_DIR = path.join(os.homedir(), '.ai-coding-config');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export interface Config {
  platforms: Record<string, { apiKey: string }>;
  tools: Record<string, { platform: string }>;
}

export async function loadConfig(): Promise<Config> {
  try {
    return await fs.readJson(CONFIG_FILE);
  } catch {
    return { platforms: {}, tools: {} };
  }
}

export async function saveConfig(config: Config): Promise<void> {
  await fs.ensureDir(CONFIG_DIR);
  await fs.writeJson(CONFIG_FILE, config, { spaces: 2 });
}

export async function addPlatform(platformId: string, apiKey: string): Promise<void> {
  const config = await loadConfig();
  config.platforms[platformId] = { apiKey };
  await saveConfig(config);
}

export async function addTool(toolId: string, platformId: string): Promise<void> {
  const config = await loadConfig();
  config.tools[toolId] = { platform: platformId };
  await saveConfig(config);
}