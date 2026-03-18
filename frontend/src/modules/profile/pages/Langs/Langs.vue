<script setup lang="ts">
import OverlayLoader from '@/components/loaders/OverlayLoader.vue';
import { useLangs } from './useLangs';
import EmptyState from '@/components/EmptyState.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import { onMounted } from 'vue';
import LangFormModal from './LangFormModal.vue';
import { useShowableComponent } from '@/composables/useShowableCompoonent';

const { isInitialLoading, isAddLangInProgress, langs, init, addNewLang } = useLangs();

const langFormModalController = useShowableComponent<{}>();

const onAddLang = async (name: string) => {
  await addNewLang(name);
  langFormModalController.close();
};

onMounted(init);
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-heading mb-4">Languages</h2>

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
  </div>
  <LangFormModal
    :showableComponent="langFormModalController"
    :isLoading="isAddLangInProgress"
    @save="onAddLang"
  />
</template>
