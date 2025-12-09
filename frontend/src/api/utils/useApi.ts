/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';

export const useApi = <T extends (...args: any[]) => any>(apiMethod: T) => {
  const isLoading = ref(false);

  const call = async (...params: Parameters<T>): Promise<ReturnType<T> | { error: unknown }> => {
    try {
      isLoading.value = true;

      const result = await apiMethod(...params);
      return result;
    } catch (e: any) {
      return { error: e?.response?.data || e?.message };
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, call };
};
