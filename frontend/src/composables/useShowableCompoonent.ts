import { ref } from 'vue';

export interface ShowableComponentParams {
  closeHandler?: () => void;
}

export const useShowableComponent = <T>(params?: ShowableComponentParams) => {
  const isShowed = ref(false);
  const payload = ref<T | null>();

  const open = (payloadData?: T) => {
    payload.value = payloadData || null;
    isShowed.value = true;
  };

  const close = () => {
    isShowed.value = false;
    payload.value = null;
    params?.closeHandler?.();
  };

  return { isShowed, open, close, payload };
};

export type ShowableComponent<T = null> = ReturnType<typeof useShowableComponent<T>>;
