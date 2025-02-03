export const confirmation = {
    title: 'Confirmation response message',
    type: 'object',
    additionalProperties: false,
    properties: {
        message: { type: 'string' },
    },
    required: ['message'],
};
