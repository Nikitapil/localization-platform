<script setup lang="ts">
import AppInput from '../../../components/controls/AppInput.vue';
import OverlayLoader from '../../../components/loaders/OverlayLoader.vue';
import EmptyState from '../../../components/EmptyState.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useText } from '../useText';
import IconButton from '@/components/buttons/IconButton.vue';
import Pen from '@/components/icons/Pen.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import { useForm } from 'vee-validate';
import { toast } from 'vue3-toastify';
import { useRouting } from '@/router/useRouting';
import type { AppSelectOption } from '@/components/controls/AppSelect/types';
import TranslationForm from '../components/TranslationForm.vue';
import FormSkeleton from '@/components/loaders/FormSkeleton.vue';
import { RouteNames } from '@/router/routes';
import List from '@/components/List.vue';
import Translation from '../components/Translation.vue';
import Cancel from '@/components/icons/Cancel.vue';
import { useModal } from '@/components/modals/utils';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import TrashBin from '@/components/icons/TrashBin.vue';

const route = useRoute();
const { goToText, goToTexts } = useRouting();

const { validate } = useForm();

const {
  text,
  isTextLoading,
  isTextEditing,
  isLangsLoading,
  isTranslationCreating,
  isTextDeliting,
  langs,
  editText,
  addTranslation,
  changeTranslation,
  removeTranslation,
  deleteText,
  init
} = useText();

const confirmDeleteTextModal = useModal();

const isEditing = ref(false);
const isShowAddTranslationForm = ref(false);

const translationForm = ref({
  value: '',
  lang: ''
});

const key = computed(() => (route.params.key as string) || '');

const langsOptions = computed(() => {
  const allUsedLangs = new Set(text.value?.translations.map((translation) => translation.lang.id));
  return langs.value.reduce((acc: AppSelectOption[], lang) => {
    if (!allUsedLangs.has(lang.id)) {
      acc.push({
        name: lang.name,
        value: lang.id
      });
    }
    return acc;
  }, []);
});

const textKey = ref(key.value);

const closeEditFormWithoutSave = () => {
  if (isEditing.value) {
    textKey.value = key.value;
    isEditing.value = false;
  }
};

const onEditText = async () => {
  if (textKey.value === key.value) {
    isEditing.value = false;
    return;
  }
  const { valid } = await validate();
  if (valid) {
    const { data, error } = await editText({ key: key.value, newKey: textKey.value });

    if (error && typeof error === 'object' && 'existingKey' in error) {
      toast.error(error.existingKey);
    } else if (data) {
      goToText(data.key);
      isEditing.value = false;
    }
  }
};

const onAddNewTranslation = async () => {
  await addTranslation({
    textKey: textKey.value,
    langId: translationForm.value.lang,
    value: translationForm.value.value
  });
  translationForm.value = {
    lang: '',
    value: ''
  };
};

const onDeleteText = async () => {
  if (text.value) {
    await deleteText({ key: text.value.key });
    confirmDeleteTextModal.close();
    goToTexts();
  }
};

onMounted(() => {
  init(key.value);
});
</script>

<template>
  <div>
    <form
      v-if="isEditing"
      class="flex gap-2 mb-4"
      v-click-outside="() => closeEditFormWithoutSave()"
      @submit.prevent="onEditText"
    >
      <AppInput
        v-model="textKey"
        id="textKey"
        placeholder="Text key"
        name="textKey"
        class="flex-1"
        rules="required"
        validationName="Text key"
        :disabled="isTextEditing"
      />

      <AppButton text="Save" />
    </form>

    <div
      v-else
      class="flex gap-2 mb-4"
    >
      <h2 class="text-2xl font-bold text-heading w-fit">{{ key }}</h2>
      <IconButton
        v-if="text"
        :icon="Pen"
        @click.stop="isEditing = true"
      />
      <IconButton
        v-if="text"
        :icon="TrashBin"
        @click.stop="confirmDeleteTextModal.open"
      />
    </div>

    <OverlayLoader v-if="isTextLoading || isTextDeliting" />

    <EmptyState
      v-else-if="!text"
      title=""
      text="Text not found"
    />

    <div v-else>
      <AppButton
        v-if="!isShowAddTranslationForm"
        class="mb-4"
        text="Add translation"
        @click="isShowAddTranslationForm = true"
      />
      <div
        v-else
        class="w-full relative bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs mb-8"
      >
        <IconButton
          :icon="Cancel"
          class="absolute top-5 right-5"
          @click="isShowAddTranslationForm = false"
        />
        <FormSkeleton v-if="isLangsLoading" />
        <TranslationForm
          v-else-if="langsOptions.length"
          v-model="translationForm"
          title="Add new translation"
          :options="langsOptions"
          :isLoading="isTranslationCreating"
          @submit="onAddNewTranslation"
        />
        <div v-else>
          No available laguages.<RouterLink
            :to="{ name: RouteNames.LANGS }"
            class="underline"
            >Add more languages</RouterLink
          >
          to create new translations for this text.
        </div>
      </div>

      <List
        v-if="text.translations.length"
        :items="text.translations"
        keyProperty="id"
      >
        <template #item="{ item }">
          <Translation
            :translation="item"
            :availableLangsOptions="langsOptions"
            @translationEdited="changeTranslation"
            @translationDeleted="removeTranslation"
          />
        </template>
      </List>
    </div>

    <ConfirmModal
      :showableComponent="confirmDeleteTextModal"
      title="Cofirm text removal"
      content="Are you sure you want to delete this text. All it's translations will be also deleted"
      @confirm="onDeleteText"
      @cancel="confirmDeleteTextModal.close"
    />
  </div>
</template>
