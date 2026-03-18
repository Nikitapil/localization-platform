import { computed, ref } from 'vue';
import type { LangResponseDto } from '../../../../api/swagger/data-contracts';
import { useLangApi } from '@/api/swagger/Lang';
import { toast } from 'vue3-toastify';

export const useLangs = () => {
  const { getLangs, addLang } = useLangApi();

  const langs = ref<LangResponseDto[]>([]);
  const totalLangsCount = ref<number>(0);
  const isInitialLoading = ref(true);
  const isLoadMoreLoading = ref(false);

  const { isLoading: isAddLangInProgress, call: addLangApi } = addLang;

  const hasMoreLangs = computed(() => langs.value.length < totalLangsCount.value);

  const loadLangs = async (offset: number) => {
    const { data } = await getLangs.call({ limit: 10, offset });
    if (!data) {
      return;
    }
    if (offset) {
      langs.value.push(...data?.langs);
    } else {
      langs.value = data.langs;
    }

    totalLangsCount.value = data.totalCount;
  };

  const loadMoreLangs = async () => {
    isLoadMoreLoading.value = true;
    await loadLangs(langs.value.length);
    isLoadMoreLoading.value = false;
  };

  const addNewLang = async (name: string) => {
    const { data, error } = await addLangApi({ name });

    if (error && typeof error === 'object' && 'message' in error) {
      toast.error(error.message);
    }
    if (data) {
      langs.value.unshift(data);
    }
  };

  const init = async () => {
    isInitialLoading.value = true;
    await loadLangs(0);
    isInitialLoading.value = false;
  };
  return {
    langs,
    totalLangsCount,
    hasMoreLangs,
    isInitialLoading,
    isLoadMoreLoading,
    isAddLangInProgress,
    init,
    loadMoreLangs,
    addNewLang
  };
};
