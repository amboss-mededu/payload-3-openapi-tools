import type { OpenAPIV3 } from 'openapi-types';
import type { Options } from '../options';
import type { Version } from './version';
export declare const isSupported: (version?: Version) => boolean;
export declare const getUnsupportedSchema: (options: Options) => OpenAPIV3.Document;
