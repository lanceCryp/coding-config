import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

export interface PlatformConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  lastUsed?: string;
}

export interface LocalStorageConfig {
  currentPlatform: string | null;
  platforms: Record<string, PlatformConfig>;
  lastSwitched?: string;
}

export class LocalStorageManager {
  private configPath: string;

  constructor() {
    const homeDir = os.homedir();
    this.configPath = path.join(homeDir, '.ai-coding-config.json');
  }

  async readConfig(): Promise<LocalStorageConfig> {
    try {
      const exists = await fs.pathExists(this.configPath);
      if (!exists) {
        return {
          currentPlatform: null,
          platforms: {},
        };
      }
      return await fs.readJson(this.configPath);
    } catch (error) {
      console.error('Error reading local config:', error);
      return {
        currentPlatform: null,
        platforms: {},
      };
    }
  }

  async writeConfig(config: LocalStorageConfig): Promise<void> {
    try {
      const dir = path.dirname(this.configPath);
      await fs.ensureDir(dir);  // 确保目录存在（虽然对于home目录通常是不必要的）
      await fs.writeJson(this.configPath, config, { spaces: 2 });
    } catch (error) {
      console.error('Error writing local config:', error);
      throw error;
    }
  }

  async savePlatformConfig(platformId: string, config: PlatformConfig): Promise<void> {
    const currentConfig = await this.readConfig();
    const updatedConfig = {
      ...currentConfig,
      platforms: {
        ...currentConfig.platforms,
        [platformId]: {
          ...config,
          lastUsed: new Date().toISOString(),
        },
      },
    };
    await this.writeConfig(updatedConfig);
  }

  async setCurrentPlatform(platformId: string): Promise<void> {
    const currentConfig = await this.readConfig();
    const updatedConfig = {
      ...currentConfig,
      currentPlatform: platformId,
      lastSwitched: new Date().toISOString(),
    };
    await this.writeConfig(updatedConfig);
  }

  async getCurrentPlatform(): Promise<string | null> {
    const config = await this.readConfig();
    return config.currentPlatform;
  }

  async getPlatformConfig(platformId: string): Promise<PlatformConfig | null> {
    const config = await this.readConfig();
    return config.platforms[platformId] || null;
  }

  async getAllPlatforms(): Promise<string[]> {
    const config = await this.readConfig();
    return Object.keys(config.platforms);
  }

  async removePlatformConfig(platformId: string): Promise<void> {
    const currentConfig = await this.readConfig();
    const updatedPlatforms = { ...currentConfig.platforms };
    delete updatedPlatforms[platformId];
    
    const updatedConfig = {
      ...currentConfig,
      platforms: updatedPlatforms,
      currentPlatform: currentConfig.currentPlatform === platformId ? null : currentConfig.currentPlatform,
    };
    
    await this.writeConfig(updatedConfig);
  }
}