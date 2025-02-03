import type { OpenAPIV3 } from 'openapi-types';
import type { SanitizedConfig, SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload';
import type { Options } from '../../options';
export declare const createVersionRoutes: (config: SanitizedCollectionConfig | SanitizedGlobalConfig, options: Options, payloadConfig: SanitizedConfig) => Promise<Pick<Required<OpenAPIV3.Document>, "paths" | "components">>;
