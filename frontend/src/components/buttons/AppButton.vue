<script lang="ts" setup>
import Spinner from '../loaders/Spinner.vue';
import { computed, type ButtonHTMLAttributes } from 'vue';

interface Props {
  type?: ButtonHTMLAttributes['type'];
  text?: string;
  appearence?: 'primary' | 'transparent';
  loading?: boolean;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  appearence: 'primary',
  loading: false,
  disabled: false
});

const className = computed(() => {
  let classes =
    'border border-transparent focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none cursor-pointer flex items-center';

  if (props.appearence === 'primary' && !props.disabled) {
    classes += ' text-white bg-brand focus:ring-brand-medium hover:bg-brand-strong';
  }

  if (props.appearence === 'transparent' && !props.disabled) {
    classes += ' text-black bg-transparent hover:bg-neutral-secondary-medium focus:ring-neutral-tertiary shadow-none!';
  }

  if (props.disabled) {
    classes += ' text-fg-disabled bg-disabled';
  }

  if (props.loading || props.disabled) {
    classes += ' pointer-events-none';
  }

  return classes;
});
</script>

<template>
  <button
    :type="props.type"
    :class="className"
    :disabled="props.loading || props.disabled"
  >
    <Spinner
      v-if="props.loading"
      class="mr-2"
    />
    <span class="mx-auto">
      {{ props.text }}
    </span>
  </button>
</template>
