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
export const getAuth = (includeApiKeyAuth) => ({
    basicAuth: [],
    cookieAuth: [],
    ...(includeApiKeyAuth ? { apiKeyAuth: [] } : {}),
});
export const isRouteAvailable = (collection, operation) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const access = collection.access[operation];
    return !access?.metadata?.blockAll;
};
export const includeIfAvailable = (collection, operation, doc) => {
    const operations = Array.isArray(operation) ? operation : [operation];
    const isAvailable = operations.some(op => isRouteAvailable(collection, op));
    return isAvailable ? doc : {};
};
export const getRouteAccess = async (collection, operation, options) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const access = collection.access[operation];
    if (!access) {
        // default: any logged in user
        return [getAuth(options.apiKey)];
    }
    if (!options.analyze(collection.slug) || (await allowsAnonymous(access)))
        return undefined;
    // If anonymous is not allow, we'll asume there's basic security
    return [getAuth(options.apiKey)];
};
