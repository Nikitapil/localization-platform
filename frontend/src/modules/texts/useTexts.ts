import { useTextApi } from '@/api/swagger/Text';
import { ref } from 'vue';
import type { TextResponseDto } from '../../api/swagger/data-contracts';
import { toast } from 'vue3-toastify';

export const LIMIT = 10;
interface LoadTextsParams {
  page: number;
  searchByKey: string;
  searchByTranslation: string;
}
export const useTexts = () => {
  const texts = ref<TextResponseDto[]>([]);
  const totalTextsCount = ref(0);
  const createTextErrors = ref<Record<string, string>>({});

  const { getTexts, createText } = useTextApi();

  const { call: getTextsApi, isLoading: isTextsLoading } = getTexts;
  const { call: createTextApi, isLoading: isTextCreating } = createText;

  const loadTexts = async ({ page, searchByKey, searchByTranslation }: LoadTextsParams) => {
    const { data } = await getTextsApi({
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
      searchStringBykey: searchByKey,
      searchStringByTranslation: searchByTranslation
    });

    texts.value = data?.texts || [];
    totalTextsCount.value = data?.totalCount || 0;
  };

  const createNewText = async (key: string) => {
    const { data, error } = await createTextApi({ key });

    if (error && typeof error === 'object') {
      if ('message' in error) {
        toast.error(error.message);
      } else {
        createTextErrors.value = error as {};
      }
    }

    if (data) {
      return data;
    }
  };

  const resetCreateTextErrors = () => {
    createTextErrors.value = {};
  };

  return {
    texts,
    totalTextsCount,
    isTextsLoading,
    isTextCreating,
    createTextErrors,
    loadTexts,
    createNewText,
    resetCreateTextErrors
  };
};
