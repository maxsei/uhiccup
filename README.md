# uhiccup

A micro hiccup + signals based reactive dom library that can be serialized directly as html.

```typescript
import { signal, hiccup, serialize, derive } from "./lib";
import type { SubscribeFn } from "./lib";

const [counter, setCounter] = signal(0);
const counter2x = derive(counter, (x) => x * 2);

const tree = [
  "div",
  { id: "root", class: "pa4" },
  [
    "div",
    {},
    ["button", { onclick: () => setCounter((prev) => prev - 1) }, "-"],
    ["button", { onclick: () => setCounter((prev) => prev + 1) }, "+"],
  ],
  counter2x,
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
```
