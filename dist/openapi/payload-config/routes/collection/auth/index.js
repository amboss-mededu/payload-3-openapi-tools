import { createRef, createResponse } from '../../../../schemas';
import { getSingularSchemaName } from '../../../../utils';
import { getAuthPaths } from './auth-paths';
import me from './me';
import { getEmailVerificationPaths } from './email-paths';
import { getUnlockPaths } from './unlock-paths';
import { getPasswordRecoveryPaths } from './recovery-paths';
export const getAuthRoutes = (collection, options) => {
    if (!collection.auth || !options.include.authPaths)
        return { paths: {}, components: {} };
    const schemaName = getSingularSchemaName(collection);
    const schemas = {
        [`${schemaName}Me`]: me(schemaName),
    };
    const responses = {
        [`${schemaName}MeResponse`]: createResponse('ok', `${schemaName}Me`),
    };
    if (options.include.passwordRecovery) {
        schemas[`${schemaName}PasswordReset`] = {
            type: 'object',
            properties: {
                message: { type: 'string' },
                token: { type: 'string' },
                user: createRef(schemaName),
            },
            required: ['message', 'token', 'user'],
        };
        responses[`${schemaName}PasswordResetResponse`] = createResponse('ok', `${schemaName}PasswordReset`);
    }
    return {
        paths: {
            ...getAuthPaths(collection),
            ...getEmailVerificationPaths(collection),
            ...getUnlockPaths(collection, options),
            ...getPasswordRecoveryPaths(collection, options),
        },
        components: {
            schemas,
            responses,
        },
    };
};
