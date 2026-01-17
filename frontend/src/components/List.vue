<script lang="ts" setup generic="T">
interface ListProps {
  items: T[];
  keyProperty: keyof T;
}

const props = defineProps<ListProps>();
</script>

<template>
  <div class="w-full p-6 bg-neutral-primary-soft border border-default rounded-base shadow-xs">
    <div>
      <ul
        role="list"
        class="divide-y divide-default"
      >
        <li
          v-for="item in props.items"
          :key="item[props.keyProperty] as string"
          class="not-first:not-last:py-4 first:pb-4 last:pt-4"
        >
          <slot
            name="item"
            :item="item"
          ></slot>
        </li>
      </ul>
    </div>
  </div>
</template>
