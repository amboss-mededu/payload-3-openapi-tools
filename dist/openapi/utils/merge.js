import mergeWith from 'lodash/mergeWith';
export const merge = (...args) => mergeWith(...args, (first, second, key) => {
    if (Array.isArray(first)) {
        const merged = first.concat(second);
        return key === 'enum' ? dedupeValues(merged) : merged;
    }
    return undefined;
});
function dedupeValues(values) {
    const seenValues = new Set();
    return values.filter(value => {
        const valueKey = JSON.stringify(value);
        if (seenValues.has(valueKey)) {
            return false;
        }
        seenValues.add(valueKey);
        return true;
    });
}
