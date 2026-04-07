<script setup lang="ts">
import FieldError from './FieldError.vue';
import { useFieldValidation } from './FieldValidation/useFieldVavidation';
import type { FieldValidationParams } from './FieldValidation/types';

interface Props extends FieldValidationParams {
  placeholder?: string;
  disabled?: boolean;
  id: string;
}

const props = defineProps<Props>();

const model = defineModel<string>();

const { isError, error, handleChange } = useFieldValidation({
  name: props.name,
  rules: props.rules,
  validationName: props.validationName,
  externalError: props.externalError
});
</script>

<template>
  <div>
    <div class="relative">
      <textarea
        v-model="model"
        :id="props.id"
        :disabled="props.disabled"
        placeholder=" "
        class="block px-2.5 opac pb-2.5 pt-2.5 w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
        @input="handleChange"
      ></textarea>

      <label
        v-if="props.placeholder"
        :for="props.id"
        :class="{ 'opacity-90 pointer-events-none bg-transparent!': props.disabled }"
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

    <FieldError
      v-if="isError && error"
      :error="error"
    />
  </div>
</template>
