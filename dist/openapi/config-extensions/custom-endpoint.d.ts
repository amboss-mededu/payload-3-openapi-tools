import type { OpenAPIV3 } from 'openapi-types';
import type { Endpoint } from 'payload';
export interface EndpointDocumentation {
    summary?: string;
    description: string;
    responseSchema: OpenAPIV3.SchemaObject | string;
    errorResponseSchemas?: Record<number, OpenAPIV3.SchemaObject | string>;
    queryParameters?: Record<string, {
        description?: string;
        required?: boolean;
        schema: OpenAPIV3.SchemaObject | string;
    }>;
}
type DocumentedEndpoint = Endpoint & EndpointDocumentation;
export declare function defineEndpoint(endpoint: DocumentedEndpoint): Endpoint;
export declare function getEndpointDocumentation(endpoint: Endpoint): EndpointDocumentation | undefined;
export {};
