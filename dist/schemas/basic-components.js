"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRef = exports.createResponse = exports.createRequestBody = exports.createContent = void 0;
const createContent = (content) => ({
    'application/json': {
        schema: typeof content === 'string'
            ? {
                '$ref': `#/components/schemas/${content}`,
            }
            : content,
    },
});
exports.createContent = createContent;
const createRequestBody = (content) => ({
    content: (0, exports.createContent)(content),
});
exports.createRequestBody = createRequestBody;
const createResponse = (description, content) => ({
    description,
    content: (0, exports.createContent)(content),
});
exports.createResponse = createResponse;
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
const createRef = (entity, type = 'schemas') => ({
    '$ref': `#/components/${type}/${entity}${getPostfix(type)}`,
});
exports.createRef = createRef;
