import type { Directive } from 'vue';

type TClickOutsideDirectiveValue = () => void;

type TElement = HTMLElement & {
  clickOutsideEvent?: (event: MouseEvent) => void;
};

export const clickOutside: Directive<TElement, TClickOutsideDirectiveValue> = {
  mounted(el, binding) {
    setTimeout(() => {
      el.clickOutsideEvent = function (event) {
        if (!(el === event?.target || el.contains(event?.target as Node))) {
          binding.value();
        }
      };
      document.addEventListener('click', el.clickOutsideEvent);
    });
  },
  unmounted(el) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent);
    }
  }
};
