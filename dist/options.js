"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOptions = void 0;
const utils_1 = require("./utils");
const parseOptions = async (options = {}, payloadConfig) => {
    const payloadVersion = options.payloadVersion ? (0, utils_1.toVersion)(options.payloadVersion) : await (0, utils_1.getPayloadVersion)();
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
            bulkOperations: (0, utils_1.supports)((0, utils_1.toVersion)('1.6.24'), payloadVersion),
        },
    };
};
exports.parseOptions = parseOptions;
