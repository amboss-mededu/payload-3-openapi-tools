import type { OpenAPIV3 } from 'openapi-types';
export declare const createContent: (content: string | OpenAPIV3.SchemaObject) => {
    [media: string]: OpenAPIV3.MediaTypeObject;
};
export declare const createRequestBody: (content: string | OpenAPIV3.SchemaObject) => OpenAPIV3.RequestBodyObject;
export declare const createResponse: (description: string, content: string | OpenAPIV3.SchemaObject) => OpenAPIV3.ResponseObject;
type ComponentType = 'schemas' | 'responses' | 'requestBodies';
export declare const createRef: (entity: string, type?: ComponentType) => {
    $ref: string;
};
export {};
