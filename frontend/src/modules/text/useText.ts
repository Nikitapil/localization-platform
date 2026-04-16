import { ref } from 'vue';
import type {
  TextResponseDto,
  LangResponseDto,
  CreateTranslationDto,
  TextTranslationDto
} from '../../api/swagger/data-contracts';
import { useTextApi } from '@/api/swagger/Text';
import { useLangApi } from '@/api/swagger/Lang';
import { useTranslationApi } from '@/api/swagger/Translation';
import { toast } from 'vue3-toastify';

export const useText = () => {
  const text = ref<TextResponseDto | null>(null);
  const langs = ref<LangResponseDto[]>([]);

  const { getTextByKey, editText: editTextApi, deleteText } = useTextApi();
  const { isLoading: isTextLoading, call: getText } = getTextByKey;
  const { isLoading: isTextEditing, call: editText } = editTextApi;
  const { isLoading: isTextDeliting, call: deleteTextApi } = deleteText;

  const { getLangs } = useLangApi();
  const { isLoading: isLangsLoading, call: getLagsApi } = getLangs;

  const { createTranslation } = useTranslationApi();
  const { isLoading: isTranslationCreating, call: createTranslationApi } = createTranslation;

  // TODO сделать дропдаун с пагинацией по скроллу и нормальными лимитами оффсетам
  const loadLangs = async () => {
    const { data } = await getLagsApi({ limit: 100, offset: 0 });

    if (data?.langs) {
      langs.value = data.langs;
    }
  };

  const loadText = async (key: string) => {
    const { data } = await getText({ key });
    text.value = data || null;
  };

  const addTranslation = async (params: CreateTranslationDto) => {
    const { data, error } = await createTranslationApi(params);
    if (error && typeof error === 'object' && 'message' in error) {
      toast.error(error.message);
    }
    if (data) {
      text.value?.translations.push(data);
    }
  };

  const changeTranslation = (translation: TextTranslationDto) => {
    if (!text.value) {
      return;
    }

    text.value.translations = text.value.translations.map((currentTranslation) => {
      if (currentTranslation.id === translation.id) {
        return translation;
      } else {
        return currentTranslation;
      }
    });
  };

  const removeTranslation = (id: string) => {
    if (!text.value) {
      return;
    }
    text.value.translations = text.value.translations.filter((translation) => translation.id !== id);
  };

  const init = async (key: string) => {
    Promise.all([loadText(key), loadLangs()]);
  };

  return {
    text,
    langs,
    isTextLoading,
    isTextEditing,
    isLangsLoading,
    isTranslationCreating,
    isTextDeliting,
    loadText,
    editText,
    addTranslation,
    init,
    changeTranslation,
    removeTranslation,
    deleteText: deleteTextApi
  };
};
