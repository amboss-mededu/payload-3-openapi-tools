import type { OpenAPIV3 } from 'openapi-types';
import type { SanitizedCollectionConfig } from 'payload';
import type { Options } from '../../../options';
export declare const getBulkRoutes: (collection: SanitizedCollectionConfig, options: Options) => Promise<Pick<Required<OpenAPIV3.Document>, "paths" | "components">>;
