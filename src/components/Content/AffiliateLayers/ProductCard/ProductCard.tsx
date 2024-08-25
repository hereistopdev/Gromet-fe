import React, { useState } from "react";
import "./ProductCard.css";
import productPicture from "../../../../assets/products/a.webp";
import {
  HeartFilled,
  SignalFilled,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Rate, Row } from "antd";
import { Product } from "../ProductPage";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ProductCard({
  product,
  picture,
  hideSticker,
}: {
  product: Product;
  picture: string;
  hideSticker?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="product-card product-card--hidden-actions"
      style={{ height: "280px", maxWidth: "220px" }}
    >
      {/* <button className='product-card__quickview' type='button'>
        <svg width='16px' height='16px'>
          <use href='images/sprite.svg#quickview-16'></use>
        </svg>
        <span className='fake-svg-icon'></span>
      </button> */}
      {!hideSticker && (
        <div className="product-card__badges-list">
          <div
            className={
              window.location.pathname.toLowerCase().includes("proizvodi")
                ? "product-card__badge product-card__badge--new"
                : "product-card__badge product-card__badge--hot"
            }
          >
            {window.location.pathname.toLowerCase().includes("proizvodi")
              ? "NOVO"
              : "NAJPRODAVANIJI"}
          </div>
        </div>
      )}
      <div className="product-card__image product-image">
        <a
          href={`/proizvod${product?.url}`}
          className="product-image__body"
          onContextMenu={() => {
            return false;
          }}
        >
          <LazyLoadImage
            className="product-image__img"
            src={picture}
            alt={product?.naziv_artikla}
            effect="blur"
            onContextMenu={() => {
              return false;
            }}
          />
        </a>
      </div>
      <div className="product-card__info">
        <div className="product-card__code">
          {"Šifra: "}{" "}
          <strong style={{ color: "#004d8c", marginLeft: "2px" }}>
            {product && Array.isArray(product?.sifra_proizvoda)
              ? product?.sifra_proizvoda[0]
              : product?.sifra_proizvoda}
          </strong>
        </div>
        <div className="product-card__name">
          <a href={`/proizvod${product?.url}`}>{product?.naziv_artikla}</a>
        </div>
        {/* <div className="product-card__rating">
                    <div className="product-card__rating-stars">
                    
                        <StarFilled style={{color:'yellow'}}/>
                        <StarFilled style={{color:'yellow'}}/>
                        <StarFilled style={{color:'yellow'}}/>
                        <StarFilled style={{color:'yellow'}}/>
                        <StarOutlined />
                    </div>
                    <div className="product-card__rating-legend">9 Reviews</div>
                </div> */}
      </div>
      {/* <div className="product-card__actions">
            <div className="product-card__prices">$749.00</div>
            <div style={{display: expanded ? "flex" : "none", maxWidth: "200px"}} className="product-card__buttons">
                <button className="btn btn-primary product-card__addtocart" type="button">Add To Cart</button>
                <button className="btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist" style={{ maxWidth:"10%"}} type="button">
                    <HeartFilled />
                </button>
                <button className="btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__compare" style={{ maxWidth:"10%"}} type="button">
                    <SignalFilled />
                </button>
            </div>
        </div> */}
    </div>
  );
}

export default ProductCard;
