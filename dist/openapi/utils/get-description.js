import { getLabels } from './get-label';
const getText = (labels) => {
    if (typeof labels === 'string' || !labels)
        return labels;
    return labels.docs || labels.en || Object.values(labels).find(label => label && typeof label === 'string');
};
export const getSingular = (collection) => {
    const labels = getLabels(collection, 'singular');
    return getText(labels) || collection.slug;
};
export const getPlural = (collection) => {
    const labels = getLabels(collection, 'plural');
    return getText(labels) || collection.slug;
};
export const getDescription = (collection) => {
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
