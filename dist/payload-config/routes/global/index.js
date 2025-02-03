"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalRoutes = void 0;
const base_config_1 = require("../../../base-config");
const schemas_1 = require("../../../schemas");
const utils_1 = require("../../../utils");
const custom_paths_1 = require("../custom-paths");
const route_access_1 = require("../../route-access");
const version_paths_1 = require("../version-paths");
const getGlobalRoutes = async (global, options, payloadConfig) => {
    const singleItem = (0, utils_1.getSingular)(global);
    const schemaName = (0, utils_1.getSingularSchemaName)(global);
    const paths = {
        [`/globals/${global.slug}`]: {
            get: {
                summary: `Get the ${singleItem}`,
                description: `Get the ${singleItem}`,
                tags: [`global ${global.slug}`],
                security: await (0, route_access_1.getRouteAccess)(global, 'read', options.access),
                parameters: base_config_1.basicParameters,
                responses: {
                    '200': (0, schemas_1.createRef)(schemaName, 'responses'),
                },
            },
            post: {
                summary: `Updates the ${singleItem}`,
                description: `Updates the ${singleItem}`,
                tags: [`global ${global.slug}`],
                security: await (0, route_access_1.getRouteAccess)(global, 'update', options.access),
                parameters: base_config_1.basicParameters,
                requestBody: (0, schemas_1.createRef)(schemaName, 'requestBodies'),
                responses: {
                    '200': (0, schemas_1.createRef)(`${schemaName}UpsertConfirmation`, 'responses'),
                },
            },
        },
    };
    const { schema, fieldDefinitions } = await (0, schemas_1.entityToSchema)(payloadConfig, global);
    const { example, examples } = global.custom?.openapi || {};
    const components = {
        schemas: {
            [schemaName]: { ...schema, ...{ example, examples } },
            [`${schemaName}UpsertConfirmation`]: (0, schemas_1.createUpsertConfirmationSchema)(schemaName, singleItem),
            ...fieldDefinitions,
        },
        requestBodies: {
            [`${schemaName}Request`]: (0, schemas_1.createRequestBody)(schemaName),
        },
        responses: {
            [`${schemaName}Response`]: (0, schemas_1.createResponse)('ok', schemaName),
            [`${schemaName}UpsertConfirmationResponse`]: (0, schemas_1.createResponse)('ok', `${schemaName}UpsertConfirmation`),
        },
    };
    const versionRoutes = await (0, version_paths_1.createVersionRoutes)(global, options, payloadConfig);
    const customRoutes = (0, custom_paths_1.getCustomPaths)(global, 'global');
    return (0, utils_1.merge)({ paths, components }, versionRoutes, customRoutes);
};
exports.getGlobalRoutes = getGlobalRoutes;
