<script lang="ts" setup>
import AppButton from '../buttons/AppButton.vue';
import Modal from './Modal.vue';
import type { DefaultModalProps } from './types';

interface Props extends DefaultModalProps {
  loading?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  cancel: [];
  confirm: [];
}>();
</script>

<template>
  <Modal
    :title="props.title"
    :content="props.content"
    :showableComponent="props.showableComponent"
  >
    <template #footer>
      <div class="flex gap-2 justify-end">
        <AppButton
          text="Cancel"
          class="mr-2"
          appearence="transparent"
          :disabled="props.loading"
          @click="emit('cancel')"
        />
        <AppButton
          text="Confirm"
          :loading="props.loading"
          @click="emit('confirm')"
        />
      </div>
    </template>
  </Modal>
</template>
