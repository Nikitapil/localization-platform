<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

interface Props {
  placeholder: string;
  id: string;
  inputmode?: InputHTMLAttributes['inputmode'];
  type?: InputHTMLAttributes['type'];
}

const props = defineProps<Props>();

const model = defineModel<string>();
</script>

<template>
  <div class="relative">
    <input
      v-model="model"
      :id="props.id"
      :class="{ 'pt-4!': !!props.placeholder }"
      :type="props.type"
      class="block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
      placeholder=" "
      :inputmode="props.inputmode"
    />

    <label
      v-if="props.placeholder"
      :for="props.id"
      class="inline-flex items-center absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    >
      <div
        v-if="$slots['label-icon']"
        class="mr-1"
      >
        <slot name="label-icon"></slot>
      </div>

      {{ props.placeholder }}
    </label>
  </div>
</template>
