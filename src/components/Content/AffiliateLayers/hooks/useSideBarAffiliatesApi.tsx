/** @format */

import { UseQueryResult } from "react-query";

import { TUseApiQueryResult, useApi } from "../../../../hooks/useApi";
import { useDevApiBase, useProdApiBase } from "../../../../hooks/useApiBase";

export type TSideBarAffiliate = {
  admin_end_offset: number;
  name: string;
  is_selected: boolean;
  is_working_schedule: boolean;
  color: string;
  show_save_order: boolean;
  initial_event_start_offset: number;
  is_in_schedule: boolean;
  can_be_published: boolean;
  affiliate: {
    pk: number;
    name: string;
  };
  admin_start_time: string;
  pk: number;
  order: number;
};

export type TSideBarAffiliates = Array<TSideBarAffiliate>;

type TUseSideBarAffiliatesApiQueryResult = TUseApiQueryResult<TSideBarAffiliates>;

export type TUseSideBarAffiliatesApi = UseQueryResult<TUseSideBarAffiliatesApiQueryResult, Error>;

export const useSideBarAffiliatesApi = (): TUseSideBarAffiliatesApi => {
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
      queryKey: "useSideBarAffiliatesApi",
      options: {
        staleTime: Infinity,
        retry: false,
      },
    },
  });
};
