import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/modules/main/pages/MainPage.vue';
import AuthPage from '@/shared/auth/pages/AuthPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'main',
      path: '/',
      component: MainPage
    },
    {
      name: 'auth',
      path: '/auth',
      component: AuthPage
    }
  ]
});

export default router;
