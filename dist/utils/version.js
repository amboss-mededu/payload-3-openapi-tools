"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloadVersion = exports.supports = exports.greaterOrEqual = exports.toVersion = void 0;
const path_1 = __importDefault(require("path"));
const toVersion = (versionString) => {
    const parts = versionString.split('.');
    return {
        major: Number(parts[0]),
        minor: Number(parts[1]),
        patch: Number(parts[2]),
    };
};
exports.toVersion = toVersion;
const greaterOrEqual = (a, b) => a.major > b.major || (a.major === b.major && (a.minor > b.minor || (a.minor === b.minor && a.patch >= b.patch)));
exports.greaterOrEqual = greaterOrEqual;
const supports = (initialVersion, currentVersion) => {
    if (!initialVersion || !currentVersion)
        return true;
    return (0, exports.greaterOrEqual)(currentVersion, initialVersion);
};
exports.supports = supports;
const getPayloadVersion = async () => {
    try {
        const { version } = await Promise.resolve(`${path_1.default.join(process.cwd(), 'node_modules/payload/package.json')}`).then(s => __importStar(require(s)));
        return version ? (0, exports.toVersion)(version) : undefined;
    }
    catch (e) {
        return undefined;
    }
};
exports.getPayloadVersion = getPayloadVersion;
