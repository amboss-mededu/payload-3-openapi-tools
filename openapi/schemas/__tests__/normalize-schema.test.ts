import type { OpenAPIV3 } from 'openapi-types';
import { normalizeSchema } from '../entity-to-schema';

describe('normalizeSchema', () => {
  it('deduplicates enum values recursively while preserving order', () => {
    const schema: OpenAPIV3.SchemaObject = {
      type: 'object',
      required: [],
      properties: {
        status: {
          type: 'string',
          enum: ['draft', 'draft', 'published'],
        },
        tag: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['clinical', 'clinical', 'editorial'],
          },
        },
        union: {
          oneOf: [
            {
              type: 'string',
              enum: ['primary', 'primary', 'secondary'],
            },
            {
              $ref: '#/components/schemas/Referenced',
            },
          ],
          anyOf: [
            {
              type: 'number',
              enum: [1, 1, 2],
            },
          ],
          allOf: [
            {
              type: 'boolean',
              enum: [true, true, false],
            },
          ],
        },
      },
    };

    expect(normalizeSchema(schema)).toEqual({
      type: 'object',
      required: undefined,
      properties: {
        status: {
          type: 'string',
          enum: ['draft', 'published'],
        },
        tag: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['clinical', 'editorial'],
          },
        },
        union: {
          oneOf: [
            {
              type: 'string',
              enum: ['primary', 'secondary'],
            },
            {
              $ref: '#/components/schemas/Referenced',
            },
          ],
          anyOf: [
            {
              type: 'number',
              enum: [1, 2],
            },
          ],
          allOf: [
            {
              type: 'boolean',
              enum: [true, false],
            },
          ],
        },
      },
    });
  });
});
