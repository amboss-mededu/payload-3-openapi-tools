"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = void 0;
exports.count = {
    title: 'Count response message',
    type: 'object',
    additionalProperties: false,
    properties: {
        totalDocs: { type: 'number' },
    },
    required: ['totalDocs'],
};
