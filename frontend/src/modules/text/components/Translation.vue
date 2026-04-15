<script setup lang="ts">
import type { TextTranslationDto } from '@/api/swagger/data-contracts';
import IconButton from '@/components/buttons/IconButton.vue';
import type { AppSelectOption } from '@/components/controls/AppSelect/types';
import Pen from '@/components/icons/Pen.vue';
import { computed, ref } from 'vue';
import TranslationForm from './TranslationForm.vue';
import TrashBin from '@/components/icons/TrashBin.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import { useTranslationApi } from '@/api/swagger/Translation';
import { toast } from 'vue3-toastify';
import { useModal } from '@/components/modals/utils';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';

interface Props {
  translation: TextTranslationDto;
  availableLangsOptions: AppSelectOption[];
}

interface Emits {
  translationEdited: [TextTranslationDto];
  translationDeleted: [string];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { editTranslation, deleteTranslation } = useTranslationApi();

const confirmDeleteModal = useModal();

const isEditing = ref(false);

const translationForm = ref({
  lang: props.translation.lang.id,
  value: props.translation.value
});

const isLoading = computed(() => editTranslation.isLoading.value || deleteTranslation.isLoading.value);

const langsOptions = computed(() => [
  { name: props.translation.lang.name, value: props.translation.lang.id },
  ...props.availableLangsOptions
]);

const closeEditForm = () => {
  if (isEditing.value) {
    isEditing.value = false;
    translationForm.value = {
      lang: props.translation.lang.id,
      value: props.translation.value
    };
  }
};

const openForm = async () => {
  isEditing.value = true;
  translationForm.value = {
    lang: props.translation.lang.id,
    value: props.translation.value
  };
};

const onEdit = async () => {
  const { error, data } = await editTranslation.call({
    id: props.translation.id,
    langId: translationForm.value.lang,
    value: translationForm.value.value
  });

  // TODO сделать общий обработчик ошибок, т.к. много где используется
  if (error && typeof error === 'object' && 'message' in error) {
    toast.error(error.message);
  }
  if (data) {
    emit('translationEdited', data);
  }
  closeEditForm();
};

const onDelete = async () => {
  const translationId = props.translation.id;
  await deleteTranslation.call({ id: translationId });
  emit('translationDeleted', translationId);
};
</script>

<template>
  <div
    v-if="isEditing"
    v-click-outside="() => closeEditForm()"
  >
    <TranslationForm
      v-model="translationForm"
      title="Edit translation"
      :options="langsOptions"
      :isLoading="isLoading"
      @submit="onEdit"
    >
      <template #actions>
        <AppButton
          type="button"
          text="Cancel"
          appearence="transparent"
          :disabled="isLoading"
          @click="closeEditForm"
        />
      </template>
    </TranslationForm>
  </div>
  <div v-else>
    <div class="w-full flex justify-between mb-2 items-center">
      <h4 class="font-bold">{{ props.translation.lang.name }}</h4>

      <div class="flex items-center gap-2">
        <IconButton
          :icon="Pen"
          @click="openForm"
        />
        <IconButton
          :icon="TrashBin"
          @click="confirmDeleteModal.open"
        />
      </div>
    </div>

    <p>{{ props.translation.value }}</p>
  </div>
  <ConfirmModal
    title="Delete confirmation"
    content="Are you sure you want to delete this translation?"
    :showableComponent="confirmDeleteModal"
    @confirm="onDelete"
    @cancel="confirmDeleteModal.close"
  />
</template>
