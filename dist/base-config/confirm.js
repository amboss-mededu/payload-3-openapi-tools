"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmation = void 0;
exports.confirmation = {
    title: 'Confirmation response message',
    type: 'object',
    additionalProperties: false,
    properties: {
        message: { type: 'string' },
    },
    required: ['message'],
};
