import "./ProductPage.css";
import React, { useEffect, useRef, useState } from "react";
import { useBreadCrumbsUpdateContext } from "./Context/BreadCrumbsContext";

//import products from './EditLayer/products.json';
import "./ProductPageEdit.css";

import "react-photoswipe/lib/photoswipe.css";
import { getImagePath } from "../../../hooks/helpers";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-image-gallery/styles/css/image-gallery.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { preventImgRightClick } from "../../../helpers/helpers";
import { Helmet } from "react-helmet";
import { baseApi } from "../../../constants";
import axios, { AxiosResponse } from "axios";

export interface Product {
  _id: string;
  polje_id: string;
  sifra_proizvoda: string | Array<string>;
  naziv_artikla: string;
  naziv_proizvoda_model: string | Array<string>;
  varijacije: Array<string>;
  meta_description: string;
  prosireni_opis: string;
  jedinica_mere: string;
  kategorija_artikla: string;
  potkategorija: string;
  minimalno_pakovanje: string;
  transportno_pakovanje: string | Array<string>;
  zapremina: string;
  kvadratura: string;
  sirina: string;
  duzina: string;
  visina: string;
  precnik: string;
  debljina: string;
  tezina: string;
  sastav: string;
  boja: string;
  tehnicki_crtez: string;
  tip_otpornosti: string;
  garancija: string;
  rok_trajanja: string;
  sertifikat: string;
  mesto_i_nacin_skladistenja: string;
  dimenzije_pakovanja: string;
  prateca_oprema_dodaci: string;
  dodatne_napomene: string;
  mesta_primene: string;
  nacin_ugradnje: string;
  stiker: string | string[];
  qr_kod: string;
  slike: string | Array<string>;
  url: string;
  model_vise_slika: string;
  count: number;
  price: number;
}

interface DataType {
  key: React.Key;
  name: string;
  affiliate: string;
  layerType: string;
  color: JSX.Element;
  actions: JSX.Element;
}

const startingHistory = [
  "L1NDA Planner",
  "Domain Settings",
  "Affiliate layers",
];

type DataIndex = keyof DataType;

