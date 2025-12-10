<script lang="ts" setup>
import IconButton from '../buttons/IconButton.vue';
import Cancel from '../icons/Cancel.vue';
import { computed } from 'vue';
import type { DefaultModalProps } from './types';

interface Props extends DefaultModalProps {}

const props = defineProps<Props>();

const title = computed(() => props.showableComponent.payload.value?.title || props.title);
const content = computed(() => props.showableComponent.payload.value?.content || props.content);
</script>

<template>
  <Teleport
    v-if="showableComponent.isShowed.value"
    to="body"
  >
    <div
      tabindex="-1"
      class="flex bg-black/80 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      @click="showableComponent.close"
    >
      <div
        class="relative p-4 w-full max-w-2xl max-h-full"
        @click.stop
      >
        <!-- Modal content -->
        <div class="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between border-b border-default pb-4 md:pb-5">
            <h3
              v-if="title"
              class="text-lg font-medium text-heading"
            >
              {{ title }}
            </h3>

            <IconButton
              :icon="Cancel"
              @click="showableComponent.close"
            />
          </div>
          <!-- Modal body -->
          <div
            v-if="$slots.content || content"
            class="space-y-4 md:space-y-6 py-4 md:py-6"
          >
            <slot name="content">{{ content }}</slot>
          </div>
          <!-- Modal footer -->
          <div
            v-if="$slots.footer"
            class="border-t border-default space-x-4 pt-4 md:pt-5"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
