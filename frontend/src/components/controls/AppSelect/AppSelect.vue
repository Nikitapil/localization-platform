<script setup lang="ts">
import FieldError from '../FieldError.vue';
import type { FieldValidationParams } from '../FieldValidation/types';
import { useFieldValidation } from '../FieldValidation/useFieldVavidation';
import type { AppSelectOption } from './types';

const model = defineModel<string>();

interface AppSelectProps extends FieldValidationParams {
  id: string;
  label: string;
  options: AppSelectOption[];
  disabled?: boolean;
}

const props = defineProps<AppSelectProps>();

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
      <select
        v-model="model"
        :id="props.id"
        :disabled="disabled"
        class="block px-2.5 opac pb-2.5 pt-2.5 min-w-36 cursor-pointer w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
        @change="handleChange"
      >
        <option
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>

      <label
        :for="props.id"
        class="inline-flex items-center absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {{ props.label }}
      </label>
    </div>
    <FieldError
      v-if="isError && error"
      :error="error"
    />
  </div>
</template>
