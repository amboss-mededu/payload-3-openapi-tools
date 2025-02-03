"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginatedDocumentSchema = void 0;
const createPaginatedDocumentSchema = (schemaName, title) => ({
    type: 'object',
    title,
    properties: {
        docs: {
            type: 'array',
            items: {
                '$ref': `#/components/schemas/${schemaName}`,
            },
        },
        totalDocs: { type: 'number' },
        limit: { type: 'number' },
        totalPages: { type: 'number' },
        page: { type: 'number' },
        pagingCounter: { type: 'number' },
        hasPrevPage: { type: 'boolean' },
        hasNextPage: { type: 'boolean' },
        prevPage: { type: 'number' },
        nextPage: { type: 'number' },
    },
    required: ['docs', 'totalDocs', 'limit', 'totalPages', 'page', 'pagingCounter', 'hasPrevPage', 'hasNextPage'],
});
exports.createPaginatedDocumentSchema = createPaginatedDocumentSchema;
