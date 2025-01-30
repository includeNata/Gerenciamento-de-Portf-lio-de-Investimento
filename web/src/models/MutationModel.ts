import { MutationFunction, UseMutationOptions } from "@tanstack/react-query";

export interface MutationModel<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> {
  mutationFn: MutationFunction<TData, TVariables>;
  onSuccess?: (data: TData, variables: TVariables, context: TContext) => void | Promise<void>;
  options?: UseMutationOptions<TData, TError, TVariables, TContext>;
}
