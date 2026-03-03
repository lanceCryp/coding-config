export declare abstract class ToolAdapter {
    abstract id: string;
    abstract name: string;
    abstract configPath(): string;
    isInstalled(): Promise<boolean>;
    readConfig(): Promise<Record<string, any>>;
    writeConfig(config: Record<string, any>): Promise<void>;
}
