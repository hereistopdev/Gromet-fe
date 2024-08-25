import React, { useEffect } from 'react';
import './ContentContainer.css';
import AffiliateLayers from './AffiliateLayers/ProductPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import EditAffiliateLayer from './AffiliateLayers/EditLayer/StorePage';
import { AffiliateContextProvider } from './AffiliateLayers/Context/AffiliateContext';
import { useBreadCrumbsContext } from './AffiliateLayers/Context/BreadCrumbsContext';
import Login from '../Account/Login';
import { UpOutlined } from '@ant-design/icons';

function ContentContainer() {
  const routeHistory = useBreadCrumbsContext();
  return (
    <div className="selfServiceContentContainer">
      <>
        <AffiliateContextProvider>
          {/* <React.StrictMode> */}
            <Router>
              <Routes>
                {/* <Route path="/*" element={<Login></Login>}></Route> */}
                {/* <Route path="/proizvod/*" element={<AffiliateLayers></AffiliateLayers>}>
                </Route>
                <Route path="/proizvodi/" element={<EditAffiliateLayer></EditAffiliateLayer>}> */}
                {/* </Route> */}
                {/* <Route path="/ssp/affiliatelayers/new" element={<EditAffiliateLayer mode={ActionType.Create} ></EditAffiliateLayer>}>
                </Route> */}
              </Routes>
            </Router>
          {/* </React.StrictMode> */}
        </AffiliateContextProvider>
        <div className="totop__end">
          <button type="button" className="totop__button">
            <UpOutlined />
          </button>
        </div>
      </>
    </div>
  );
}

export default ContentContainer;
