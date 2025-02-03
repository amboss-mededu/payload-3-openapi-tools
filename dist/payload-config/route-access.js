"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteAccess = exports.includeIfAvailable = exports.isRouteAvailable = exports.getAuth = void 0;
const allowsAnonymous = async (access) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await access({ req: {} });
        return !!result;
    }
    catch {
        return false;
    }
};
const getAuth = (includeApiKeyAuth) => ({
    basicAuth: [],
    cookieAuth: [],
    ...(includeApiKeyAuth ? { apiKeyAuth: [] } : {}),
});
exports.getAuth = getAuth;
const isRouteAvailable = (collection, operation) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const access = collection.access[operation];
    return !access?.metadata?.blockAll;
};
exports.isRouteAvailable = isRouteAvailable;
const includeIfAvailable = (collection, operation, doc) => {
    const operations = Array.isArray(operation) ? operation : [operation];
    const isAvailable = operations.some(op => (0, exports.isRouteAvailable)(collection, op));
    return isAvailable ? doc : {};
};
exports.includeIfAvailable = includeIfAvailable;
const getRouteAccess = async (collection, operation, options) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const access = collection.access[operation];
    if (!access) {
        // default: any logged in user
        return [(0, exports.getAuth)(options.apiKey)];
    }
    if (!options.analyze(collection.slug) || (await allowsAnonymous(access)))
        return undefined;
    // If anonymous is not allow, we'll asume there's basic security
    return [(0, exports.getAuth)(options.apiKey)];
};
exports.getRouteAccess = getRouteAccess;
