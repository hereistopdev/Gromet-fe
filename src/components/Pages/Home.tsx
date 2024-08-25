import React, { useEffect, useState } from "react";
import { Carousel, Row, Modal } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import "./Home.css";
import ProductCard from "../Content/AffiliateLayers/ProductCard/ProductCard";
//import products from '../Content/AffiliateLayers/EditLayer/products.json';
import Banner from "../../assets/banner-1.webp";

import Slide1 from "../../assets/HeroImage1.webp";
import Slide2 from "../../assets/HeroImage2.webp";
import Slide3 from "../../assets/HeroImage3.webp";
import Slide4 from "../../assets/HeroImage4.webp";
import SlideMobile1 from "../../assets/HeroImageMobile1.webp";
import SlideMobile2 from "../../assets/HeroImageMobile2.webp";
import SlideMobile3 from "../../assets/HeroImageMobile3.webp";
import SlideMobile4 from "../../assets/HeroImageMobile4.webp";
import HowToScanImg from "../../assets/Kako da skenirate.webp";

import { Product } from "../Content/AffiliateLayers/ProductPage";

import BlogPost from "./BlogPost";

import homeIcon1 from "../../assets/icons/10 godina poslovanja.webp";
import homeIcon2 from "../../assets/icons/Partnerstva.webp";
import homeIcon3 from "../../assets/icons/Gradovi.webp";
import homeIcon4 from "../../assets/icons/Besplatna isporuka.webp";

import { useBreadCrumbsUpdateContext } from "../Content/AffiliateLayers/Context/BreadCrumbsContext";
import { getImagePath } from "../../hooks/helpers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  categories,
  dates,
  href,
  latestNews,
  minuti_citanja,
  titles,
} from "./Blog";
import { baseApi } from "../../constants";
import axios from "axios";

export const contentStyle: React.CSSProperties = {
  height: "100px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundColor: "gray",
  position: "relative",
};

