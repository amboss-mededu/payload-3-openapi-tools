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
exports.entityToSchema = exports.createPaginatedDocumentSchema = exports.createUpsertConfirmationSchema = void 0;
__exportStar(require("./basic-components"), exports);
var upsert_confirmation_1 = require("./upsert-confirmation");
Object.defineProperty(exports, "createUpsertConfirmationSchema", { enumerable: true, get: function () { return upsert_confirmation_1.createUpsertConfirmationSchema; } });
var paginated_documents_1 = require("./paginated-documents");
Object.defineProperty(exports, "createPaginatedDocumentSchema", { enumerable: true, get: function () { return paginated_documents_1.createPaginatedDocumentSchema; } });
var entity_to_schema_1 = require("./entity-to-schema");
Object.defineProperty(exports, "entityToSchema", { enumerable: true, get: function () { return entity_to_schema_1.entityToSchema; } });
