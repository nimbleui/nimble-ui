import {isFunction} from '.';

export function isFunctionOrValue<T>(
  val: T,
): T extends (...args: any) => any ? ReturnType<T> : T {
  return isFunction(val) ? val() : val;
}
