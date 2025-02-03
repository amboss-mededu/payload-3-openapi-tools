"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthSchemas = void 0;
const schemas_1 = require("../schemas");
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
const getAuthSchemas = (config, options) => {
    if (!options.include.authPaths)
        return {};
    const requestBodies = {
        loginRequest: (0, schemas_1.createRequestBody)(login),
    };
    if (config.collections.some(collection => collection.auth.maxLoginAttempts)) {
        requestBodies['unlockRequest'] = (0, schemas_1.createRequestBody)(unlock);
    }
    if (options.include.passwordRecovery) {
        requestBodies['passwordForgottenRequest'] = (0, schemas_1.createRequestBody)(passwordForgotten);
        requestBodies['passwordResetRequest'] = (0, schemas_1.createRequestBody)(passwordReset);
    }
    return {
        requestBodies,
        responses: {
            NoUserErrorResponse: (0, schemas_1.createResponse)('no user', 'error'),
            InvalidTokenErrorResponse: (0, schemas_1.createResponse)('invalid token', 'error'),
        },
    };
};
exports.getAuthSchemas = getAuthSchemas;
