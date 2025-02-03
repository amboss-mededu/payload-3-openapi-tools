"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVersionRoutes = void 0;
const base_config_1 = require("../../base-config");
const schemas_1 = require("../../schemas");
const utils_1 = require("../../utils");
const route_access_1 = require("../route-access");
const getRootPath = (slug, payloadConfig) => {
    if (payloadConfig.globals?.find(global => global.slug === slug))
        return `/globals/${slug}/versions`;
    return `/${slug}/versions`;
};
const getTags = (slug, payloadConfig) => payloadConfig.globals?.find(global => global.slug === slug) ? [`global ${slug}`] : [slug];
const createVersionRoutes = async (config, options, payloadConfig) => {
    if (!config.versions || !(0, route_access_1.isRouteAvailable)(config, 'readVersions'))
        return { paths: {}, components: {} };
    const rootPath = getRootPath(config.slug, payloadConfig);
    const tags = getTags(config.slug, payloadConfig);
    const security = await (0, route_access_1.getRouteAccess)(config, 'readVersions', options.access);
    // no need to map the fieldDefinitions, because they are already mapped in the main routes
    const { schema } = await (0, schemas_1.entityToSchema)(payloadConfig, config);
    const { id, createdAt, updatedAt, ...version } = schema.properties;
    const versionedSchema = {
        title: `${schema.title} version`,
        type: 'object',
        additionalProperties: false,
        properties: {
            id,
            parent: id,
            version: {
                type: 'object',
                additionalProperties: false,
                properties: version,
                required: schema.required?.filter(name => !['id', ' createdAt', 'updatedAt'].includes(name)),
            },
            createdAt,
            updatedAt,
        },
        required: ['id', 'parent', 'version', 'createdAt', 'updatedAt'],
    };
    const singular = (0, utils_1.getSingular)(config);
    const plural = (0, utils_1.getPlural)(config);
    const schemaName = (0, utils_1.getSingularSchemaName)(config);
    const paths = {
        [rootPath]: {
            get: {
                summary: `${singular} versions`,
                description: `Find and query paginated versions of ${plural}`,
                tags,
                security,
                parameters: [...base_config_1.basicParameters, ...base_config_1.findParameters],
                responses: {
                    '200': (0, schemas_1.createRef)(`${schemaName}Versions`, 'responses'),
                },
            },
        },
        [`${rootPath}/{id}`]: {
            get: {
                summary: `Get a single ${singular} version by its id`,
                description: `Get a single ${singular} version by its id`,
                tags,
                security,
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: `id of the ${singular} version`,
                        required: true,
                        schema: { type: 'string' },
                    },
                    ...base_config_1.basicParameters,
                    ...base_config_1.findParameters,
                ],
                responses: {
                    '200': (0, schemas_1.createRef)(`${schemaName}Version`, 'responses'),
                    '404': (0, schemas_1.createRef)('NotFoundError', 'responses'),
                },
            },
            post: {
                summary: `Restore a ${singular} version by its id`,
                description: `Restore a ${singular} version by its id`,
                tags,
                security: await (0, route_access_1.getRouteAccess)(config, 'update', options.access),
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: `id of the ${singular} version`,
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
        },
    };
    const components = {
        schemas: {
            [`${schemaName}Version`]: versionedSchema,
            [`${schemaName}Versions`]: (0, schemas_1.createPaginatedDocumentSchema)(`${schemaName}Version`, `${singular} versions`),
        },
        responses: {
            [`${schemaName}VersionResponse`]: (0, schemas_1.createResponse)('ok', `${schemaName}Version`),
            [`${schemaName}VersionsResponse`]: (0, schemas_1.createResponse)('ok', `${schemaName}Versions`),
        },
    };
    return {
        paths,
        components,
    };
};
exports.createVersionRoutes = createVersionRoutes;
