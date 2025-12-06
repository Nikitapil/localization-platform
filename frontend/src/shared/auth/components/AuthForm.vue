<script setup lang="ts">
import Envelope from '../../../components/icons/Envelope.vue';
import AppInput from '../../../components/controls/AppInput.vue';
import { computed, ref } from 'vue';

const isRegister = ref(false);

const title = computed(() => (isRegister.value ? 'Register' : 'Login'));
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
</script>

<template>
  <div>
    <h4 class="text-2xl font-bold text-heading mb-4">{{ title }}</h4>

    <form class="md:max-w-1/2">
      <AppInput
        placeholder="Email"
        id="email"
      >
        <template #label-icon>
          <Envelope class="h-4 w-4" />
        </template>
      </AppInput>
    </form>
  </div>
</template>
