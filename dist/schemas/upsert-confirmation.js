"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpsertConfirmationSchema = void 0;
const createUpsertConfirmationSchema = (schemaName, singular) => ({
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
exports.createUpsertConfirmationSchema = createUpsertConfirmationSchema;
