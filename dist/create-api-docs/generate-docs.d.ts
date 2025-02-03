import type { SanitizedConfig } from 'payload';
import { type Options } from '../openapi';
declare const generateDocs: (payloadConfig: SanitizedConfig, outputPath?: string, options?: Options) => Promise<void>;
export default generateDocs;
