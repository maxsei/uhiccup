// SubscribeFn takes in the previous and current state and returns a boolean
// indicating if the subscriber function is done processing.
export type SubscribeFn<T> = (prev: T, curr: T) => boolean;

// NotifyFn takes the current state and transforms it into a new state.
export type NotifyFn<T> = (prev: T) => T;

// Comparator function to compare two values of type T.
export type Comparator<T> = (a: T, b: T) => boolean;

/**
 * Signal represents a state container with subscription and notification capabilities.
 *
 * The Signal type is a tuple consisting of two functions:
 *
 * 1. `subscribe`: A function to subscribe to state changes.
 *    - Takes a subscriber function `SubscribeFn<T>` as an argument.
 *    - Returns the current state of type `T`.
 *
 * 2. `notify`: A function to update the state and notify subscribers if the state has changed.
 *    - Takes a notification function `NotifyFn<T>` as an argument.
 *    - Does not return anything (`void`).
 *
 * @template T The type of the state managed by the signal.
 */
export type Signal<T> = [(s: SubscribeFn<T>) => T, (f: NotifyFn<T>) => void];

/**
 * The `signal` function creates a state container with subscription capabilities.
 *
 * @param state - The initial state of type T.
 * @param cmp - (Optional) Comparator function to determine if the state has changed. Defaults to strict equality.
 * @returns A Signal<T> tuple containing:
 *   - subscribe: A function to subscribe to state changes.
 *   - notify: A function to update the state and notify subscribers if the state has changed.
 */
export const signal = <T>(state: T, cmp?: Comparator<T>): Signal<T> => {
  cmp = cmp ?? ((a, b) => a === b); // Default comparator using strict equality
  let subs: SubscribeFn<T>[] = [];

  const subscribe = (sub: SubscribeFn<T>): T => (subs.push(sub), state);

  const notify = (f: NotifyFn<T>) => {
    const curr = f(state);
    if (cmp(curr, state)) return; // No state change, do nothing
    subs = subs.filter((s) => !s(state, curr)); // Notify subscribers and remove those that return true
    state = curr; // Update the state
  };

  return [subscribe, notify];
};
