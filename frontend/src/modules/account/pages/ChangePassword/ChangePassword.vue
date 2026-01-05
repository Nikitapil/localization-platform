<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue';
import Repeat from '../../../../components/icons/Repeat.vue';
import Lock from '../../../../components/icons/Lock.vue';
import AppInput from '../../../../components/controls/AppInput.vue';
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { useChangePassword } from './useChangePassword';
import { toast } from 'vue3-toastify';

const { validate } = useForm();

const { changePassword, isLoading, errors } = useChangePassword();

const form = ref({
  oldPassword: '',
  newPassword: '',
  repeatedPassword: ''
});

const onSubmit = async () => {
  const { valid } = await validate();

  if (valid) {
    const isChanged = await changePassword(form.value);
    if (isChanged) {
      toast.success('Password changed successfully');
    }
  }
};
</script>

<template>
  <h2 class="text-2xl font-bold text-heading mb-4">Change Password</h2>

  <form
    class="flex flex-col gap-4 md:max-w-1/2"
    @submit.prevent="onSubmit"
  >
    <AppInput
      v-model="form.oldPassword"
      placeholder="Old password"
      id="oldPassword"
      name="oldPassword"
      type="password"
      rules="required"
      validationName="Old password"
      :disabled="isLoading"
      :externalError="errors?.oldPassword"
    >
      <template #label-icon>
        <Lock class="h-4 w-4" />
      </template>
    </AppInput>

    <AppInput
      v-model="form.newPassword"
      placeholder="New password"
      id="newPassword"
      name="newPassword"
      type="password"
      rules="required"
      validationName="New Password"
      :disabled="isLoading"
      :externalError="errors?.newPassword"
    >
      <template #label-icon>
        <Lock class="h-4 w-4" />
      </template>
    </AppInput>

    <AppInput
      v-model="form.repeatedPassword"
      placeholder="Repeat new password"
      id="repeatedPassword"
      type="password"
      name="repeatedPassword"
      rules="match:newPassword|required"
      validationName="Repeated password"
      :disabled="isLoading"
      :externalError="errors?.repeatedPassword"
    >
      <template #label-icon>
        <Repeat class="h-4 w-4" />
      </template>
    </AppInput>

    <AppButton
      text="Save"
      class="self-end"
      :loading="isLoading"
    />
  </form>
</template>
