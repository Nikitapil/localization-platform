import { useRouter } from 'vue-router';
import { RouteNames } from './routes';

export const useRouting = () => {
  const router = useRouter();

  const goToMain = () => {
    router.push({ name: RouteNames.MAIN });
  };

  const goToAuth = () => {
    router.push({ name: RouteNames.AUTH });
  };

  return { goToMain, goToAuth };
};
