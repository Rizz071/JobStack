const isString = (object: unknown): object is string => {
    return typeof object === "string" || object instanceof String;
};

const isNumber = (object: unknown): object is number => {
    return typeof object === "number" || object instanceof Number;
};

export { isString, isNumber };
