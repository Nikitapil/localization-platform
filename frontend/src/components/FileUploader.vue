<script lang="ts" setup>
import { ref } from 'vue';
import AppButton from './buttons/AppButton.vue';
import Upload from './icons/Upload.vue';
import Spinner from './loaders/Spinner.vue';

interface Props {
  id: string;
  accept?: HTMLInputElement['accept'];
  loading?: boolean;
}

interface Emits {
  upload: [File];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const inputRef = ref<HTMLInputElement | null>(null);

const onChange = () => {
  if (inputRef.value?.files?.[0]) {
    emit('upload', inputRef.value.files[0]);
  }
};
</script>

<template>
  <div>
    <input
      ref="inputRef"
      type="file"
      :id="props.id"
      :accept="props.accept"
      hidden
      @change="onChange"
    />
    <label
      class="cursor-pointer"
      :class="{ 'pointer-events-none': loading }"
      :disabled="loading"
      :for="props.id"
    >
      <div class="pointer-events-none">
        <Spinner v-if="loading" />
        <slot
          v-else
          name="trigger"
        >
          <AppButton
            type="button"
            text="Upload file"
          >
            <template #append>
              <Upload />
            </template>
          </AppButton>
        </slot>
      </div>
    </label>
  </div>
</template>
