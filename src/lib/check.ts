export const isStrOrNum = (v: any) =>
  typeof v === "string" || typeof v === "number";

export const isNil = (v: any) =>
  v === undefined || v === null
