import { computed, ref } from 'vue';
import type { EditLangDto, LangResponseDto } from '../../../../api/swagger/data-contracts';
import { useLangApi } from '@/api/swagger/Lang';
import { toast } from 'vue3-toastify';
import { useTranslationFilesApi } from '@/api/swagger/TranslationFiles';

export const useLangs = () => {
  const { getLangs, addLang, deleteLang, editLang } = useLangApi();
  const { downloadLangTranslations, uploadTranslationsByJson } = useTranslationFilesApi();

  const langs = ref<LangResponseDto[]>([]);
  const totalLangsCount = ref<number>(0);
  const isInitialLoading = ref(true);
  const isLoadMoreLoading = ref(false);
  const saveLangErrors = ref<Record<string, string>>({});

  const { isLoading: isAddLangInProgress, call: addLangApi } = addLang;
  const { isLoading: isDeleteLangInProgress, call: deleteLangApi } = deleteLang;
  const { isLoading: isEditLangInProgress, call: editLangApi } = editLang;
  const { isLoading: isFileUploading, call: uploadJson } = uploadTranslationsByJson;

  const hasMoreLangs = computed(() => langs.value.length < totalLangsCount.value);

  const loadLangs = async (offset: number, limit = 10) => {
    const { data } = await getLangs.call({ limit, offset });
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

    if (error && typeof error === 'object') {
      if ('message' in error) {
        toast.error(error.message);
      } else {
        saveLangErrors.value = error as {};
      }
    }
    if (data) {
      langs.value.unshift(data);
    }
  };

  const editLangById = async (dto: EditLangDto) => {
    const { data, error } = await editLangApi(dto);

    if (error && typeof error === 'object') {
      if ('message' in error) {
        toast.error(error.message);
      } else {
        saveLangErrors.value = error as {};
      }
    }
    if (data) {
      const langIndex = langs.value.findIndex((l) => l.id === data.id);
      langs.value[langIndex] = data;
    }
  };

  const deleteLangById = async (id: string) => {
    await deleteLangApi({ id });
    await loadLangs(0, langs.value.length);
  };

  const dowloadJsonTranslations = async (lang: LangResponseDto) => {
    const { data } = await downloadLangTranslations.call({ langId: lang.id }, { format: 'blob' });
    console.log(data);
    if (!data) {
      return;
    }
    const url = window.URL.createObjectURL(data as File);
    const link = document.createElement('a');
    const filename = `${lang.name}_translations`;
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const init = async () => {
    isInitialLoading.value = true;
    await loadLangs(0);
    isInitialLoading.value = false;
  };

  const resetSaveErrors = () => (saveLangErrors.value = {});
  return {
    langs,
    totalLangsCount,
    hasMoreLangs,
    isInitialLoading,
    isLoadMoreLoading,
    isAddLangInProgress,
    isDeleteLangInProgress,
    isEditLangInProgress,
    isFileUploading,
    saveLangErrors,
    init,
    loadMoreLangs,
    addNewLang,
    deleteLangById,
    editLangById,
    resetSaveErrors,
    dowloadJsonTranslations,
    uploadJson
  };
};
