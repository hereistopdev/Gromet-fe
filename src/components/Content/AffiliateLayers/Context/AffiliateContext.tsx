import React, { useContext, useState } from 'react';
import { TSideBarAffiliate } from '../hooks/useSideBarAffiliatesApi';

const AffiliateContext = React.createContext({});
const AffiliateUpdateContext = React.createContext<any>(null);

export function useAffiliateContext() {
  return useContext(AffiliateContext);
}

export function useAffiliateUpdateContext() {
  return useContext(AffiliateUpdateContext);
}

export function AffiliateContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [selectedAffliliate, setSelectedAffiliate] = useState({});

  function selectAffliliate(affiliate: TSideBarAffiliate) {
    setSelectedAffiliate(affiliate);
  }
  return (
    <AffiliateContext.Provider value={selectedAffliliate}>
      <AffiliateUpdateContext.Provider value={selectAffliliate}>
        {children}
      </AffiliateUpdateContext.Provider>
    </AffiliateContext.Provider>
  );
}