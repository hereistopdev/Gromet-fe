import React, { useEffect, useState } from 'react';

import { Card, Image, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';


import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Product } from '../Content/AffiliateLayers/ProductPage';
import { useBreadCrumbsUpdateContext } from '../Content/AffiliateLayers/Context/BreadCrumbsContext';
import { getImagePath } from '../../hooks/helpers';
import { baseApi } from '../../constants';
import axios from 'axios';


const { Meta } = Card;

function JsonView() {
  const navigate = useNavigate();
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token: string | null = localStorage.getItem('accessToken');
    if (token) {
      axios.get(`${baseApi}/products/getProducts`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }).then(res => {
        if (res.data.data)
          setProducts(res.data.data);
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="page-header__title" style={{ marginLeft: '0px' }}>
        <h1
          style={{ marginTop: '0px', marginBottom: '30px', fontWeight: '700' }}
        >
          Novo u ponudi
        </h1>
      </div>
      <div
        className="SSPEditAffiliateLayerContainer container"
        style={{ padding: '0px 0px 0px 0px' }}
      >
        <div className="productPageContainer">
          <div className="divProductStoreContainer container jsonViewContainer" style={{ marginLeft: "0px !important" }}>
            {products.filter((product: any) => product?.stiker.includes("NOVO") || Array.from(product?.stiker).includes("NOVO")).map((product: any, index: number) => {
              const stickerIndex = Array.from(product?.stiker).indexOf("NOVO");
              // console.log("aaa", stickerIndex, product.naziv_artikla)
              const imagePath = getImagePath(product as Product, stickerIndex === -1 ? undefined : stickerIndex);
              return (
                <div style={{ position: 'relative' }}>
                  <div className="product-card__badges-list">
                    <div className="product-card__badge product-card__badge--new">
                      NOVO
                    </div>
                  </div>
                  <Card
                    key={index}
                    onClick={() => {
                      navigate(`/proizvod${product?.url}`);
                    }}
                    hoverable
                    style={{
                      width: '270px',
                      textAlign: 'left',
                      justifyContent: 'left',
                      alignContent: 'left',
                      alignItems: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      maxHeight: '450px',
                      overflow: 'clip',
                      // paddingLeft: '5px',
                      whiteSpace: 'pre-line',
                      borderRadius: '0px',
                    }}
                    cover={
                      <LazyLoadImage effect="blur"
                        alt={product?.naziv_artikla}
                        src={`${baseApi}/assets/products/` + imagePath + '.webp'}
                      // src={   
                      //   pictures.find((el: any) => el.name === product?.naziv_artikla)
                      //     ?.picture
                      // }
                      />
                    }
                  >
                    <Meta
                      title={
                        <div className="product-card__code">
                          {'Sifra: '}{' '}
                          <strong
                            style={{ color: '#004D8C', marginLeft: '2px' }}
                          >
                            {product && Array.isArray(product?.stiker) &&
                              Array.isArray(product?.sifra_proizvoda)
                              ? product?.sifra_proizvoda[stickerIndex]
                              : !Array.isArray(product?.stiker) &&
                                Array.isArray(product?.sifra_proizvoda) ? product?.sifra_proizvoda[0] : product?.sifra_proizvoda}
                          </strong>
                        </div>
                      }
                      description={
                        <div className="product-card__name">
                          <a href={`/proizvod${product.url}`}>
                            {product?.naziv_artikla}
                          </a>
                          {/* <p>{product?.meta_description}</p> */}
                          {product?.meta_description && !Array.isArray(product?.meta_description) &&
                            product?.meta_description.length > 5 && (
                              <p>{product?.meta_description}</p>
                            )}
                          {product?.meta_description &&
                            Array.isArray(product?.meta_description) && (
                              <p>{product?.meta_description[0]}</p>
                            )}
                        </div>
                      }
                    />
                  </Card>
                </div>
              );
            })}
            {/* <div className="shop-pagination">
              <Pagination defaultCurrent={1} total={10} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JsonView;
