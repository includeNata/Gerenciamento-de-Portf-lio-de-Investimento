import { UseQueryOptions } from "@tanstack/react-query";

export interface QueryModel<TData = unknown, TError = unknown> {
  queryKey: unknown[];
  enabled?: boolean;
  onSuccess: ((data: TData) => void) | undefined;
  onError: ((err: TError) => void) | undefined;
  staleTime?: number | undefined;
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey">;
}
