<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppButton from '../buttons/AppButton.vue';
import ArrowRight from '../icons/ArrowRight.vue';
import { useAuthStore } from '@/shared/auth/AuthStore';

const router = useRouter();

const authStore = useAuthStore();

const goToAuth = () => router.push({ name: 'auth' });
</script>

<template>
  <header class="px-2 py-4 bg-blue-100">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink :to="{ name: 'main' }">
        <h1 class="text-l font-bold tracking-wider text-gray-800">Localization platform</h1>
      </RouterLink>

      <div>
        <AppButton
          v-if="!authStore.user"
          text="Sign in"
          @click="goToAuth"
        >
          <template #append>
            <ArrowRight class="ml-2" />
          </template>
        </AppButton>
      </div>
    </div>
  </header>
</template>
