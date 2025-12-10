import { useAuthApi } from '@/api/swagger/Auth';
import type { CreateUserDto, LoginDto, UserResponseDto } from '@/api/swagger/data-contracts';
import { useProfileApi } from '@/api/swagger/Profile';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useAuthStore = defineStore('authStore', () => {
  const accessToken = ref('');
  const user = ref<UserResponseDto | null>(null);
  const errors = ref<Record<string, string> | null>(null);

  const {
    register: { isLoading: isRegisterLoading, call: registerApi },
    login: { isLoading: isLoginLoading, call: loginApi }
  } = useAuthApi();
  const {
    getIsProfileExist: { isLoading: isProfileExistLoading, call: getIsProfileExist }
  } = useProfileApi();

  const register = async (request: CreateUserDto) => {
    const { data, error } = await registerApi(request);
    if (error && typeof error === 'object') {
      errors.value = error as {};
      return;
    } else {
      errors.value = null;
    }

    if (data && 'message' in data) {
      console.log(data);
      toast.info(data.message, { position: 'top-center', style: { width: 'fit-content' } });
    } else if (data) {
      accessToken.value = data.accessToken;
      user.value = data.user;
    }
  };

  const login = async (request: LoginDto) => {
    const { data, error } = await loginApi(request);
    if (error && typeof error === 'object') {
      errors.value = error as {};
      return;
    } else {
      errors.value = null;
    }

    if (data) {
      accessToken.value = data.accessToken;
      user.value = data.user;
    }
  };

  const refreshToken = async () => {};

  const resetErrors = () => {
    errors.value = null;
  };

  return {
    accessToken,
    user,
    isProfileExistLoading,
    isLoginLoading,
    isRegisterLoading,
    errors,
    refreshToken,
    getIsProfileExist,
    register,
    resetErrors,
    login
  };
});
