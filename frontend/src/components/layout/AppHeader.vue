<script setup lang="ts">
import AppButton from '../buttons/AppButton.vue';
import ArrowRight from '../icons/ArrowRight.vue';
import { useAuthStore } from '@/shared/auth/AuthStore';
import { useRouting } from '@/router/useRouting';
import { RouteNames } from '@/router/routes';
import Dropdown from '../dropdown/Dropdown.vue';

const { goToAuth } = useRouting();
const authStore = useAuthStore();
</script>

<template>
  <header class="px-2 py-4 bg-blue-100">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink :to="{ name: RouteNames.MAIN }">
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

        <Dropdown>
          <template #trigger>
            <button>Test dropdown</button>
          </template>
        </Dropdown>
      </div>
    </div>
  </header>
</template>
