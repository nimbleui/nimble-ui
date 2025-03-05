export type EventType = string | symbol;

export type Handler<T = unknown, R = Record<string, unknown>> = (event: T) => R;

export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events,
  Array<Handler<Events[keyof Events]>>
>;

export function events<
  Events extends Record<EventType, unknown>,
  R extends {[key in keyof Events]?: Record<string, unknown>},
>(all?: EventHandlerMap<Events>) {
  all = all || new Map();

  return {
    all,
    on<Key extends keyof Events>(
      type: Key,
      handler: Handler<Events[Key], R[Key]>,
    ) {
      const handlers = all.get(type) as unknown as Array<
        Handler<Events[Key], R[Key]>
      >;

      if (handlers) {
        handlers.push(handler);
      } else {
        (all as any).set(type, [handler]);
      }
    },

    emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
      const handlers = all.get(type);
      if (handlers) {
        return handlers.map((handler) => handler(evt!) as R[Key]);
      }
      return [];
    },
  };
}
