'use client';

import { useQuery, type UseQueryResult, type QueryKey } from '@tanstack/react-query';

type AppQueryArgs<TData> = {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enabled?: boolean;
};

export function useAppQuery<TData>({
  queryKey,
  queryFn,
  enabled = true,
}: AppQueryArgs<TData>): UseQueryResult<TData> {
  return useQuery<TData>({
    queryKey,
    queryFn,
    enabled,
    staleTime: 0,
    refetchInterval: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}