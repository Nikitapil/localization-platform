<script setup lang="ts">
import { onMounted } from 'vue';
import { useApiKeys } from './useApiKeys';
import AppButton from '@/components/buttons/AppButton.vue';
import OverlayLoader from '@/components/loaders/OverlayLoader.vue';
import EmptyState from '@/components/EmptyState.vue';
import List from '@/components/List.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import TrashBin from '@/components/icons/TrashBin.vue';
import { useModal } from '@/components/modals/utils';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';

const { loadKeys, createNewKey, isApiKeysLoading, isApiKeyCreating, keys, deleteKey, isApiKeyDeleting } = useApiKeys();

const confirmDeleteKeyModal = useModal<{ key: string }>();

const onDeleteKey = async (key: string) => {
  await deleteKey(key);
  confirmDeleteKeyModal.close();
};

onMounted(() => {
  loadKeys();
});
</script>

<template>
  <div>
    <div class="flex justify-between w-full mb-4">
      <h2 class="text-2xl font-bold text-heading mb-4">ApiKeys</h2>
      <AppButton
        text="Create new key"
        :loading="isApiKeyCreating"
        @click="createNewKey"
      />
    </div>

    <OverlayLoader v-if="isApiKeysLoading" />

    <EmptyState
      v-else-if="!keys.length"
      title="No keys added"
      text="Generate api keys and use it to work with our service by api"
    />

    <List
      v-else
      :items="keys"
      keyProperty="key"
    >
      <template #item="{ item }">
        <div class="flex justify-between w-full">
          <p>{{ item.key }}</p>
          <IconButton
            :icon="TrashBin"
            @click="confirmDeleteKeyModal.open({ key: item.key })"
          />
        </div>
      </template>
    </List>

    <ConfirmModal
      v-if="confirmDeleteKeyModal.payload.value"
      :showableComponent="confirmDeleteKeyModal"
      :loading="isApiKeyDeleting"
      title="Confirm to delete api key"
      content="This key will be deleted forever and you will be not able to use it any more"
      @confirm="onDeleteKey(confirmDeleteKeyModal.payload.value.key)"
      @cancel="confirmDeleteKeyModal.close"
    />
  </div>
</template>
