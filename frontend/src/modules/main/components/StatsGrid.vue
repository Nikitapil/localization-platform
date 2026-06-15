<script setup lang="ts">
import { ref } from 'vue';
import StatCard from './StatCard.vue';

const stats = ref([
  { label: 'Языки', value: '8', icon: '🌐', trend: 'en, fr, es, de...' },
  { label: 'Ключей перевода', value: '2,345', icon: '🔑', trend: '+143' },
  { label: 'Активных участников', value: '7', icon: '👥', trend: '3 онлайн' }
]);
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    <StatCard
      v-for="stat in stats"
      :key="stat.label"
      :label="stat.label"
      :value="stat.value"
      :icon="stat.icon"
      :trend="stat.trend"
    />
  </div>
</template>
