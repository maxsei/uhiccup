export const isScalar = (v: any) =>
  typeof v === "string" || typeof v === "number" || typeof v === "boolean";

export const isNil = (v: any) =>
  v === undefined || v === null
