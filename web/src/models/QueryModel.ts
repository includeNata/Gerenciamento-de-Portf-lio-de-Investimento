import { UseQueryOptions } from "@tanstack/react-query";

export interface QueryModel<TData = unknown, TError = unknown> {
  queryKey: unknown[];
  enabled?: boolean;
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey">;
}
