export function defineEndpoint(endpoint) {
    const { summary, description, responseSchema, errorResponseSchemas, queryParameters, custom, ...rest } = endpoint;
    return {
        ...rest,
        custom: {
            ...custom,
            openapi: {
                summary,
                description,
                responseSchema,
                errorResponseSchemas,
                queryParameters,
            },
        },
    };
}
export function getEndpointDocumentation(endpoint) {
    return endpoint.custom?.openapi;
}
