import { createRef } from '../../../../schemas';
import { getAuth } from '../../../route-access';
export const getUnlockPaths = (collection, options) => {
    if (!collection.auth.maxLoginAttempts)
        return {};
    return {
        [`/${collection.slug}/unlock`]: {
            post: {
                summary: 'Unlock account',
                description: 'Unlock account',
                tags: ['auth'],
                security: [getAuth(options.access.apiKey)],
                requestBody: createRef('unlock', 'requestBodies'),
                responses: {
                    '200': createRef('confirmation', 'responses'),
                },
            },
        },
    };
};
