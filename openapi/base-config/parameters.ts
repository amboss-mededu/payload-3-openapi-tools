import type { OpenAPIV3 } from 'openapi-types';

export const basicParameters: OpenAPIV3.ParameterObject[] = [
  {
    name: 'depth',
    in: 'query',
    description: 'number of levels to automatically populate relationships and uploads',
    schema: { type: 'number' },
  },
  {
    name: 'locale',
    in: 'query',
    description: 'retrieves document(s) in a specific locale',
    schema: { type: 'string' },
  },
  {
    name: 'fallback-locale',
    in: 'query',
    description: 'specifies a fallback locale if no locale value exists',
    schema: { type: 'string' },
  },
];

export const findParameters: OpenAPIV3.ParameterObject[] = [
  {
    name: 'sort',
    in: 'query',
    description: 'sort by field',
    schema: { type: 'string' },
  },
  {
    name: 'where',
    in: 'query',
    description: 'pass a where query to constrain returned documents (complex type, see documentation)',
    style: 'deepObject',
    explode: true,
    allowReserved: true,
    schema: { '$ref': '#/components/schemas/where' },
  },
  {
    name: 'limit',
    in: 'query',
    description: 'limit the returned documents to a certain number',
    schema: { type: 'number' },
  },
  {
    name: 'page',
    in: 'query',
    description: 'get a specific page of documents',
    schema: { type: 'number' },
  },
];
