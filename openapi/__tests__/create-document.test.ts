import { Config, buildConfig } from 'payload';
import basicCollectionConfig from './fixtures/basic-collection-config.json';
import basicCollectionSpec from './fixtures/basic-collection-spec.json';
import basicCollectionRequiredSpec from './fixtures/collection-config-required.json';
import basicCollectionHiddenSpec from './fixtures/collection-config-hidden.json';
import { jest } from '@jest/globals';

const buildPayloadConfig = (config: Config) => buildConfig(config);

describe('createDocument', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should generate OpenAPI document with basic collection routes', async () => {
    const { createDocument } = await import('../open-api');
    const config = await buildPayloadConfig(basicCollectionConfig as Config);
    const spec = await createDocument(config);
  
    expect(spec.paths).toEqual(basicCollectionSpec.paths);
    expect(spec.components).toEqual(basicCollectionSpec.components);
    expect(spec.externalDocs).toEqual(basicCollectionSpec.externalDocs);
    expect(spec.servers).toEqual(basicCollectionSpec.servers);
  });

  it('should mark fields as required if they are required in the config', async () => {
    const { createDocument } = await import('../open-api');
    const config = await buildPayloadConfig(basicCollectionRequiredSpec as Config);
    const spec = await createDocument(config);
    
    // @ts-expect-error TS doesn't know the required property exists on the schema
    expect(spec.components?.schemas?.posts.required.includes('title')).toEqual(true);
  });

  it('should not include fields that are hidden in the config', async () => {
    const { createDocument } = await import('../open-api');
    const config = await buildPayloadConfig(basicCollectionHiddenSpec as Config);
    const spec = await createDocument(config);

    // @ts-expect-error TS doesn't know the properties property exists on the schema
    expect(spec.components?.schemas?.posts.properties.title).toEqual(undefined);
  });
}); 
