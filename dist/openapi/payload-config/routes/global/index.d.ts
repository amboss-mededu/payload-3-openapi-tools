import type { OpenAPIV3 } from 'openapi-types';
import type { SanitizedGlobalConfig, SanitizedConfig } from 'payload';
import type { Options } from '../../../options';
export declare const getGlobalRoutes: (global: SanitizedGlobalConfig, options: Options, payloadConfig: SanitizedConfig) => Promise<Pick<Required<OpenAPIV3.Document>, "paths" | "components">>;
