"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnlockPaths = void 0;
const schemas_1 = require("../../../../schemas");
const route_access_1 = require("../../../route-access");
const getUnlockPaths = (collection, options) => {
    if (!collection.auth.maxLoginAttempts)
        return {};
    return {
        [`/${collection.slug}/unlock`]: {
            post: {
                summary: 'Unlock account',
                description: 'Unlock account',
                tags: ['auth'],
                security: [(0, route_access_1.getAuth)(options.access.apiKey)],
                requestBody: (0, schemas_1.createRef)('unlock', 'requestBodies'),
                responses: {
                    '200': (0, schemas_1.createRef)('confirmation', 'responses'),
                },
            },
        },
    };
};
exports.getUnlockPaths = getUnlockPaths;
