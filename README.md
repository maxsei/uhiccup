# uhiccup
A micro hiccup + signals based reactive dom library that can be serialized directly as html.


```typescript
import { signal, hiccup, serialize } from "./lib";

const [counter, setConter] = signal(0);

const app = document.querySelector<HTMLDivElement>("#root")!;
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
app.innerHTML = serialize(tree);
console.log(app.innerHTML);

// Simulate hydration.
setTimeout(() => {
  app.replaceWith(hiccup(tree));
  console.log("viola!");
}, 3000);
```
