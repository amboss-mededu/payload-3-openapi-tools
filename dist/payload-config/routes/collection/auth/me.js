"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = me;
