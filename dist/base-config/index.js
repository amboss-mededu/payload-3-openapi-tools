"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
const error_1 = require("./error");
const confirm_1 = require("./confirm");
const count_1 = require("./count");
const where_1 = __importDefault(require("./where"));
__exportStar(require("./parameters"), exports);
const schemas = {
    error: error_1.error,
    confirmation: confirm_1.confirmation,
    count: count_1.count,
    where: where_1.default,
};
const responses = {
    'InvalidRequestErrorResponse': (0, schemas_1.createResponse)('invalid request', 'error'),
    'UnauthorizedErrorResponse': (0, schemas_1.createResponse)('unauthorized', 'error'),
    'NotFoundErrorResponse': (0, schemas_1.createResponse)('not found', 'error'),
    'countResponse': (0, schemas_1.createResponse)('count', 'count'),
    confirmationResponse: (0, schemas_1.createResponse)('confirmed', 'confirmation'),
};
const createBaseConfig = (options) => ({
    openapi: '3.0.3',
    info: {
        title: 'Payload CMS',
        version: '1.0.0',
    },
    paths: {},
    components: {
        securitySchemes: {
            basicAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'jwt',
            },
            cookieAuth: {
                in: 'cookie',
                type: 'apiKey',
                name: options.access.cookieName,
            },
            ...(options.access.apiKey
                ? {
                    apiKeyAuth: {
                        in: 'header',
                        type: 'apiKey',
                        name: 'Authorization',
                    },
                }
                : {}),
        },
        schemas,
        responses,
    },
    externalDocs: {
        description: 'Payload REST API documentation',
        url: 'https://payloadcms.com/docs/rest-api/overview',
    },
});
exports.default = createBaseConfig;
