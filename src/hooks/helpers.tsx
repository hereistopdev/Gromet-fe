
import { Product } from '../components/Content/AffiliateLayers/ProductPage'

export function getImagePath(product :Product, index=0) {
  const hasImageVariations :boolean = product && product?.varijacije?.includes("slike") && Array.isArray(product?.slike);
  const hasMultipleImages :boolean = product && !product?.varijacije?.includes("slike") && product?.slike?.includes(',');
  
  const imgName =  product?.slike && product?.slike[index ? index : 0] ? product?.slike[index ? index : 0] : product?.slike as string;
  return `${ hasImageVariations ? imgName.includes(',') ? imgName.split(',')[index] : imgName : hasMultipleImages ? (product?.slike as string).split(',')[index] : product?.slike}`
}

export function checkIfImageExists(url :string) {
  const img = new Image();
  img.src = url;
  
  if (img.complete) {
    return true
  } else {
    img.onload = () => {
      return true
    };
    
    img.onerror = () => {
      return false
    };
  }
}

export const CopyToClipboard = (toCopy :string) => {

  const el = document.createElement(`textarea`);

  el.value = toCopy;

  el.setAttribute(`readonly`, ``);

  el.style.position = `absolute`;

  el.style.left = `-9999px`;

  document.body.appendChild(el);

  el.select();

  document.execCommand(`copy`);

  document.body.removeChild(el);

}
