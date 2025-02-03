import { createRef } from '../../../../schemas';
export const getEmailVerificationPaths = (collection) => {
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
                    '200': createRef('confirmation', 'responses'),
                    '400': createRef('invalidTokenError', 'responses'),
                },
            },
        },
    };
};
