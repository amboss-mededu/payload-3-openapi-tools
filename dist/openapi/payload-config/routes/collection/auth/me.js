const me = (schemaName) => ({
    title: 'Me',
    type: 'object',
    additionalProperties: false,
    properties: {
        user: {
            '$ref': `#/components/schemas/${schemaName}`,
            nullable: true,
        },
        token: {
            type: 'string',
        },
        exp: {
            type: 'number',
        },
    },
    'required': ['user'],
});
export default me;
