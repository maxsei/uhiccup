import { isStrOrNum, isNil } from "./check";

/**
 * The `hiccup` function creates a DOM element tree from a given nested array structure.
 *
 * @param tree - The nested array structure representing the DOM tree.
 * @returns The root HTMLElement of the created DOM tree.
 */
export const hiccup = (tree: any): HTMLElement => {
  if (isNil(tree)) return document.createComment("");
  // Reactive values.
  if (typeof tree === "function") {
    let el: Element;
    el = hiccup(
      tree((prev, curr) => {
        const newEl = hiccup(curr);
        el.replaceWith(newEl);
        el = newEl;
      }),
    );
    return el;
  }
  if (typeof tree === "string" || typeof tree === "number") {
    return document.createTextNode(tree.toString());
  }
  // Tree is array of [tag, attr, ...children]
  let [tag, attrs, ...children] = tree;
  // Rename class attribute to className
  if (attrs.class) {
    attrs.className = attrs.class;
    delete attrs.class;
  }
  // Create element and recursively apply children.
  let el = document.createElement(tag);
  el = <HTMLElement>Object.assign(el, attrs);
  el.append(...children.map(hiccup));
  return el;
};
