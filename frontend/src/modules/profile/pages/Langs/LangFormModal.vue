<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue';
import AppInput from '@/components/controls/AppInput.vue';
import Modal from '@/components/modals/Modal.vue';
import type { DefaultModalProps } from '@/components/modals/types';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';

interface Props extends DefaultModalProps {
  existingName?: string;
  isLoading: boolean;
}

interface Emits {
  save: [name: string];
}

const { validate } = useForm();

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const name = ref(props.existingName || '');

const title = computed(() => (props.existingName ? 'Edit language' : 'Add language'));

const onSave = async () => {
  const { valid } = await validate();
  if (valid) {
    emit('save', name.value);
  }
};
</script>

<template>
  <Modal
    :showableComponent="props.showableComponent"
    :title="title"
  >
    <template #content>
      <form @submit.prevent="onSave">
        <AppInput
          v-model="name"
          placeholder="Language name"
          id="name"
          name="name"
          rules="required"
          validationName="Language name"
          :disabled="props.isLoading"
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
