<script setup lang="ts">
import { computed, ref } from 'vue';

const isRegister = ref(false);

const title = computed(() => (isRegister.value ? 'Register' : 'Login'));
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
  </div>
</template>
