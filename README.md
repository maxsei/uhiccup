# uhiccup

A micro hiccup + signals based reactive dom library that can be serialized directly as html.

```typescript
import { signal, hiccup, serialize, reduce } from "./lib/index";
import type { Subscriber, Subscription } from "./lib";

const map = <A, B>(s: Subscriber<A>, f: (A) => B) =>
  reduce(s, f, (_, v) => f(v));

const app = () => {
  const [counter, setCounter] = signal(0);
  const [toggleSignal, toggle] = signal<void>();

  return [
    "div",
    { id: "root", class: "pa4" },
    [
      "div",
      {},
      ["button", { onclick: () => setCounter((prev) => prev - 1) }, "-"],
      ["button", { onclick: () => setCounter((prev) => prev + 1) }, "+"],
    ],
    ["div", {}, "count: ", counter],
    ["div", {}, "count2x: ", map(counter, (x) => x * 2)],
    [
      "button",
      {
        onclick: () => toggle(() => {}),
      },
      "toggle: ",
      reduce(
        toggleSignal,
        () => false,
        (acc) => !acc,
      ),
    ],
  ];
};

// Simulate server side rendering.
const root = () => document.querySelector<HTMLDivElement>("#root")!;
const tmp = document.createElement("div");
tmp.innerHTML = serialize(app());
console.log(tmp.innerHTML);
root().replaceWith(tmp.firstElementChild);

// Simulate hydration.
setTimeout(() => {
  root().replaceWith(hiccup(app()));
  console.log("viola!");
}, 0);
```
