export interface Config {
    platforms: Record<string, {
        apiKey: string;
    }>;
    tools: Record<string, {
        platform: string;
    }>;
}
export declare function loadConfig(): Promise<Config>;
export declare function saveConfig(config: Config): Promise<void>;
export declare function addPlatform(platformId: string, apiKey: string): Promise<void>;
export declare function addTool(toolId: string, platformId: string): Promise<void>;
