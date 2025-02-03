import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload';
export declare const getSingular: (collection: SanitizedCollectionConfig | SanitizedGlobalConfig) => string;
export declare const getPlural: (collection: SanitizedCollectionConfig | SanitizedGlobalConfig) => string;
export declare const getDescription: (collection: SanitizedCollectionConfig | SanitizedGlobalConfig) => string | undefined;
