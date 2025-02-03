import type { CollectionConfig, GlobalConfig } from 'payload';
export type Example<T = any> = {
    example?: T;
} | {
    examples: Record<string, {
        value: T;
        summary?: string;
    }>;
};
export declare function defineCollection<T = any>(config: CollectionConfig & Example<T>): CollectionConfig;
export declare function defineGlobal<T = any>(config: GlobalConfig & Example<T>): GlobalConfig;
