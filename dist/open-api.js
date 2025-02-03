"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const payload_config_1 = require("./payload-config");
const base_config_1 = __importDefault(require("./base-config"));
const utils_1 = require("./utils");
const options_1 = require("./options");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readJsonFile = async (relativePath) => {
    try {
        const fullPath = path_1.default.join(process.cwd(), relativePath);
        if (!fs_1.default.existsSync(fullPath))
            return {};
        const data = await promises_1.default.readFile(fullPath, 'utf-8');
        return JSON.parse(data);
    }
    catch {
        return {};
    }
};
/**
 * Creates an openapi document for the given payload configuration
 */
const createDocument = async (payloadConfig, options = {}) => {
    const parsedOptions = await (0, options_1.parseOptions)(options, payloadConfig);
    if (!(0, utils_1.isSupported)()) {
        return (0, utils_1.getUnsupportedSchema)(parsedOptions);
    }
    const { name, version, description, license, openapi = {} } = await readJsonFile('package.json');
    const hasLicenseFile = license && fs_1.default.existsSync(path_1.default.join(process.cwd(), 'LICENSE'));
    const licenseInfo = license
        ? {
            name: license,
            url: hasLicenseFile ? '/api-docs/license' : undefined,
        }
        : undefined;
    const openApiInfo = await readJsonFile('.openapi');
    const payloadInfo = await (0, payload_config_1.analyzePayload)(payloadConfig, parsedOptions);
    const info = {
        title: name,
        version: version,
        description,
        license: licenseInfo,
    };
    return (0, utils_1.merge)((0, base_config_1.default)(parsedOptions), { info }, payloadInfo, openapi, // todo: fix DeepPartial indexer issue
    openApiInfo);
};
exports.createDocument = createDocument;
