<script setup lang="ts">
interface FieldErrorProps {
  error: string;
}

const props = defineProps<FieldErrorProps>();
</script>

<template>
  <p class="mt-1 text-xs text-fg-danger-strong">
    {{ props.error }}
  </p>
</template>
