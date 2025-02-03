import { createRequestBody, createResponse } from '../schemas';
const login = {
    title: 'Login request',
    type: 'object',
    additionalProperties: false,
    properties: {
        email: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
    required: ['email', 'password'],
};
const unlock = {
    type: 'object',
    additionalProperties: false,
    properties: {
        email: { type: 'string' },
    },
    required: ['email'],
};
const passwordForgotten = {
    type: 'object',
    additionalProperties: false,
    properties: {
        email: { type: 'string' },
    },
    required: ['email'],
};
const passwordReset = {
    type: 'object',
    additionalProperties: false,
    properties: {
        token: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['token', 'password'],
};
export const getAuthSchemas = (config, options) => {
    if (!options.include.authPaths)
        return {};
    const requestBodies = {
        loginRequest: createRequestBody(login),
    };
    if (config.collections.some(collection => collection.auth.maxLoginAttempts)) {
        requestBodies['unlockRequest'] = createRequestBody(unlock);
    }
    if (options.include.passwordRecovery) {
        requestBodies['passwordForgottenRequest'] = createRequestBody(passwordForgotten);
        requestBodies['passwordResetRequest'] = createRequestBody(passwordReset);
    }
    return {
        requestBodies,
        responses: {
            NoUserErrorResponse: createResponse('no user', 'error'),
            InvalidTokenErrorResponse: createResponse('invalid token', 'error'),
        },
    };
};
