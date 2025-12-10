<script setup lang="ts">
import { type Component } from 'vue';

interface Props {
  icon: Component;
}

const props = defineProps<Props>();
</script>

<template>
  <button
    type="button"
    class="text-body cursor-pointer bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
  >
    <component :is="props.icon" />
  </button>
</template>
