import { useQuery } from '@tanstack/react-query';

import { LogResponse } from '@/interfaces/zk';

import { ZkService } from './service';

export const useGetAllLogs = () => {
  return useQuery<LogResponse>({
    queryKey: ['logs'],
    queryFn: ZkService.getAllLogs,
  });
};
