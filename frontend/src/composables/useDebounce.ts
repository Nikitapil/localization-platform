import { ref } from 'vue';

export const useDebounce = <T extends () => void>(fn: T) => {
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null);
  return () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(() => {
      fn();
    }, 350);
  };
};
