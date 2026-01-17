<script setup lang="ts">
import List from '@/components/List.vue';
import { useProfileUsersList } from './useProfileUsersList';
import { onMounted } from 'vue';
import ProfileUser from '../../components/ProfileUser.vue';

const { usersList, usersEditLoading, loadProfileUsers, editProfileUser } = useProfileUsersList();

const onChangeConfirmation = async ({ id, confirmed }: { id: string; confirmed: boolean }) => {
  await editProfileUser({ userId: id, isConfirmed: confirmed });
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
        />
      </template>
    </List>
  </div>
</template>
