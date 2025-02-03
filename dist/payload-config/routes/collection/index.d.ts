import type { OpenAPIV3 } from 'openapi-types';
import type { SanitizedCollectionConfig, SanitizedConfig } from 'payload';
import type { Options } from '../../../options';
export declare const getCollectionRoutes: (collection: SanitizedCollectionConfig, options: Options, payloadConfig: SanitizedConfig) => Promise<Pick<Required<OpenAPIV3.Document>, "paths" | "components">>;
