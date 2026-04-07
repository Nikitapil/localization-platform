import { ref } from 'vue';
import type { TextResponseDto, LangResponseDto } from '../../api/swagger/data-contracts';
import { useTextApi } from '@/api/swagger/Text';
import { useLangApi } from '@/api/swagger/Lang';

export const useText = () => {
  const text = ref<TextResponseDto | null>(null);
  const langs = ref<LangResponseDto[]>([]);

  const { getTextByKey, editText: editTextApi } = useTextApi();
  const { isLoading: isTextLoading, call: getText } = getTextByKey;
  const { isLoading: isTextEditing, call: editText } = editTextApi;

  const { getLangs } = useLangApi();
  const { isLoading: isLangsLoading, call: getLagsApi } = getLangs;

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

  const init = async (key: string) => {
    Promise.all([loadText(key), loadLangs()]);
  };

  return {
    text,
    langs,
    isTextLoading,
    isTextEditing,
    loadText,
    editText,
    init
  };
};
