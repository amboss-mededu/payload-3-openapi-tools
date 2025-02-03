"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthRoutes = void 0;
const schemas_1 = require("../../../../schemas");
const utils_1 = require("../../../../utils");
const auth_paths_1 = require("./auth-paths");
const me_1 = __importDefault(require("./me"));
const email_paths_1 = require("./email-paths");
const unlock_paths_1 = require("./unlock-paths");
const recovery_paths_1 = require("./recovery-paths");
const getAuthRoutes = (collection, options) => {
    if (!collection.auth || !options.include.authPaths)
        return { paths: {}, components: {} };
    const schemaName = (0, utils_1.getSingularSchemaName)(collection);
    const schemas = {
        [`${schemaName}Me`]: (0, me_1.default)(schemaName),
    };
    const responses = {
        [`${schemaName}MeResponse`]: (0, schemas_1.createResponse)('ok', `${schemaName}Me`),
    };
    if (options.include.passwordRecovery) {
        schemas[`${schemaName}PasswordReset`] = {
            type: 'object',
            properties: {
                message: { type: 'string' },
                token: { type: 'string' },
                user: (0, schemas_1.createRef)(schemaName),
            },
            required: ['message', 'token', 'user'],
        };
        responses[`${schemaName}PasswordResetResponse`] = (0, schemas_1.createResponse)('ok', `${schemaName}PasswordReset`);
    }
    return {
        paths: {
            ...(0, auth_paths_1.getAuthPaths)(collection),
            ...(0, email_paths_1.getEmailVerificationPaths)(collection),
            ...(0, unlock_paths_1.getUnlockPaths)(collection, options),
            ...(0, recovery_paths_1.getPasswordRecoveryPaths)(collection, options),
        },
        components: {
            schemas,
            responses,
        },
    };
};
exports.getAuthRoutes = getAuthRoutes;
