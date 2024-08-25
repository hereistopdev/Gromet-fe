/** @format */

import { Dispatch, SetStateAction, useState } from "react";


export type TApiSettings = {
  apiBaseProtocol: string;
  apiBaseHost: string;
  apiBasePort: string;
};

const DEFAULT_SETTINGS: TApiSettings = {
  apiBaseProtocol: 'https:',
  apiBaseHost: window.location.hostname, //'discover.lvh.me',
  apiBasePort: window.location.port, //'7900',
};

export type TUseApiSettings = [TApiSettings, Dispatch<SetStateAction<TApiSettings>>];

export const useApiSettings = (): TUseApiSettings => {
  const [settings, setSettings]: TUseApiSettings = useState(DEFAULT_SETTINGS);
  return [settings, setSettings];
};
