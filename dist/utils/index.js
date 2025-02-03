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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.getPluralSchemaName = exports.getSingularSchemaName = exports.getSingular = exports.getPlural = exports.getDescription = void 0;
var get_description_1 = require("./get-description");
Object.defineProperty(exports, "getDescription", { enumerable: true, get: function () { return get_description_1.getDescription; } });
Object.defineProperty(exports, "getPlural", { enumerable: true, get: function () { return get_description_1.getPlural; } });
Object.defineProperty(exports, "getSingular", { enumerable: true, get: function () { return get_description_1.getSingular; } });
var get_schema_name_1 = require("./get-schema-name");
Object.defineProperty(exports, "getSingularSchemaName", { enumerable: true, get: function () { return get_schema_name_1.getSingularSchemaName; } });
Object.defineProperty(exports, "getPluralSchemaName", { enumerable: true, get: function () { return get_schema_name_1.getPluralSchemaName; } });
var merge_1 = require("./merge");
Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return merge_1.merge; } });
__exportStar(require("./version"), exports);
__exportStar(require("./supported"), exports);
