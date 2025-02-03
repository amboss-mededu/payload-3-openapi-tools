import type { OpenAPIV3 } from 'openapi-types';
import type { SanitizedConfig, SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload';
type Config = SanitizedConfig | SanitizedCollectionConfig | SanitizedGlobalConfig;
type ConfigType = 'payload' | 'global' | 'collection';
export declare const getCustomPaths: (config: Config, type: ConfigType) => Pick<Required<OpenAPIV3.Document>, "paths" | "components">;
export {};
