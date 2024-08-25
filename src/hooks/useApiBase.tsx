/** @format */

import { TUseApiSettings, useApiSettings } from "./useApiSettings";

const REACT_APP_API_BASE = 'http://demo.lvh.me:7900';

export const useProdApiBase = (): string => {
  const [settings]: TUseApiSettings = useApiSettings();

  return `${settings.apiBaseProtocol}//${settings.apiBaseHost}:${settings.apiBasePort}`;
};

export const useDevApiBase = (): string => {
  return REACT_APP_API_BASE;
};