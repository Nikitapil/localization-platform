import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/modules/main/pages/MainPage.vue';
import AuthPage from '@/shared/auth/pages/AuthPage.vue';
import { RouteNames } from './routes';
import AccountPage from '@/modules/account/pages/AccountPage.vue';
import UserCredentials from '@/modules/account/pages/UserCredentials.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: RouteNames.MAIN,
      path: '/',
      component: MainPage
    },
    {
      name: RouteNames.AUTH,
      path: '/auth',
      component: AuthPage
    },
    {
      name: RouteNames.ACCOUNT,
      path: '/account',
      component: AccountPage,
      children: [
        {
          name: RouteNames.USER_CREDENTIALS,
          path: '',
          component: UserCredentials
        }
      ]
    }
  ]
});

export default router;
