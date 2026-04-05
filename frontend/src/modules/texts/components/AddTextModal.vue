<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue';
import AppInput from '@/components/controls/AppInput.vue';
import Modal from '@/components/modals/Modal.vue';
import type { DefaultModalProps } from '@/components/modals/types';
import { useForm } from 'vee-validate';
import { ref } from 'vue';

interface Props extends DefaultModalProps {
  isLoading: boolean;
  errors: Record<string, string>;
}

interface Emits {
  save: [key: string];
  resetErrors: [];
}

const { validate } = useForm();

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const key = ref('');

const onSave = async () => {
  const { valid } = await validate();
  if (valid) {
    emit('save', key.value);
  }
};
</script>

<template>
  <Modal
    :showableComponent="props.showableComponent"
    title="Add new text"
  >
    <template #content>
      <form @submit.prevent="onSave">
        <AppInput
          v-model="key"
          placeholder="Text key"
          id="key"
          name="key"
          rules="required"
          validationName="Text key"
          :disabled="props.isLoading"
          :externalError="props.errors.key"
          @update:modelValue="$emit('resetErrors')"
        />

        <AppButton
          class="mt-4 w-full"
          text="save"
          :disabled="props.isLoading"
        />
      </form>
    </template>
  </Modal>
</template>