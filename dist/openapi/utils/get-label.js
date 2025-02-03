// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasCollectionLabel = (collection, kind) => Boolean(collection.labels?.[kind]);
export const getLabels = (collection, kind) => hasCollectionLabel(collection, kind) ?
    (typeof collection.labels[kind] === 'function' ? 'label functions are not supported' : collection.labels[kind]) :
    (typeof collection.label === 'function' ? 'label functions are not supported' : collection.label);
