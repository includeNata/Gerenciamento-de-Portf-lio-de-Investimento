import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { MutationModel } from "../models/MutationModel";

export const useMutationHook = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>({
  mutationFn,
  onSuccess,
  options,
}: MutationModel<TData, TError, TVariables, TContext>): UseMutationResult<TData, TError, TVariables, TContext> => {
  return useMutation({
    mutationFn,
    onSuccess,
    ...options,
  });
};
