"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnsupportedSchema = exports.isSupported = void 0;
const payload_1 = require("payload");
const base_config_1 = __importDefault(require("../base-config"));
const version_1 = require("./version");
const isSupported = (version) => {
    if (!version ||
        (0, version_1.greaterOrEqual)((0, version_1.toVersion)('1.6.0'), version) ||
        ((0, version_1.greaterOrEqual)(version, (0, version_1.toVersion)('1.9.3')) && (0, version_1.greaterOrEqual)((0, version_1.toVersion)('1.10.1'), version))) {
        return typeof payload_1.entityToJSONSchema === 'function';
    }
    // If the version is not any of the known unsupported versions, it should supported.
    // If it's not, we might have a bug and we don't want to hide that.
    return true;
};
exports.isSupported = isSupported;
const getUnsupportedSchema = (options) => {
    const base = (0, base_config_1.default)(options);
    return {
        ...base,
        info: {
            ...base.info,
            description: `OpenAPI documentation is not supported for this version of Payload.<br/>
        Please make sure  you are using payload version 1.6.1 or higher, but not between 1.9.3 and 1.10.1.`,
        },
    };
};
exports.getUnsupportedSchema = getUnsupportedSchema;
