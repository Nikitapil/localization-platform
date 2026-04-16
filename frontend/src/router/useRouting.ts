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

  const goToText = (textKey: string) => {
    router.push({ name: RouteNames.TEXT, params: { key: textKey } });
  };

  const goToTexts = () => {
    router.push({ name: RouteNames.TEXTS });
  };

  return { goToMain, goToAuth, goToText, goToTexts };
};
