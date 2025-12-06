<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
</script>

<template>
  <div>
    <AppHeader />

    <main>
      <div class="container mx-auto my-5">
        <RouterView />
      </div>
    </main>
  </div>
</template>
