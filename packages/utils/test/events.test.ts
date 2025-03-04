import {vi} from 'vitest';
import {events} from '../src/events';

describe('events', () => {
  test('默认导出是否应该是一个函数', () => {
    expect(events).toBeInstanceOf(Function);
  });

  test('返回值', () => {
    const {on, emit} = events();
    expect(on).toBeInstanceOf(Function);
    expect(emit).toBeInstanceOf(Function);
  });
});

describe('on and emit', () => {
  let inst: ReturnType<typeof events>;
  beforeEach(() => {
    inst = events();
  });

  test('on', () => {
    const foo = () => {};
    inst.on('foo', foo);

    expect(inst.all.size).toBe(1);
    expect(inst.all.get('foo')).toEqual([foo]);
  });

  test('emit', () => {
    const foo = vi.fn();
    inst.on('foo', foo);
    inst.emit('foo');

    expect(foo).toHaveBeenCalled();
  });
});
