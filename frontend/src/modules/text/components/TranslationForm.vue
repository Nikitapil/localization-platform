<script lang="ts" setup>
import AppButton from '../../../components/buttons/AppButton.vue';
import AppTextarea from '../../../components/controls/AppTextarea.vue';
import AppSelect from '../../../components/controls/AppSelect/AppSelect.vue';
import type { AppSelectOption } from '@/components/controls/AppSelect/types';
import { useForm } from 'vee-validate';

interface Props {
  title: string;
  options: AppSelectOption[];
}

interface Emits {
  submit: [];
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const model = defineModel<{ lang: string; value: string }>({ required: true });

const { validate } = useForm();

const onSubmit = async () => {
  const { valid } = await validate();
  if (valid) {
    emit('submit');
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h3 class="font-semibold text-heading mb-6">{{ props.title }}</h3>
    <div class="flex flex-col gap-4">
      <AppSelect
        v-model="model.lang"
        id="language"
        label="Choose languaage"
        :options="props.options"
        name="language"
        rules="required"
        validationName="Language"
      />
      <AppTextarea
        v-model="model.value"
        id="translation_text"
        name="translation_text"
        rules="required"
        validationName="Translation text"
        placeholder="Translation text"
      />
      <AppButton
        text="Save"
        class="ml-auto"
      />
    </div>
  </form>
</template>
