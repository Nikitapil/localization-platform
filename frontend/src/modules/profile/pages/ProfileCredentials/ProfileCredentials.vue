<script setup lang="ts">
import AppInput from '../../../../components/controls/AppInput.vue';
import type { EditProfileDto, ProfileResponseDto } from '@/api/swagger/data-contracts';
import AppButton from '@/components/buttons/AppButton.vue';
import Profile from '@/components/icons/Profile.vue';
import { useForm } from 'vee-validate';
import { ref } from 'vue';

interface ProfileCredentialsProps {
  profile: ProfileResponseDto;
  editProfileErrors: Record<string, string> | null;
  isEditProfileInProgress: boolean;
}

const props = defineProps<ProfileCredentialsProps>();

const emit = defineEmits<{
  editProfile: [EditProfileDto];
}>();

const { validate } = useForm();

const form = ref({
  name: props.profile.name
});

const onEditProfile = async () => {
  const { valid } = await validate();

  if (valid) {
    emit('editProfile', form.value);
  }
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-heading mb-4">Profile creadentials</h2>
    <form
      class="flex flex-col gap-4 md:max-w-1/2"
      @submit.prevent="onEditProfile"
    >
      <AppInput
        v-model="form.name"
        placeholder="Profile name"
        id="name"
        name="name"
        rules="required"
        validationName="Prifile name"
        :external-error="editProfileErrors?.name || editProfileErrors?.profileName"
        :disabled="props.isEditProfileInProgress || !profile.canEdit"
      >
        <template #label-icon>
          <Profile class="h-4 w-4" />
        </template>
      </AppInput>

      <AppButton
        v-if="profile.canEdit"
        class="self-end"
        text="save"
      />
    </form>
  </div>
</template>
