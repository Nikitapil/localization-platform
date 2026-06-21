import { ref } from 'vue';
import type { LangsStatisticResponseDto } from '../../../../api/swagger/data-contracts';
import { useStatisticsApi } from '@/api/swagger/Statistics';

export const useLanguagesStats = () => {
  const statistics = ref<LangsStatisticResponseDto[]>([]);

  const {
    getLangsStatistics: { call: getStatisticsApi, isLoading: isStatisticsLoading }
  } = useStatisticsApi();

  const getStatistics = async () => {
    const { data } = await getStatisticsApi();
    if (data) {
      statistics.value = data;
    }
  };

  return { statistics, isStatisticsLoading, getStatistics };
};
