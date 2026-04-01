<script setup lang="ts">
import OverlayLoader from '@/components/loaders/OverlayLoader.vue';
import { useLangs } from './useLangs';
import EmptyState from '@/components/EmptyState.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import { onMounted } from 'vue';
import LangFormModal from './LangFormModal.vue';
import List from '@/components/List.vue';
import { toClientDate } from '@/shared/utils/dateUtils';
import IconButton from '@/components/buttons/IconButton.vue';
import Pen from '@/components/icons/Pen.vue';
import TrashBin from '@/components/icons/TrashBin.vue';
import { useModal } from '@/components/modals/utils';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import type { LangResponseDto } from '@/api/swagger/data-contracts';
import LoadMoreTrigger from '@/components/LoadMoreTrigger.vue';

const {
  isInitialLoading,
  isAddLangInProgress,
  isEditLangInProgress,
  langs,
  saveLangErrors,
  hasMoreLangs,
  init,
  addNewLang,
  editLangById,
  deleteLangById,
  resetSaveErrors,
  loadMoreLangs
} = useLangs();

const langFormModalController = useModal<{ lang?: LangResponseDto }>({ closeHandler: resetSaveErrors });
const deleteLangModal = useModal<{ id: string }>();

const onSaveLang = async (name: string) => {
  if (langFormModalController.payload.value?.lang) {
    await editLangById({ id: langFormModalController.payload.value?.lang.id, name });
  } else {
    await addNewLang(name);
  }

  if (!Object.keys(saveLangErrors.value).length) {
    langFormModalController.close();
  }
};

const onClickEditLang = (lang: LangResponseDto) => {
  langFormModalController.open({ lang });
};

const onClickDeleteLang = (lang: LangResponseDto) => {
  deleteLangModal.open({ title: `Do you want to delete ${lang.name} language`, id: lang.id });
};

const onDeleteLang = () => {
  if (deleteLangModal.payload.value?.id) {
    deleteLangById(deleteLangModal.payload.value?.id);
    deleteLangModal.close();
  }
};

onMounted(init);
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-heading">Languages</h2>
      <AppButton
        v-if="langs.length"
        text="Add new Lang"
        @click="langFormModalController.open"
      />
    </div>

    <OverlayLoader v-if="isInitialLoading" />

    <EmptyState
      v-else-if="!langs.length"
      title="No Languages added"
      text="Please add languages to start working with translations"
    >
      <template #actions>
        <AppButton
          text="Add new Lang"
          @click="langFormModalController.open"
        />
      </template>
    </EmptyState>

    <div v-else>
      <List
        :items="langs"
        keyProperty="id"
      >
        <template #item="{ item }">
          <div class="flex items-center gap-2">
            <div class="flex-1 min-w-0">
              <p class="font-medium text-heading truncate">{{ item.name }}</p>
              <p class="text-sm text-body truncate">Creation date: {{ toClientDate(item.createdAt) }}</p>
            </div>
            <div class="inline-flex items-center space-x-1.5">
              <IconButton
                :icon="Pen"
                @click="onClickEditLang(item)"
              />
              <IconButton
                :icon="TrashBin"
                class="text-red-500"
                @click="onClickDeleteLang(item)"
              />
            </div>
          </div>
        </template>
      </List>
      <LoadMoreTrigger
        v-if="hasMoreLangs"
        @scrolled="loadMoreLangs"
      />
    </div>

    <LangFormModal
      v-if="langFormModalController.isShowed.value"
      :showableComponent="langFormModalController"
      :isLoading="isAddLangInProgress || isEditLangInProgress"
      :errors="saveLangErrors"
      @save="onSaveLang"
      @resetErrors="resetSaveErrors"
    />
    <ConfirmModal
      :showableComponent="deleteLangModal"
      @cancel="deleteLangModal.close"
      @confirm="onDeleteLang"
    />
  </div>
</template>
