/** @format */

import { UseMutationResult } from "react-query";

import { useProdApiBase } from "../../../../hooks/useApiBase";
import { useMutationApi } from "../../../../hooks/useMutationApi";

export type TUseSideBarAffiliatesMutationApiQueryResult = {
  detail: string;
  status_code: number;
  data: TSideBarAffiliatesInlineEdit;
};

export type TSideBarAffiliatesInlineEdit = {
  name: string;
  is_working_schedule: string;
  color: string;
  admin_end_offset: number;
  initial_event_start_offset: number;
  order: number;
  can_be_published: boolean;
  admin_start_time: string;
  pk: number;
  show_save_order: boolean;
};

export type TUseSideBarAffiliatesMutationApi = UseMutationResult<
  TUseSideBarAffiliatesMutationApiQueryResult,
  Error,
  TSideBarAffiliatesInlineEdit,
  () => void
>;

type TUseSideBarAffiliatesApiProps = {
  onSuccess?: (
    data: TUseSideBarAffiliatesMutationApiQueryResult,
    variables: TSideBarAffiliatesInlineEdit,
  ) => Promise<unknown> | void;
  onError?: (err: Error, variables: TSideBarAffiliatesInlineEdit) => Promise<unknown> | void;
};

export const useSideBarAffiliatesMutationApi = ({
  onSuccess,
  onError,
}: TUseSideBarAffiliatesApiProps) :TUseSideBarAffiliatesMutationApi => {
  const apiBase: string = useProdApiBase();
  return useMutationApi({
    axiosRequestConfig: {
      method: "put",
      url: `${apiBase}/v4/calendar/layers/`,
      headers: {
        Authorization: 'Basic bDFuZGFzdXBlcjpsMW5kYXN1cGVy',
        Accept: 'application/json'
      }
    },
    reactQueryConfig: {
      mutationKey: "useSideBarAffiliatesMutationApi",
      options: {
        onSuccess,
        onError,
      },
    },
  });
};
