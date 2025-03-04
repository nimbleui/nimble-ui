import {events, isFunctionOrValue} from '@nimble-ui/utils';
import type {
  MoveElType,
  MoveOptionsType,
  GlobalData,
  MoveEventType,
  MoveDataTypes,
} from './types';
import mousedown from './mousedown';

const defaultData = {
  startX: 0, // 按下鼠标x轴位置
  startY: 0, // 按下鼠标y轴位置
  moveX: 0, // 移动鼠标x轴位置
  moveY: 0, // 移动鼠标y轴位置
  disX: 0, // 鼠标移动x轴的距离
  disY: 0, // 鼠标移动y轴的距离
  endX: 0, // 鼠标抬起x轴的距离
  endY: 0, // 鼠标抬起Y轴的距离
  isMove: false, // 是否移动
  target: undefined,
};

export function moveEvent(el: MoveElType, options?: MoveOptionsType) {
  // 创建事件对象
  const eventList = new Map();
  const instEvent = events<{[key in MoveEventType]: MoveDataTypes}>(eventList);

  const globalData = {
    el,
    options,
    _scale: 1,
    isDown: false,
    data: {...defaultData},
    callback(type) {
      instEvent.emit(type, {...globalData.data});
    },
  } as GlobalData;

  const observe = new MutationObserver(() => {
    const _el = isFunctionOrValue(el) as HTMLElement | undefined | null;
    const fun = mousedown.bind(globalData);

    if (!_el) return;
    options?.init?.(_el);
    globalData._el = _el;
    globalData.data.binElement = _el;

    _el.addEventListener('mousedown', fun);
    _el.addEventListener('touchstart', fun);
    observe.disconnect();
  });

  observe.observe(document, {childList: true, subtree: true});

  return {on: instEvent.on};
}
