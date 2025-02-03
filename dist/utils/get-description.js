"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = exports.getPlural = exports.getSingular = void 0;
const get_label_1 = require("./get-label");
const getText = (labels) => {
    if (typeof labels === 'string' || !labels)
        return labels;
    return labels.docs || labels.en || Object.values(labels).find(label => label && typeof label === 'string');
};
const getSingular = (collection) => {
    const labels = (0, get_label_1.getLabels)(collection, 'singular');
    return getText(labels) || collection.slug;
};
exports.getSingular = getSingular;
const getPlural = (collection) => {
    const labels = (0, get_label_1.getLabels)(collection, 'plural');
    return getText(labels) || collection.slug;
};
exports.getPlural = getPlural;
const getDescription = (collection) => {
    const description = collection.admin?.description;
    if (typeof description === 'string')
        return description;
    if (typeof description === 'object') {
        const label = getText(description);
        if (label)
            return label;
    }
    if (typeof description === 'function') {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value = description();
            if (typeof value === 'string')
                return value;
        }
        catch {
            // ignore
        }
    }
    return undefined;
};
exports.getDescription = getDescription;
