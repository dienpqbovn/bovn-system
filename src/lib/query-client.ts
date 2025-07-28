import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (failureCount >= 3) return false;

        if (axios.isAxiosError(error) && error.response) {
          const { data } = error.response as AxiosResponse<{
            message: string;
            code?: 'NETWORK_ERROR' | '401';
          }>;

          if (data.code === 'NETWORK_ERROR' || data.code === '401')
            return false;
        }

        return true;
      },
    },
    mutations: {
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const { data } = error.response as AxiosResponse<{
            message: string;
          }>;

          if (data) {
            toast.error(data.message);
          }
        } else {
          toast.error('Something went wrong');
        }
      },
    },
  },
});
