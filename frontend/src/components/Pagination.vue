<script setup lang="ts">
import { computed } from 'vue';
import AppButton from './buttons/AppButton.vue';

interface Props {
  totalCount: number;
  limit: number;
  visibleCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  visibleCount: 10
});

const page = defineModel<number>({ default: 0 });

const pages = computed(() => Array.from({ length: Math.ceil(props.totalCount / props.limit) }, (_, b) => b + 1));

const visiblePages = computed(() => {
  if (pages.value.length <= props.visibleCount) {
    return pages.value;
  }
  const half = Math.floor(props.visibleCount / 2);
  const max = Math.min(Math.max(page.value + half, props.visibleCount), pages.value.length);
  const min = Math.max(max - props.visibleCount, 0);
  return pages.value.slice(min, max);
});

const onClickPage = (p: number) => {
  if (p !== page.value) {
    page.value = p;
  }
};
</script>

<template>
  <div class="flex">
    <AppButton
      v-for="p in visiblePages"
      :key="p"
      :class="{ 'font-bold!': p === page }"
      :text="p"
      appearence="transparent"
      @click="onClickPage(p)"
    />
  </div>
</template>
