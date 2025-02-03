import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasCollectionLabel = (collection: any, kind: 'singular' | 'plural'): collection is SanitizedCollectionConfig =>
  Boolean(collection.labels?.[kind]);

export const getLabels = (
  collection: SanitizedCollectionConfig | SanitizedGlobalConfig,
  kind: 'singular' | 'plural',
): string | Record<string, string> | undefined =>
  hasCollectionLabel(collection, kind) ? 
    (typeof collection.labels[kind] === 'function' ? 'label functions are not supported' : collection.labels[kind]) : 
    (typeof collection.label === 'function' ? 'label functions are not supported' : collection.label);
