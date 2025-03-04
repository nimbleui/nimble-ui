export type EventType = string | symbol;

export type Handler<T = unknown> = (
  event: T,
) => Promise<Record<string, unknown>> | Record<string, unknown>;

export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events,
  Array<Handler<Events[keyof Events]>>
>;

export function events<Events extends Record<EventType, unknown>>(
  all?: EventHandlerMap<Events>,
) {
  all = all || new Map();

  return {
    all,
    on<Key extends keyof Events>(
      type: Key,
      handler: Handler<Events[keyof Events]>,
    ) {
      const handlers = all.get(type);

      if (handlers) {
        handlers.push(handler);
      } else {
        all.set(type, [handler] as Handler<Events[keyof Events]>[]);
      }
    },

    emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
      const handlers = all.get(type);
      if (handlers) {
        return handlers.map((handler) => handler(evt!));
      }
    },
  };
}
