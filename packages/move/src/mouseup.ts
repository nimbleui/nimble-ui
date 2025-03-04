import {GlobalData, MoveMouseTouchEvent} from '.';
import {numScale} from './utils';

export default function mouseup(this: GlobalData, e: MoveMouseTouchEvent) {
  const {isDown, options = {}, _scale, data} = this;
  if (!isDown) return;
  this.isDown = false;

  if (options.stop) e.stopPropagation();
  if (options.prevent) e.preventDefault();

  const {clientX, clientY} = numScale(e, _scale);
  Object.assign(data, {endX: clientX, endY: clientY});
  this.limitInfo = null;
  this.callback('up', e);

  // 解绑事件
  const {moveFun, upFun} = this;
  if (moveFun) {
    document.removeEventListener('mousemove', moveFun);
    document.removeEventListener('touchmove', moveFun);
  }
  if (upFun) {
    document.removeEventListener('mouseup', upFun);
    document.removeEventListener('mouseleave', upFun);
    document.removeEventListener('touchend', upFun);
  }
}
