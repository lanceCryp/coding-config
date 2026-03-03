import { ToolAdapter } from './base';
export declare class CursorTool extends ToolAdapter {
    id: string;
    name: string;
    configPath(): string;
    writeConfig(platformConfig: Record<string, any>): Promise<void>;
}
