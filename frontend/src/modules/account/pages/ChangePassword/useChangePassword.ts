import type { ChangePasswordDto } from '@/api/swagger/data-contracts';
import { useUserApi } from '@/api/swagger/User';
import { ref } from 'vue';

export const useChangePassword = () => {
  const errors = ref<Record<string, string> | null>(null);

  const {
    changePassword: { isLoading, call: changePasswordApi }
  } = useUserApi();

  const changePassword = async (request: ChangePasswordDto) => {
    const { data, error } = await changePasswordApi(request);
    if (error && typeof error === 'object') {
      errors.value = error as {};
      return;
    } else {
      errors.value = null;
    }

    if (data) {
      return data;
    }
  };

  return { changePassword, isLoading, errors };
};
