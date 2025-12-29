import type { EditUserDto } from '@/api/swagger/data-contracts';
import { useUserApi } from '@/api/swagger/User';
import { ref } from 'vue';

export const useUserCredentials = () => {
  const errors = ref<Record<string, string> | null>(null);

  const {
    editUser: { isLoading, call: editUserApi }
  } = useUserApi();

  const editUser = async (request: EditUserDto) => {
    const { data, error } = await editUserApi(request);
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

  return { editUser, isLoading, errors };
};
