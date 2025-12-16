<script setup lang="ts">
import OverlayLoader from '@/components/loaders/OverlayLoader.vue';
import { useAuthStore } from '../AuthStore';
import AuthForm from './AuthForm.vue';

const store = useAuthStore();
</script>

<template>
  <OverlayLoader v-if="store.isRefreshLoading || store.isLogoutLoading" />
  <AuthForm v-else-if="!store.user" />
  <slot v-else></slot>
</template>
