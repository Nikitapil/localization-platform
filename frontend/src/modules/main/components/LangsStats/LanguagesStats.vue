<script setup lang="ts">
import { useLanguagesStats } from './useLanguagesStats';

const { getStatistics, isStatisticsLoading, statistics } = useLanguagesStats();

getStatistics();
</script>

<template>
  <div class="mt-10 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/40">
    <h2 class="text-xl font-bold text-slate-800 mb-4">🎯 Localization progress by langs</h2>
    <template v-if="isStatisticsLoading">
      <FormSkeleton />
      <FormSkeleton />
      <FormSkeleton />
    </template>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div
        v-for="lang in statistics"
        :key="lang.langName"
      >
        <div class="flex justify-between text-sm mb-1">
          <span class="font-medium">{{ lang.langName }}</span>
          <span>{{ lang.totalTranslationsCount }} / {{ lang.totalTextsCount }} texts</span>
        </div>
        <div class="w-full bg-slate-200 rounded-full h-2.5">
          <div
            class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
            :style="{ width: `${lang.translationProgress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
