<script setup lang="ts">
interface Props {
  codeLines: string[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="bg-gray-800 rounded-2xl shadow-2xl p-4">
    <code class="text-green-300 text-sm overflow-auto">
      <div
        v-for="line in props.codeLines"
        :key="line"
        class="mb-2"
      >
        {{ line }}
      </div>
    </code>
  </div>
</template>
