import { computed, ref } from 'vue';
import type {
  EditProfileUserDto,
  GetProfileUsersParams,
  ProfileUserResponseDto
} from '../../../../api/swagger/data-contracts';
import { useUserApi } from '@/api/swagger/User';
import type { ProfileUserWithId } from '../../types';

export const useProfileUsersList = () => {
  const users = ref<ProfileUserResponseDto[]>([]);
  const totalUsers = ref<number>(0);
  const usersEditLoading = ref<Record<string, boolean>>({});

  const hasMoreUsers = computed(() => users.value.length && totalUsers.value > users.value.length);
  const usersList = computed<ProfileUserWithId[]>(() => users.value.map((user) => ({ ...user, id: user.user.id })));

  const {
    getProfileUsers: { call: getProfileUsersApi, isLoading: isUsersLoading },
    editProfileUser: { call: editProfileUserApi }
  } = useUserApi();

  const loadProfileUsers = async (dto: GetProfileUsersParams) => {
    const { data } = await getProfileUsersApi(dto);

    if (dto.offset) {
      users.value.push(...(data?.users || []));
    } else {
      users.value = data?.users ?? [];
    }

    totalUsers.value = data?.totalCount ?? 0;
  };

  const editProfileUser = async (dto: EditProfileUserDto) => {
    usersEditLoading.value[dto.userId] = true;
    const { data } = await editProfileUserApi(dto);

    if (data) {
      const index = users.value.findIndex((user) => user.user.id === data.user.id);

      if (index > -1) {
        users.value[index] = data;
      }
    }

    usersEditLoading.value[dto.userId] = false;
  };

  return { usersList, hasMoreUsers, isUsersLoading, usersEditLoading, loadProfileUsers, editProfileUser };
};
