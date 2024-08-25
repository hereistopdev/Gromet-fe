import { useContext, useState, createContext } from 'react';

const BreadCrumbsContext = createContext<Array<string>>([]);
const BreadCrumbsUpdateContext = createContext<any>(null);

export function useBreadCrumbsContext() {
  return useContext(BreadCrumbsContext);
}

export function useBreadCrumbsUpdateContext() {
  return useContext(BreadCrumbsUpdateContext);
}

export function BreadCrumbsContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [routeHistory, setRouteHistory] = useState<Array<string>>([]);

  function setHistory(history: Array<string>) {
    setRouteHistory(history);
  }
  
  return (
    <BreadCrumbsContext.Provider value={routeHistory}>
      <BreadCrumbsUpdateContext.Provider value={setHistory}>
        {children}
      </BreadCrumbsUpdateContext.Provider>
    </BreadCrumbsContext.Provider>
  );
}
