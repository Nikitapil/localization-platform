import { ref } from 'vue';
import type { TextResponseDto } from '../../api/swagger/data-contracts';
import { useTextApi } from '@/api/swagger/Text';

export const useText = () => {
  const text = ref<TextResponseDto | null>(null);

  const { getTextByKey, editText: editTextApi } = useTextApi();
  const { isLoading: isTextLoading, call: getText } = getTextByKey;
  const { isLoading: isTextEditing, call: editText } = editTextApi;

  const loadText = async (key: string) => {
    const { data } = await getText({ key });
    text.value = data || null;
  };

  return {
    text,
    isTextLoading,
    isTextEditing,
    loadText,
    editText
  };
};
