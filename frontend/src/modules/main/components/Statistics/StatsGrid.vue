<script setup lang="ts">
import { computed, onMounted } from 'vue';
import StatCard from './StatCard.vue';
import { useStats } from './useStats.ts';
import FormSkeleton from '@/components/loaders/FormSkeleton.vue';
import { RouteNames } from '@/router/routes.ts';

const { statistics, getStatistics, isStatisticsLoading } = useStats();

const stats = computed(() => {
  if (!statistics.value) {
    return null;
  }
  return [
    { label: 'Languages', value: statistics.value.totalLangs, icon: '🌐', to: { name: RouteNames.LANGS } },
    { label: 'Texts', value: statistics.value.totalTexts, icon: '🔑', to: { name: RouteNames.TEXTS } },
    {
      label: 'Profile users',
      value: statistics.value.totalProfileUsers,
      icon: '👥',
      to: { name: RouteNames.PROFILE_USERS }
    }
  ];
});

onMounted(() => {
  getStatistics();
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    <template v-if="isStatisticsLoading">
      <FormSkeleton />
      <FormSkeleton />
      <FormSkeleton />
    </template>

    <template v-else-if="stats">
      <StatCard
        v-for="stat in stats"
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :icon="stat.icon"
        :to="stat.to"
      />
    </template>
  </div>
</template>
