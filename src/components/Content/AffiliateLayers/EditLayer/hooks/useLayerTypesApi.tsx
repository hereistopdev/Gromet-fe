
import { UseQueryResult } from "react-query";

import { TUseApiQueryResult, useApi } from "../../../../../hooks/useApi";
import { useDevApiBase, useProdApiBase } from "../../../../../hooks/useApiBase";

export type TLayerType = {
    pk: string;
    name :string;
}

export type TLayerTypes = Array<TLayerType>;

type TUseLayerTypesApiQueryResult = TUseApiQueryResult<TLayerTypes>;

export type TUseLayerTypesApi = UseQueryResult<TUseLayerTypesApiQueryResult, Error>;

export const useLayerTypesApi = (): TUseLayerTypesApi => {
  const isProduction :boolean = process.env.NODE_ENV === "production";
  const devApiBase: string =  useDevApiBase();
  const prodApiBase :string = useProdApiBase();

  const apiBase :string = isProduction ? prodApiBase : devApiBase;
  return useApi({
    axiosRequestConfig: {
      url: `${apiBase}/v4/calendar/layers/types`,
      headers: {
        Authorization: 'Basic bDFuZGFzdXBlcjpsMW5kYXN1cGVy',
        Accept: 'application/json'
      }
    },
    reactQueryConfig: {
      queryKey: "useLayerTypesApi",
      options: {
        staleTime: Infinity,
        retry: false,
      },
    },
  });
};