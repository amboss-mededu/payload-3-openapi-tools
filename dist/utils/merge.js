"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const mergeWith_1 = __importDefault(require("lodash/mergeWith"));
const merge = (...args) => 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(0, mergeWith_1.default)(...args, (first, second) => {
    if (Array.isArray(first))
        return first.concat(second);
    return undefined;
});
exports.merge = merge;
