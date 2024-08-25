import React from 'react'
import { Product } from '../Content/AffiliateLayers/ProductPage';
import './SearchResultItem.css';
import { getImagePath } from '../../hooks/helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { baseApi } from '../../constants';
function SearchResultItem({product} :any) {


    const imagePath = getImagePath(product as Product); 
  return (
        <a href={`/proizvod${product?.url}`}>
            <div className='divSearchResultContainer'>
                <div className='divSearchResultImageContainer'>
                    <LazyLoadImage effect="blur"
                    src={`${baseApi}/assets/products/`+imagePath+".webp"}
                    />
                </div>
                <div className='divSearchResultItemColumn'>
                    <div className='divSearchResultItemColumnTitle'>{window.innerWidth < 500 ? String(product.naziv_artikla).substring(0,35)+"..." : product.naziv_artikla}</div>
                    <div className='divSearchResultItemColumnCode'>
                        Ukupno modela:  {Array.isArray(product?.naziv_proizvoda_model)
                                  ? product?.sifra_proizvoda.length
                                  : 1}</div>
                </div>
            </div>
        </a>
  )
}

export default SearchResultItem