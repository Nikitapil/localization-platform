<script setup lang="ts">
import AppButton from '../../../components/buttons/AppButton.vue';
import Repeat from '../../../components/icons/Repeat.vue';
import Lock from '../../../components/icons/Lock.vue';
import UserCircleFilled from '../../../components/icons/UserCircleFilled.vue';
import UserCircle from '../../../components/icons/UserCircle.vue';
import Profile from '../../../components/icons/Profile.vue';
import Envelope from '../../../components/icons/Envelope.vue';
import AppInput from '../../../components/controls/AppInput.vue';
import { computed, ref } from 'vue';
import { useForm } from 'vee-validate';

const { validate, setErrors, errors } = useForm();

const isRegister = ref(false);
const form = ref({
  email: '',
  password: '',
  repeatedPassword: '',
  name: '',
  lastname: '',
  createProfileFields: {
    name: ''
  }
});

const title = computed(() => (isRegister.value ? 'Register' : 'Login'));
const switchQuestion = computed(() => (isRegister.value ? 'Already have an account?' : "Don't have an account?"));
const switchButtonText = computed(() => (isRegister.value ? 'Login' : 'Register'));

const switchForm = () => {
  isRegister.value = !isRegister.value;
  setErrors(Object.fromEntries(Object.entries(errors.value).map((entr) => [entr[0], ''])));
};
</script>

<template>
  <div class="flex flex-col items-center">
    <h4 class="text-2xl font-bold text-heading">{{ title }}</h4>

    <div class="mb-3">
      {{ switchQuestion }}
      <button
        class="font-medium text-fg-brand hover:underline cursor-pointer"
        @click="switchForm"
      >
        {{ switchButtonText }}
      </button>
    </div>

    <form class="md:max-w-1/2 flex flex-col gap-4 w-full">
      <AppInput
        v-model="form.email"
        placeholder="Email"
        id="email"
        inputmode="email"
        name="email"
        rules="required"
        validationName="Email"
      >
        <template #label-icon>
          <Envelope class="h-4 w-4" />
        </template>
      </AppInput>

      <template v-if="isRegister">
        <AppInput
          v-model="form.createProfileFields.name"
          placeholder="Profile name"
          id="profile"
          name="profile"
          validationName="Profile name"
          rules="required"
        >
          <template #label-icon>
            <Profile class="h-4 w-4" />
          </template>
        </AppInput>

        <div class="flex gap-2 max-sm:flex-col">
          <AppInput
            v-model="form.name"
            placeholder="First name"
            id="name"
            name="name"
            class="flex-1"
            validationName="First name"
            rules="required"
          >
            <template #label-icon>
              <UserCircle class="h-4 w-4" />
            </template>
          </AppInput>

          <AppInput
            v-model="form.lastname"
            placeholder="Last name"
            id="lastname"
            name="lastname"
            class="flex-1"
            validationName="Last name"
            rules="required"
          >
            <template #label-icon>
              <UserCircleFilled class="h-4 w-4" />
            </template>
          </AppInput>
        </div>
      </template>

      <div class="flex gap-2 max-sm:flex-col">
        <AppInput
          v-model="form.password"
          placeholder="Password"
          id="password"
          name="password"
          class="flex-1"
          type="password"
          rules="required"
          validationName="Password"
        >
          <template #label-icon>
            <Lock class="h-4 w-4" />
          </template>
        </AppInput>

        <AppInput
          v-if="isRegister"
          v-model="form.repeatedPassword"
          placeholder="Repeat password"
          id="repeat-password"
          class="flex-1"
          type="password"
          name="repeat-password"
          rules="match:password|required"
          validationName="Repeated password"
        >
          <template #label-icon>
            <Repeat class="h-4 w-4" />
          </template>
        </AppInput>
      </div>

      <AppButton :text="title" />
    </form>
  </div>
</template>
