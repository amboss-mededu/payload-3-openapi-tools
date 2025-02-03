import type { OpenAPIV3 } from 'openapi-types';
import type { SanitizedCollectionConfig } from 'payload';
import type { Options } from '../../../../options';
export declare const getAuthRoutes: (collection: SanitizedCollectionConfig, options: Options) => Pick<Required<OpenAPIV3.Document>, "paths" | "components">;
