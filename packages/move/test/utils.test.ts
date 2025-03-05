import {describe} from 'vitest';
import {getTarget, getXY, numScale} from '../src/utils';

describe('test nimble move utils', () => {
  const touchEvent = new TouchEvent('touchstart', {
    targetTouches: [{pageX: 10, pageY: 10}] as any,
  });

  const mouseEvent = new MouseEvent('mousedown', {
    clientX: 10,
    clientY: 100,
  });

  const div = document.createElement('div');
  const childDiv = document.createElement('div');
  div.appendChild(childDiv);
  document.body.appendChild(div);
  div.dispatchEvent(touchEvent);

  test('getXY', () => {
    expect(getXY(touchEvent)).toEqual({x: 10, y: 10});
    expect(getXY(mouseEvent)).toEqual({x: 10, y: 100});
  });

  test('numScale', () => {
    expect(numScale(touchEvent)).toEqual({clientX: 10, clientY: 10});
    expect(numScale(mouseEvent)).toEqual({clientX: 10, clientY: 100});

    expect(numScale(touchEvent, 2)).toEqual({clientX: 5, clientY: 5});
    expect(numScale(mouseEvent, 2)).toEqual({clientX: 5, clientY: 50});
  });

  test('getTarget', () => {
    const res = getTarget(childDiv, div, () => div);
    expect(res).toBe(div);

    const child = getTarget(childDiv, div, () => childDiv);
    expect(child).toBe(childDiv);
  });
});
