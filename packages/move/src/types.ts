export type MoveElType = Element | (() => Element | undefined | null);

export interface MoveBaseOptions {
  boundary?: MoveElType | Window; // 拖拽的边界元素
  prevent?: boolean; // 阻止默认事件
  stop?: boolean; // 阻止事件冒泡
  scale?: number | (() => number | undefined); // 缩放比例
  expand?: number; // 边界元素扩大
}

export type MoveMouseTouchEvent = MouseEvent | TouchEvent;

export type MoveEvent<T = any> = MoveDataTypes & {
  e: MoveMouseTouchEvent;
  value: T;
};

export interface MoveOptionsType extends MoveBaseOptions {
  down?: (data: MoveEvent, setValue: (data: any) => void) => void;
  move?: (data: MoveEvent, setValue: (data: any) => void) => void;
  up?: (data: MoveEvent, setValue: (data: any) => void) => void;
  agencyTarget?: (el: Element) => Element | undefined | false | void; // 判断是否要代理
  changeTarget?: (el: Element, e: MoveMouseTouchEvent) => Element; // 改变目标元素
  init?: (el: Element) => void; // 绑定按下事件时执行
}

export interface MoveDataTypes {
  startX: number; // 按下鼠标x轴位置
  startY: number; // 按下鼠标y轴位置
  moveX: number; // 移动鼠标x轴位置
  moveY: number; // 移动鼠标y轴位置
  disX: number; // 鼠标移动x轴的距离
  disY: number; // 鼠标移动y轴的距离
  endX: number; // 鼠标抬起x轴的距离
  endY: number; // 鼠标抬起Y轴的距离
  isMove: boolean; // 是否移动
  target?: Element; // 当前移动的元素
  binElement?: Element; // 绑定的元素
}

export type MoveLimitInfoType = {l: number; r: number; t: number; b: number};
export type MoveCallbackReturnValue = {down?: any; move?: any; up?: any};

export type MoveEventType = 'down' | 'move' | 'up';
export interface GlobalData {
  _el: Element; // el参数执行后的值
  el: MoveElType; // 参数el
  isDown: boolean; // 是否按下
  _scale: number; // options中scale参数
  data: MoveDataTypes; // 鼠标信息、位置等等信息
  options?: MoveOptionsType; // 参数options
  upFun?(e: MoveMouseTouchEvent): void; // 元素绑定松开鼠标事件的回调函数
  moveFun?(e: MoveMouseTouchEvent): void; // 元素绑定移动鼠标事件的回调函数
  callback: (type: MoveEventType, e: MoveMouseTouchEvent) => void;
  limitInfo: MoveLimitInfoType | null;
}
