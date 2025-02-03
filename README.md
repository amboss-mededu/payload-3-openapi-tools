# @amboss/payload-3-openapi

A plugin for Payload CMS that generates OpenAPI documentation for your API endpoints.

## Installation
```bash
pnpm add -D github:tak-amboss/payload-openapi-tools
```

## Usage

1. Add the following script to your `package.json`:
```json
{
    "scripts": {
        "generate:openapi-docs": "tsx node_modules/@amboss/payload-3-openapi/dist/create-api-docs/index.js $(pwd)/path/to/your/payload.config.ts"
    }
}
```

2. Run the script to generate OpenAPI documentation:
```bash
pnpm generate:openapi-docs
```

This will generate OpenAPI documentation based on your Payload CMS configuration file.

## License

MIT