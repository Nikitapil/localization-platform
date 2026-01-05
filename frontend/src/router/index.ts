import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/modules/main/pages/MainPage.vue';
import AuthPage from '@/shared/auth/pages/AuthPage.vue';
import { RouteNames } from './routes';
import AccountPage from '@/modules/account/pages/AccountPage.vue';
import UserCredentials from '@/modules/account/pages/UserCredentials/UserCredentials.vue';
import ChangePassword from '@/modules/account/pages/ChangePassword/ChangePassword.vue';
import ProfilePage from '@/modules/profile/pages/ProfilePage.vue';
import ProfileCredentials from '@/modules/profile/pages/ProfileCredentials/ProfileCredentials.vue';
import ProfileUsers from '@/modules/profile/pages/ProfileUsers/ProfileUsers.vue';

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
        },
        {
          name: RouteNames.CHANGE_PASSWORD,
          path: 'change-password',
          component: ChangePassword
        }
      ]
    },
    {
      name: RouteNames.PROFILE,
      path: '/profile',
      component: ProfilePage,
      children: [
        {
          name: RouteNames.PROFILE_CREDENTIALS,
          path: '',
          component: ProfileCredentials
        },
        {
          name: RouteNames.PROFILE_USERS,
          path: 'users',
          component: ProfileUsers
        }
      ]
    }
  ]
});

export default router;
