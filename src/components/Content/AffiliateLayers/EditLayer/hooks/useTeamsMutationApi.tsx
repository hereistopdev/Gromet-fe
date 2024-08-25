/** @format */

import { UseMutationResult } from "react-query";

import { useProdApiBase } from "../../../../../hooks/useApiBase";
import { useMutationApi } from "../../../../../hooks/useMutationApi";

export type TUseTeamsMutationApiQueryResult = {
  detail: string;
  status_code: number;
  data: TTeamsInlineEdit;
};

export type TTeamsInlineEdit = {
    team_name: string;
    team_id: number;
};

export type TUseTeamsMutationApi = UseMutationResult<
  TUseTeamsMutationApiQueryResult,
  Error,
  TTeamsInlineEdit,
  () => void
>;

type TUseTeamsApiProps = {
  onSuccess?: (
    data: TUseTeamsMutationApiQueryResult,
    variables: TTeamsInlineEdit,
  ) => Promise<unknown> | void;
  onError?: (err: Error, variables: TTeamsInlineEdit) => Promise<unknown> | void;
};

export const useTeamsMutationApi = ({
  onSuccess,
  onError,
}: TUseTeamsApiProps): TUseTeamsMutationApi => {
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
      mutationKey: "useTeamsMutationApi",
      options: {
        onSuccess,
        onError,
      },
    },
  });
};
