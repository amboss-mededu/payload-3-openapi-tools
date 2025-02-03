"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessRoute = void 0;
const schemas_1 = require("../../../schemas");
const route_access_1 = require("../../route-access");
const access_schema_1 = __importDefault(require("./access-schema"));
const createAccessRoute = (options) => {
    if (!options.include.authPaths)
        return { paths: {}, components: {} };
    const paths = {
        '/access': {
            get: {
                summary: "Current user's resource access",
                description: "Lists the user's access per resource",
                tags: ['auth'],
                security: [(0, route_access_1.getAuth)(options.access.apiKey)],
                responses: {
                    '200': (0, schemas_1.createRef)('access', 'responses'),
                },
            },
        },
    };
    return {
        paths,
        components: {
            responses: {
                accessResponse: (0, schemas_1.createResponse)('ok', 'access'),
            },
            schemas: {
                access: access_schema_1.default,
            },
        },
    };
};
exports.createAccessRoute = createAccessRoute;
