export declare class ZhipuPlatform {
    id: string;
    name: string;
    apiKeyUrl: string;
    baseUrl: string;
    defaultModel: string;
    getCompatibleTools(): string[];
    getConfigTemplate(tool: string): Record<string, any>;
}
