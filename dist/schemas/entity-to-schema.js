"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityToSchema = void 0;
const payload_1 = require("payload");
const json_schema_to_openapi_schema_1 = __importDefault(require("@openapi-contrib/json-schema-to-openapi-schema"));
const utils_1 = require("../utils");
const cleanReferences = (schema, config) => {
    const asString = JSON.stringify(schema);
    return JSON.parse(asString.replace(/#\/definitions\/([^"]+)/g, (_, slug) => {
        const collection = config.collections.find(col => col.slug === slug) || config.globals.find(gl => gl.slug === slug);
        const name = collection ? (0, utils_1.getSingularSchemaName)(collection) : slug;
        return `#/components/schemas/${name}`;
    }));
};
const isReferenceObject = (schema) => '$ref' in schema;
// Officialy empty required is allowed for openapi v3 and v3.1, but it's not for swagger v2 and some tools don't accept it
const stripEmptyRequired = (schema) => {
    if (schema.type === 'array') {
        return {
            ...schema,
            items: isReferenceObject(schema.items) ? schema.items : stripEmptyRequired(schema.items),
        };
    }
    return {
        ...schema,
        properties: schema.properties &&
            Object.entries(schema.properties).reduce((all, [key, value]) => {
                all[key] = isReferenceObject(value) ? value : stripEmptyRequired(value);
                return all;
            }, {}),
        oneOf: schema.oneOf?.map(option => (isReferenceObject(option) ? option : stripEmptyRequired(option))),
        anyOf: schema.anyOf?.map(option => (isReferenceObject(option) ? option : stripEmptyRequired(option))),
        allOf: schema.allOf?.map(option => (isReferenceObject(option) ? option : stripEmptyRequired(option))),
        required: schema.required?.length ? schema.required : undefined,
    };
};
const entityToSchema = async (config, incomingEntity) => {
    const fieldDefinitionsMap = new Map();
    const jsonschema = (0, payload_1.entityToJSONSchema)(config, incomingEntity, fieldDefinitionsMap, 'text');
    const rawSchema = await (0, json_schema_to_openapi_schema_1.default)(jsonschema);
    const fieldDefinitions = {};
    for (const [key, definition] of fieldDefinitionsMap.entries()) {
        const convertedDef = await (0, json_schema_to_openapi_schema_1.default)(definition);
        fieldDefinitions[key] = cleanReferences(stripEmptyRequired(convertedDef), config);
    }
    return {
        schema: {
            description: (0, utils_1.getDescription)(incomingEntity),
            ...cleanReferences(stripEmptyRequired(rawSchema), config),
        },
        fieldDefinitions,
    };
};
exports.entityToSchema = entityToSchema;
