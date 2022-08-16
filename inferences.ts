/**
 * Asserts that a given object is of the given type, for TS type inference
 *
 * @example
 * ```
 * export const MAP = {
 *   KEY1: assert<MyType>{
 *     myTypeField: 'foo',
 *     secondField: 'bar',
 *   }
 * }
 * 
 * export type MapKeys = keyof typeof map
 * ```
 *
 * @param ob The object of a developer-provided type
 * @returns The same object asserted through type inference.
 */
export function assert<T>(ob: T): T {
  return ob
}