"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionRoutes = void 0;
const utils_1 = require("../../../utils");
const version_paths_1 = require("../version-paths");
const custom_paths_1 = require("../custom-paths");
const auth_1 = require("./auth");
const bulk_routes_1 = require("./bulk-routes");
const main_routes_1 = require("./main-routes");
const getCollectionRoutes = async (collection, options, payloadConfig) => {
    const mainRoutes = await (0, main_routes_1.getMainRoutes)(collection, options, payloadConfig);
    const versionRoutes = await (0, version_paths_1.createVersionRoutes)(collection, options, payloadConfig);
    const bulkRoutes = await (0, bulk_routes_1.getBulkRoutes)(collection, options);
    const authRoutes = (0, auth_1.getAuthRoutes)(collection, options);
    const customRoutes = (0, custom_paths_1.getCustomPaths)(collection, 'collection');
    return (0, utils_1.merge)(mainRoutes, versionRoutes, bulkRoutes, authRoutes, customRoutes);
};
exports.getCollectionRoutes = getCollectionRoutes;
