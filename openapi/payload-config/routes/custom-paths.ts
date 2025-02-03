import nodePath from 'path';
import type { OpenAPIV3 } from 'openapi-types';
import type { Endpoint, SanitizedConfig , SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload';
import { createResponse } from '../../schemas';
import { getEndpointDocumentation } from '../../config-extensions';

type Config = SanitizedConfig | SanitizedCollectionConfig | SanitizedGlobalConfig;
type ConfigType = 'payload' | 'global' | 'collection';
const isPayloadConfig = (config: Config): config is SanitizedConfig => !('slug' in config);

const getBasePath = (config: Config, type: ConfigType) => {
  if (isPayloadConfig(config)) return '';
  if (type === 'global') return `/globals/${config.slug}`;
  return `/${config.slug}`;
};

const getTags = (config: Config, type: ConfigType) => {
  if (isPayloadConfig(config)) return ['custom'];
  if (type === 'global') return [`global ${config.slug}`];
  return [config.slug];
};

// We could use the enum here, but prefer to keep the openapi-types lib as devdependecy only
const operations: readonly string[] = ['get', 'head', 'post', 'put', 'patch', 'delete', 'options'] as const;
const isOperation = (method: string): method is OpenAPIV3.HttpMethods => operations.includes(method);

const setOperation = (pathItem: OpenAPIV3.PathItemObject, operation: OpenAPIV3.OperationObject, methods: Endpoint['method']) => {
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

const isRelevant = (endpoint: Omit<Endpoint, 'root'>, configType: ConfigType) => {
  switch (configType) {
    case 'global':
      if (endpoint.path === '/access' && endpoint.method === 'get') return false;
      if (endpoint.path === '/' && ['get', 'post'].includes(endpoint.method)) return false;
      break;
    case 'collection':
      if (endpoint.path === '/unlock' && endpoint.method === 'post') return false;
      if (endpoint.path === '/reset-password' && endpoint.method === 'post') return false;
      if (endpoint.path === '/first-register' && endpoint.method === 'post') return false;
      if (endpoint.path === '/refresh-token' && endpoint.method === 'post') return false;
      if (endpoint.path === '/logout' && endpoint.method === 'post') return false;
      if (endpoint.path === '/login' && endpoint.method === 'post') return false;
      if (endpoint.path === '/init' && endpoint.method === 'get') return false;
      if (endpoint.path === '/me' && endpoint.method === 'get') return false;
      if (endpoint.path === '/forgot-password' && endpoint.method === 'post') return false;
      if (endpoint.path === '/verify/:token' && endpoint.method === 'post') return false;
      if (endpoint.path === '/verify/:id' && endpoint.method === 'post') return false;
      if (endpoint.path === '/' && endpoint.method === 'patch') return false;
      if (endpoint.path === '/' && endpoint.method === 'delete') return false;
      if (endpoint.path === '/' && endpoint.method === 'post') return false;
      if (endpoint.path === '/' && endpoint.method === 'get') return false;
      if (endpoint.path === '/count' && endpoint.method === 'get') return false;
      if (endpoint.path === '/:id' && endpoint.method === 'patch') return false;
      if (endpoint.path === '/:id' && endpoint.method === 'get') return false;
      if (endpoint.path === '/:id' && endpoint.method === 'delete') return false;
      if (endpoint.path === '/:id/duplicate' && endpoint.method === 'post') return false;
      if (endpoint.path === '/versions/:id' && endpoint.method === 'post') return false;
      if (endpoint.path === '/versions/:id' && endpoint.method === 'get') return false;
      if (endpoint.path === '/:id/preview' && endpoint.method === 'get') return false; // TODO: check if it generated when preview is enabled
      if (endpoint.path === '/file/:filename' && endpoint.method === 'get') return false; // TODO: check if it generated when file upload is enabled
      if (endpoint.path === '/versions' && endpoint.method === 'get') return false;
      if (endpoint.path === '/paste-url/:id?' && endpoint.method === 'get') return false; // TODO: when is this generated?
      if (endpoint.path === '/access/:id?' && endpoint.method === 'post') return false;
  }

  return true;
};

const getPath = (basePath: string, relativePath: string): { path: string; parameters?: OpenAPIV3.ParameterObject[] } => {
  const parameters: OpenAPIV3.ParameterObject[] = [];
  const sanitizedPath = relativePath
    .split('/')
    .map(part => {
      const match = part.match(/^(?<param>:)?(?<name>.*)(?<optional>\?)?$/);
      const { param, name, optional } = match!.groups!;
      if (!param) return part;

      parameters.push({
        name,
        in: 'path',
        required: !optional,
        schema: { type: 'string' },
      });
      return `{${name}}`;
    })
    .join('/');

  const path = nodePath.join(basePath, sanitizedPath);
  return { path, parameters };
};

export const getCustomPaths = (config: Config, type: ConfigType): Pick<Required<OpenAPIV3.Document>, 'paths' | 'components'> => {
  if (!(config.endpoints || []).length) return { paths: {}, components: {} };

  const paths: OpenAPIV3.PathsObject = {};
  const basePath = getBasePath(config, type);
  const tags = getTags(config, type);

  for (const endpoint of (config.endpoints || []).filter(endpoint => isRelevant(endpoint, type))) {

    if ("slug" in config && config.slug === "articles-enx") console.log("endpoint", endpoint);

    if (endpoint.custom?.openapi === false) continue;

    const { path, parameters = [] } = getPath(basePath, endpoint.path);
    const {
      summary,
      description = 'custom operation',
      responseSchema = { type: 'object' },
      errorResponseSchemas = {},
      queryParameters = {},
    } = getEndpointDocumentation(endpoint) || {};
    if (!paths[path]) paths[path] = {};

    const operation: OpenAPIV3.OperationObject = {
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
          schema:
            typeof schema === 'string'
              ? {
                  '$ref': `#/components/schemas/${schema}`,
                }
              : schema,
        })),
      ],
      responses: {
        '200': createResponse('succesful operation', responseSchema),
        ...Object.entries(errorResponseSchemas).reduce((responses, [code, schema]) => {
          responses[code] = createResponse(`${code} response`, schema);
          return responses;
        }, {} as OpenAPIV3.ResponsesObject),
      },
    };

    if ((endpoint as Endpoint).root) {
      operation.servers = [{ url: '' }];
    }

    setOperation(paths[path]!, operation, endpoint.method);
  }

  return { paths, components: {} };
};
