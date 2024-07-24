import type { Subscription, Reducer } from "./api";
import { signal } from "./signal";

export const reduce = <A, B>(
  subscribe: Subscription<A>,
  init: (A) => B,
  reducer: Reducer<A, B>,
): Subscription<B> => {
  const [get, set] = signal<B>();
  const cur = subscribe((_, cur) => {
    set((acc) => reducer(acc, cur));
    return false; // never unsubscribe
  });
  set(() => init?.(cur));
  return get;
};
