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

const { isInitialLoading, isAddLangInProgress, langs, init, addNewLang, deleteLangById } = useLangs();

const langFormModalController = useModal();
const deleteLangModal = useModal<{ id: string }>();

const onAddLang = async (name: string) => {
  await addNewLang(name);
  langFormModalController.close();
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

    <List
      v-else
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
            <IconButton :icon="Pen" />
            <IconButton
              :icon="TrashBin"
              class="text-red-500"
              @click="onClickDeleteLang(item)"
            />
          </div>
        </div>
      </template>
    </List>
    <LangFormModal
      :showableComponent="langFormModalController"
      :isLoading="isAddLangInProgress"
      @save="onAddLang"
    />
    <ConfirmModal
      :showableComponent="deleteLangModal"
      @cancel="deleteLangModal.close"
      @confirm="onDeleteLang"
    />
  </div>
</template>
