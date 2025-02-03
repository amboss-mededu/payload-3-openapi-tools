import type { OpenAPIV3 } from 'openapi-types';
import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload';
import type { Options } from '../options';
export declare const getAuth: (includeApiKeyAuth: boolean) => {
    apiKeyAuth?: never[] | undefined;
    basicAuth: never[];
    cookieAuth: never[];
};
export declare const isRouteAvailable: (collection: SanitizedCollectionConfig | SanitizedGlobalConfig, operation: keyof SanitizedCollectionConfig["access"]) => boolean;
export declare const includeIfAvailable: <T>(collection: SanitizedCollectionConfig | SanitizedGlobalConfig, operation: keyof SanitizedCollectionConfig["access"] | (keyof SanitizedCollectionConfig["access"])[], doc: T) => T | {};
export declare const getRouteAccess: (collection: SanitizedCollectionConfig | SanitizedGlobalConfig, operation: keyof SanitizedCollectionConfig["access"], options: Options["access"]) => Promise<OpenAPIV3.SecurityRequirementObject[] | undefined>;
