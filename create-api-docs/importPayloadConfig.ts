import type { SanitizedConfig } from "payload";

/** To avoid circular imports of the config directly */
export const importPayloadConfig = async (path: string): Promise<SanitizedConfig> => {
  return await import(path).then((mod) => mod.default);
};