<script setup lang="ts">
interface Props {
  icon: string;
  title: string;
  description: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100">
    <div class="text-5xl mb-4">{{ props.icon }}</div>
    <h3 class="text-xl font-bold text-gray-900">{{ props.title }}</h3>
    <p class="mt-2 text-gray-500">{{ props.description }}</p>
  </div>
</template>
