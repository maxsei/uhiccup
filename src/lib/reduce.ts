import type { Signal, Subscription, Reducer } from "./api";

export const reduce = <A, B>(
  subscription: Subscription<A>,
  reducer: Reducer<A, B>,
  init: () => B,
): Subscription<B> => {
  return (sub: Subscriber<B>) => {
    let acc = init && init();
    acc = reducer(
      subscription((_, cur) => {
        const next = reducer(cur, acc);
        const done = sub(acc, next);
        acc = next;
        return done;
      }),
      acc,
    );
    return acc;
  };
};
