import mergeWith from 'lodash/mergeWith';
export const merge = (...args) => 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
mergeWith(...args, (first, second) => {
    if (Array.isArray(first))
        return first.concat(second);
    return undefined;
});
