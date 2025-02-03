import { getLabels } from './get-label';
const getText = (collection, kind) => {
    const labels = getLabels(collection, kind);
    if (typeof labels === 'object' && labels.openapi)
        return labels.openapi;
    return kind === 'singular' ? collection.slug : `${getText(collection, 'singular')}s`;
};
export const getSingularSchemaName = (collection) => getText(collection, 'singular');
export const getPluralSchemaName = (collection) => getText(collection, 'plural');
