<script setup lang="ts">
import List from '@/components/List.vue';
import { useProfileUsersList } from './useProfileUsersList';
import { onMounted } from 'vue';
import ProfileUser from '../../components/ProfileUser.vue';
import type { UserRole } from '@/api/swagger/data-contracts';
import LoadMoreTrigger from '@/components/LoadMoreTrigger.vue';

const { usersList, usersEditLoading, hasMoreUsers, loadProfileUsers, editProfileUser } = useProfileUsersList();

const onChangeConfirmation = async ({ id, confirmed }: { id: string; confirmed: boolean }) => {
  await editProfileUser({ userId: id, isConfirmed: confirmed });
};

const onChangeUserRole = async ({ id, role }: { id: string; role: UserRole }) => {
  await editProfileUser({ userId: id, role });
};

const loadMoreUsers = async () => {
  await loadProfileUsers({ offset: usersList.value.length, limit: 10 });
};

onMounted(() => {
  loadProfileUsers({ offset: 0, limit: 10 });
});
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-heading mb-4">Profile users</h2>
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
