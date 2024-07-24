import type { Signal, Comparator } from "./api";

/**
 * The `signal` function creates a state container with subscription
 * capabilities.
 *
 * @param curr - The initial state of type T.
 * @param cmp - (Optional) Comparator function to determine if the state has
 * changed. Defaults to strict equality.
 *
 * @returns A Signal<T> tuple containing:
 *   - subscribe: A function to subscribe to state changes.
 *   - notify: A function to update the state and notify subscribers if the
 * state has changed.
 */
export const signal = <T>(curr: T, cmp?: Comparator<T>): Signal<T> => {
  // Defaults comparator.
  cmp = cmp ?? ((a, b) => a === b);

  // Add to subscribers on subscribe and return state.
  let subs: Subscriber<T>[] = [];
  const subscribe = (sub: Subscriber<T>): T => (subs.push(sub), curr);

  // Get next state, and if different notify subscribers, removing subscribers
  // that return true, and update state.
  const notify = (f: Transformer<T>) => {
    const next = f(curr);
    if (cmp(next, curr)) return;
    subs = subs.filter((s) => !s(curr, next));
    curr = next;
  };

  return [subscribe, notify];
};
