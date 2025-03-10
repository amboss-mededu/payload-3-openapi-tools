import type { SanitizedConfig } from 'payload';
import type { OpenAPIV3 } from 'openapi-types';

import type { Options } from '../options';
import { merge } from '../utils';
import { createAccessRoute } from './routes/access';
import { getCollectionRoutes } from './routes/collection';
import { getGlobalRoutes } from './routes/global';
import { getCustomPaths } from './routes/custom-paths';
import { createPreferenceRouts } from './routes/preferences';
import { getAuthSchemas } from './auth-schemas';

export const analyzePayload = async (payloadConfig: SanitizedConfig, options: Options): Promise<Partial<OpenAPIV3.Document>> => {
  const { paths: preferencePaths, components: preferenceComponents } = createPreferenceRouts(options);
  const { paths: accessPath, components: accessComponents } = createAccessRoute(options);

  const collectionDefinitions = await Promise.all(
    payloadConfig.collections.map(collection => getCollectionRoutes(collection, options, payloadConfig)),
  );
  const globalDefinitions = await Promise.all(
    payloadConfig.globals.map(global => getGlobalRoutes(global, options, payloadConfig)),
  );

  const { paths: customPaths, components: customComponents } = options.include.custom
    ? getCustomPaths(payloadConfig, 'payload')
    : { paths: {}, components: {} };

  const paths = merge<OpenAPIV3.PathsObject>(
    {},
    ...collectionDefinitions.map(({ paths }) => paths),
    ...globalDefinitions.map(({ paths }) => paths),
    accessPath,
    preferencePaths,
    customPaths,
  );

  const components = merge<OpenAPIV3.ComponentsObject>(
    getAuthSchemas(payloadConfig, options),
    preferenceComponents,
    accessComponents,
    ...collectionDefinitions.map(({ components }) => components),
    ...globalDefinitions.map(({ components }) => components),
    customComponents,
  );

  return {
    servers: [{ url: payloadConfig.routes.api || '/api' }],
    paths,
    components,
  };
};
