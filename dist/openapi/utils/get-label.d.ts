import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload';
export declare const getLabels: (collection: SanitizedCollectionConfig | SanitizedGlobalConfig, kind: "singular" | "plural") => string | Record<string, string> | undefined;
