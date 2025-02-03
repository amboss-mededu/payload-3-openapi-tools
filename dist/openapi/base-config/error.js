export const error = {
    title: 'Error response message',
    type: 'object',
    additionalProperties: false,
    properties: {
        errors: {
            type: 'array',
            items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    message: {
                        type: 'string',
                    },
                },
                required: ['message'],
            },
        },
    },
    required: ['errors'],
};
