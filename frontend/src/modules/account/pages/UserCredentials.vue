<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue';
import AppInput from '@/components/controls/AppInput.vue';
import { useAuthStore } from '@/shared/auth/AuthStore';
import { toClientDate } from '@/shared/utils/dateUtils';
import { computed, ref } from 'vue';

const authstore = useAuthStore();

const createdDate = computed(() => (authstore.user ? toClientDate(authstore.user?.createdAt) : null));

const form = ref({
  email: authstore.user?.email || '',
  name: authstore.user?.name,
  lastname: authstore.user?.lastname
});
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-heading">Your creadentials</h2>
    <p class="text-gray-800 text-sm mb-5">You join us at {{ createdDate }}</p>

    <form class="flex flex-col gap-4 md:max-w-1/2">
      <AppInput
        v-model="form.email"
        placeholder="Email"
        id="email"
        name="email"
        rules="required"
      />
      <AppInput
        v-model="form.name"
        placeholder="First name"
        id="name"
        name="name"
        rules="required"
      />

      <AppInput
        v-model="form.lastname"
        placeholder="Last name"
        id="last_name"
        name="last_name"
        rules="required"
      />

      <AppButton
        text="Save"
        class="self-end"
      />
    </form>
  </div>
</template>
