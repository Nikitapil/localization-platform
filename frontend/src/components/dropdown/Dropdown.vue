<script setup lang="ts">
const model = defineModel({ default: false });

const onOpen = () => {
  model.value = true;
};
const onClose = () => {
  console.log('onCLose');
  model.value = false;
};
</script>

<template>
  <div
    v-click-outside="onClose"
    class="relative"
  >
    <div @click="onOpen">
      <slot name="trigger"></slot>
    </div>
    <div
      v-if="model"
      class="absolute right-0 top-full mt-1 z-10 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg min-w-56 min-h-8"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
