export const createContent = (content) => ({
    'application/json': {
        schema: typeof content === 'string'
            ? {
                '$ref': `#/components/schemas/${content}`,
            }
            : content,
    },
});
export const createRequestBody = (content) => ({
    content: createContent(content),
});
export const createResponse = (description, content) => ({
    description,
    content: createContent(content),
});
const getPostfix = (type) => {
    switch (type) {
        case 'responses':
            return 'Response';
        case 'requestBodies':
            return 'Request';
        default:
            return '';
    }
};
export const createRef = (entity, type = 'schemas') => ({
    '$ref': `#/components/${type}/${entity}${getPostfix(type)}`,
});
