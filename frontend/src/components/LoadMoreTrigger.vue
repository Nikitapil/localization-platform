<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const observerTarget = ref(null);
const observer = ref<IntersectionObserver | null>(null);

const emit = defineEmits<{
  scrolled: [];
}>();

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    const [entry] = entries;
    if (entry?.isIntersecting) {
      emit('scrolled');
    }
  });

  if (observerTarget.value) {
    observer.value.observe(observerTarget.value);
  }
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<template>
  <div ref="observerTarget"></div>
</template>
