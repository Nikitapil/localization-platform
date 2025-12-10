<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../AuthStore';
import { useRouting } from '@/router/useRouting';

const store = useAuthStore();
const { goToMain } = useRouting();

watchEffect(() => {
  if (store.user) {
    goToMain();
  }
});
</script>

<template>
  <slot></slot>
</template>
