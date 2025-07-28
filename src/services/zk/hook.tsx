import { useQuery } from '@tanstack/react-query';

import { LogResponse } from '@/interfaces/zk';

import { LogsQueryParams } from './interface';
import { ZkService } from './service';

export const useGetAllLogs = (params?: LogsQueryParams) => {
  return useQuery<LogResponse>({
    queryKey: ['logs', params],
    queryFn: async () => ZkService.getAllLogs(params),
  });
};
