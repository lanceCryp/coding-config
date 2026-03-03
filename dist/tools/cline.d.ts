import { ToolAdapter } from './base';
export declare class ClineTool extends ToolAdapter {
    id: string;
    name: string;
    configPath(): string;
    writeConfig(platformConfig: Record<string, any>): Promise<void>;
}
