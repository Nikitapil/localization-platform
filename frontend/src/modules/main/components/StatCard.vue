<script lang="ts" setup>
interface Props {
  icon: string;
  trend: string;
  value: number | string;
  label: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 transition-all hover:shadow-xl hover:-translate-y-1"
  >
    <div class="flex items-center justify-between">
      <span class="text-4xl">{{ props.icon }}</span>
      <span
        v-if="props.trend"
        class="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full"
        >{{ props.trend }}</span
      >
    </div>
    <div class="mt-4">
      <h3 class="text-2xl font-bold text-slate-800">{{ props.value }}</h3>
      <p class="text-slate-500 text-sm">{{ props.label }}</p>
    </div>
  </div>
</template>
