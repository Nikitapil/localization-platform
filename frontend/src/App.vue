<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import { ref } from 'vue';
import { useAuthStore } from './shared/auth/AuthStore';
import OverlayLoader from './components/loaders/OverlayLoader.vue';

const authStore = useAuthStore();

const isInitLoading = ref(true);

const init = async () => {
  await authStore.refreshToken();
  isInitLoading.value = false;
};

init();
</script>

<template>
  <OverlayLoader v-if="isInitLoading" />

  <div v-else>
    <AppHeader />

    <main class="px-2 pt-20">
      <div class="container mx-auto my-5">
        <RouterView />
      </div>
    </main>
  </div>
</template>
