import { createDocument } from './openapi';
import generateDocs from './create-api-docs/generate-docs';

export { createDocument, type Options } from './openapi';
export { generateDocs };
export type { defineEndpoint, EndpointDocumentation, Example } from './openapi/config-extensions';

// Set default export
export default createDocument; 
