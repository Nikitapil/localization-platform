import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
  const accessToken = ref('');
  const user = ref(null);

  const refreshToken = async () => {};

  return {
    accessToken,
    user,
    refreshToken
  };
});
