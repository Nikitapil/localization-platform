<script setup lang="ts">
import { ref } from 'vue';

const languages = ref([
  { code: 'en', name: 'Английский', completed: 1200, total: 1250 },
  { code: 'fr', name: 'Французский', completed: 980, total: 1250 },
  { code: 'de', name: 'Немецкий', completed: 1100, total: 1250 },
  { code: 'es', name: 'Испанский', completed: 740, total: 1250 }
]);
</script>

<template>
  <div class="mt-10 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/40">
    <h2 class="text-xl font-bold text-slate-800 mb-4">🎯 Прогресс локализации по языкам</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="lang in languages"
        :key="lang.code"
      >
        <div class="flex justify-between text-sm mb-1">
          <span class="font-medium">{{ lang.name }} ({{ lang.code }})</span>
          <span>{{ lang.completed }} / {{ lang.total }} ключей</span>
        </div>
        <div class="w-full bg-slate-200 rounded-full h-2.5">
          <div
            class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
            :style="{ width: `${(lang.completed / lang.total) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
