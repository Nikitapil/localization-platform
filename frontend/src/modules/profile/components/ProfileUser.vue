<script setup lang="ts">
import { computed, ref } from 'vue';
import AppButton from '../../../components/buttons/AppButton.vue';
import type { ProfileUserWithId } from '../types';
import AppSelect from '@/components/controls/AppSelect.vue';
import { UserRole } from '@/api/swagger/data-contracts';

const rolesOptions = [
  { name: 'Standart', value: UserRole.STANDART },
  { name: 'Main', value: UserRole.MAIN }
];

interface ProfileUserProps {
  user: ProfileUserWithId;
  isLoading: boolean;
}

interface ProfileUserEmits {
  changeConfirmation: [{ id: string; confirmed: boolean }];
  changeRole: [{ id: string; role: UserRole }];
}

const props = defineProps<ProfileUserProps>();
const emit = defineEmits<ProfileUserEmits>();

const role = ref(props.user.user.role);

const confirmButtonText = computed(() => (props.user.confirmed ? 'Remove Confirmation' : 'Confirm'));
const confirmButtonAppearence = computed(() => (props.user.confirmed ? 'danger' : 'primary'));

const onConfirmClick = () => emit('changeConfirmation', { id: props.user.id, confirmed: !props.user.confirmed });
const onChangeUserRole = () => emit('changeRole', { id: props.user.id, role: role.value });
</script>

<template>
  <div class="flex items-center justify-between gap-8">
    <div class="flex-1 min-w-0">
      <p class="font-medium text-heading truncate">{{ props.user.user.name }} {{ props.user.user.lastname }}</p>
      <p class="text-sm text-body truncate">{{ props.user.user.email }}</p>
    </div>
    <div
      v-if="props.user.canEditUser"
      class="inline-flex items-center gap-4"
    >
      <AppButton
        :text="confirmButtonText"
        :appearence="confirmButtonAppearence"
        :loading="isLoading"
        @click="onConfirmClick"
      />

      <AppSelect
        v-model="role"
        :id="props.user.id"
        :options="rolesOptions"
        :disabled="isLoading"
        label="User's role"
        @change="onChangeUserRole"
      />
    </div>
  </div>
</template>
