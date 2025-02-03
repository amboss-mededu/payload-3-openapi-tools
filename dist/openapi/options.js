import { getPayloadVersion, supports, toVersion } from './utils';
export const parseOptions = async (options = {}, payloadConfig) => {
    const payloadVersion = options.payloadVersion ? toVersion(options.payloadVersion) : await getPayloadVersion();
    return {
        payloadVersion,
        access: {
            analyze: Array.isArray(options.disableAccessAnalysis)
                ? slug => !options.disableAccessAnalysis.includes(slug)
                : () => !options.disableAccessAnalysis,
            cookieName: `${payloadConfig.cookiePrefix || 'payload'}-token`,
            apiKey: payloadConfig.collections.some(collection => collection.auth?.useAPIKey),
        },
        include: {
            authPaths: !options.exclude?.authPaths,
            authCollection: !options.exclude?.authCollection,
            passwordRecovery: options.exclude?.passwordRecovery === false,
            preferences: options.exclude?.preferences === false,
            custom: !options.exclude?.custom,
        },
        supports: {
            bulkOperations: supports(toVersion('1.6.24'), payloadVersion),
        },
    };
};
