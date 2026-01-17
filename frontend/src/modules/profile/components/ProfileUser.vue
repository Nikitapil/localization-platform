<script setup lang="ts">
import AppButton from '../../../components/buttons/AppButton.vue';
import { computed } from 'vue';
import type { ProfileUserWithId } from '../types';

interface ProfileUserProps {
  user: ProfileUserWithId;
  isLoading: boolean;
}

interface ProfileUserEmits {
  changeConfirmation: [{ id: string; confirmed: boolean }];
}

const props = defineProps<ProfileUserProps>();
const emit = defineEmits<ProfileUserEmits>();

const confirmButtonText = computed(() => (props.user.confirmed ? 'Remove Confirmation' : 'Confirm'));
const confirmButtonAppearence = computed(() => (props.user.confirmed ? 'danger' : 'primary'));

const onConfirmClick = () => emit('changeConfirmation', { id: props.user.id, confirmed: !props.user.confirmed });
</script>

<template>
  <div class="flex items-center justify-between gap-8">
    <div class="flex-1 min-w-0">
      <p class="font-medium text-heading truncate">{{ props.user.user.name }} {{ props.user.user.lastname }}</p>
      <p class="text-sm text-body truncate">{{ props.user.user.email }}</p>
    </div>
    <div
      v-if="props.user.canEditUser"
      class="inline-flex items-center space-x-1.5"
    >
      <AppButton
        :text="confirmButtonText"
        :appearence="confirmButtonAppearence"
        :loading="isLoading"
        @click="onConfirmClick"
      />
    </div>
  </div>
</template>
