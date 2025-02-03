/** To avoid circular imports of the config directly */
export const importPayloadConfig = async (path) => {
    return await import(path).then((mod) => mod.default);
};
