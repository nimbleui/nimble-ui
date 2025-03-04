import {isFunctionOrValue} from '@nimble-ui/utils';
import {GlobalData, MoveMouseTouchEvent} from '.';
import mousemove from './mousemove';
import mouseup from './mouseup';
import {numScale, getTarget, sunBoundaryValue} from './utils';

export default function mousedown(this: GlobalData, e: MoveMouseTouchEvent) {
  const options = this.options || {};
  this.isDown = true;
  // 判断是否有代理元素
  const target = getTarget(e.target, this._el, options.agencyTarget);
  if (!target) return;
  // 记录目标元素
  this.data.target = options.changeTarget?.(target, e) ?? target;

  if (options.stop) e.stopPropagation();
  if (options.prevent) e.preventDefault();

  // 获取位置
  this._scale = isFunctionOrValue(options.scale) ?? 1;
  const {clientX, clientY} = numScale(e, this._scale);
  Object.assign(this.data, {startX: clientX, startY: clientY});

  const moveFun = mousemove.bind(this);
  this.moveFun = moveFun;
  const upFun = mouseup.bind(this);
  this.upFun = upFun;

  document.addEventListener('mousemove', moveFun);
  document.addEventListener('mouseup', upFun);
  document.addEventListener('mouseleave', upFun);

  document.addEventListener('touchmove', moveFun);
  document.addEventListener('touchend', upFun);
  if (options?.boundary) {
    this.limitInfo = sunBoundaryValue(target, options);
  }
  this.callback('down', e);
}
