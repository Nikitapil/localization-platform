<script setup lang="ts">
import AppInput from '../../../components/controls/AppInput.vue';
import OverlayLoader from '../../../components/loaders/OverlayLoader.vue';
import EmptyState from '../../../components/EmptyState.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useText } from '../useText';
import IconButton from '@/components/buttons/IconButton.vue';
import Pen from '@/components/icons/Pen.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import { useForm } from 'vee-validate';
import { toast } from 'vue3-toastify';
import { useRouting } from '@/router/useRouting';

const route = useRoute();
const { goToText } = useRouting();

const { validate } = useForm();

const { text, isTextLoading, isTextEditing, loadText, editText } = useText();

const isEditing = ref(false);

const key = computed(() => (route.params.key as string) || '');

const textKey = ref(key.value);

const closeEditFormWithoutSave = () => {
  if (isEditing.value) {
    textKey.value = key.value;
    isEditing.value = false;
  }
};

const onEditText = async () => {
  if (textKey.value === key.value) {
    isEditing.value = false;
    return;
  }
  const { valid } = await validate();
  if (valid) {
    const { data, error } = await editText({ key: key.value, newKey: textKey.value });

    if (error && typeof error === 'object' && 'existingKey' in error) {
      toast.error(error.existingKey);
    } else if (data) {
      goToText(data.key);
      isEditing.value = false;
    }
  }
};

onMounted(() => {
  loadText(key.value);
});
</script>

<template>
  <div>
    <form
      v-if="isEditing"
      class="flex gap-2"
      v-click-outside="() => closeEditFormWithoutSave()"
      @submit.prevent="onEditText"
    >
      <AppInput
        v-model="textKey"
        id="textKey"
        placeholder="Text key"
        name="textKey"
        class="flex-1"
        rules="required"
        validationName="Text key"
        :disabled="isTextEditing"
      />

      <AppButton text="Save" />
    </form>

    <div
      v-else
      class="flex gap-2"
    >
      <h2 class="text-2xl font-bold text-heading mb-4 w-fit">{{ key }}</h2>
      <IconButton
        v-if="text"
        :icon="Pen"
        @click.stop="isEditing = true"
      />
    </div>

    <OverlayLoader v-if="isTextLoading" />

    <EmptyState
      v-else-if="!text"
      title=""
      text="Text not found"
    />
  </div>
</template>
