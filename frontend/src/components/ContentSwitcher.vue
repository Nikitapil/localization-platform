<script setup lang="ts" generic="T">
const model = defineModel<T>();

interface ContentSwitcherOption {
  name: string;
  value: T;
}

const props = defineProps<{
  options: readonly ContentSwitcherOption[];
}>();

const clickHandler = (option: ContentSwitcherOption) => {
  model.value = option.value;
};
</script>

<template>
  <div class="flex max-w-fit bg-neutral-primary-soft border border-default rounded-lg bottom-4 left-1/2">
    <button
      v-for="option in props.options"
      :key="option.name"
      type="button"
      class="px-5 py-2 first:rounded-s-lg last:rounded-e-lg hover:bg-neutral-secondary-strongest group cursor-pointer"
      :class="{ 'bg-black text-white hover:bg-black!': model === option.value }"
      @click="clickHandler(option)"
    >
      <slot :option="option">{{ option.name }}</slot>
    </button>
  </div>
</template>
