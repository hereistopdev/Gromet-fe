import React, { useMemo, useState, useEffect } from "react";
import "./Navigation.css"; // Import css modules stylesheet as styles
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

import { Avatar, Badge, Carousel, Modal } from "antd";
import logo from "../../assets/LogoOrg.webp";

import { AudioOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import useWindowWidth from "../../hooks/useWindowWidth";
import MenuBtn from "./MenuBtn";

//import products from '../Content/AffiliateLayers/EditLayer/products.json';
import SearchResultItem from "./SearchResultItem";
import { contentStyle } from "../Pages/Home";
import axios from "axios";
import { baseApi } from "../../constants";
import useAppContext from "../../provider/AppContext";

var unidecode = require("unidecode");

const navLinks = [
  { text: "Proizvodi", href: "/proizvodi" },
  { text: "Novo u ponudi", href: "/novo" },
  { text: "Pomoć i podrška", href: "/pomocipodrska" },
  { text: "Blog", href: "/blog" },
  { text: "O nama", href: "/onama" },
  { text: "Pravila", href: "/pravila" },
  { text: "Kontakt", href: "/kontakt" },
  { text: "Dućan", href: "/ducan" },
  { text: "Košarica", href: "/cart" },
  { text: "Users", href: "/users" },
];

function Navigation() {
  const width = useWindowWidth();
  let localToken = localStorage.getItem("accessToken");

  const { state, dispatch } = useAppContext();

  // const path = useMemo(() => window.location.href, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [showSearchResultModal, setShowSearchResultModal] = useState(false);
  const [bucketbadge, setBucketBadge] = useState(state.value);
  // const [displaySearch, setDisplaySearch] = useState(true);

  const [productsList, setProductList] = useState<any[]>([]); //useState([]);//useState([...products]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    axios
      .get(`${baseApi}/cart/getAllCartsWithID`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: "SET_VALUE", payload: res.data.data.length });
      });
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    axios
      .get(`${baseApi}/products/getProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.data) setProductList(res.data.data);
      });
  }, []);

  const handleSearchChange = (e: any) => {
    const searchValue: string = e.target.value;

    const searchWords: string[] = searchValue.split(" ");
    const finalResult: any[] = [];
    productsList.forEach((product) => {
      const nesto = searchWords.every((word) =>
        unidecode(product?.naziv_artikla.toLowerCase()).includes(
          unidecode(word.toLowerCase()).normalize()
        )
      );
      if (nesto) {
        finalResult.push(product);
      }
    });
    const result = productsList
      ?.filter((product) =>
        unidecode(product?.naziv_artikla.toLowerCase()).includes(
          unidecode(searchValue.toLowerCase()).normalize()
        )
      )
      .map((product) => product.naziv_artikla.normalize());

    setSearchQuery(searchValue);
    setSearchResult(finalResult);
    if (searchValue.length > 0) {
      setShowSearchResultModal(true);
      const div = document.querySelector(
        ".divNavigationSearchResult"
      ) as HTMLDivElement;
      if (div) {
        (div as HTMLDivElement).style.display = "block";
      } else {
        const div = document.querySelector(
          ".divNavigationSearchResultMOBILE"
        ) as HTMLDivElement;
        if (div) {
          (div as HTMLDivElement).style.display = "block";
        }
      }
      window.addEventListener("click", handleCloseSearchResult);
    } else {
      setShowSearchResultModal(false);
    }
  };

  const handleCloseSearchResult = () => {
    const div = document.querySelector(
      ".divNavigationSearchResult"
    ) as HTMLDivElement;
    if (div) {
      (div as HTMLDivElement).style.display = "none";
    } else {
      const div = document.querySelector(
        ".divNavigationSearchResultMOBILE"
      ) as HTMLDivElement;
      if (div) {
        (div as HTMLDivElement).style.display = "none";
      }
    }
  };

  const handleClearSearchClicked = () => {
    const className =
      window.innerWidth > 800 ? ".input-icons" : ".divResponsiveSearch";
    (
      document.querySelector(className)?.childNodes[0] as HTMLInputElement
    ).value = "";
    setSearchQuery("");
  };

  return !!localToken && localStorage.getItem("currentUser") !== "ADMIN" ? (
    <div className="divNavigationSticky">
      <div className="navPanelContainer" style={{ backgroundColor: "#f8bb11" }}>
        <div className="container navPanel">
          <div className="divLanguageContainer">
            <ul className="">
              <li
                onClick={() =>
                  (window.location.href = "/pomocipodrska?q=porucivanje")
                }
              >
                Poručivanje
              </li>
              <li
                onClick={() =>
                  (window.location.href = "/pomocipodrska?q=isporuka")
                }
              >
                Isporuka
              </li>
              <li style={{ fontWeight: "700", color: "#004D8C !important" }}>
                <a
                  href="tel:+381 60 0768 777"
                  style={{ fontWeight: "700", color: "#004D8C !important" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="28px"
                    height="28px"
                    className="svgSlusalica"
                  >
                    <path
                      d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="mailto:info@gromet.rs">
                  <MailOutlined />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="businessInfo">
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => {
                  window.location.href = "/account/profile";
                }}
              >
                <div>
                  <div className="moj">Moj profil</div>
                  <div className="moj">Novi Prom</div>
                </div>
                <div>
                  <FaUser />
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center" }}
                className="bucket-badge"
              >
                <a href="/cart">
                  <Badge count={state.value} size="small">
                    <FaShoppingCart />
                  </Badge>
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                0,00 RSD
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="selfServiceNavigationContainerBlue">
        <div
          className="container selfServiceNavigationContainer"
          style={{ marginBottom: "0px !important" }}
        >
          <div className="selfServiceNavigationLeftContainer">
            <div className="selfServiceNavigationMenu">
              <MenuBtn navLinks={navLinks} />
              <div
                className="navigation navigationItemLink navigation-logo"
                style={{ width: "150px", height: "40px" }}
              >
                <a className="navigationItemLinkHome" href="/pocetna">
                  <img
                    style={{ width: "150px", height: "40px" }}
                    src={logo}
                    alt="logo"
                  ></img>
                </a>
              </div>

              {navLinks.map(({ text, href }) => {
                if (
                  localStorage.getItem("currentUser") === "USER" &&
                  text == "Dućan"
                )
                  return <div key={text}></div>;
                if (
                  localStorage.getItem("currentUser") === "USER" &&
                  text == "Users"
                )
                  return <div key={text}></div>;
                return (
                  <div
                    key={text}
                    className="navigation navigationItemLink"
                    style={
                      href === navLinks[0].href ? { marginLeft: "10px" } : {}
                    }
                  >
                    <a
                      className="navigationItemLink aNavigationHover"
                      href={href}
                    >
                      {text}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="divUsernameContainer">
              {/* SEARCH polje mobile*/}
              {showSearch && (
                <div className="divResponsiveSearch">
                  <input
                    type="text"
                    placeholder={"Pretražite..."}
                    maxLength={30}
                    onChange={(e) => handleSearchChange(e)}
                  />
                  {searchQuery.length > 0 && (
                    <div
                      className="divClearSearch"
                      style={{
                        position: "relative",
                        top: "-3",
                        right: "50px",
                        color: "#3d464d",
                        width: "25px",
                        height: "25px",
                        fontSize: "22px",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: "3px",
                        zIndex: 100,
                        backgroundColor: "white",
                      }}
                      onClick={() => {
                        handleClearSearchClicked();
                      }}
                    >
                      x
                    </div>
                  )}
                  <SearchOutlined
                    style={{
                      position: "relative",
                      top: "0",
                      right: searchQuery.length > 0 ? "46px" : "30px",
                      color: "#3d464d",
                      zIndex: 100,
                      backgroundColor: "white",
                    }}
                  ></SearchOutlined>
                  <label
                    onClick={() => {
                      setShowSearch(false);
                    }}
                    style={{
                      position: "relative",
                      right: searchQuery.length > 0 ? "18px" : "10px",
                      top: "0px",
                      width: "50px",
                      zIndex: 100,
                      backgroundColor: "white",
                    }}
                  >
                    X
                  </label>
                  {searchQuery.length > 0 && (
                    <div
                      className="divNavigationSearchResultMOBILE"
                      style={{
                        display: searchQuery.length > 0 ? "block" : "none",
                      }}
                    >
                      <ul>
                        {searchResult &&
                          searchResult.map((product, index) => {
                            return (
                              <div key={index}>
                                <SearchResultItem product={product} />
                              </div>
                            );
                          })}
                        {searchResult && searchResult.length === 0 && (
                          <li key={"noFilteredProducts"}>
                            Nema proizvoda koji zadovoljavaju pretragu.
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {window.innerWidth < 800 && (
                <SearchOutlined
                  style={{
                    position: "relative",
                    top: "0",
                    right: "4px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="navigationSeaarchForInput"
                  onClick={() => {
                    setShowSearch(!showSearch);
                  }}
                />
              )}

              {/* SEARCH POLJE desktop */}
              {window.innerWidth > 800 && (
                <div
                  className="input-icons"
                  style={{
                    width: "200px",
                    textAlign: "right",
                    display: "flex",
                  }}
                >
                  <input
                    className="input-field"
                    type="text"
                    placeholder={"Pretražite..."}
                    maxLength={30}
                    style={{
                      right: searchQuery.length > 0 ? "-32px" : "-15px",
                      width: "160px",
                      marginLeft: "auto",
                    }}
                    onChange={(e) => handleSearchChange(e)}
                  />
                  {searchQuery.length > 0 && (
                    <CloseOutlined
                      style={{
                        position: "relative",
                        // top: '0',
                        right: "25px",
                        color: "#3d464d",
                        zIndex: 100,
                        backgroundColor: "white",
                        height: "20px",
                        top: "2px",
                        paddingTop: "9px",
                      }}
                      onClick={() => handleClearSearchClicked()}
                    />
                  )}
                  <SearchOutlined
                    style={{
                      position: "relative",
                      // top: '0',
                      right: "20px",
                      color: "#3d464d",
                      zIndex: 100,
                      backgroundColor: "white",
                      height: "20px",
                      top: "2px",
                      paddingTop: "9px",
                    }}
                  />
                  {searchQuery.length > 0 && (
                    <Modal
                      open={showSearchResultModal}
                      closable={true}
                      footer={[]}
                      onCancel={() => setShowSearchResultModal(false)}
                      cancelText="Ok"
                      className="modalSearchQueryResult"
                      wrapClassName="modalWrapperSearchQueryResult"
                      centered={false}
                      keyboard={true}
                      mask={false}
                      style={{
                        left: "52.7%",
                        top: "80px",
                      }}
                      afterOpenChange={(open) => {
                        (
                          document.querySelector(
                            ".input-field"
                          ) as HTMLInputElement
                        ).focus();
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: searchQuery.length > 0 ? "block" : "none",
                          height: "400px",
                          paddingTop: "25px",
                        }}
                      >
                        <ul
                          style={{
                            height: "380px",
                            overflowY: "scroll",
                            paddingLeft: "0px",
                          }}
                        >
                          {searchResult &&
                            searchResult.map((product, index) => {
                              return (
                                <div key={index}>
                                  <SearchResultItem product={product} />
                                </div>
                              );
                            })}
                          {searchResult && searchResult.length === 0 && (
                            <li key={"noFilteredProducts"}>
                              Nema proizvoda koji zadovoljavaju pretragu.
                            </li>
                          )}
                        </ul>
                      </div>
                    </Modal>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {window.innerWidth < 991 && (
        <div
          className="carouselNavigationVeleprodajaContainer"
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            position: "relative",
            // maxWidth: "95%",
            top: "-25px",
            background: "white",
            // borderBottom: "1px solid #e4e4e4"
            // marginBottom: "350px",
          }}
        >
          <Carousel
            dots={false}
            className="carouselNavigationVeleprodaja"
            autoplay
          >
            <div style={contentStyle}>
              <div
                className="block-slideshow__slide-contentNav"
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <div className="block-slideshow__slide-titleNav">
                  UNUTRAŠNJE RADOVE I IZOLACIJU
                </div>
              </div>
            </div>
            <div style={contentStyle}>
              <div
                className="block-slideshow__slide-contentNav"
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <div className="block-slideshow__slide-titleNav">
                  VELEPRODAJA PROIZVODA ZA FASADU
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      )}
    </div>
  ) : (
    <div className="divNavigationSticky">
      <div className="navPanelContainer">
        <div className="container navPanel">
          <ul>
            <li
              onClick={() =>
                (window.location.href = "/pomocipodrska?q=porucivanje")
              }
            >
              Poručivanje
            </li>
            <li
              onClick={() =>
                (window.location.href = "/pomocipodrska?q=isporuka")
              }
            >
              Isporuka
            </li>
          </ul>

          {window.innerWidth > 1000 && (
            <div
              className="carouselNavigationVeleprodajaContainer"
              style={{
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                height: "30px",
              }}
            >
              VELEPRODAJA PROIZVODA ZA FASADU, UNUTRAŠNJE RADOVE I IZOLACIJU
            </div>
          )}
          <div className="divLanguageContainer">
            <ul className="">
              {/* {width > 640 ? (
                  <li style={{ fontWeight: "700", color: "#004D8C !important" }}>
                    <a
                      href="tel:+381 60 0768 777"
                      style={{ fontWeight: "700", color: "#004D8C !important" }}
                    >
                      +381 60 0768 777
                    </a>
                  </li>
                ) : ( */}
              <li style={{ fontWeight: "700", color: "#004D8C !important" }}>
                <a
                  href="tel:+381 60 0768 777"
                  style={{ fontWeight: "700", color: "#004D8C !important" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="28px"
                    height="28px"
                    className="svgSlusalica"
                  >
                    <path
                      d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </li>
              {/* )}
                {width > 640 ? (
                  <li>
                    <a href="mailto:info@gromet.rs">info@gromet.rs</a>
                  </li>
                ) : ( */}
              <li>
                <a href="mailto:info@gromet.rs">
                  <MailOutlined />
                </a>
              </li>
              {/* )} */}
            </ul>
          </div>
          <div>
            <span className="strong-typography user-avatar">
              PRIJAVITE SE &nbsp;
              <UserOutlined />
            </span>
          </div>
        </div>
      </div>

      <div className="selfServiceNavigationContainerBlue">
        <div
          className="container selfServiceNavigationContainer"
          style={{ marginBottom: "0px !important" }}
        >
          <div className="selfServiceNavigationLeftContainer">
            <div className="selfServiceNavigationMenu">
              <MenuBtn navLinks={navLinks} />
              <div
                className="navigation navigationItemLink navigation-logo"
                style={{ width: "150px", height: "40px" }}
              >
                <a className="navigationItemLinkHome" href="/pocetna">
                  <img
                    style={{ width: "150px", height: "40px" }}
                    src={logo}
                    alt="logo"
                  ></img>
                </a>
              </div>

              {navLinks.map(({ text, href }) => {
                if (
                  localStorage.getItem("currentUser") === "USER" &&
                  text == "Dućan"
                )
                  return <></>;
                if (
                  localStorage.getItem("currentUser") === "USER" &&
                  text == "Users"
                )
                  return <></>;
                return (
                  <div
                    key={text}
                    className="navigation navigationItemLink"
                    style={
                      href === navLinks[0].href ? { marginLeft: "10px" } : {}
                    }
                  >
                    <a
                      className="navigationItemLink aNavigationHover"
                      href={href}
                    >
                      {text}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="divUsernameContainer">
              {/* SEARCH polje mobile*/}
              {showSearch && (
                <div className="divResponsiveSearch">
                  <input
                    type="text"
                    placeholder={"Pretražite..."}
                    maxLength={30}
                    onChange={(e) => handleSearchChange(e)}
                  />
                  {searchQuery.length > 0 && (
                    <div
                      className="divClearSearch"
                      style={{
                        position: "relative",
                        top: "-3",
                        right: "50px",
                        color: "#3d464d",
                        width: "25px",
                        height: "25px",
                        fontSize: "22px",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: "3px",
                        zIndex: 100,
                        backgroundColor: "white",
                      }}
                      onClick={() => {
                        handleClearSearchClicked();
                      }}
                    >
                      x
                    </div>
                  )}
                  <SearchOutlined
                    style={{
                      position: "relative",
                      top: "0",
                      right: searchQuery.length > 0 ? "46px" : "30px",
                      color: "#3d464d",
                      zIndex: 100,
                      backgroundColor: "white",
                    }}
                  ></SearchOutlined>
                  <label
                    onClick={() => {
                      setShowSearch(false);
                    }}
                    style={{
                      position: "relative",
                      right: searchQuery.length > 0 ? "18px" : "10px",
                      top: "0px",
                      width: "50px",
                      zIndex: 100,
                      backgroundColor: "white",
                    }}
                  >
                    X
                  </label>
                  {searchQuery.length > 0 && (
                    <div
                      className="divNavigationSearchResultMOBILE"
                      style={{
                        display: searchQuery.length > 0 ? "block" : "none",
                      }}
                    >
                      <ul>
                        {searchResult &&
                          searchResult.map((product, index) => {
                            return (
                              <div key={index}>
                                <SearchResultItem product={product} />
                              </div>
                            );
                          })}
                        {searchResult && searchResult.length === 0 && (
                          <li key={"noFilteredProducts"}>
                            Nema proizvoda koji zadovoljavaju pretragu.
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {window.innerWidth < 800 && (
                <SearchOutlined
                  style={{
                    position: "relative",
                    top: "0",
                    right: "4px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="navigationSeaarchForInput"
                  onClick={() => {
                    setShowSearch(!showSearch);
                  }}
                />
              )}

              {/* SEARCH POLJE desktop */}
              {window.innerWidth > 800 && (
                <div
                  className="input-icons"
                  style={{
                    width: "200px",
                    textAlign: "right",
                    display: "flex",
                  }}
                >
                  <input
                    className="input-field"
                    type="text"
                    placeholder={"Pretražite..."}
                    maxLength={30}
                    style={{
                      right: searchQuery.length > 0 ? "-32px" : "-15px",
                      width: "160px",
                      marginLeft: "auto",
                    }}
                    onChange={(e) => handleSearchChange(e)}
                  />
                  {searchQuery.length > 0 && (
                    <CloseOutlined
                      style={{
                        position: "relative",
                        // top: '0',
                        right: "25px",
                        color: "#3d464d",
                        zIndex: 100,
                        backgroundColor: "white",
                        height: "20px",
                        top: "2px",
                        paddingTop: "9px",
                      }}
                      onClick={() => handleClearSearchClicked()}
                    />
                  )}
                  <SearchOutlined
                    style={{
                      position: "relative",
                      // top: '0',
                      right: "20px",
                      color: "#3d464d",
                      zIndex: 100,
                      backgroundColor: "white",
                      height: "20px",
                      top: "2px",
                      paddingTop: "9px",
                    }}
                  />
                  {searchQuery.length > 0 && (
                    <Modal
                      open={showSearchResultModal}
                      closable={true}
                      footer={[]}
                      onCancel={() => setShowSearchResultModal(false)}
                      cancelText="Ok"
                      className="modalSearchQueryResult"
                      wrapClassName="modalWrapperSearchQueryResult"
                      centered={false}
                      keyboard={true}
                      mask={false}
                      style={{
                        left: "52.7%",
                        top: "80px",
                      }}
                      afterOpenChange={(open) => {
                        (
                          document.querySelector(
                            ".input-field"
                          ) as HTMLInputElement
                        ).focus();
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: searchQuery.length > 0 ? "block" : "none",
                          height: "400px",
                          paddingTop: "25px",
                        }}
                      >
                        <ul
                          style={{
                            height: "380px",
                            overflowY: "scroll",
                            paddingLeft: "0px",
                          }}
                        >
                          {searchResult &&
                            searchResult.map((product, index) => {
                              return (
                                <div key={index}>
                                  <SearchResultItem product={product} />
                                </div>
                              );
                            })}
                          {searchResult && searchResult.length === 0 && (
                            <li key={"noFilteredProducts"}>
                              Nema proizvoda koji zadovoljavaju pretragu.
                            </li>
                          )}
                        </ul>
                      </div>
                    </Modal>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {window.innerWidth < 991 && (
        <div
          className="carouselNavigationVeleprodajaContainer"
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            position: "relative",
            // maxWidth: "95%",
            top: "-25px",
            background: "white",
            // borderBottom: "1px solid #e4e4e4"
            // marginBottom: "350px",
          }}
        >
          <Carousel
            dots={false}
            className="carouselNavigationVeleprodaja"
            autoplay
          >
            <div style={contentStyle}>
              <div
                className="block-slideshow__slide-contentNav"
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <div className="block-slideshow__slide-titleNav">
                  UNUTRAŠNJE RADOVE I IZOLACIJU
                </div>
              </div>
            </div>
            <div style={contentStyle}>
              <div
                className="block-slideshow__slide-contentNav"
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <div className="block-slideshow__slide-titleNav">
                  VELEPRODAJA PROIZVODA ZA FASADU
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default Navigation;
