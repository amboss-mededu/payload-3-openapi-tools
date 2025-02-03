import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const toVersion = (versionString) => {
    const parts = versionString.split('.');
    return {
        major: Number(parts[0]),
        minor: Number(parts[1]),
        patch: Number(parts[2]),
    };
};
export const greaterOrEqual = (a, b) => a.major > b.major || (a.major === b.major && (a.minor > b.minor || (a.minor === b.minor && a.patch >= b.patch)));
export const supports = (initialVersion, currentVersion) => {
    if (!initialVersion || !currentVersion)
        return true;
    return greaterOrEqual(currentVersion, initialVersion);
};
export const getPayloadVersion = async () => {
    try {
        const { version } = await import(join(dirname(dirname(__dirname)), 'node_modules/payload/package.json'), {
            assert: { type: 'json' }
        });
        return version ? toVersion(version) : undefined;
    }
    catch (e) {
        return undefined;
    }
};
