export interface Version {
    major: number;
    minor: number;
    patch: number;
}
export declare const toVersion: (versionString: string) => Version;
export declare const greaterOrEqual: (a: Version, b: Version) => boolean;
export declare const supports: (initialVersion: Version | undefined, currentVersion: Version | undefined) => boolean;
export declare const getPayloadVersion: () => Promise<Version | undefined>;
