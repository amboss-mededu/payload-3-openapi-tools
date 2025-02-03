const numOrDate = {
    anyOf: [{ type: 'string' }, { type: 'number' }],
};
const where = {
    title: 'Where clause',
    type: 'object',
    additionalProperties: {
        anyOf: [
            { type: 'object', properties: { equals: {} }, additionalProperties: false },
            { type: 'object', properties: { not_equals: {} }, additionalProperties: false },
            { type: 'object', properties: { greater_than: numOrDate }, additionalProperties: false },
            { type: 'object', properties: { greater_than_equal: numOrDate }, additionalProperties: false },
            { type: 'object', properties: { less_than: numOrDate }, additionalProperties: false },
            { type: 'object', properties: { less_than_equal: numOrDate }, additionalProperties: false },
            { type: 'object', properties: { like: { type: 'string' } }, additionalProperties: false },
            { type: 'object', properties: { contains: { type: 'string' } }, additionalProperties: false },
            { type: 'object', properties: { in: { type: 'string' } }, additionalProperties: false },
            { type: 'object', properties: { not_in: { type: 'string' } }, additionalProperties: false },
            { type: 'object', properties: { exists: { type: 'boolean' } }, additionalProperties: false },
            { type: 'object', properties: { near: { type: 'string' } }, additionalProperties: false },
        ],
    },
    properties: {
        or: {
            type: 'array',
            items: { '$ref': '#/components/schemas/where' },
        },
        and: {
            type: 'array',
            items: { '$ref': '#/components/schemas/where' },
        },
    },
    example: {
        or: [
            // array of OR conditions
            {
                color: {
                    equals: 'mint',
                },
            },
            {
                and: [
                    // nested array of AND conditions
                    {
                        color: {
                            equals: 'white',
                        },
                    },
                    {
                        featured: {
                            equals: false,
                        },
                    },
                ],
            },
        ],
    },
};
export default where;
