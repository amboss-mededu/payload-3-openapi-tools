"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainRoutes = void 0;
const base_config_1 = require("../../../base-config");
const schemas_1 = require("../../../schemas");
const route_access_1 = require("../../route-access");
const utils_1 = require("../../../utils");
const getMainRoutes = async (collection, options, payloadConfig) => {
    const singleItem = (0, utils_1.getSingular)(collection);
    const plural = (0, utils_1.getPlural)(collection);
    const schemaName = (0, utils_1.getSingularSchemaName)(collection);
    const pluralSchemaName = (0, utils_1.getPluralSchemaName)(collection);
    const paths = {
        [`/${collection.slug}`]: {
            ...(0, route_access_1.includeIfAvailable)(collection, 'read', {
                get: {
                    summary: `Find paginated ${plural}`,
                    description: `Find paginated ${plural}`,
                    tags: [collection.slug],
                    security: await (0, route_access_1.getRouteAccess)(collection, 'read', options.access),
                    parameters: [...base_config_1.basicParameters, ...base_config_1.findParameters],
                    responses: {
                        '200': (0, schemas_1.createRef)(pluralSchemaName, 'responses'),
                    },
                },
            }),
            ...(0, route_access_1.includeIfAvailable)(collection, 'create', {
                post: {
                    summary: `Create a new ${singleItem}`,
                    description: `Create a new ${singleItem}`,
                    tags: [collection.slug],
                    security: await (0, route_access_1.getRouteAccess)(collection, 'create', options.access),
                    parameters: base_config_1.basicParameters,
                    requestBody: (0, schemas_1.createRef)(schemaName, 'requestBodies'),
                    responses: {
                        '200': (0, schemas_1.createRef)(`${schemaName}UpsertConfirmation`, 'responses'),
                    },
                },
            }),
        },
        [`/${collection.slug}/{id}`]: {
            ...(0, route_access_1.includeIfAvailable)(collection, 'read', {
                get: {
                    summary: `Get a single ${singleItem} by its id`,
                    description: `Get a single ${singleItem} by its id`,
                    tags: [collection.slug],
                    security: await (0, route_access_1.getRouteAccess)(collection, 'read', options.access),
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: `id of the ${singleItem}`,
                            required: true,
                            schema: { type: 'string' },
                        },
                        ...base_config_1.basicParameters,
                        ...base_config_1.findParameters,
                    ],
                    responses: {
                        '200': (0, schemas_1.createRef)(schemaName, 'responses'),
                        '404': (0, schemas_1.createRef)('NotFoundError', 'responses'),
                    },
                },
            }),
            ...(0, route_access_1.includeIfAvailable)(collection, 'update', {
                patch: {
                    summary: `Updates a ${singleItem}`,
                    description: `Updates a ${singleItem}`,
                    tags: [collection.slug],
                    security: await (0, route_access_1.getRouteAccess)(collection, 'update', options.access),
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: `id of the ${singleItem}`,
                            required: true,
                            schema: { type: 'string' },
                        },
                        ...base_config_1.basicParameters,
                    ],
                    requestBody: (0, schemas_1.createRef)(schemaName, 'requestBodies'),
                    responses: {
                        '200': (0, schemas_1.createRef)(`${schemaName}UpsertConfirmation`, 'responses'),
                        '404': (0, schemas_1.createRef)('NotFoundError', 'responses'),
                    },
                },
            }),
            ...(0, route_access_1.includeIfAvailable)(collection, 'delete', {
                delete: {
                    summary: `Deletes an existing ${singleItem}`,
                    description: `Deletes an existing ${singleItem}`,
                    tags: [collection.slug],
                    security: await (0, route_access_1.getRouteAccess)(collection, 'delete', options.access),
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: `id of the ${singleItem}`,
                            required: true,
                            schema: { type: 'string' },
                        },
                        ...base_config_1.basicParameters,
                    ],
                    responses: {
                        '200': (0, schemas_1.createRef)(`${schemaName}UpsertConfirmation`, 'responses'),
                        '404': (0, schemas_1.createRef)('NotFoundError', 'responses'),
                    },
                },
            }),
        },
        [`/${collection.slug}/count`]: {
            ...(0, route_access_1.includeIfAvailable)(collection, 'read', {
                get: {
                    summary: `Count ${plural}`,
                    description: `Count ${plural}`,
                    tags: [collection.slug],
                    security: await (0, route_access_1.getRouteAccess)(collection, 'read', options.access),
                    parameters: [],
                    responses: {
                        '200': (0, schemas_1.createRef)('count', 'responses'),
                    },
                },
            }),
        },
    };
    const { schema, fieldDefinitions } = await (0, schemas_1.entityToSchema)(payloadConfig, collection);
    const { example, examples } = collection.custom?.openapi || {};
    const components = {
        schemas: {
            [schemaName]: { ...schema, ...{ example, examples } },
            ...(0, route_access_1.includeIfAvailable)(collection, 'read', {
                [pluralSchemaName]: (0, schemas_1.createPaginatedDocumentSchema)(schemaName, plural),
            }),
            ...(0, route_access_1.includeIfAvailable)(collection, ['create', 'update', 'delete'], {
                [`${schemaName}UpsertConfirmation`]: (0, schemas_1.createUpsertConfirmationSchema)(schemaName, singleItem),
            }),
            ...fieldDefinitions,
        },
        requestBodies: {
            ...(0, route_access_1.includeIfAvailable)(collection, ['create', 'update'], {
                [`${schemaName}Request`]: (0, schemas_1.createRequestBody)(schemaName),
            }),
        },
        responses: {
            ...(0, route_access_1.includeIfAvailable)(collection, 'read', { [`${schemaName}Response`]: (0, schemas_1.createResponse)('ok', schemaName) }),
            ...(0, route_access_1.includeIfAvailable)(collection, 'read', { [`${pluralSchemaName}Response`]: (0, schemas_1.createResponse)('ok', pluralSchemaName) }),
            ...(0, route_access_1.includeIfAvailable)(collection, ['create', 'update', 'delete'], {
                [`${schemaName}UpsertConfirmationResponse`]: (0, schemas_1.createResponse)('ok', `${schemaName}UpsertConfirmation`),
            }),
        },
    };
    return { paths, components };
};
exports.getMainRoutes = getMainRoutes;
