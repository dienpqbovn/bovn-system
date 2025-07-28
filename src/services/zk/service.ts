import api from '@/config/api';
import { LogResponse } from '@/interfaces/zk';

import { ZK_ENDPOINTS } from './enpoint';
import { LogsQueryParams } from './interface';

export const ZkService = {
  getAllLogs: async (params?: LogsQueryParams): Promise<LogResponse> => {
    const response = await api.get(ZK_ENDPOINTS.GET_ALL_LOGS, { params });
    return response.data;
  },
};
