import type { OpenAPIV3 } from 'openapi-types';
import type { Options } from '../../../options';
export declare const createAccessRoute: (options: Options) => Pick<Required<OpenAPIV3.Document>, "paths" | "components">;
