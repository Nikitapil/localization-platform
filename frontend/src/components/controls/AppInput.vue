<script setup lang="ts">
import { useField, type RuleExpression } from 'vee-validate';
import { computed, type InputHTMLAttributes, type MaybeRef } from 'vue';

interface Props {
  placeholder: string;
  id: string;
  inputmode?: InputHTMLAttributes['inputmode'];
  type?: InputHTMLAttributes['type'];
  disabled?: boolean;
  name: string;
  rules?: MaybeRef<RuleExpression<unknown>>;
  validationName?: string;
}

const props = defineProps<Props>();

const model = defineModel<string>();

const { errorMessage, validate, meta } = useField(props.name, props.rules, {
  syncVModel: true,
  validateOnMount: false,
  validateOnValueUpdate: false,
  label: props.validationName
});

const isError = computed(() => {
  return meta.validated && errorMessage.value;
});

const handleChange = () => {
  if (isError.value) {
    validate();
  }
};

const classes = computed(() => ({
  'pt-4!': !!props.placeholder,
  'opacity-80 pointer-events-none bg-gray-100!': !!props.disabled,
  'border-danger! focus:border-danger': isError.value
}));
</script>

<template>
  <div>
    <div class="relative">
      <input
        v-model="model"
        :id="props.id"
        :class="classes"
        :type="props.type"
        :disabled="props.disabled"
        class="block px-2.5 opac pb-2.5 pt-2.5 w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
        placeholder=" "
        :inputmode="props.inputmode"
        @input="handleChange"
      />

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
    <p class="mt-1 text-xs text-fg-danger-strong">{{ errorMessage }}</p>
  </div>
</template>
