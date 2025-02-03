"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomPaths = void 0;
const path_1 = __importDefault(require("path"));
const schemas_1 = require("../../schemas");
const config_extensions_1 = require("../../config-extensions");
const isPayloadConfig = (config) => !('slug' in config);
const getBasePath = (config, type) => {
    if (isPayloadConfig(config))
        return '';
    if (type === 'global')
        return `/globals/${config.slug}`;
    return `/${config.slug}`;
};
const getTags = (config, type) => {
    if (isPayloadConfig(config))
        return ['custom'];
    if (type === 'global')
        return [`global ${config.slug}`];
    return [config.slug];
};
// We could use the enum here, but prefer to keep the openapi-types lib as devdependecy only
const operations = ['get', 'head', 'post', 'put', 'patch', 'delete', 'options'];
const isOperation = (method) => operations.includes(method);
const setOperation = (pathItem, operation, methods) => {
    const sanitizedMethod = methods.toLowerCase();
    if (sanitizedMethod === 'all') {
        setOperation(pathItem, operation, 'get');
        setOperation(pathItem, operation, 'head');
        setOperation(pathItem, operation, 'post');
        setOperation(pathItem, operation, 'put');
        setOperation(pathItem, operation, 'patch');
        setOperation(pathItem, operation, 'delete');
        setOperation(pathItem, operation, 'options');
    }
    if (isOperation(sanitizedMethod)) {
        pathItem[sanitizedMethod] = operation;
    }
};
const isRelevant = (endpoint, configType) => {
    switch (configType) {
        case 'global':
            if (endpoint.path === '/access' && endpoint.method === 'get')
                return false;
            if (endpoint.path === '/' && ['get', 'post'].includes(endpoint.method))
                return false;
            break;
        case 'collection':
            if (endpoint.path === '/unlock' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/reset-password' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/first-register' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/refresh-token' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/logout' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/login' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/init' && endpoint.method === 'get')
                return false;
            if (endpoint.path === '/me' && endpoint.method === 'get')
                return false;
            if (endpoint.path === '/forgot-password' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/verify/:token' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/verify/:id' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/' && endpoint.method === 'patch')
                return false;
            if (endpoint.path === '/' && endpoint.method === 'delete')
                return false;
            if (endpoint.path === '/' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/' && endpoint.method === 'get')
                return false;
            if (endpoint.path === '/count' && endpoint.method === 'get')
                return false;
            if (endpoint.path === '/:id' && endpoint.method === 'patch')
                return false;
            if (endpoint.path === '/:id' && endpoint.method === 'get')
                return false;
            if (endpoint.path === '/:id' && endpoint.method === 'delete')
                return false;
            if (endpoint.path === '/:id/duplicate' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/versions/:id' && endpoint.method === 'post')
                return false;
            if (endpoint.path === '/versions/:id' && endpoint.method === 'get')
                return false;
            if (endpoint.path === '/:id/preview' && endpoint.method === 'get')
                return false; // TODO: check if it generated when preview is enabled
            if (endpoint.path === '/file/:filename' && endpoint.method === 'get')
                return false; // TODO: check if it generated when file upload is enabled
            if (endpoint.path === '/versions' && endpoint.method === 'get')
                return false;
            if (endpoint.path === '/paste-url/:id?' && endpoint.method === 'get')
                return false; // TODO: when is this generated?
            if (endpoint.path === '/access/:id?' && endpoint.method === 'post')
                return false;
    }
    return true;
};
const getPath = (basePath, relativePath) => {
    const parameters = [];
    const sanitizedPath = relativePath
        .split('/')
        .map(part => {
        const match = part.match(/^(?<param>:)?(?<name>.*)(?<optional>\?)?$/);
        const { param, name, optional } = match.groups;
        if (!param)
            return part;
        parameters.push({
            name,
            in: 'path',
            required: !optional,
            schema: { type: 'string' },
        });
        return `{${name}}`;
    })
        .join('/');
    const path = path_1.default.join(basePath, sanitizedPath);
    return { path, parameters };
};
const getCustomPaths = (config, type) => {
    if (!(config.endpoints || []).length)
        return { paths: {}, components: {} };
    const paths = {};
    const basePath = getBasePath(config, type);
    const tags = getTags(config, type);
    for (const endpoint of (config.endpoints || []).filter(endpoint => isRelevant(endpoint, type))) {
        if ("slug" in config && config.slug === "articles-enx")
            console.log("endpoint", endpoint);
        if (endpoint.custom?.openapi === false)
            continue;
        const { path, parameters = [] } = getPath(basePath, endpoint.path);
        const { summary, description = 'custom operation', responseSchema = { type: 'object' }, errorResponseSchemas = {}, queryParameters = {}, } = (0, config_extensions_1.getEndpointDocumentation)(endpoint) || {};
        if (!paths[path])
            paths[path] = {};
        const operation = {
            summary: summary || description,
            description,
            tags,
            parameters: [
                ...parameters,
                ...Object.entries(queryParameters).map(([name, { description, required, schema }]) => ({
                    name,
                    description: description || name,
                    in: 'query',
                    required,
                    schema: typeof schema === 'string'
                        ? {
                            '$ref': `#/components/schemas/${schema}`,
                        }
                        : schema,
                })),
            ],
            responses: {
                '200': (0, schemas_1.createResponse)('succesful operation', responseSchema),
                ...Object.entries(errorResponseSchemas).reduce((responses, [code, schema]) => {
                    responses[code] = (0, schemas_1.createResponse)(`${code} response`, schema);
                    return responses;
                }, {}),
            },
        };
        if (endpoint.root) {
            operation.servers = [{ url: '' }];
        }
        setOperation(paths[path], operation, endpoint.method);
    }
    return { paths, components: {} };
};
exports.getCustomPaths = getCustomPaths;
