import type { OpenAPIV3 } from 'openapi-types';
import type { Options } from '../options';
export * from './parameters';
declare const createBaseConfig: (options: Options) => OpenAPIV3.Document;
export default createBaseConfig;
