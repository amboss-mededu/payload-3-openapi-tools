import mergeWith from 'lodash/mergeWith';
import type { DeepPartial, NonEmptyArray } from './types';

export const merge = <T extends object>(...args: NonEmptyArray<DeepPartial<T>>): T =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mergeWith(...args, (first: any, second: any) => {
    if (Array.isArray(first)) return first.concat(second);
    return undefined;
  });