function ProductPage() {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();
  const [dimensionChosen, setDimensionChosen] = useState<number>(0);
  const [productsList, setProductList] = useState<Product[]>([]); //useState([]);//useState([...products]);
  const [product, setProduct] = useState<Product>({} as Product);
  const naziv_artikla_Ref = useRef<HTMLInputElement>(null);
  const jedinica_mere_Ref = useRef<HTMLInputElement>(null);
  const kategorija_artikla_Ref = useRef<HTMLInputElement>(null);
  const transportno_pakovanje_Ref = useRef<HTMLInputElement>(null);
  const potkategorija_Ref = useRef<HTMLInputElement>(null);
  const minimalno_pakovanje_Ref = useRef<HTMLInputElement>(null);
  const meta_description_Ref = useRef<HTMLInputElement>(null);
  const kvadratura_Ref = useRef<HTMLInputElement>(null);
  const prosireni_opis_Ref = useRef<HTMLInputElement>(null);
  const sertifikat_Ref = useRef<HTMLInputElement>(null);
  const sirina_Ref = useRef<HTMLInputElement>(null);
  const tezina_Ref = useRef<HTMLInputElement>(null);
  const visina_Ref = useRef<HTMLInputElement>(null);
  const debljina_Ref = useRef<HTMLInputElement>(null);
  const duljina_Ref = useRef<HTMLInputElement>(null);
  const sastav_Ref = useRef<HTMLInputElement>(null);
  const boja_Ref = useRef<HTMLInputElement>(null);
  const tip_otpornosti_Ref = useRef<HTMLInputElement>(null);
  const mesto_i_nacin_skladistenja_Ref = useRef<HTMLInputElement>(null);
  const count_Ref = useRef<HTMLInputElement>(null);
  const price_Ref = useRef<HTMLInputElement>(null);
  const [modelcntvalue, setmodelcntvalue] = useState(1);
  const [selectedFile, setSelectedFile] = useState<any>([]);

  const fetchProducts = async () => {
    try {
      const token: string | null = localStorage.getItem("accessToken");
      if (token) {
        return await axios
          .get(`${baseApi}/products/getProducts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            return res.data.data;
          })
          .catch((err) => {});
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleFileChange = (event: any) => {
    const files = event.target.files;
    setSelectedFile([...files]);
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    window.addEventListener("click", (e: any) => {
      if (!e.target.classList.contains("divProductActionQuantityText")) {
      }
      if (!e.target.classList.contains("spanTroskoviIsporuke")) {
      }
      if (!e.target.classList.contains("productPageShareIconLabelButton")) {
      }
    });

    const btn_left = document.getElementById("btn-left"),
      btn_right = document.getElementById("btn-right"),
      btn_left2 = document.getElementById("btn-left2"),
      btn_right2 = document.getElementById("btn-right2"),
      content = document.querySelector(".divProductScrollContainer"),
      content2 = document.querySelector(".divProductScrollContainer2");
    // console.log(btn_left, btn_right, content, content2)
    if (
      content &&
      btn_left &&
      btn_right &&
      btn_left2 &&
      btn_right2 &&
      content2
    ) {
      const content_scroll_width = content.scrollWidth;
      let content_scoll_left = content.scrollLeft;

      const content2_scroll_width = content2.scrollWidth;
      let content2_scroll_left = content2.scrollLeft;
      btn_right.addEventListener("click", () => {
        // console.log("first right clicked", content_scoll_left, content_scroll_width)
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

      btn_right2.addEventListener("click", () => {
        content2_scroll_left += 150;
        if (content2_scroll_left >= content2_scroll_width) {
          content2_scroll_left = content2_scroll_width;
        }
        content2.scrollLeft = content2_scroll_left;
      });

      btn_left2.addEventListener("click", () => {
        content2_scroll_left -= 150;
        if (content2_scroll_left <= 0) {
          content2_scroll_left = 0;
        }
        content2.scrollLeft = content2_scroll_left;
      });
    }
    preventImgRightClick();
    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) =>
      img.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      })
    );
  }, []);

  useEffect(() => {
    fetchProducts().then((productlist) => {
      setProductList(productlist);

      const indexSlash = window.location.pathname.lastIndexOf("proizvod/edit");
      const id = decodeURI(
        window.location.pathname.substring(
          indexSlash + 1 + "proizvod/edit".length - 1
        )
      );
      const product = productlist.find(
        (product: Product) => product?.url === id
      );
      // console.log(`${baseApi}/assets/products/` + getImagePath(product as Product, 0) + '.webp')
      let arr: any = [];
      product.slike.split(",").map(async function (slike: any, index: any) {
        // async function rr() {
        const response = await fetch(
          `${baseApi}/assets/products/` +
            getImagePath(product as Product, index) +
            ".webp"
        ); // Replace with the URL of your image
        const blob = await response.blob();
        const newFile = new File(
          [blob],
          getImagePath(product as Product, index) + ".webp",
          { type: blob.type }
        );
        arr.push(newFile);
        console.log(index, arr);
        // }
        // rr()
      });
      setTimeout(() => {
        setSelectedFile(arr);
      }, 1500);
      console.log(arr);
      if (product) {
        document.title = product.naziv_artikla;
        // setTimeout(() => {
        setProduct(product as Product);
        if (!window.location.hash) {
          // window.location.hash = product?.sifra_proizvoda[dimensionChosen];
        } else if (Array.isArray(product.sifra_proizvoda)) {
          // const hashValue = window.location.hash.substring(1);
          const index = getDimensionIndex();
          //console.log("hashValue", index);
          setDimensionChosen(index);
        }
        naziv_artikla_Ref.current &&
          (naziv_artikla_Ref.current.value = product?.naziv_artikla);
        jedinica_mere_Ref.current &&
          (jedinica_mere_Ref.current.value = product?.jedinica_mere);
        kategorija_artikla_Ref.current &&
          (kategorija_artikla_Ref.current.value = product?.kategorija_artikla);
        transportno_pakovanje_Ref.current &&
          (transportno_pakovanje_Ref.current.value =
            product?.transportno_pakovanje);
        potkategorija_Ref.current &&
          (potkategorija_Ref.current.value = product?.potkategorija);
        minimalno_pakovanje_Ref.current &&
          (minimalno_pakovanje_Ref.current.value =
            product?.minimalno_pakovanje);
        meta_description_Ref.current &&
          (meta_description_Ref.current.value = product?.meta_description);
        kvadratura_Ref.current &&
          (kvadratura_Ref.current.value = product?.kvadratura);
        prosireni_opis_Ref.current &&
          (prosireni_opis_Ref.current.value = product?.prosireni_opis);
        sertifikat_Ref.current &&
          (sertifikat_Ref.current.value = product?.sertifikat);
        sirina_Ref.current && (sirina_Ref.current.value = product?.sirina);
        tezina_Ref.current && (tezina_Ref.current.value = product?.tezina);
        visina_Ref.current && (visina_Ref.current.value = product?.visina);
        duljina_Ref.current && (duljina_Ref.current.value = product?.duljina);
        sastav_Ref.current && (sastav_Ref.current.value = product?.sastav);
        sastav_Ref.current && (sastav_Ref.current.value = product?.sastav);
        boja_Ref.current && (boja_Ref.current.value = product?.boja);
        tip_otpornosti_Ref.current &&
          (tip_otpornosti_Ref.current.value = product?.tip_otpornosti);
        mesto_i_nacin_skladistenja_Ref.current &&
          (mesto_i_nacin_skladistenja_Ref.current.value =
            product?.mesto_i_nacin_skladistenja);
        count_Ref.current && (count_Ref.current.value = product?.count);
        price_Ref.current && (price_Ref.current.value = product?.price);
        setmodelcntvalue(product.sifra_proizvoda.length);
        let modelcnt: any = document.getElementById(`modelcnt`);
        modelcnt.value = product.sifra_proizvoda.length;
        for (let i = 0; i < product.sifra_proizvoda.length; i++) {
          let sifra_input: any = document.getElementById(`sifra_proizvoda${i}`);
          let naziv_input: any = document.getElementById(
            `naziv_proizvoda_model${i}`
          );
          sifra_input.value = product.sifra_proizvoda[i];
          naziv_input.value = product.naziv_proizvoda_model[i];
        }
      }
    });
    routeHistoryUpdate(["Početna", "Proizvodi", product?.naziv_artikla]);
  }, []);
  const handleSubmit = async () => {
    const allElements: any = document.getElementsByTagName("input");
    const arrayCode: any = [];
    const arrayModel: any = [];
    for (var i = 0; i < allElements.length; i++) {
      if (
        allElements[i].id &&
        allElements[i].id.indexOf("sifra_proizvoda") == 0
      ) {
        arrayCode.push(allElements[i].value);
      }
      if (
        allElements[i].id &&
        allElements[i].id.indexOf("naziv_proizvoda_model") == 0
      ) {
        arrayModel.push(allElements[i].value);
      }
    }
    try {
      const token: string | null = localStorage.getItem("accessToken");
      if (token) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const formData = new FormData();

        //formData.append('file', selectedFile);

        for (let index = 0; index < selectedFile?.length; index++) {
          const file = selectedFile[index];
          formData.append(`files`, file); // Append each file with a unique key
        }
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        const body: any = {
          polje_id: "/",
          varijacije: "/",
          stiker: "/",

          garancija: "/",
          tehnicki_crtez: "/",
          model_vise_slika: "FALSE",
          dimenzije_pakovanja: "/",
          mesta_primene: "/",
          nacin_ugradnje: "/",
          zapremina: "/",
          precnik: "/",
          rok_trajanja: "/",
          dodatne_napomene: "/",
        };
        // body.url = '/' + uniqueSuffix;

        for (const key in body) {
          formData.append(key, body[key]);
        }
        formData.append("sifra_proizvoda", JSON.stringify(arrayCode));
        formData.append("naziv_proizvoda_model", JSON.stringify(arrayModel));

        formData.append(
          "naziv_artikla",
          naziv_artikla_Ref.current?.value || "/"
        );
        formData.append(
          "jedinica_mere",
          jedinica_mere_Ref.current?.value || "/"
        );
        formData.append(
          "kategorija_artikla",
          kategorija_artikla_Ref.current?.value || "/"
        );
        formData.append(
          "transportno_pakovanje",
          transportno_pakovanje_Ref.current?.value || "/"
        );
        formData.append(
          "potkategorija",
          potkategorija_Ref.current?.value || "/"
        );
        formData.append(
          "minimalno_pakovanje",
          minimalno_pakovanje_Ref.current?.value || "/"
        );
        formData.append(
          "meta_description",
          meta_description_Ref.current?.value || "/"
        );
        formData.append("kvadratura", kvadratura_Ref.current?.value || "/");
        formData.append(
          "prosireni_opis",
          prosireni_opis_Ref.current?.value || "/"
        );
        formData.append("sertifikat", sertifikat_Ref.current?.value || "/");
        formData.append("sirina", sirina_Ref.current?.value || "/");
        formData.append("tezina", tezina_Ref.current?.value || "/");
        formData.append("visina", visina_Ref.current?.value || "/");
        formData.append("debljina", debljina_Ref.current?.value || "/");
        formData.append("duljina", duljina_Ref.current?.value || "/");
        formData.append("sastav", sastav_Ref.current?.value || "/");
        formData.append("boja", boja_Ref.current?.value || "/");
        formData.append(
          "tip_otpornosti",
          tip_otpornosti_Ref.current?.value || "/"
        );
        formData.append(
          "mesto_i_nacin_skladistenja",
          mesto_i_nacin_skladistenja_Ref.current?.value || "/"
        );
        formData.append("count", count_Ref.current?.value || "/");
        formData.append("price", price_Ref.current?.value || "/");

        formData.append(
          "potkategorija_lista",
          potkategorija_Ref.current?.value || "/"
        );

        if (
          selectedFile === null ||
          formData.get("naziv_artikla") === "/" ||
          formData.get("count") === "0"
        ) {
          alert("ERROR");
        } else {
          return await axios
            .post(
              `${baseApi}/products/updateProduct?id=${product._id}`,
              formData,
              header
            )
            .then((res) => {
              alert("Updated Successfully");
              return res.data.data;
            })
            .catch((err) => {});
        }
      }
    } catch (error) {
      console.error("Error create new product:", error);
    }
  };
  const getDimensionIndex = () => {
    let index = 0;
    if (product.sifra_proizvoda) {
      if (!window.location.hash) {
      } else if (Array.isArray(product.sifra_proizvoda)) {
        const hashValue = window.location.hash.substring(1);
        index = product.sifra_proizvoda.indexOf(hashValue);
      }
    }
    return index;
  };

  useEffect(() => {
    window.onpopstate = (e) => {
      const index = getDimensionIndex();
      setDimensionChosen(index);
    };
  });
  const ref1 = useRef<HTMLDivElement>(null);
  const hideBackToTop = (hide: boolean) => {
    const button = document.querySelector("#myBtn");
    (button as HTMLButtonElement).style.display = hide ? "none" : "flex";
  };
  const [openPhotoSwipe, setOpenPhotoSwipe] = useState<boolean>(false);
  const zoomImagePath = getImagePath(product as Product);

  const imagePath = getImagePath(product as Product);

  const imageSrc = `${baseApi}/assets/products/` + imagePath + ".webp";
  function cnthandlechange(value: number) {
    setmodelcntvalue(value);
  }
  const handleProductImgThumbnailSelected = (e: any) => {
    const parent = document.querySelector(".small-products-images");
    const previous = document.querySelectorAll(
      ".divProductImgSelectedThumbnail"
    );
    previous.forEach((prev) =>
      prev.classList.remove("divProductImgSelectedThumbnail")
    );
    const divSelected = e as HTMLImageElement;
    divSelected.classList.add("divProductImgSelectedThumbnail");
    const showCaseImg = document.querySelector(
      "#productShowcaseImage"
    ) as HTMLImageElement;
    if (showCaseImg) {
      showCaseImg.src = divSelected.src;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const wrapper = document.querySelector(".yarl__fullsize");
      if (wrapper) {
        wrapper?.addEventListener("click", (e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains("yarl__slide_image")) {
            return;
          }
          setOpenPhotoSwipe(false);
        });
      }
    }, 100);
    // }, 2500);
  }, [openPhotoSwipe]);

  const zoomRef: any = React.useRef(null);
  const thumbnailsRef: any = React.useRef(null);

  useEffect(() => {
    const SelectedImgs = document.querySelectorAll(".divProductImg");
    SelectedImgs.forEach((img, index) => {
      if (dimensionChosen !== index)
        img.classList.remove("divProductImgSelectedThumbnail");
      img.parentElement!.classList.remove("divProductImgSelectedThumbnail");
    });
  }, [dimensionChosen]);

  return (
    <div className="singleProductPageContainer container">
      <Helmet>
        <title>{product?.naziv_artikla}</title>
        <meta name="description" content={product.meta_description} />
        <meta
          property="og:image"
          content={`${baseApi}/assets/products/` + zoomImagePath + ".webp"}
        />
      </Helmet>
      {product && product.slike && (
        <Lightbox
          animation={{ swipe: 0, zoom: 3 }}
          open={openPhotoSwipe}
          close={() => setOpenPhotoSwipe(false)}
          carousel={{ preload: 1, finite: true }}
          slides={
            Array.isArray(product.slike) && !product.slike[0].includes(",")
              ? [
                  {
                    src: (ref1?.current?.childNodes[0].childNodes[0] as any)
                      ?.src,
                  },
                  ...product.slike.map((img: any, index: number) => {
                    return {
                      src: "${baseApi}/assets/products/" + img + ".webp",
                    };
                  }),
                ]
              : Array.isArray(product.slike) && product.slike[0].includes(",")
              ? product.slike
                  .map((item) => {
                    return item.split(",").map((subitem) => {
                      return {
                        src: `${baseApi}/assets/products/` + subitem + ".webp",
                      };
                    });
                  })
                  .flat()
              : !Array.isArray(product.slike) &&
                product?.slike &&
                product?.slike?.includes(",")
              ? [
                  ...product?.slike
                    ?.split(",")
                    .map((img: any, index: number) => {
                      return {
                        src: `${baseApi}/assets/products/` + img + ".webp",
                      };
                    }),
                ]
              : [
                  {
                    src:
                      `${baseApi}/assets/products/` + zoomImagePath + ".webp",
                  },
                ]
          }
          plugins={[Counter, Slideshow, Zoom, Thumbnails]}
          zoom={{ ref: zoomRef, zoomInMultiplier: 10, scrollToZoom: true }}
          thumbnails={{
            ref: thumbnailsRef,
            position: "bottom",
            width: 80,
            height: 120,
            border: 1,
            borderRadius: 4,
            padding: 4,
            gap: 16,
            showToggle: false,
          }}
          slideshow={{ autoplay: false }}
          on={{
            click: () => {},
          }}
        />
      )}

      {!openPhotoSwipe && (
        <>
          <div className="productPageProductContainer">
            {/* left side of product page top level section */}
            <div className="divProductContainer">
              <div className="divProductImgSelected" ref={ref1}>
                <LazyLoadImage
                  effect="blur"
                  id={"productShowcaseImage"}
                  onClick={() => {
                    hideBackToTop(true);
                    setOpenPhotoSwipe(true);
                  }}
                  alt={product?.naziv_artikla}
                  src={
                    selectedFile.length &&
                    URL.createObjectURL(selectedFile[dimensionChosen])
                  }
                  onContextMenu={() => {
                    return true;
                  }}
                />
              </div>

              <div className="small-products-images divSmallProductImagesModelViseSlika">
                {/* {(product?.model_vise_slika !== "TRUE") && !Array.isArray(product?.slike) && product?.slike && !product?.slike?.includes(',') && (
                  <div className='divProductImg divProductImgSelectedThumbnail' style={{ border: "2px solid #004d8c" }}>
                    <LazyLoadImage
                      effect='blur'
                      onClick={() => { }}
                      alt={product?.naziv_artikla}
                      // src={imageSrc}
                      src={selectedFile.length && URL.createObjectURL(selectedFile[index])}
                      onContextMenu={() => { return true }}
                    />
                  </div>
                )} */}
                {selectedFile.length &&
                  selectedFile.map((slike: string, index: any) => {
                    return (
                      <div
                        key={slike + index}
                        id={slike + index}
                        data-index={index}
                        className={`divProductImg ${
                          index === dimensionChosen
                            ? "divProductImgSelectedThumbnail"
                            : ""
                        }`}
                        onClick={(e) => {
                          handleProductImgThumbnailSelected(e.target);
                        }}
                      >
                        <LazyLoadImage
                          effect="blur"
                          alt={product?.naziv_artikla}
                          src={URL.createObjectURL(selectedFile[index])}
                        />
                      </div>
                    );
                  })}
                {/* {product?.model_vise_slika !== "TRUE" && !Array.isArray(product?.slike) && product?.slike?.includes(',') &&
                    product?.slike?.split(',').map((slike: string, index) => {
                      return (
                        <div
                          key={slike + index}
                          id={slike + index}
                          data-index={index}
                          className={`divProductImg ${index === dimensionChosen ? 'divProductImgSelectedThumbnail' : ''
                            }`}
                          onClick={(e) => {
                            handleProductImgThumbnailSelected(e.target);
                          }}
                        >
                          <div>{
                            selectedFile.length && <LazyLoadImage
                              effect='blur'
                              alt={product?.naziv_artikla}
                              // src={
                              //   `${baseApi}/assets/products/` +
                              //   getImagePath(product as Product, index) +
                              //   '.webp'
                              // }
                              src={URL.createObjectURL(selectedFile[0])}

                            />}</div>
                        </div>
                      );
                    })} */}
              </div>
            </div>
            <div className="productPageDescriptionContainer">
              <input
                id="image-btn"
                className="input-edit-field"
                type="file"
                accept=".webp"
                onChange={handleFileChange}
                style={{ display: "none" }}
                multiple
              />

              <button
                onClick={() => {
                  document.getElementById("image-btn")?.click();
                }}
                className="btn-add"
              >
                Change Images
              </button>

              <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                <div className="input-edit-form">
                  <label className="label-edit-name ">
                    item_name<span className="color-red">*</span>
                  </label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="naziv_artikla"
                    name="item_name"
                    ref={naziv_artikla_Ref}
                  />
                </div>
                {/* <div className="input-edit-form">
                  <label className="label-edit-name ">images</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    value={JSON.stringify(selectedFile)}
                    readOnly
                  />
                </div> */}
                <div className="input-edit-form">
                  <label className="label-edit-name ">unit_of_measure</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="jedinica_mere"
                    ref={jedinica_mere_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">
                    item_category<span className="color-red">*</span>
                  </label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="kategorija_artikla"
                    ref={kategorija_artikla_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">
                    transport_packaging
                  </label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="transportno_pakovanje"
                    ref={transportno_pakovanje_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">subcategory</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="potkategorija"
                    ref={potkategorija_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">subcategory_list</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="subcategory_list"
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">minimum_pack</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="minimalno_pakovanje"
                    ref={minimalno_pakovanje_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">meta_description</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="meta_description"
                    ref={meta_description_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">square footage</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="kvadratura"
                    ref={kvadratura_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">
                    extended_description
                  </label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="prosireni_opis"
                    ref={prosireni_opis_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">certificate</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="sertifikat"
                    ref={sertifikat_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">
                    modelcnt<span className="color-red">*</span>
                  </label>
                  <input
                    className="input-edit-field"
                    type="number"
                    id="modelcnt"
                    min="1"
                    max="10"
                    defaultValue={modelcntvalue}
                    onChange={(e) => {
                      cnthandlechange(Number(e.target.value));
                    }}
                  />
                </div>

                <div className="input-edit-form">
                  <label className="label-edit-name ">width</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="sirina"
                    ref={sirina_Ref}
                  />
                </div>

                <div className="input-edit-form">
                  <label className="label-edit-name ">
                    product_code<span className="color-red">*</span>
                  </label>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {[...Array(Number(modelcntvalue))].map((_, index) => (
                      <div key={index}>
                        <input
                          className="input-edit-field"
                          type="text"
                          id={"sifra_proizvoda" + index}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="input-edit-form">
                  <label className="label-edit-name ">weight</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id={"tezina"}
                    ref={tezina_Ref}
                  />
                </div>

                <div className="input-edit-form">
                  <label className="label-edit-name ">
                    product_name_model<span className="color-red">*</span>
                  </label>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {[...Array(Number(modelcntvalue))].map((_, index) => (
                      <div key={index}>
                        <input
                          className="input-edit-field"
                          type="text"
                          id={"naziv_proizvoda_model" + index}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="input-edit-form">
                  <label className="label-edit-name ">height</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="visina"
                    ref={visina_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">thickness</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="debljina"
                    ref={debljina_Ref}
                  />
                </div>
                <div
                  style={{
                    fontSize: "12pt",
                    alignItems: "center",
                    width: "50%",
                    display: "none",
                  }}
                >
                  <label className="label-edit-name ">length</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="duljina"
                    ref={duljina_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">composition</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="sastav"
                    ref={sastav_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">color</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="boja"
                    ref={boja_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">resistance_type</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="tip_otpornosti"
                    ref={tip_otpornosti_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">
                    place_and_method_of_storage
                  </label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="mesto_i_nacin_skladistenja"
                    ref={mesto_i_nacin_skladistenja_Ref}
                  />
                </div>
                <div className="input-edit-form">
                  <label className="label-edit-name ">
                    count<span className="color-red">*</span>
                  </label>
                  <input
                    className="input-edit-field"
                    type="number"
                    defaultValue={0}
                    id="count"
                    ref={count_Ref}
                  />
                </div>

                <div className="input-edit-form">
                  <label className="label-edit-name ">
                    price<span className="color-red">*</span>
                  </label>
                  <input
                    className="input-edit-field"
                    type="number"
                    defaultValue={0}
                    id="price"
                    ref={price_Ref}
                  />
                </div>
              </div>
              <div style={{ display: "none" }}>
                <div
                  style={{
                    fontSize: "12pt",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <label className="label-edit-name ">ancestor</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id={"ancestor"}
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">lifetime</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="lifetime"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">
                    prateca_oprema_dodaci
                  </label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="prateca_oprema_dodaci"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">additional_notes</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="additional_notes"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">
                    ----------CUSTOMIZE----------
                  </label>
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">sticker</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="sticker"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">variation</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="variation"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">url</label>
                  <input className="input-edit-field" type="text" id="url" />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">
                    ----------RANDOM----------
                  </label>
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">field_id</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="field_id"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">qr_kod</label>
                  <input className="input-edit-field" type="text" id="qr_kod" />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">
                    ----------DEFAULT VALUE----------
                  </label>
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">guarantee</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="guarantee"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">technical drawing</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="technical_drawing"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">model_more_images</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    defaultValue={"FALSE"}
                    id="model_more_images"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">package_dimensions</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="package_dimensions"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">application_places</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="application_places"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">installation_mode</label>
                  <input
                    className="input-edit-field"
                    type="text"
                    id="installation_mode"
                  />
                </div>
                <div style={{ fontSize: "12pt", alignItems: "center" }}>
                  <label className="label-edit-name ">volume</label>
                  <input className="input-edit-field" type="text" id="volume" />
                </div>
              </div>
              <button onClick={handleSubmit} className="btn-add">
                Update Product
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductPage;
