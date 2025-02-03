"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineEndpoint = defineEndpoint;
exports.getEndpointDocumentation = getEndpointDocumentation;
function defineEndpoint(endpoint) {
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
function getEndpointDocumentation(endpoint) {
    return endpoint.custom?.openapi;
}
