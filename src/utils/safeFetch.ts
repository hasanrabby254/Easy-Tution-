// Ensures fetch on window/globalThis has both getter and setter,
// preventing "Uncaught TypeError: Cannot set property fetch of #<Window> which has only a getter"
(function ensureSafeFetch() {
  try {
    const target = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : undefined);
    if (!target) return;

    const nativeFetch = target.fetch;
    let activeFetch = nativeFetch ? (typeof nativeFetch.bind === 'function' ? nativeFetch.bind(target) : nativeFetch) : null;
    const proto = typeof Window !== 'undefined' ? Window.prototype : null;

    const install = (obj: any) => {
      if (!obj) return;
      try {
        const desc = Object.getOwnPropertyDescriptor(obj, 'fetch');
        if (!desc || !desc.set) {
          Object.defineProperty(obj, 'fetch', {
            get() {
              return activeFetch || (nativeFetch ? (typeof nativeFetch.bind === 'function' ? nativeFetch.bind(target) : nativeFetch) : undefined);
            },
            set(val) {
              activeFetch = val;
            },
            configurable: true,
            enumerable: true
          });
        }
      } catch (_) {}
    };

    if (proto) install(proto);
    install(target);
  } catch (_) {}
})();

export {};
