"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzePayload = void 0;
const utils_1 = require("../utils");
const access_1 = require("./routes/access");
const collection_1 = require("./routes/collection");
const global_1 = require("./routes/global");
const custom_paths_1 = require("./routes/custom-paths");
const preferences_1 = require("./routes/preferences");
const auth_schemas_1 = require("./auth-schemas");
const analyzePayload = async (payloadConfig, options) => {
    const { paths: preferencePaths, components: preferenceComponents } = (0, preferences_1.createPreferenceRouts)(options);
    const { paths: accessPath, components: accessComponents } = (0, access_1.createAccessRoute)(options);
    const collectionDefinitions = await Promise.all(payloadConfig.collections.map(collection => (0, collection_1.getCollectionRoutes)(collection, options, payloadConfig)));
    const globalDefinitions = await Promise.all(payloadConfig.globals.map(global => (0, global_1.getGlobalRoutes)(global, options, payloadConfig)));
    const { paths: customPaths, components: customComponents } = options.include.custom
        ? (0, custom_paths_1.getCustomPaths)(payloadConfig, 'payload')
        : { paths: {}, components: {} };
    const paths = (0, utils_1.merge)({}, ...collectionDefinitions.map(({ paths }) => paths), ...globalDefinitions.map(({ paths }) => paths), accessPath, preferencePaths, customPaths);
    const components = (0, utils_1.merge)((0, auth_schemas_1.getAuthSchemas)(payloadConfig, options), preferenceComponents, accessComponents, ...collectionDefinitions.map(({ components }) => components), ...globalDefinitions.map(({ components }) => components), customComponents);
    return {
        servers: [{ url: payloadConfig.routes.api || '/api' }],
        paths,
        components,
    };
};
exports.analyzePayload = analyzePayload;
