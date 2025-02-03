"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineCollection = defineCollection;
exports.defineGlobal = defineGlobal;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function defineCollection(config) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { example, examples, custom, ...rest } = config;
    return {
        ...rest,
        custom: {
            ...custom,
            openapi: {
                example,
                examples,
            },
        },
    };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function defineGlobal(config) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { example, examples, custom, ...rest } = config;
    return {
        ...rest,
        custom: {
            ...custom,
            openapi: {
                example,
                examples,
            },
        },
    };
}
