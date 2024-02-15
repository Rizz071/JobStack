"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = void 0;
const isString = (object) => {
    return typeof object === "string" || object instanceof String;
};
exports.isString = isString;
