import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import api from '@/config/api';

export type APIResponse<T> = AxiosResponse<T>;
export type APIError = AxiosError<{ message?: string }>;

export const useAPIQuery = <TData, TError = APIError>(
  queryKey: QueryKey,
  url: string,
  params?: Record<string, unknown>,
  options?: Omit<
    UseQueryOptions<APIResponse<TData>, TError, APIResponse<TData>, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<APIResponse<TData>, TError, APIResponse<TData>, QueryKey>({
    queryKey,
    queryFn: () => api.get<TData>(url, { params }),
    ...options,
  });
};

type HTTPMethod = 'post' | 'put' | 'patch' | 'delete';
export const useAPIMutation = <TData, TVariables = unknown, TError = APIError>(
  url: string | ((variables: TVariables) => string),
  method: HTTPMethod = 'post',
  options?: UseMutationOptions<APIResponse<TData>, TError, TVariables>,
) => {
  return useMutation({
    mutationFn: (data: TVariables) => {
      const resolvedUrl = typeof url === 'function' ? url(data) : url;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...restData } = data as Record<string, unknown>;

      switch (method) {
        case 'post':
          return api.post<TData>(resolvedUrl, restData);
        case 'put':
          return api.put<TData>(resolvedUrl, restData);
        case 'patch':
          return api.patch<TData>(resolvedUrl, restData);
        case 'delete':
          return api.delete<TData>(resolvedUrl);
        default:
          throw new Error('Method not supported');
      }
    },
    ...options,
  });
};
