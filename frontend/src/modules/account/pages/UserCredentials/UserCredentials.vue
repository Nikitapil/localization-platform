<script setup lang="ts">
import UserCircleFilled from '@/components/icons/UserCircleFilled.vue';
import UserCircle from '@/components/icons/UserCircle.vue';
import Envelope from '@/components/icons/Envelope.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import AppInput from '@/components/controls/AppInput.vue';
import { useAuthStore } from '@/shared/auth/AuthStore';
import { toClientDate } from '@/shared/utils/dateUtils';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { useUserCredentials } from './useUserCredentials';

const authStore = useAuthStore();

const createdDate = computed(() => (authStore.user ? toClientDate(authStore.user?.createdAt) : null));

const { validate } = useForm();

const { editUser, isLoading, errors } = useUserCredentials();

const form = ref({
  email: authStore.user?.email || '',
  name: authStore.user?.name || '',
  lastname: authStore.user?.lastname || ''
});

const onSubmit = async () => {
  const { valid } = await validate();

  if (valid) {
    const user = await editUser(form.value);

    if (user) {
      authStore.setUser(user.user);
    }
  }
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-heading">Your creadentials</h2>
    <p class="text-gray-800 text-sm mb-5">You join us at {{ createdDate }}</p>

    <form
      class="flex flex-col gap-4 md:max-w-1/2"
      @submit.prevent="onSubmit"
    >
      <AppInput
        v-model="form.email"
        placeholder="Email"
        id="email"
        name="email"
        rules="required"
        validationName="Email"
        :external-error="errors?.email"
        :disabled="isLoading"
      >
        <template #label-icon>
          <Envelope class="h-4 w-4" />
        </template>
      </AppInput>
      <AppInput
        v-model="form.name"
        placeholder="First name"
        id="name"
        name="name"
        rules="required"
        validationName="First name"
        :external-error="errors?.name"
        :disabled="isLoading"
      >
        <template #label-icon>
          <UserCircle class="h-4 w-4" />
        </template>
      </AppInput>

      <AppInput
        v-model="form.lastname"
        placeholder="Last name"
        id="last_name"
        name="last_name"
        rules="required"
        validationName="Last name"
        :external-error="errors?.lastname"
        :disabled="isLoading"
      >
        <template #label-icon>
          <UserCircleFilled class="h-4 w-4" />
        </template>
      </AppInput>

      <AppButton
        text="Save"
        class="self-end"
        :loading="isLoading"
      />
    </form>
  </div>
</template>
