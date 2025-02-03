import { createResponse } from '../schemas';
import { error } from './error';
import { confirmation } from './confirm';
import { count } from './count';
import where from './where';
export * from './parameters';
const schemas = {
    error,
    confirmation,
    count,
    where,
};
const responses = {
    'InvalidRequestErrorResponse': createResponse('invalid request', 'error'),
    'UnauthorizedErrorResponse': createResponse('unauthorized', 'error'),
    'NotFoundErrorResponse': createResponse('not found', 'error'),
    'countResponse': createResponse('count', 'count'),
    confirmationResponse: createResponse('confirmed', 'confirmation'),
};
const createBaseConfig = (options) => ({
    openapi: '3.0.3',
    info: {
        title: 'Payload CMS',
        version: '1.0.0',
    },
    paths: {},
    components: {
        securitySchemes: {
            basicAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'jwt',
            },
            cookieAuth: {
                in: 'cookie',
                type: 'apiKey',
                name: options.access.cookieName,
            },
            ...(options.access.apiKey
                ? {
                    apiKeyAuth: {
                        in: 'header',
                        type: 'apiKey',
                        name: 'Authorization',
                    },
                }
                : {}),
        },
        schemas,
        responses,
    },
    externalDocs: {
        description: 'Payload REST API documentation',
        url: 'https://payloadcms.com/docs/rest-api/overview',
    },
});
export default createBaseConfig;
