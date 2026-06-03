import { entityToJSONSchema as payloadEntityToJSONSchema } from 'payload';
import convert from '@openapi-contrib/json-schema-to-openapi-schema';
import { getDescription, getSingularSchemaName } from '../utils';
const cleanReferences = (schema, config) => {
    const asString = JSON.stringify(schema);
    return JSON.parse(asString.replace(/#\/definitions\/([^"]+)/g, (_, slug) => {
        const collection = config.collections.find(col => col.slug === slug) || config.globals.find(gl => gl.slug === slug);
        const name = collection ? getSingularSchemaName(collection) : slug;
        return `#/components/schemas/${name}`;
    }));
};
const isReferenceObject = (schema) => '$ref' in schema;
// Officially empty required is allowed for OpenAPI v3 and v3.1, but it's not for Swagger v2 and some tools don't accept it.
export const normalizeSchema = (schema) => {
    if (schema.type === 'array') {
        return {
            ...schema,
            enum: schema.enum && dedupeEnumValues(schema.enum),
            items: isReferenceObject(schema.items) ? schema.items : normalizeSchema(schema.items),
        };
    }
    return {
        ...schema,
        enum: schema.enum && dedupeEnumValues(schema.enum),
        properties: schema.properties &&
            Object.entries(schema.properties).reduce((all, [key, value]) => {
                all[key] = isReferenceObject(value) ? value : normalizeSchema(value);
                return all;
            }, {}),
        oneOf: schema.oneOf?.map(option => (isReferenceObject(option) ? option : normalizeSchema(option))),
        anyOf: schema.anyOf?.map(option => (isReferenceObject(option) ? option : normalizeSchema(option))),
        allOf: schema.allOf?.map(option => (isReferenceObject(option) ? option : normalizeSchema(option))),
        required: schema.required?.length ? schema.required : undefined,
    };
};
function dedupeEnumValues(values) {
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
function removeHiddenFields(entity) {
    return entity
        .filter(field => !("hidden" in field) || field.hidden !== true);
}
export const entityToSchema = async (config, incomingEntity) => {
    const fieldDefinitionsMap = new Map();
    // only the flattenedFields are used to generate the schema, so we need to remove the hidden fields from them
    incomingEntity.flattenedFields = removeHiddenFields(incomingEntity.flattenedFields);
    const jsonschema = payloadEntityToJSONSchema(config, incomingEntity, fieldDefinitionsMap, 'text');
    const rawSchema = await convert(jsonschema);
    const fieldDefinitions = {};
    for (const [key, definition] of fieldDefinitionsMap.entries()) {
        const convertedDef = await convert(definition);
        fieldDefinitions[key] = cleanReferences(normalizeSchema(convertedDef), config);
    }
    return {
        schema: {
            description: getDescription(incomingEntity),
            ...cleanReferences(normalizeSchema(rawSchema), config),
        },
        fieldDefinitions,
    };
};
