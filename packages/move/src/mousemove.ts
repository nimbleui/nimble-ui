import {GlobalData, MoveMouseTouchEvent} from '.';
import {numScale} from './utils';

export default function mousemove(this: GlobalData, e: MoveMouseTouchEvent) {
  const {options = {}, data, limitInfo} = this;
  if (!this.isDown) return;

  if (options?.stop) e.stopPropagation(); // 阻止事件冒泡
  if (options?.prevent) e.preventDefault(); // 阻止默认事件
  data.isMove = true;

  const {clientX, clientY} = numScale(e, this._scale);
  const {startX, startY} = data;
  let disX = clientX - startX;
  let disY = clientY - startY;

  if (limitInfo) {
    disX = disX > 0 ? Math.min(limitInfo.r, disX) : Math.max(limitInfo.l, disX);
    disY = disY > 0 ? Math.min(limitInfo.b, disY) : Math.max(limitInfo.t, disY);
  }
  Object.assign(data, {moveX: clientX, moveY: clientY, disX, disY});
  this.callback('move', e);
}
