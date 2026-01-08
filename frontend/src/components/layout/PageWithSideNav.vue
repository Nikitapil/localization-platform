<script lang="ts" setup>
import SideNav from './SideNav/SideNav.vue';

interface Props {
  title?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <SideNav :title="props.title">
    <template #body>
      <slot name="sidebar-body"></slot>
    </template>
  </SideNav>
  <div class="ml-16 sm:ml-64">
    <slot name="page-body">
      <RouterView />
    </slot>
  </div>
</template>
