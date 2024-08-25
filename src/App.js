import "./App.css";
import { Navigate, redirect } from "react-router-dom";
import Navigation from "./components/Nav/Navigation";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "./components/Content/BreadCrumbs/BreadCrumbs";
import { BreadCrumbsContextProvider } from "./components/Content/AffiliateLayers/Context/BreadCrumbsContext";
import { QueryClient, QueryClientProvider } from "react-query";
import "./components/Content/ContentContainer.css";
import AffiliateLayers from "./components/Content/AffiliateLayers/ProductPage";
import AffiliateLayersEdit from "./components/Content/AffiliateLayers/ProductPageEdit";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditAffiliateLayer from "./components/Content/AffiliateLayers/EditLayer/StorePage";
import { AffiliateContextProvider } from "./components/Content/AffiliateLayers/Context/AffiliateContext";
import Terms from "./components/Pages/Terms";
import Blog from "./components/Pages/Blog";
import BlogItemPage from "./components/Pages/BlogItemPage";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home";
import JsonView from "./components/jsonView/JsonView";
import ShopView from "./components/Shop/ShopView";
import { Modal, Button, Collapse, Checkbox } from "antd";
import { UpOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import HelpPageRouterComponent from "./components/Pages/HelpPageRouterComponent";
import Gromet60 from "./assets/gromet-logo-60px.webp";
import BlogItemPageB from "./components/Pages/BlogItemPageB";
import Profile from "./components/Pages/Profile";
import MainUser from "./components/Pages/Details/MainUser";
import FinancialCard from "./components/Pages/Details/FinancialCard";
import Orders from "./components/Pages/Details/Orders";
import Promotions from "./components/Pages/Details/Promotions";
import RecommendedPurchase from "./components/Pages/Details/RecommendedPurchase";

import moment from "moment";
import TagManager from "react-gtm-module";
import BlogItemPageTwo from "./components/Pages/BlogItemPageTwo";

//import products from './components/Content/AffiliateLayers/EditLayer/products.json';

import { Helmet } from "react-helmet";
import NotFound404 from "./components/ErrorPages/404Page";
// import Login from "./components/Account/Login";
// import Register from "./components/Account/Register";
import Auth from "./components/Account/Auth";
import ForgotPass_sendmail from "./components/Account/ForgotPass_sendmail";
import ForgotPass_resetpass from "./components/Account/ForgotPass_resetpass";
import Cart from "./components/Content/AffiliateLayers/Cart/Cart";
import Users from "./components/Content/AffiliateLayers/Users/Users";
import History from "./components/Pages/Details/History";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";

const tagManagerArgs = {
  gtmId: "G-Y8ERRGCNMD",
};

TagManager.initialize(tagManagerArgs);

const { Panel } = Collapse;

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState(() => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
  });
  const [account, setAccount] = useState(false);

  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    const mybutton = document.getElementById("myBtn");
    if (
      mybutton &&
      (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  };

  const [hideTopbar, setHideTopbar] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const imgs = document.querySelectorAll("img");
      imgs.forEach((img) =>
        img.addEventListener("contextmenu", (e) => {
          e.preventDefault();
        })
      );
      if (interval) {
        clearInterval(interval);
      }
    }, 2000);
    const now = new Date(Date.now());
    const diff = moment().diff("2023-08-15", "days");
    const app = document.querySelector("body");
    if (app) {
      // app.style.opacity = (100 - diff)/100;
    }
    //  setIntervals(interval);
  });
  const [isModalOpen, setIsModalOpen] = useState(
    !localStorage.getItem("showedCookiesModal")
  );
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.setItem("showedCookiesModal", true);
  };
  const handleCancel = () => {
    setIsOptionsOpen(true);
  };
  const handleAllowAll = () => {
    setIsModalOpen(false);
    localStorage.setItem("showedCookiesModal", true);
  };

  useEffect(() => {
    const page = window.location.pathname.includes("shop");
    const accountFlag = window.location.pathname.includes("account");
    if (accountFlag) {
      setAccount(true);
    } else {
      setAccount(false);
    }

    // if (page) {
    //     console.log("----------------------------------");
    //     const shopId = window.location.pathname.substring(window.location.pathname.indexOf("/shop/") + 6, window.location.pathname.length);
    //     const found = products.find(product => product.qr_kod.includes('shop/' + shopId));
    //     console.log("shop id ", window.location.pathname, shopId, found);
    //     if (found && shopId) {
    //         window.location.href = '/proizvod' + found.url;
    //     }
    // }
  }, [window.location]);

  useEffect(() => {
    const page = window.location.pathname.includes("shop");
    // if (page) {
    //     const shopId = window.location.pathname.substring(window.location.pathname.indexOf("/shop/") + 6, window.location.pathname.length);
    //     const found = products.find(product => product.qr_kod.includes('shop/' + shopId));
    //     console.log("shop id ", window.location.pathname, shopId, found);
    //     if (found && shopId) {
    //         window.location.href = '/proizvod' + found.url;
    //     }
    // }
  }, []);

  let localToken = localStorage.getItem("accessToken");
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <BreadCrumbsContextProvider>
          <div className="App" id="divApp">
            <Helmet>
              <meta property="og:title" content="Gromet" />
              <meta
                property="og:description"
                content="Gromet doo je kompanija osnovana 2012. godine i bavi se uvozom, veleprodajom i distribucijom proizvoda za fasadu, unutrašnje radove i izolaciju."
              />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https:/www.gromet.rs" />
              <meta property="og:image:type" content="image/jpeg" />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="800" />
              <meta property="fb:app_id" content="258598741051124" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Gromet naslov strane" />
              <meta
                name="twitter:description"
                content="Gromet opis proizvoda"
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta name="theme-color" content="#000000" />
              <meta
                name="description"
                content="Gromet doo je kompanija osnovana 2012. godine i bavi se uvozom, veleprodajom i distribucijom proizvoda za fasadu, unutrašnje radove i izolaciju."
              />
            </Helmet>

            <Modal
              className={
                window.innerWidth > 900 && !isOptionsOpen
                  ? "modalPositionInitial"
                  : "modalPositionOptions"
              }
              open={isModalOpen && !!localToken}
              closable={false}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Slažem se"
              cancelText="Podešavanja"
              footer={
                !isOptionsOpen ? (
                  [
                    <Button
                      onClick={handleCancel}
                      className="btnCookiesSecondary"
                    >
                      Podešavanja
                    </Button>,
                    <Button onClick={handleOk} className="btnCookiesPrimary">
                      Slažem se
                    </Button>,
                  ]
                ) : (
                  <></>
                )
              }
            >
              <img
                style={{ width: "150px", height: "40px" }}
                src={Gromet60}
                alt="logo"
              ></img>
              {!isOptionsOpen && (
                <>
                  <h3>Pre nego što nastaviš saznaj o kolačićima (cookies)</h3>
                  <p className="pCookies">
                    U cilju pružanja najboljeg mogućeg korisničkog iskustva, naš
                    sajt koristi kolačiće. Kolačići nam pomažu da analiziramo
                    način na koji koristite naš veb sajt i prilagođavamo ga
                    vašim potrebama.
                  </p>
                </>
              )}

              {isOptionsOpen && (
                <>
                  <h3>Podešavanje kolačića (cookies)</h3>
                  <p className="pCookies">
                    Kada posetite veb sajt, on može da postavi kolačiće na vaš
                    pretraživač. Kolačići se koriste kako bi se personalizovao
                    sadržaj i poboljšalo vaše korisničko iskustvo.
                  </p>
                  <Button
                    onClick={() => handleAllowAll()}
                    className="btnCookiesPrimary btnCookiesMaxWidth"
                  >
                    Dozvoli sve
                  </Button>
                  <br></br> <br></br>
                  <Collapse
                    defaultActiveKey={""}
                    accordion
                    expandIcon={({ isActive }) =>
                      isActive ? <MinusOutlined /> : <PlusOutlined />
                    }
                    className="collapseCookies"
                  >
                    <Panel
                      header="Neophodni"
                      key="1"
                      extra={
                        <Checkbox
                          defaultChecked={true}
                          disabled={true}
                        ></Checkbox>
                      }
                    >
                      <p className="pCookies">
                        Neophodni kolačići potrebni su za pravilno
                        funkcionisanje veb-sajta. Oni omogućavaju osnovne
                        funkcije kao što su navigacija kroz sajt, pristup
                        zaštićenim delovima sajta i postavljanje sigurnosnih
                        mera.
                      </p>
                    </Panel>
                    <Panel
                      header="Korisničko iskustvo"
                      key="2"
                      extra={<Checkbox defaultChecked={true}></Checkbox>}
                    >
                      <p className="pCookies">
                        Kolačići za korisničko iskustvo omogućavaju veb-sajtu da
                        zapamti tvoje postavke i preferencije, kako bi ti pružio
                        personalizovano iskustvo prilagođeno tvojim potrebama.
                        Mogu uključivati informacije kao što su jezik, region,
                        veličina fonta i slično.
                      </p>
                    </Panel>
                    <Panel
                      header="Statistika"
                      key="3"
                      extra={<Checkbox defaultChecked={true}></Checkbox>}
                    >
                      <p className="pCookies">
                        Kolačići za statistiku prikupljaju anonimne podatke o
                        tome kako koristiš veb-sajt, kao što su broj poseta,
                        vreme provedeno na sajtu i koje stranice su posećene.
                      </p>
                    </Panel>

                    <Panel
                      header="Marketing"
                      key="4"
                      extra={<Checkbox defaultChecked={true}></Checkbox>}
                    >
                      <p className="pCookies">
                        Kolačići za marketing se koriste za prikupljanje
                        informacija o tvojim interesovanjima i aktivnostima na
                        mreži, kako bi se prikazali relevantni oglasi koji su
                        prilagođeni tvojim potrebama. Mogu uključivati
                        informacije kao što su posećene stranice, tražene
                        ključne reči i slično.
                      </p>
                    </Panel>
                  </Collapse>
                  <br></br>
                  <Button
                    onClick={() => handleOk()}
                    className="btnCookiesSecondary btnCookiesMaxWidth"
                  >
                    Sačuvaj podešavanja
                  </Button>
                </>
              )}
            </Modal>

            {/* {!account && (
              <div hidden={hideTopbar}> */}
            <Navigation />
            {/* </div>
            )} */}

            <section
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: window.location.pathname.includes("pocetna")
                  ? "125px"
                  : "125px",
              }}
            >
              {!account && <BreadCrumbs />}
              <div
                className="selfServiceContentContainer"
                style={{
                  maxwidth:
                    window.location.pathname === "/" ? "2000px" : "1450px",
                }}
              >
                <AffiliateContextProvider>
                  <Router>
                    <Routes>
                      {!!localToken ? (
                        <>
                          <Route path="/" element={<Home />}></Route>
                          <Route path="/pocetna" element={<Home />}></Route>
                          <Route
                            path="/proizvodi"
                            element={<EditAffiliateLayer />}
                          ></Route>
                          <Route
                            path="/account/profile/*"
                            element={<Profile />}
                          />
                          <Route path="/novo" element={<JsonView />}></Route>
                          <Route path="/ducan" element={<ShopView />}></Route>
                          <Route
                            path="/pomocipodrska"
                            element={<HelpPageRouterComponent />}
                          ></Route>
                          <Route path="/blog" element={<Blog />}></Route>
                          <Route
                            path="/blog/Top-10-najboljih-ekoloških-materijala-za-održivu-gradnju"
                            element={<BlogItemPage />}
                          ></Route>
                          <Route
                            path="/blog/5-razloga-da-suvom-gradnjom-zamenite-tradicionalnu"
                            element={<BlogItemPageB />}
                          ></Route>
                          <Route
                            path="/blog/Unapredite-izlaganje-proizvoda-uz-naše-nove-police-za-izlaganje"
                            element={<BlogItemPageTwo />}
                          ></Route>
                          <Route path="/onama" element={<About />}></Route>
                          <Route path="/kontakt" element={<Contact />}></Route>
                          <Route path="/cart" element={<Cart />}></Route>
                          <Route path="/users" element={<Users />}></Route>
                          <Route path="/pravila" element={<Terms />}></Route>
                          <Route
                            path="/*"
                            element={<NotFound404 />}
                            status={404}
                          ></Route>
                        </>
                      ) : (
                        <></>
                      )}

                      <Route
                        path="/account/login"
                        element={<Login setAccount={setAccount} />}
                      ></Route>
                      <Route
                        path="/account/signup"
                        element={<Register setAccount={setAccount} />}
                      ></Route>
                      <Route
                        path="/account/forgotpass"
                        element={
                          <ForgotPass_sendmail setAccount={setAccount} />
                        }
                      ></Route>
                      <Route
                        path="/account/password-reset/*"
                        element={
                          <ForgotPass_resetpass setAccount={setAccount} />
                        }
                      ></Route>

                      {/*private */}
                      <Route
                        path="/proizvod/*"
                        element={
                          !!token ? (
                            <AffiliateLayers />
                          ) : (
                            <Navigate to="/account/login" />
                          )
                        }
                      />
                      <Route
                        path="/proizvod/edit/*"
                        element={
                          !!token ? (
                            <AffiliateLayersEdit />
                          ) : (
                            <Navigate to="/account/login" />
                          )
                        }
                      />

                      {/* {!!token ? (
                                                <Route path="/proizvod/*" element={<AffiliateLayers />} />
                                            ) : (
                                                null
                                            )} */}

                      {!!localToken ? (
                        <></>
                      ) : (
                        <Route
                          path="/*"
                          element={<Navigate to="/account/login"></Navigate>}
                        ></Route>
                      )}
                    </Routes>
                  </Router>
                </AffiliateContextProvider>
                {!account && (
                  <div className="totop__body" hidden={window.innerWidth < 800}>
                    <div className="totop__end">
                      <button
                        id="myBtn"
                        type="button"
                        className="totop__button"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        <UpOutlined />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
            {!account && (
              <div hidden={hideTopbar}>
                <Footer />
              </div>
            )}
          </div>
        </BreadCrumbsContextProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
