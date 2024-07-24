import { isStrOrNum } from "./is-str-or-num";

export const serialize = (tree: any): HTMLElement => {
  if (tree === null) return "<!-- -->";
  // Reactive values.
  if (typeof tree === "function") {
    return serialize(tree((prev, curr) => false));
  }
  if (isStrOrNum(tree)) {
    return htmlEscape(`${tree}`);
  }
  // Tree is array of [tag, attr, ...children]
  let [tag, attrs, ...children] = tree;
  tag = htmlEscape(tag);
  const attrsS = Object.entries(attrs)
    .filter(([_, v]) => isStrOrNum(v))
    .map(([k, v]) => ` ${k}="${v}"`)
    .join("");
  if (!selfClosing.has(tag)) {
    const childrenS = children?.map(serialize).join("");
    return `<${tag}${attrsS}>${childrenS}</${tag}>`;
  }
  if (children.length > 0) {
    throw new Error("self closing tag should not have any children");
  }
  return `<${tag}${attrsS}/>`;
};

const htmlEscape = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const selfClosing = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);
