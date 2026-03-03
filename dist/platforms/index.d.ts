export interface PlatformAdapter {
    id: string;
    name: string;
    apiKeyUrl: string;
    baseUrl: string;
    defaultModel: string;
    getCompatibleTools(): string[];
    getConfigTemplate(tool: string): Record<string, any>;
}
export { ZhipuPlatform } from './zhipu';
export { AliPlatform } from './ali';
export { VolcenginePlatform } from './volcengine';
export declare const PLATFORMS: Record<string, PlatformAdapter>;
