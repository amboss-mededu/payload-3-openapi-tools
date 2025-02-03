import { createRef, createRequestBody, createResponse } from '../../../schemas';
import { getAuth } from '../../route-access';
const parameters = [
    {
        name: 'key',
        in: 'path',
        description: 'key of the preference',
        required: true,
        schema: { type: 'string' },
    },
];
const requestContent = {
    oneOf: [
        {
            type: 'object',
            properties: {
                value: { type: 'string' },
            },
            required: ['value'],
        },
        {
            type: 'object',
        },
    ],
};
const upsertResponseBody = {
    type: 'object',
    properties: {
        message: { type: 'string' },
        doc: {
            type: 'object',
            properties: {
                value: {},
                key: { type: 'string' },
                user: { type: 'string' },
                userCollection: { type: 'string' },
            },
            required: ['value', 'key', 'user', 'userCollection'],
        },
    },
};
const deleteResponseBody = {
    type: 'object',
    properties: {
        message: { type: 'string' },
    },
    required: ['message'],
};
const responseBody = {
    oneOf: [
        {
            type: 'object',
            properties: {
                value: {},
                key: { type: 'string' },
                user: { type: 'string' },
                userCollection: { type: 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            },
            required: ['value', 'key', 'user', 'userCollection', 'createdAt', 'updatedAt'],
        },
        {
            type: 'object',
            properties: {
                message: { type: 'string' },
                value: { nullable: true }, // cannot properly model in 3.0 that it's always null
            },
        },
    ],
};
export const createPreferenceRouts = (options) => {
    if (!options.include.preferences)
        return { paths: {}, components: {} };
    const security = [getAuth(options.access.apiKey)];
    const paths = {
        '/_preferences/{key}': {
            get: {
                summary: 'Get a preference by key',
                description: 'Get a preference by key',
                tags: ['preferences'],
                security,
                parameters,
                responses: {
                    '200': createRef('preference', 'responses'),
                },
            },
            post: {
                summary: 'Create or update a preference by key',
                description: 'Create or update a preference by key',
                tags: ['preferences'],
                security,
                parameters,
                requestBody: createRef('preference', 'requestBodies'),
                responses: {
                    '200': createRef('preferenceUpsert', 'responses'),
                },
            },
            delete: {
                summary: 'Delete a preference by key',
                description: 'Delete a preference by key',
                tags: ['preferences'],
                security,
                parameters,
                responses: {
                    '200': createRef('preferenceDelete', 'responses'),
                },
            },
        },
    };
    return {
        paths,
        components: {
            requestBodies: {
                preferenceRequest: createRequestBody(requestContent),
            },
            responses: {
                preferenceResponse: createResponse('ok', responseBody),
                preferenceUpsertResponse: createResponse('ok', upsertResponseBody),
                preferenceDeleteResponse: createResponse('ok', deleteResponseBody),
            },
        },
    };
};
