export interface PlatformAdapter {
  id: string;
  name: string;
  apiKeyUrl: string;
  baseUrl: string;
  defaultModel: string;
  getCompatibleTools(): string[];
  getConfigTemplate(tool: string): Record<string, any>;
}

// 导出所有平台
export { ZhipuPlatform } from './zhipu';
export { AliPlatform } from './ali';
export { VolcenginePlatform } from './volcengine';

// 平台注册表
export const PLATFORMS: Record<string, PlatformAdapter> = {
  zhipu: new (require('./zhipu').ZhipuPlatform)(),
  ali: new (require('./ali').AliPlatform)(),
  volcengine: new (require('./volcengine').VolcenginePlatform)(),
};