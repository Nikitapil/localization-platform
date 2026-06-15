<script setup lang="ts">
import FeatureCard from './FeatureCard.vue';
</script>

<template>
  <section
    id="features"
    class="py-20 bg-gray-50"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">All for effective localization</h2>
        <p class="mt-4 text-xl text-gray-600">Automatization, control and collaboration</p>
      </div>
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon="🌍"
          title="Different workflows"
          description="Web view, api, cli"
        />
        <FeatureCard
          icon="👥"
          title="Collaborative work"
          description="As many users through one profile as you need"
        />
        <FeatureCard
          icon="⚡"
          title="Import/Export existing texts"
          description="Upload your texts by JSON file or create a backup from your account"
        />
      </div>
    </div>
  </section>
</template>
