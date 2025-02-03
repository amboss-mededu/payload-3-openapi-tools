export const createUpsertConfirmationSchema = (schemaName, singular) => ({
    type: 'object',
    title: `${singular} upsert confirmation`,
    properties: {
        doc: {
            '$ref': `#/components/schemas/${schemaName}`,
        },
        message: { type: 'string' },
    },
    required: ['doc', 'message'],
});
