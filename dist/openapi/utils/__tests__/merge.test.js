import { merge } from '../merge';
describe('merge', () => {
    it('deduplicates merged enum arrays while preserving order', () => {
        const merged = merge({
            components: {
                schemas: {
                    InlineMeasurement: {
                        properties: {
                            prefix: {
                                enum: ['<', '≤', '>', '≥'],
                            },
                        },
                    },
                },
            },
        }, {
            components: {
                schemas: {
                    InlineMeasurement: {
                        properties: {
                            prefix: {
                                enum: ['<', '≤', '>', '≥'],
                            },
                        },
                    },
                },
            },
        });
        expect(merged.components.schemas.InlineMeasurement.properties.prefix.enum).toEqual([
            '<',
            '≤',
            '>',
            '≥',
        ]);
    });
    it('keeps concatenating non-enum arrays', () => {
        const merged = merge({
            tags: ['articles'],
        }, {
            tags: ['questions'],
        });
        expect(merged.tags).toEqual(['articles', 'questions']);
    });
});
