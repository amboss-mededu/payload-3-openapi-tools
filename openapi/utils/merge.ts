import mergeWith from 'lodash/mergeWith';
import type { DeepPartial, NonEmptyArray } from './types';

export const merge = <T extends object>(...args: NonEmptyArray<DeepPartial<T>>): T =>
  mergeWith(...args, (first: unknown, second: unknown, key: string | number | symbol | undefined) => {
    if (Array.isArray(first)) {
      const merged = first.concat(second);
      return key === 'enum' ? dedupeValues(merged) : merged;
    }

    return undefined;
  });

function dedupeValues<T>(values: T[]): T[] {
  const seenValues = new Set<string | undefined>();

  return values.filter(value => {
    const valueKey = JSON.stringify(value);

    if (seenValues.has(valueKey)) {
      return false;
    }

    seenValues.add(valueKey);
    return true;
  });
}
