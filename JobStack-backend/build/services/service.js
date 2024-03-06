"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isString = void 0;
const isString = (object) => {
    return typeof object === "string" || object instanceof String;
};
exports.isString = isString;
const isNumber = (object) => {
    return typeof object === "number" || object instanceof Number;
};
exports.isNumber = isNumber;
