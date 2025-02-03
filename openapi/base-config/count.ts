import type { OpenAPIV3 } from 'openapi-types';

export const count: OpenAPIV3.SchemaObject = {
  title: 'Count response message',
  type: 'object',
  additionalProperties: false,
  properties: {
    totalDocs: { type: 'number' },
  },
  required: ['totalDocs'],
};
