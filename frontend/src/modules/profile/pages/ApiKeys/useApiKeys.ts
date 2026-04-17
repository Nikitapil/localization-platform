import { ref } from 'vue';
import type { ApiKeyResponseDto } from '../../../../api/swagger/data-contracts';
import { useApiKeysApi } from '@/api/swagger/ApiKeys';

export const useApiKeys = () => {
  const keys = ref<ApiKeyResponseDto[]>([]);

  const {
    getApiKeys: { isLoading: isApiKeysLoading, call: getApiKeysApi },
    createApiKey: { isLoading: isApiKeyCreating, call: createApiKeyApi },
    deleteApiKey: { isLoading: isApiKeyDeleting, call: deleteApiKeyApi }
  } = useApiKeysApi();

  const loadKeys = async () => {
    const { data } = await getApiKeysApi();

    if (data) {
      keys.value = data;
    }
  };

  const createNewKey = async () => {
    const { data } = await createApiKeyApi();
    if (data) {
      keys.value.push(data);
    }
  };

  const deleteKey = async (key: string) => {
    await deleteApiKeyApi({ key });
    keys.value = keys.value.filter((k) => k.key !== key);
  };

  return {
    keys,
    isApiKeysLoading,
    isApiKeyCreating,
    isApiKeyDeleting,
    loadKeys,
    createNewKey,
    deleteKey
  };
};
