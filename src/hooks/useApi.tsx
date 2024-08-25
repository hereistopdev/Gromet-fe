/** @format */

import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Todo:
//  Auth headers are not implemented yet. for now cookies.

export type TUseApiQueryResult<TData> = {
  detail: string;
  status_code: number;
  data: TData;
};

export type TUseApiProps<TResult, TError> = {
  axiosRequestConfig: AxiosRequestConfig;
  reactQueryConfig: {
    queryKey: QueryKey;
    options?: UseQueryOptions<TResult, TError>;
  };
};

export const useApi = <TResult, TError>({
  axiosRequestConfig,
  reactQueryConfig,
}: TUseApiProps<TResult, TError>): UseQueryResult<TResult, TError> => {
  const queryFn: QueryFunction<TResult, QueryKey> = async () => {
    const { data }: AxiosResponse = await axios(axiosRequestConfig);
    return data;
  };

  return useQuery(reactQueryConfig.queryKey, queryFn, reactQueryConfig.options);
};
