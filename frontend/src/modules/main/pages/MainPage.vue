<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue';
import FeaturesSection from '../components/FeaturesSection.vue';
import CtaSection from '../components/CtaSection.vue';
import DemoSection from '../components/DemoSection.vue';
import { useAuthStore } from '@/shared/auth/AuthStore.ts';
import LanguageProgress from '../components/LanguageProgress.vue';
import StatsGrid from '../components/StatsGrid.vue';
import WelcomeBanner from '../components/WelcomeBanner.vue';

const store = useAuthStore();
</script>

<template>
  <div>
    <template v-if="store.user">
      <div class="container mx-auto px-1 py-4">
        <WelcomeBanner :name="store.user.name" />
        <!-- TODO продолжить тут -->
        <StatsGrid />
        <LanguageProgress />
      </div>
    </template>

    <template v-else>
      <HeroSection />

      <FeaturesSection />

      <DemoSection />

      <CtaSection />
    </template>
  </div>
</template>
