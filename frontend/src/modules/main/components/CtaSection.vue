<script setup lang="ts">
import { useRouting } from '@/router/useRouting.ts';
import AppButton from '../../../components/buttons/AppButton.vue';

const { goToAuth } = useRouting();
</script>

<template>
  <section class="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
    <div class="max-w-4xl mx-auto text-center px-4">
      <h2 class="text-3xl md:text-5xl font-bold text-white">Ready to start?</h2>
      <p class="mt-4 text-xl text-indigo-100">Join us</p>
      <AppButton
        class="bg-white mt-6 mx-auto"
        appearence="transparent"
        text="Create an account"
        @click="goToAuth"
      />
    </div>
  </section>
</template>
