const isString = (object: unknown): object is string => {
  return typeof object === "string" || object instanceof String;
};

export { isString };
