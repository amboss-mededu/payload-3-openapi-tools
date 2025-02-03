"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthPaths = void 0;
const schemas_1 = require("../../../../schemas");
const utils_1 = require("../../../../utils");
const getAuthPaths = (collection) => {
    const schemaName = (0, utils_1.getSingularSchemaName)(collection);
    return {
        [`/${collection.slug}/me`]: {
            get: {
                summary: 'Current user data',
                description: 'Data about the current user',
                tags: ['auth'],
                responses: {
                    '200': (0, schemas_1.createRef)(`${schemaName}Me`, 'responses'),
                },
            },
        },
        [`/${collection.slug}/login`]: {
            post: {
                summary: 'Login',
                description: 'Login',
                tags: ['auth'],
                requestBody: (0, schemas_1.createRef)('login', 'requestBodies'),
                responses: {
                    '200': (0, schemas_1.createRef)(`${schemaName}Me`, 'responses'),
                    '401': (0, schemas_1.createRef)('UnauthorizedError', 'responses'),
                },
            },
        },
        [`/${collection.slug}/logout`]: {
            post: {
                summary: 'Logout',
                description: 'Logout',
                tags: ['auth'],
                responses: {
                    '200': (0, schemas_1.createRef)('confirmation', 'responses'),
                    '400': (0, schemas_1.createRef)('NoUserError', 'responses'),
                },
            },
        },
        [`/${collection.slug}/refresh-token`]: {
            post: {
                summary: 'Refresh JWT',
                description: 'Refresh the JWT token',
                tags: ['auth'],
                responses: {
                    '200': (0, schemas_1.createRef)(`${schemaName}Me`, 'responses'),
                    '404': (0, schemas_1.createRef)('NotFoundError', 'responses'),
                },
            },
        },
    };
};
exports.getAuthPaths = getAuthPaths;
