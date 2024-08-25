/** @format */

import { MutationFunction, MutationKey, useMutation, UseMutationOptions, UseMutationResult } from "react-query";

import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

// Todo:
//  Auth headers are not implemented yet.
//  Planner uses cookies for this purpose, which are always sent on each request

type TMutationMethod = Exclude<Method, "get" | "GET">;

type TMutationAxiosRequestConfig = Omit<AxiosRequestConfig, "data" | "method"> & {
  method: TMutationMethod;
};

export type TUseMutationApiProps<TResult, TError, TVariables, TContext> = {
  axiosRequestConfig: TMutationAxiosRequestConfig;
  reactQueryConfig: {
    mutationKey: MutationKey;
    options?: UseMutationOptions<TResult, TError, TVariables, TContext>;
  };
};

export const useMutationApi = <TResult, TError, TVariables, TContext>({
  axiosRequestConfig,
  reactQueryConfig,
}: TUseMutationApiProps<TResult, TError, TVariables, TContext>): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> => {
  const mutationFn: MutationFunction<TResult, TVariables> = async (variables: TVariables) => {
    const { data }: AxiosResponse = await axios({ ...axiosRequestConfig, data: variables });
    return data;
  };

  return useMutation(reactQueryConfig.mutationKey, mutationFn, reactQueryConfig.options);
};
