export const isEmpty = (value: any) => {
  try {
    if (value === null || value === undefined) return true;

    if (typeof value === "string") {
      return value.trim().length === 0
    }

    if (Array.isArray(value)) {
      return value?.length === 0;
    }

    if (typeof value === "object") {
      return Object.keys(value).length === 0;
    }

    return value === null || value === undefined;
  } catch (error) {
    console.error("Ocurrió un error en isEmpty", error)
    return value === null || value === undefined;
  }
};

export const size = (toValidate: any) => {
  if (typeof toValidate === "number") {
    toValidate = toValidate.toString();
  }

  if (typeof toValidate === "object" && !isEmpty(toValidate)) {
    return Object.keys(toValidate)?.length;
  }

  if (typeof toValidate === "boolean") {
    return 0;
  }

  return !isEmpty(toValidate) ? toValidate?.length : 0;
};