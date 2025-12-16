<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router';
interface Props {
  to?: RouterLinkProps['to'];
  active?: boolean;
  text: string;
}

const props = defineProps<Props>();
</script>

<template>
  <component
    :is="props.to ? 'RouterLink' : 'div'"
    :to="props.to"
    class="inline-flex items-center gap-1 w-full p-2 cursor-pointer hover:bg-neutral-tertiary-medium hover:text-heading rounded"
    activeClass="bg-neutral-tertiary-medium"
  >
    <slot name="icon"></slot>
    {{ text }}
  </component>
</template>