function Home() {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();
  useEffect(() => {
    routeHistoryUpdate(["Početna"]);

    const btn_left = document.getElementById("btn-left"),
      btn_right = document.getElementById("btn-right"),
      content = document.querySelector(".divProductScrollContainer");
    if (content && btn_left && btn_right) {
      const content_scroll_width = content.scrollWidth;
      let content_scoll_left = content.scrollLeft;

      btn_right.addEventListener("click", () => {
        content_scoll_left += 150;
        if (content_scoll_left >= content_scroll_width) {
          content_scoll_left = content_scroll_width;
        }
        content.scrollLeft = content_scoll_left;
      });

      btn_left.addEventListener("click", () => {
        content_scoll_left -= 150;
        if (content_scoll_left <= 0) {
          content_scoll_left = 0;
        }
        content.scrollLeft = content_scoll_left;
      });
    }
  }, []);
  const [productsList, setProductList] = useState<any[]>([]); //useState([]);//useState([...products]);

  // cookies modal
  const [showHowToScanModal, setShowHowToScanModal] = useState(false);
  const handleCancel = () => {
    setShowHowToScanModal(false);
  };

  const showHowToQRScan = () => {
    setShowHowToScanModal(true);
  };

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

  return (
    <div className="divHome">
      <Modal
        open={showHowToScanModal}
        closable={true}
        footer={[]}
        onCancel={handleCancel}
        cancelText="Ok"
      >
        <img
          src={HowToScanImg}
          style={{ maxHeight: "800px", width: "100%" }}
        ></img>
      </Modal>
      <div className="container divCarouselWrapper">
        <Carousel autoplay>
          <div style={contentStyle}>
            <img
              className="imgCarousel"
              src={window.innerWidth > 900 ? Slide3 : SlideMobile3}
            />
            <div className="block-slideshow__slide-content">
              <div className="block-slideshow__slide-title">
                Povećajte prodaju
              </div>
              {window.innerWidth > 900 && (
                <div className="block-slideshow__slide-text">
                  Predstavite naše proizvode klijentima uz pomoć naših polica
                  <br />
                  za izlaganje i tako unapredite svoju ponudu i prodaju
                </div>
              )}
              {window.innerWidth < 900 && (
                <div className="block-slideshow__slide-text">
                  Police za izlaganje proizvoda
                </div>
              )}

              <div className="block-slideshow__slide-button">
                <a
                  className="btn btn-primary btn-lg"
                  href="/blog/Unapredite-izlaganje-proizvoda-uz-naše-nove-police-za-izlaganje"
                >
                  Saznajte više
                </a>
              </div>
            </div>
          </div>
          <div style={contentStyle}>
            <img
              className="imgCarousel"
              src={window.innerWidth > 900 ? Slide1 : SlideMobile1}
            />
            <div className="block-slideshow__slide-content">
              <div className="block-slideshow__slide-title">
                Budite deo naše
                <br />
                Viber zajednice
              </div>
              {window.innerWidth > 900 && (
                <div className="block-slideshow__slide-text">
                  Čitajte zanimljive priče iz sveta gradnje i biznisa. <br />
                  Budite u toku o najnovijim akcijama, novim proizvodima <br />{" "}
                  i savetima. Skenirajte QR kod i pridružite se <br /> našem
                  Viber kanalu.
                </div>
              )}
              {window.innerWidth < 900 && (
                <div className="block-slideshow__slide-text">
                  Skenirajte QR kod ka našem Viber kanalu
                </div>
              )}
              <div className="block-slideshow__slide-button">
                <a
                  className="btn btn-primary btn-lg"
                  href="https://invite.viber.com/?g2=AQBDnLzKvJxteVELwHIA3kUJBGtdwFVrLtBn7POzb4O7duC7o0rdBewL%2FesuZxq8"
                >
                  Pridružite se
                </a>
              </div>
            </div>
          </div>
          {/* <div style={contentStyle}>
            <img   className="imgCarousel" src={window.innerWidth > 900 ? Slide2 : SlideMobile2}/>
            <div className="block-slideshow__slide-content">
              <div className="block-slideshow__slide-title">
              Skenirajte QR kod <br></br>
              u našem štampanom <br></br>
              katalogu
              </div>
              <div className="block-slideshow__slide-text">
                Pronađite detalje proizvoda na sajtu
              </div>
              <div className="block-slideshow__slide-button">
                <a className="btn btn-primary btn-lg" onClick={() => {showHowToQRScan()}}>
                  Kako skenirati
                </a>
              </div>
            </div>
          </div> */}
          <div style={contentStyle}>
            <img
              className="imgCarousel"
              src={window.innerWidth > 900 ? Slide4 : SlideMobile4}
            />
            <div className="block-slideshow__slide-content">
              <div className="block-slideshow__slide-title">Novo u ponudi</div>
              {window.innerWidth > 900 && (
                <div className="block-slideshow__slide-text">
                  Unapredite vaš prostor Saarpor zidnim <br /> i plafonskim
                  oblogama. Izvanredan dizajn i kvalitet <br /> koji
                  transformiše vaš prostor u estetski ugodno okruženje.
                </div>
              )}
              {window.innerWidth < 900 && (
                <div className="block-slideshow__slide-text">
                  Saarpor zidne i plafonske obloge
                </div>
              )}
              <div className="block-slideshow__slide-button">
                <a
                  className="btn btn-primary btn-lg"
                  href="/proizvodi#filteri=IZOLACIONE TAPETE I PLOČE&stranica=1"
                >
                  Pogledajte
                </a>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
      <div className="divOfferCardsContainer container">
        <div className="block-features__list">
          <div className="block-features__item">
            <div className="block-features__icon">
              <LazyLoadImage
                effect="blur"
                className="home-page-icon"
                src={homeIcon1}
                alt="home icon"
              />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">10</div>
              <div className="block-features__subtitle">Godina poslovanja</div>
            </div>
          </div>
          <div className="block-features__divider"></div>
          <div className="block-features__item">
            <div className="block-features__icon">
              <LazyLoadImage
                effect="blur"
                className="home-page-icon"
                src={homeIcon2}
                alt="home icon"
              />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">900+</div>
              <div className="block-features__subtitle">
                Zadovoljnih partnera
              </div>
            </div>
          </div>
          <div className="block-features__divider"></div>
          <div className="block-features__item">
            <div className="block-features__icon">
              <LazyLoadImage
                effect="blur"
                className="home-page-icon"
                src={homeIcon3}
                alt="home icon"
              />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">220+</div>
              <div className="block-features__subtitle">Gradova u Srbiji</div>
            </div>
          </div>
          <div className="block-features__divider"></div>
          <div className="block-features__item">
            <div className="block-features__icon">
              <LazyLoadImage
                effect="blur"
                className="home-page-icon"
                src={homeIcon4}
                alt="home icon"
                onContextMenu={() => {
                  return false;
                }}
              />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">20 000 dinara</div>
              <div className="block-features__subtitle">Besplatna dostava</div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="divFeaturedProductsContainer container"
        style={{ marginBottom: "20px" }}
      >
        {/* horizontal scroll list */}
        <div className="block-header" style={{ width: "100%" }}>
          <h3 className="block-header__title">Najprodavaniji artikli</h3>
          <div className="block-header__divider"></div>
          <>
            <LeftOutlined id="btn-left" />
            <RightOutlined id="btn-right" />
          </>
        </div>
        <div className="divProductScrollContainer">
          <Row style={{ width: "100%", flexWrap: "nowrap" }}>
            {/* {productsList.filter(product => Array.isArray(product.stiker) ? product.stiker.includes("NAJPRODAVANIJI") : product.stiker === "NAJPRODAVANIJI").map((product, index) => { */}
            {productsList.map((product, index) => {
              const imagePath = getImagePath(product as Product);
              return (
                <ProductCard
                  key={index}
                  product={product as Product}
                  picture={`${baseApi}/assets/products/` + imagePath + ".webp"}
                ></ProductCard>
              );
            })}
          </Row>
        </div>
      </div>

      <div className="divLatestNewsContainer container">
        <div className="block-header" style={{ width: "100%" }}>
          <h3 className="block-header__title">Blog</h3>
          <div className="block-header__divider"></div>
        </div>
        <div className="divHomeFlexBlogPostsContainer">
          {latestNews.map((news, index) => (
            <BlogPost
              key={index}
              {...{
                image: news,
                title: titles[index],
                category: categories[index],
                author: "Gromet",
                date: dates[index],
                href: href[index],
                readTime: `${minuti_citanja[index]} minuta čitanja`,
              }}
            ></BlogPost>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
