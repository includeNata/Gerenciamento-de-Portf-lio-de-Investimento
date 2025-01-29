import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { QueryModel } from "../models/QueryModel";

export const useQueryHook = <TData = unknown, TError = unknown>({
  queryKey,
  enabled = true,
  options,
}: QueryModel<TData, TError>): UseQueryResult<TData, TError> => {
  const { onSuccess, onError, queryFn, ...restOptions } = options || {};

  return useQuery<TData, TError>({
    queryKey,
    enabled,
    queryFn,
    onSuccess,
    onError,
    ...restOptions,
  });
};
