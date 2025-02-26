export type MoveElType = Element | (() => Element | undefined | null);

export interface MoveBaseOptions {
  boundary?: MoveElType | Window; // 拖拽的边界元素
  prevent?: boolean; // 阻止默认事件
  stop?: boolean; // 阻止事件冒泡
  scale?: number | (() => number | undefined); // 缩放比例
  expand?: number; // 边界元素扩大
}

export type MoveMouseTouchEvent = MouseEvent | TouchEvent;

export type MoveEventCallbackParam = MoveDataTypes & {
  e: MoveMouseTouchEvent;
  value: MoveCallbackReturnValue;
};

export interface MoveOptionsType extends MoveBaseOptions {
  down?: (data: MoveEventCallbackParam, setValue: (data: any) => void) => void;
  move?: (data: MoveEventCallbackParam, setValue: (data: any) => void) => void;
  up?: (data: MoveEventCallbackParam, setValue: (data: any) => void) => void;
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
