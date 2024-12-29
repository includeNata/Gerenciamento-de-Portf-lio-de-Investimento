import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { QueryModel } from "../models/QueryModel";

export const useQueryHook = <TData = unknown, TError = unknown>({
  queryKey,
  enabled = true,
  options,
}: QueryModel<TData, TError>): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError>({
    queryKey,
    enabled,
    ...options,
  });
};
