<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton.vue';
import ArrowRightBig from '@/components/icons/ArrowRightBig.vue';
import { ref } from 'vue';

interface Props {
  title?: string;
}
const props = defineProps<Props>();
const isOpen = ref(false);
</script>

<template>
  <aside
    class="fixed top-20 left-0 z-40 w-64 h-full transition-transform"
    :class="{ 'max-sm:w-16': !isOpen }"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
      <IconButton
        class="sm:hidden"
        :class="{ 'rotate-180': isOpen }"
        :icon="ArrowRightBig"
        @click="isOpen = !isOpen"
      />
      <div :class="{ 'max-sm:hidden': !isOpen }">
        <h4
          v-if="props.title"
          class="text-xl border-b border-default pb-1"
        >
          {{ props.title }}
        </h4>

        <slot name="body"></slot>
      </div>
    </div>
  </aside>
</template>
