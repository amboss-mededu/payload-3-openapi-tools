import { merge } from '../../../utils';
import { createVersionRoutes } from '../version-paths';
import { getCustomPaths } from '../custom-paths';
import { getAuthRoutes } from './auth';
import { getBulkRoutes } from './bulk-routes';
import { getMainRoutes } from './main-routes';
export const getCollectionRoutes = async (collection, options, payloadConfig) => {
    const mainRoutes = await getMainRoutes(collection, options, payloadConfig);
    const versionRoutes = await createVersionRoutes(collection, options, payloadConfig);
    const bulkRoutes = await getBulkRoutes(collection, options);
    const authRoutes = getAuthRoutes(collection, options);
    const customRoutes = getCustomPaths(collection, 'collection');
    return merge(mainRoutes, versionRoutes, bulkRoutes, authRoutes, customRoutes);
};
