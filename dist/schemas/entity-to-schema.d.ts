import type { OpenAPIV3 } from 'openapi-types';
import type { SanitizedConfig, SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload';
export declare const entityToSchema: (config: SanitizedConfig, incomingEntity: SanitizedCollectionConfig | SanitizedGlobalConfig) => Promise<{
    schema: OpenAPIV3.SchemaObject;
    fieldDefinitions: Record<string, OpenAPIV3.SchemaObject>;
}>;
