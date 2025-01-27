import { useEffect } from "react";

const useClickOutside = (
  ref: Element | HTMLElement | HTMLElement[] | null | undefined,
  callback: () => void
) => {
  useEffect(() => {
    if (ref) {
      const func = (ev: MouseEvent) => {
        if (ev?.target instanceof Node) {
          if (Array.isArray(ref)) {
            if (
              !ref.some(
                (el) =>
                  el instanceof HTMLElement && el.contains(ev.target as Node)
              )
            ) {
              callback();
            }
          } else if (ref instanceof HTMLElement || ref instanceof Element) {
            if (!ref.contains(ev.target)) {
              callback();
            }
          }
        }
      };

      window.addEventListener("click", func);

      return () => {
        window.removeEventListener("click", func);
      };
    }
  }, [ref, callback]);
};

export default useClickOutside;
