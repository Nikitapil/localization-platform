import { AuthApi } from '../swagger/Auth';
import { useApi } from '../utils/useApi';

const authApi = new AuthApi();

export const useAutApi = () => {
  return {
    login: useApi(authApi.login)
  };
};
