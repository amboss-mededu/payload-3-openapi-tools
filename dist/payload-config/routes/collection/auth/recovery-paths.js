"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasswordRecoveryPaths = void 0;
const schemas_1 = require("../../../../schemas");
const utils_1 = require("../../../../utils");
const getPasswordRecoveryPaths = (collection, options) => {
    if (!options.include.passwordRecovery)
        return {};
    return {
        [`/${collection.slug}/forgot-password`]: {
            post: {
                summary: 'Start password reset',
                description: 'Entry point for password reset workflow. Sends password reset email.',
                tags: ['auth'],
                requestBody: (0, schemas_1.createRef)('passwordForgotten', 'requestBodies'),
                responses: {
                    '200': (0, schemas_1.createRef)('confirmation', 'responses'),
                },
            },
        },
        [`/${collection.slug}/reset-password`]: {
            post: {
                summary: 'Reset password',
                description: 'Reset password',
                tags: ['auth'],
                requestBody: (0, schemas_1.createRef)('passwordReset', 'requestBodies'),
                responses: {
                    '200': (0, schemas_1.createRef)(`${(0, utils_1.getSingularSchemaName)(collection)}PasswordResetResponse`, 'responses'),
                },
            },
        },
    };
};
exports.getPasswordRecoveryPaths = getPasswordRecoveryPaths;
