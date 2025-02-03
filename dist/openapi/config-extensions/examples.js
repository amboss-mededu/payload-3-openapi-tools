// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function defineCollection(config) {
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
export function defineGlobal(config) {
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
