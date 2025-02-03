import type { CollectionConfig, GlobalConfig } from 'payload';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Example<T = any> =
  | {
      example?: T;
    }
  | {
      examples: Record<
        string,
        {
          value: T;
          summary?: string;
        }
      >;
    };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function defineCollection<T = any>(config: CollectionConfig & Example<T>): CollectionConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { example, examples, custom, ...rest } = config as CollectionConfig & Record<'example' | 'examples', any>;
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
export function defineGlobal<T = any>(config: GlobalConfig & Example<T>): GlobalConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { example, examples, custom, ...rest } = config as GlobalConfig & Record<'example' | 'examples', any>;
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
