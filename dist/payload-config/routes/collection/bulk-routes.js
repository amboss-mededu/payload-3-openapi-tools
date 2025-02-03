"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBulkRoutes = void 0;
const base_config_1 = require("../../../base-config");
const schemas_1 = require("../../../schemas");
const utils_1 = require("../../../utils");
const route_access_1 = require("../../route-access");
const getBulkRoutes = async (collection, options) => {
    if (!options.supports.bulkOperations)
        return { paths: {}, components: {} };
    const plural = (0, utils_1.getPlural)(collection);
    const schemaName = (0, utils_1.getSingularSchemaName)(collection);
    const paths = {
        [`/${collection.slug}`]: {
            ...(0, route_access_1.includeIfAvailable)(collection, 'update', {
                patch: {
                    summary: `Update multiple ${plural}`,
                    description: `Update all ${plural} matching the where query`,
                    tags: [collection.slug],
                    security: await (0, route_access_1.getRouteAccess)(collection, 'update', options.access),
                    parameters: [...base_config_1.findParameters.map(param => ({ ...param, required: param.name === 'where' })), ...base_config_1.basicParameters],
                    requestBody: (0, schemas_1.createRef)(schemaName, 'requestBodies'),
                    responses: {
                        '200': (0, schemas_1.createRef)(`${schemaName}Bulk`, 'responses'),
                    },
                },
            }),
            ...(0, route_access_1.includeIfAvailable)(collection, 'delete', {
                delete: {
                    summary: `Delete multiple ${plural}`,
                    description: `Delete all ${plural} matching the where query`,
                    tags: [collection.slug],
                    security: await (0, route_access_1.getRouteAccess)(collection, 'delete', options.access),
                    parameters: [...base_config_1.findParameters.map(param => ({ ...param, required: param.name === 'where' })), ...base_config_1.basicParameters],
                    responses: {
                        '200': (0, schemas_1.createRef)(`${schemaName}Bulk`, 'responses'),
                    },
                },
            }),
        },
    };
    return {
        paths,
        components: (0, route_access_1.includeIfAvailable)(collection, ['delete', 'update'], {
            responses: {
                [`${schemaName}BulkResponse`]: (0, schemas_1.createResponse)('ok', {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        errors: { type: 'array', items: { type: 'string' } },
                        docs: { type: 'array', items: (0, schemas_1.createRef)(schemaName) },
                    },
                }),
            },
        }),
    };
};
exports.getBulkRoutes = getBulkRoutes;
