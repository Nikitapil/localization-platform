<script lang="ts" setup>
import type { RouterLinkProps } from 'vue-router';
interface Props {
  icon: string;
  value: number | string;
  label: string;
  to: RouterLinkProps['to'];
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink
    class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 transition-all hover:shadow-xl hover:-translate-y-1"
    :to="props.to"
  >
    <div class="flex items-center justify-between">
      <span class="text-4xl">{{ props.icon }}</span>
    </div>
    <div class="mt-4">
      <h3 class="text-2xl font-bold text-slate-800">{{ props.value }}</h3>
      <p class="text-slate-500 text-sm">{{ props.label }}</p>
    </div>
  </RouterLink>
</template>
