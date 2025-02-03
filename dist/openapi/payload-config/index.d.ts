import type { SanitizedConfig } from 'payload';
import type { OpenAPIV3 } from 'openapi-types';
import type { Options } from '../options';
export declare const analyzePayload: (payloadConfig: SanitizedConfig, options: Options) => Promise<Partial<OpenAPIV3.Document>>;
