<script setup lang="ts">
import Search from '../../../components/icons/Search.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import AppInput from '@/components/controls/AppInput.vue';
import AuthGuard from '@/shared/auth/components/AuthGuard.vue';
import { onMounted, ref } from 'vue';
import { LIMIT, useTexts } from '../useTexts';
import OverlayLoader from '@/components/loaders/OverlayLoader.vue';
import EmptyState from '@/components/EmptyState.vue';
import { useModal } from '@/components/modals/utils';
import AddTextModal from '../components/AddTextModal.vue';
import { useRouting } from '@/router/useRouting';
import List from '@/components/List.vue';
import { toClientDate } from '@/shared/utils/dateUtils';
import { RouteNames } from '@/router/routes';
import Pagination from '@/components/Pagination.vue';

const { goToText } = useRouting();

const {
  texts,
  totalTextsCount,
  isTextsLoading,
  isTextCreating,
  createTextErrors,
  loadTexts,
  createNewText,
  resetCreateTextErrors
} = useTexts();

const search = ref('');
const page = ref(1);

const addTextModalController = useModal<undefined>({ closeHandler: resetCreateTextErrors });

const onLoadTexts = async () => {
  await loadTexts({ page: page.value, searchString: search.value });
};

const onCreateNewText = async (key: string) => {
  const result = await createNewText(key);

  if (result) {
    goToText(result.key);
  }
};

onMounted(() => {
  onLoadTexts();
});
</script>

<template>
  <AuthGuard>
    <div>
      <div class="flex gap-4 w-full mb-8">
        <AppInput
          v-model="search"
          id="search"
          placeholder="Search"
          name="search"
          class="flex-1"
          :disabled="isTextsLoading"
          @update:modelValue="() => {}"
        >
          <template #label-icon>
            <Search />
          </template>
        </AppInput>

        <AppButton
          text="Add new text"
          :loading="isTextsLoading"
          @click="addTextModalController.open"
        />
      </div>

      <OverlayLoader v-if="isTextsLoading" />

      <EmptyState
        v-else-if="!texts.length"
        title="No texts yet"
        text="Create new text to start working with it's translations"
      />

      <div v-else>
        <List
          :items="texts"
          keyProperty="key"
        >
          <template #item="{ item }">
            <div class="flex items-center gap-2">
              <div class="flex-1 min-w-0">
                <RouterLink
                  :to="{ name: RouteNames.TEXT, params: { key: item.key } }"
                  class="font-medium text-heading truncate hover:underline"
                  >{{ item.key }}</RouterLink
                >
                <p class="text-sm text-body truncate">Creation date: {{ toClientDate(item.updatedAt) }}</p>
              </div>
            </div>
          </template>
        </List>
        <Pagination
          v-model="page"
          :totalCount="totalTextsCount"
          :limit="LIMIT"
          @update:model-value="onLoadTexts"
        />
      </div>
    </div>
    <AddTextModal
      :showableComponent="addTextModalController"
      :isLoading="isTextCreating"
      :errors="createTextErrors"
      @resetErrors="resetCreateTextErrors"
      @save="onCreateNewText"
    />
  </AuthGuard>
</template>
