/**
 * Subscription is a function that takes a subscriber function as an argument.
 * The subscriber function is used to register a callback that gets called
 * whenever the state changes. The subscription function returns the current
 * state value.
 *
 * @param s - The subscriber function to be registered.
 *
 * @returns {T} - The current state value.
 */
export type Subscription<T> = (s: Subscriber<T>) => T;

/**
 * Subscriber is a callback function that is invoked when the value of a state
 * changes. The function receives the previous state value and the current
 * state value as arguments.
 *
 * @param prev - The previous state value.
 * @param curr - The current state value.
 *
 * @returns {boolean} - If the function returns true, it indicates that the
 * subscriber should stop being called on future state changes.
 */
export type Subscriber<T> = (prev: T, curr: T) => boolean;

/**
 * Transformer is a function that transforms a value of type T.
 *
 * @param prev - The value to be transformed.
 *
 * @returns {T} - The transformed value.
 */
export type Transformer<T> = (prev: T) => T;

/**
 * Comparator is a function that compares two values of type T.
 *
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 *
 * @returns {boolean} - The result of the comparison.
 */
export type Comparator<T> = (a: T, b: T) => boolean;

/**
 * Signal represents a state container with subscription and notification
 * capabilities.
 *
 * The Signal type is a tuple consisting of two functions:
 *
 * 1. `subscribe`: A function to subscribe to state changes.
 *    - Takes a subscriber function `SubscribeFn<T>` as an argument.
 *    - Returns the current state of type `T`.
 *
 * 2. `notify`: A function to update the state and notify subscribers if the
 * state has changed.
 *    - Takes a notification function `NotifyFn<T>` as an argument.
 *    - Does not return anything (`void`).
 *
 * @template T The type of the state managed by the signal.
 */
export type Signal<T> = [Subscription<T>, Transformer<T>];


export type Reducer<A, B> = (acc: B, cur: A)=> B
