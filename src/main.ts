import { signal, hiccup, serialize } from "./lib";

const [counter, setConter] = signal(0);

const tree = [
  "div",
  { id: "root", class: "pa4" },
  [
    "div",
    {},
    ["button", { onclick: () => setConter((prev) => prev - 1) }, "-"],
    ["button", { onclick: () => setConter((prev) => prev + 1) }, "+"],
  ],
  ["div", {}, "count: ", counter],
];

// Simulate server side rendering.
const app = () => document.querySelector<HTMLDivElement>("#root")!;
const tmp = document.createElement("div");
tmp.innerHTML = serialize(tree);
console.log(tmp.innerHTML);
app().replaceWith(tmp.firstElementChild);

// Simulate hydration.
setTimeout(() => {
  app().replaceWith(hiccup(tree));
  console.log("viola!");
}, 3000);
