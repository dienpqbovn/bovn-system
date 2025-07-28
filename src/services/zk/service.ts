import api from '@/config/api';
import { LogResponse } from '@/interfaces/zk';

import { ZK_ENDPOINTS } from './enpoint';

export const ZkService = {
  getAllLogs: async (): Promise<LogResponse> => {
    const response = await api.get(ZK_ENDPOINTS.GET_ALL_LOGS);
    return response.data;
  },
};
