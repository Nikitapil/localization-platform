<script setup lang="ts">
import List from '@/components/List.vue';
import { useProfileUsersList } from './useProfileUsersList';
import { computed, onMounted, ref } from 'vue';
import ProfileUser from '../../components/ProfileUser.vue';
import type { GetProfileUsersParams, UserRole } from '@/api/swagger/data-contracts';
import LoadMoreTrigger from '@/components/LoadMoreTrigger.vue';
import ContentSwitcher from '@/components/ContentSwitcher.vue';
import AppInput from '@/components/controls/AppInput.vue';
import Search from '@/components/icons/Search.vue';
import { useDebounce } from '@/composables/useDebounce';

type PartialRequest = Partial<GetProfileUsersParams>;

const filters = [
  { name: 'All', value: 'all' },
  { name: 'Confirmed', value: 'confirmed' },
  { name: 'Waiting confirmation', value: 'waiting' }
] as const;

const search = ref('');

const filter = ref('all');

const { usersList, usersEditLoading, hasMoreUsers, loadProfileUsers, editProfileUser } = useProfileUsersList();

const requestParams = computed<PartialRequest>(() => {
  return {
    search: search.value,
    ...(filter.value === 'confirmed' && { onlyConfirmed: true }),
    ...(filter.value === 'waiting' && { waitingForConfirmed: true })
  };
});

const onChangeConfirmation = async ({ id, confirmed }: { id: string; confirmed: boolean }) => {
  await editProfileUser({ userId: id, isConfirmed: confirmed });
};

const onChangeUserRole = async ({ id, role }: { id: string; role: UserRole }) => {
  await editProfileUser({ userId: id, role });
};

const onLoadUsers = async (offset: number) => {
  await loadProfileUsers({ offset, limit: 10, ...requestParams.value });
};

const loadMoreUsers = async () => {
  await onLoadUsers(usersList.value.length);
};

const onChangeFilters = async () => {
  await onLoadUsers(0);
};

const onSearch = useDebounce(() => onLoadUsers(0));

onMounted(() => {
  onLoadUsers(0);
});
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-heading mb-4">Profile users</h2>
    <div class="flex gap-8 mb-4 flex-wrap">
      <ContentSwitcher
        v-model="filter"
        :options="filters"
        @update:modelValue="onChangeFilters"
      />
      <AppInput
        v-model="search"
        id="search"
        placeholder="Search"
        name="search"
        class="flex-1"
        @update:modelValue="onSearch"
      >
        <template #label-icon>
          <Search />
        </template>
      </AppInput>
    </div>

    <List
      v-if="usersList.length"
      :items="usersList"
      keyProperty="id"
    >
      <template #item="{ item }">
        <ProfileUser
          :user="item"
          :key="item.id"
          :isLoading="usersEditLoading[item.id] || false"
          @changeConfirmation="onChangeConfirmation"
          @changeRole="onChangeUserRole"
        />
      </template>
    </List>
    <LoadMoreTrigger
      v-if="hasMoreUsers"
      @scrolled="loadMoreUsers"
    />
  </div>
</template>
