import { useAuthApi } from '@/api/swagger/Auth';
import { useProfileApi } from '@/api/swagger/Profile';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
  const accessToken = ref('');
  const user = ref(null);

  const { register } = useAuthApi();
  const {
    getIsProfileExist: { isLoading: isProfileExistLoading, call: getIsProfileExist }
  } = useProfileApi();

  const refreshToken = async () => {};

  return {
    accessToken,
    user,
    isProfileExistLoading,
    refreshToken,
    getIsProfileExist
  };
});
