export const count = {
    title: 'Count response message',
    type: 'object',
    additionalProperties: false,
    properties: {
        totalDocs: { type: 'number' },
    },
    required: ['totalDocs'],
};
