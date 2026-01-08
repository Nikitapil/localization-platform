import { ref } from 'vue';
import type { EditProfileDto, ProfileResponseDto } from '../../api/swagger/data-contracts';
import { useProfileApi } from '@/api/swagger/Profile';
import { toast } from 'vue3-toastify';

export const useMyProfile = () => {
  const profile = ref<ProfileResponseDto | null>(null);
  const editProfileErrors = ref<Record<string, string> | null>(null);

  const {
    getMyProfile: { call: getMyProfileApi, isLoading: isProfileLoading },
    editProfile: { call: editProfileApi, isLoading: isEditProfileInProgress }
  } = useProfileApi();

  const getMyProfile = async () => {
    const { data } = await getMyProfileApi();

    profile.value = data;
  };

  const editProfile = async (profileData: EditProfileDto) => {
    editProfileErrors.value = null;
    const { data, error } = await editProfileApi(profileData);

    if (error && typeof error === 'object') {
      if ('message' in error) {
        toast.error(error.message);
      } else {
        editProfileErrors.value = error as Record<string, string>;
      }
    } else {
      profile.value = data;
    }
  };

  return { profile, isProfileLoading, isEditProfileInProgress, editProfileErrors, getMyProfile, editProfile };
};
