"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailVerificationPaths = void 0;
const schemas_1 = require("../../../../schemas");
const getEmailVerificationPaths = (collection) => {
    if (!collection.auth.verify)
        return {};
    return {
        [`/${collection.slug}/verify/{token}`]: {
            post: {
                summary: 'Verify email',
                description: 'Verify email',
                tags: ['auth'],
                parameters: [
                    {
                        name: 'token',
                        in: 'path',
                        description: 'email verification token',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': (0, schemas_1.createRef)('confirmation', 'responses'),
                    '400': (0, schemas_1.createRef)('invalidTokenError', 'responses'),
                },
            },
        },
    };
};
exports.getEmailVerificationPaths = getEmailVerificationPaths;
