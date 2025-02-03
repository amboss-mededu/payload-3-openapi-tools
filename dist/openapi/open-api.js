import fsAsync from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { analyzePayload } from './payload-config';
import createBaseConfig from './base-config';
import { getUnsupportedSchema, isSupported, merge } from './utils';
import { parseOptions } from './options';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readJsonFile = async (relativePath) => {
    try {
        const fullPath = path.join(process.cwd(), relativePath);
        if (!fs.existsSync(fullPath))
            return {};
        const data = await fsAsync.readFile(fullPath, 'utf-8');
        return JSON.parse(data);
    }
    catch {
        return {};
    }
};
/**
 * Creates an openapi document for the given payload configuration
 */
export const createDocument = async (payloadConfig, options = {}) => {
    const parsedOptions = await parseOptions(options, payloadConfig);
    if (!isSupported()) {
        return getUnsupportedSchema(parsedOptions);
    }
    const { name, version, description, license, openapi = {} } = await readJsonFile('package.json');
    const hasLicenseFile = license && fs.existsSync(path.join(process.cwd(), 'LICENSE'));
    const licenseInfo = license
        ? {
            name: license,
            url: hasLicenseFile ? '/api-docs/license' : undefined,
        }
        : undefined;
    const openApiInfo = await readJsonFile('.openapi');
    const payloadInfo = await analyzePayload(payloadConfig, parsedOptions);
    const info = {
        title: name,
        version: version,
        description,
        license: licenseInfo,
    };
    return merge(createBaseConfig(parsedOptions), { info }, payloadInfo, openapi, // todo: fix DeepPartial indexer issue
    openApiInfo);
};
