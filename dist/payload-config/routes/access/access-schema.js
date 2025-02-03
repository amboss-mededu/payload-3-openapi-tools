"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permission = {
    type: 'object',
    additionalProperties: false,
    properties: {
        permission: { type: 'boolean' },
    },
    required: ['permission'],
};
const access = {
    title: 'Access',
    type: 'object',
    additionalProperties: false,
    properties: {
        canAccessAdmin: {
            type: 'boolean',
        },
        collections: {
            type: 'object',
            additionalProperties: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    create: permission,
                    read: permission,
                    update: permission,
                    delete: permission,
                    fields: {
                        type: 'object',
                        additionalProperties: {
                            type: 'object',
                            additionalProperties: false,
                            properties: {
                                create: permission,
                                read: permission,
                                update: permission,
                            },
                            required: ['create', 'read', 'update'],
                        },
                    },
                },
                required: ['create', 'read', 'update', 'delete', 'fields'],
            },
        },
    },
    required: ['canAccessAdmin', 'collections'],
};
exports.default = access;
