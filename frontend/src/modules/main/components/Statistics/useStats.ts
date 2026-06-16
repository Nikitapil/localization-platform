import { ref } from 'vue';
import type { ProfileStatisticsResponseDto } from '../../../../api/swagger/data-contracts';
import { useStatisticsApi } from '@/api/swagger/Statistics';

export const useStats = () => {
  const statistics = ref<ProfileStatisticsResponseDto | null>(null);

  const {
    getProfileStatistics: { call: getStatisticsApi, isLoading: isStatisticsLoading }
  } = useStatisticsApi();

  const getStatistics = async () => {
    const { data } = await getStatisticsApi();

    statistics.value = data;
  };

  return { statistics, isStatisticsLoading, getStatistics };
};
