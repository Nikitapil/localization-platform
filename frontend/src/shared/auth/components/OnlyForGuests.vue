<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../AuthStore';

const store = useAuthStore();
const router = useRouter();

watchEffect(() => {
  if (store.user) {
    router.push({ name: 'main' });
  }
});
</script>

<template>
  <slot></slot>
</template>
