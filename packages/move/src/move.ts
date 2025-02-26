import {isFunctionOrValue} from '@nimble-ui/utils';
import type {
  MoveElType,
  MoveMouseTouchEvent,
  MoveOptionsType,
  MoveDataTypes,
  MoveLimitInfoType,
  MoveCallbackReturnValue,
} from './types';
import {getTarget, numScale, sunBoundaryValue} from './utils';

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

export function move(el: MoveElType, options?: MoveOptionsType) {
  const {changeTarget, init, ..._options} = options || {};
  const data: MoveDataTypes = Object.assign({}, defaultData);

  const infoData: {
    isDown: boolean;
    limitInfo: MoveLimitInfoType | null;
    callbackReturnValue: MoveCallbackReturnValue;
  } = {
    isDown: false,
    limitInfo: null,
    callbackReturnValue: {},
  };

  const setValue = (type: 'down' | 'move' | 'up') => {
    return (data: any) => (infoData.callbackReturnValue[type] = data);
  };

  function mousedown(this: Element, e: MoveMouseTouchEvent) {
    infoData.isDown = true;
    const res = getTarget(e, el, _options);
    if (!res) return;
    data.target = changeTarget?.(res, e) ?? res;
    data.binElement = this;

    const {clientX, clientY} = numScale(e, _options);
    Object.assign(data, {startX: clientX, startY: clientY});
    if (_options?.stop) e.stopPropagation(); // 阻止事件冒泡
    if (_options?.prevent) e.preventDefault(); // 阻止默认事件

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    document.addEventListener('mouseleave', mouseup);

    document.addEventListener('touchmove', mousemove);
    document.addEventListener('touchend', mouseup);

    _options.down?.(
      {...data, e, value: infoData.callbackReturnValue},
      setValue('down'),
    );
    if (_options?.boundary) {
      infoData.limitInfo = sunBoundaryValue(data.target, _options);
    }
  }

  function mousemove(e: MoveMouseTouchEvent) {
    if (!infoData.isDown) return;

    if (_options?.stop) e.stopPropagation(); // 阻止事件冒泡
    if (_options?.prevent) e.preventDefault(); // 阻止默认事件
    data.isMove = true;

    const {clientX, clientY} = numScale(e, _options);
    const {startX, startY} = data;
    let disX = clientX - startX;
    let disY = clientY - startY;

    const {limitInfo} = infoData;
    if (limitInfo) {
      disX =
        disX > 0 ? Math.min(limitInfo.r, disX) : Math.max(limitInfo.l, disX);
      disY =
        disY > 0 ? Math.min(limitInfo.b, disY) : Math.max(limitInfo.t, disY);
    }
    Object.assign(data, {moveX: clientX, moveY: clientY, disX, disY});
    _options.move?.(
      {...data, e, value: infoData.callbackReturnValue},
      setValue('move'),
    );
  }

  function mouseup(e: MoveMouseTouchEvent) {
    if (!infoData.isDown) return;
    if (_options?.stop) e.stopPropagation();
    if (_options?.prevent) e.preventDefault();
    infoData.isDown = false;

    const {clientX: endX, clientY: endY} = numScale(e, _options);
    Object.assign(data, {endX, endY});
    _options?.up?.(
      {...data, e, value: infoData.callbackReturnValue},
      setValue('up'),
    );
    Object.assign(data, defaultData);
    infoData.limitInfo = null;
    infoData.callbackReturnValue = {};

    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    document.removeEventListener('mouseleave', mouseup);

    document.removeEventListener('touchmove', mousemove);
    document.removeEventListener('touchend', mouseup);
  }

  const observe = new MutationObserver(() => {
    const value = isFunctionOrValue(el);
    if (value) {
      init?.(value);
      (value as HTMLElement).addEventListener('mousedown', mousedown);
      (value as HTMLElement).addEventListener('touchstart', mousedown);
      observe.disconnect();
    }
  });

  observe.observe(document, {childList: true, subtree: true});

  return {data, observe};
}
