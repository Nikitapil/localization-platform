<script setup lang="ts">
import { useRouting } from '@/router/useRouting.ts';
import AppButton from '../../../components/buttons/AppButton.vue';
import CodeBlock from '@/components/CodeBlock.vue';

const { goToDocs } = useRouting();
</script>

<template>
  <section
    id="demo"
    class="py-20"
  >
    <!-- TODO проверить корректность работы для cli -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Fast integration with your code</h2>
          <p class="mt-4 text-gray-600 text-lg">Install CLI or use REST API.</p>
          <ul class="mt-6 space-y-3 mb-4">
            <li class="flex items-center gap-3">✅ Supports i18next</li>
            <li class="flex items-center gap-3">✅ Check for missing translations</li>
          </ul>
          <AppButton
            text="Read docs"
            @click="goToDocs"
          />
        </div>
        <CodeBlock
          :codeLines="['// Install CLI', '$ npm install -g localize-platform-cli', '', '// Run CLI', '$ localize']"
        />
      </div>
    </div>
  </section>
</template>
