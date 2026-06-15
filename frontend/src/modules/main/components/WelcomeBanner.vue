<script lang="ts" setup>
import { useRouting } from '@/router/useRouting.ts';
import AppButton from '../../../components/buttons/AppButton.vue';
interface Props {
  name: string;
}

const props = defineProps<Props>();

const { goToTexts, goToDocs } = useRouting();
</script>

<template>
  <div class="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 shadow-xl mb-10">
    <div>
      <h1 class="text-3xl md:text-4xl font-bold text-white">👋 Welcome, {{ props.name }}!</h1>
      <p class="mt-2 text-indigo-100 text-lg max-w-2xl">Manage your translations in one place</p>
      <div class="mt-6 flex gap-4">
        <AppButton
          appearence="transparent"
          text="Create text"
          class="text-white hover:text-black border-white"
          @click="goToTexts"
        />
        <AppButton
          appearence="transparent"
          text="Documentation"
          class="bg-white hover:text-black border-white"
          @click="goToDocs"
        />
      </div>
    </div>
  </div>
</template>
