import {isFunctionOrValue} from '../src/isFunctionOrValue';

describe('test isFunctionOrValue', () => {
  const fun = () => 1;
  const num = 222;
  const fun1 = () => [1];

  test('isFunctionOrValue', () => {
    expect(isFunctionOrValue(fun)).toBe(1);
    expect(isFunctionOrValue(num)).toBe(222);
    expect(isFunctionOrValue(fun1)).toEqual([1]);
  });
});
