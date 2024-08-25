import { UseQueryResult } from 'react-query';

import { TUseApiQueryResult, useApi } from '../../../../../hooks/useApi';
import { useDevApiBase, useProdApiBase } from '../../../../../hooks/useApiBase';

export type TAffiliate = {
  pk: number;
  is_expanded: boolean;
  name: string;
};

export type TAffiliates = Array<TAffiliate>;

type TUseAffiliatesApiQueryResult = TUseApiQueryResult<TAffiliates>;

export type TUseAffiliatesApi = UseQueryResult<
  TUseAffiliatesApiQueryResult,
  Error
>;

export const useAffiliatesApi = (): TUseAffiliatesApi => {
  const isProduction: boolean = process.env.NODE_ENV === 'production';
  const devApiBase: string = useDevApiBase();
  const prodApiBase: string = useProdApiBase();

  const apiBase: string = isProduction ? prodApiBase : devApiBase;
  return useApi({
    axiosRequestConfig: {
      url: `${apiBase}/v4/calendar/affiliates/`,
      headers: {
        Authorization: 'Basic bDFuZGFzdXBlcjpsMW5kYXN1cGVy',
        Accept: 'application/json',
      },
    },
    reactQueryConfig: {
      queryKey: 'useAffiliatesApi',
      options: {
        staleTime: Infinity,
        retry: false,
      },
    },
  });
};
