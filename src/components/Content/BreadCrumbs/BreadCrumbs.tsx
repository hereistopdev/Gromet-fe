import React, { useEffect } from 'react';
import {
  useBreadCrumbsContext,
  useBreadCrumbsUpdateContext,
} from '../AffiliateLayers/Context/BreadCrumbsContext';
import './BreadCrumbs.css';

export const nonNavigateable = ['Početna'];
function BreadCrumbs() {
  const routeHistory = useBreadCrumbsContext();
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();

  const followBreadCrumbs = (destination: string) => {
    if (destination === 'Početna') routeHistoryUpdate([destination]);

    const dest = routeHistory[routeHistory.length - 1];

    switch (destination) {
      case 'Početna':
        window.location.pathname = 'pocetna';
        break;
      case 'Proizvodi ':
        window.location.pathname = 'proizvodi';
        break;
      default:
        window.location.pathname = 'pocetna';
    }
  };

  useEffect(() => {
    routeHistoryUpdate(['Početna']);
  }, []);

  return (
    <>
      {routeHistory.length > 1 && (
        <div
          className="BreadCrumbsContainer container"
          style={{ marginBottom: '0px !important' }}
        >
          {routeHistory.map((path, index) =>
            index < routeHistory.length - 1 ? (
              <div key={index}>
                <span
                  className="BreadCrumbsPath BreadCrumbsPathNavigateable"
                  onClick={(e) =>
                    followBreadCrumbs(
                      (e.target as HTMLSpanElement).textContent!
                    )
                  }
                >
                  {path}{' '}
                </span>
                <span className="BreadCrumbsPath">{'>'}</span>
              </div>
            ) : (
              <span key={index} className="BreadCrumbsPath BreadCrumbsPathLast">
                {window.innerWidth < 500 ? String(path).substring(0,22)+"..." : path}
              </span>
            )
          )}
        </div>
      )}
    </>
  );
}

export default BreadCrumbs;
