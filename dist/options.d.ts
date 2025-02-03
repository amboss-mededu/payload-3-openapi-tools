import type { SanitizedConfig } from 'payload';
import type { Version } from './utils';
/**
 * Payload openapi options
 */
export interface RawOptions {
    /**
     * By default the access functions on all collections in the config are called to determine the access level of the operations.
     * @type {boolean} set to `true` to disable this behaviour
     * @type {string[]} or list the collections for which to opt out
     */
    disableAccessAnalysis?: boolean | string[];
    /**
     * Exclude parts of the payload config from document generation
     */
    exclude?: {
        authPaths?: boolean;
        authCollection?: boolean;
        passwordRecovery?: boolean;
        preferences?: boolean;
        custom?: boolean;
    };
    /**
     * Payload version is automatically determined.
     * If this is not possible (for instance in monorepo), it can be provided as option
     */
    payloadVersion?: string;
}
export interface Options {
    payloadVersion?: Version;
    access: {
        analyze: (slug: string) => boolean;
        cookieName: string;
        apiKey: boolean;
    };
    include: {
        authPaths: boolean;
        authCollection: boolean;
        passwordRecovery: boolean;
        preferences: boolean;
        custom: boolean;
    };
    supports: {
        bulkOperations: boolean;
    };
}
export declare const parseOptions: (options: RawOptions | undefined, payloadConfig: SanitizedConfig) => Promise<Options>;
