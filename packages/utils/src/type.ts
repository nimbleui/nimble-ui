const _toString = Object.prototype.toString;

export function isFunction(el: unknown): el is (...args: any[]) => any {
  return typeof el === 'function';
}

export function isTouchEvent(val: unknown): val is TouchEvent {
  return _toString.call(val) === '[object TouchEvent]';
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean';
}

export function isUndefined(val: unknown): val is undefined {
  return typeof val === 'undefined';
}

export function isDefined(val: unknown): boolean {
  return !isUndefined(val);
}

export function isObject(val: unknown): val is Record<string, any> {
  return val !== null && typeof val === 'object';
}

export function isArray(val: unknown): val is Array<any> {
  return _toString.call(val) === '[object Array]';
}

export function isPromise(val: unknown): val is Promise<any> {
  return _toString.call(val) === '[object Promise]';
}
