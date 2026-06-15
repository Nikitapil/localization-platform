<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import { computed, ref } from 'vue';
import { useAuthStore } from './shared/auth/AuthStore';
import OverlayLoader from './components/loaders/OverlayLoader.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const withoutMainContainer = computed(() => route.meta.withoutMainContainer);

const containerClasses = computed(() => (withoutMainContainer.value ? '' : 'container mx-auto my-5'));

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

    <main
      class="pt-20"
      :class="{ 'px-2': !withoutMainContainer }"
    >
      <div :class="containerClasses">
        <RouterView />
      </div>
    </main>
  </div>
</template>
