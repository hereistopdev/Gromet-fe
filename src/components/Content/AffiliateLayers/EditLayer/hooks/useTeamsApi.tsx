import { UseQueryResult } from "react-query";

import { TUseApiQueryResult, useApi } from "../../../../../hooks/useApi";
import { useDevApiBase, useProdApiBase } from "../../../../../hooks/useApiBase";

export type TTeam = {
    team_name: string;
    team_id: number;
};

export type TTeams = Array<TTeam>;

type TUseTeamsApiQueryResult = TUseApiQueryResult<TTeams>;

export type TUseTeamsApi = UseQueryResult<TUseTeamsApiQueryResult, Error>;

export const useTeamsApi = (): TUseTeamsApi => {
    const isProduction: boolean = process.env.NODE_ENV === "production";
    const devApiBase: string = useDevApiBase();
    const prodApiBase: string = useProdApiBase();

    const apiBase: string = isProduction ? prodApiBase : devApiBase;
    return useApi({
        axiosRequestConfig: {
            url: `${apiBase}/v4/calendar/teams/`,
            headers: {
                Authorization: 'Basic bDFuZGFzdXBlcjpsMW5kYXN1cGVy',
                Accept: 'application/json'
            }
        },
        reactQueryConfig: {
            queryKey: "useTeamsApi",
            options: {
                staleTime: Infinity,
                retry: false,
            },
        },
    });
};