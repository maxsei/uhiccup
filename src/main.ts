import { signal, hiccup, serialize, reduce } from "./lib/index";
import type { SubscribeFn } from "./lib";

const app = () => {
  const [counter, setCounter] = signal(0);
  const counter2x = reduce(counter, (x, _) => x * 2, ()=> 0);

  return [
    "div",
    { id: "root", class: "pa4" },
    // derive(ready, () => "Interactive!"),
		// counter2x,
		// counter,
		// counter,
    counter2x,
    counter2x,
    [
      "div",
      {},
      ["button", { onclick: () => setCounter((prev) => prev - 1) }, "-"],
      ["button", { onclick: () => setCounter((prev) => prev + 1) }, "+"],
    ],
    ["div", {}, "count: ", counter],
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
}, 3000);
