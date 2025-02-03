import type { OpenAPIV3 } from 'openapi-types';
import { type SanitizedConfig } from 'payload';
import type { RawOptions as Options } from './options';
/**
 * Creates an openapi document for the given payload configuration
 */
export declare const createDocument: (payloadConfig: SanitizedConfig, options?: Options) => Promise<OpenAPIV3.Document>;
