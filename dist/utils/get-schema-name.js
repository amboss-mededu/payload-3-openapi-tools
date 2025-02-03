"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluralSchemaName = exports.getSingularSchemaName = void 0;
const get_label_1 = require("./get-label");
const getText = (collection, kind) => {
    const labels = (0, get_label_1.getLabels)(collection, kind);
    if (typeof labels === 'object' && labels.openapi)
        return labels.openapi;
    return kind === 'singular' ? collection.slug : `${getText(collection, 'singular')}s`;
};
const getSingularSchemaName = (collection) => getText(collection, 'singular');
exports.getSingularSchemaName = getSingularSchemaName;
const getPluralSchemaName = (collection) => getText(collection, 'plural');
exports.getPluralSchemaName = getPluralSchemaName;
