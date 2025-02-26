import {
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from '../src/type';

describe('test types', () => {
  const fun = () => {};
  const num = 123;
  const str = '123';
  const obj = {};
  const arr = [];
  const bool = true;

  test('isFunction', () => {
    expect(isFunction(fun)).toBeTruthy();
    expect(isFunction(num)).toBeFalsy();
    expect(isFunction(str)).toBeFalsy();
    expect(isFunction(obj)).toBeFalsy();
    expect(isFunction(arr)).toBeFalsy();
    expect(isFunction(bool)).toBeFalsy();
  });

  test('isNumber', () => {
    expect(isNumber(num)).toBeTruthy();
    expect(isNumber(fun)).toBeFalsy();
    expect(isNumber(str)).toBeFalsy();
    expect(isNumber(obj)).toBeFalsy();
    expect(isNumber(arr)).toBeFalsy();
    expect(isNumber(bool)).toBeFalsy();
  });

  test('isString', () => {
    expect(isString(str)).toBeTruthy();
    expect(isString(num)).toBeFalsy();
    expect(isString(fun)).toBeFalsy();
    expect(isString(obj)).toBeFalsy();
    expect(isString(arr)).toBeFalsy();
    expect(isString(bool)).toBeFalsy();
  });

  test('isBoolean', () => {
    expect(isBoolean(bool)).toBeTruthy();
    expect(isBoolean(str)).toBeFalsy();
    expect(isBoolean(num)).toBeFalsy();
    expect(isBoolean(fun)).toBeFalsy();
    expect(isBoolean(obj)).toBeFalsy();
    expect(isBoolean(arr)).toBeFalsy();
  });

  test('isUndefined', () => {
    expect(isUndefined(undefined)).toBeTruthy();
    expect(isUndefined(str)).toBeFalsy();
    expect(isUndefined(num)).toBeFalsy();
    expect(isUndefined(fun)).toBeFalsy();
    expect(isUndefined(obj)).toBeFalsy();
    expect(isUndefined(arr)).toBeFalsy();
  });

  test('isObject', () => {
    expect(isObject(bool)).toBeFalsy();
    expect(isObject(str)).toBeFalsy();
    expect(isObject(num)).toBeFalsy();
    expect(isObject(fun)).toBeFalsy();
    expect(isObject(obj)).toBeTruthy();
    expect(isObject(arr)).toBeTruthy();
  });

  test('isArray', () => {
    expect(isArray(bool)).toBeFalsy();
    expect(isArray(str)).toBeFalsy();
    expect(isArray(num)).toBeFalsy();
    expect(isArray(fun)).toBeFalsy();
    expect(isArray(obj)).toBeFalsy();
    expect(isArray(arr)).toBeTruthy();
  });
});
