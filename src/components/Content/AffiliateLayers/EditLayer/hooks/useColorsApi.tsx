/** @format */

import { UseQueryResult } from "react-query";

import { TUseApiQueryResult, useApi } from "../../../../../hooks/useApi";
import { useDevApiBase, useProdApiBase } from "../../../../../hooks/useApiBase";

export type TColor = {
    name :string;
};

export type TColors = Array<TColor>;

type TUseColorsApiQueryResult = TUseApiQueryResult<TColors>;

export type TUseColorsApi = UseQueryResult<TUseColorsApiQueryResult, Error>;

export const useColorsApi = (): TUseColorsApi => {
  const isProduction :boolean = process.env.NODE_ENV === "production";
  const devApiBase: string =  useDevApiBase();
  const prodApiBase :string = useProdApiBase();

  const apiBase :string = isProduction ? prodApiBase : devApiBase;
  return useApi({
    axiosRequestConfig: {
      url: `${apiBase}/v4/calendar/layers/`,
      headers: {
        Authorization: 'Basic bDFuZGFzdXBlcjpsMW5kYXN1cGVy',
        Accept: 'application/json'
      }
    },
    reactQueryConfig: {
      queryKey: "useColorsApi",
      options: {
        staleTime: Infinity,
        retry: false,
      },
    },
  });
};