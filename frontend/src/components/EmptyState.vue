<script setup lang="ts">
const props = defineProps<{
  title: string;
  text: string;
}>();
</script>

<template>
  <section class="bg-neutral-primary">
    <div class="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-16">
      <h2 class="mb-6 text-4xl font-bold tracking-tighter text-heading md:text-5xl lg:text-6xl">
        {{ props.title }}
      </h2>
      <p class="mb-8 text-base font-normal text-body md:text-xl">
        {{ props.text }}
      </p>
      <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 md:space-x-4">
        <slot name="actions"></slot>
      </div>
    </div>
  </section>
</template>
