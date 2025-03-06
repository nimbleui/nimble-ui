export type TypesFun<T> = T | (() => T | null);

export type ElementType = TypesFun<Element>;
