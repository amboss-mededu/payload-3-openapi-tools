import type { SanitizedConfig } from "payload";
/** To avoid circular imports of the config directly */
export declare const importPayloadConfig: (path: string) => Promise<SanitizedConfig>;
