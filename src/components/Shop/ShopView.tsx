import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import FileInputComponent from "./FileInputComponent"; // Update the path accordingly
import { baseApi } from "../../constants";
import axios, { all } from "axios";

import "./ShopView.css";
import { useBreadCrumbsUpdateContext } from "../Content/AffiliateLayers/Context/BreadCrumbsContext";

function ShopView() {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();

  useEffect(() => {
    routeHistoryUpdate(["Početna", "Dućan"]);
  }, []);

  const [modelcntvalue, setmodelcntvalue] = useState(1);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const [fullImages, setFullImages] = useState("");
  const updateFullImages = (images: string) => {
    setFullImages(images);
  };

  useEffect(() => {
    console.log(fullImages);
    console.log("Old one", selectedFile);
  }, [fullImages, selectedFile]);

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
        body.url = "/" + uniqueSuffix;

        for (const key in body) {
          formData.append(key, body[key]);
        }
        formData.append("sifra_proizvoda", JSON.stringify(arrayCode));
        formData.append("naziv_proizvoda_model", JSON.stringify(arrayModel));

        formData.forEach((value, key) => {
          console.log(value);
        });
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
            .post(`${baseApi}/products/createProduct`, formData, header)
            .then((res) => {
              alert("Created Successfully");
              return res.data.data;
            })
            .catch((err) => {});
        }
      }
    } catch (error) {
      console.error("Error create new product:", error);
    }
  };

  function cnthandlechange(value: number) {
    setmodelcntvalue(value);
  }
  const handleFileChange = (event: any) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files);
  };

  return (
    <div className="container">
      <div className="page-header__title" style={{ marginLeft: "0px" }}>
        <h1
          style={{ marginTop: "0px", marginBottom: "30px", fontWeight: "700" }}
        >
          Dodaj proizvod
        </h1>
        <div
          className="input-form"
          style={{ width: "100%", marginBottom: "20px" }}
        >
          <FileInputComponent updateFullImages={setSelectedFile} />
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <div className="input-form">
            <label className="label-name">
              item_name<span className="color-red">*</span>
            </label>
            <input
              type="text"
              id="naziv_artikla"
              name="item_name"
              ref={naziv_artikla_Ref}
              className="input-add-field"
            />
          </div>
          <div
            style={{
              fontSize: "12pt",
              alignItems: "center",
              display: "none",
              width: "50%",
            }}
          >
            <label className="label-name">images</label>
            <input
              className="input-add-field"
              type="text"
              value={JSON.stringify(selectedFile)}
              readOnly
            />
          </div>
          <div className="input-form">
            <label className="label-name">unit_of_measure</label>
            <input
              className="input-add-field"
              type="text"
              id="jedinica_mere"
              ref={jedinica_mere_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">
              item_category<span className="color-red">*</span>
            </label>
            <input
              className="input-add-field"
              type="text"
              id="kategorija_artikla"
              ref={kategorija_artikla_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">transport_packaging</label>
            <input
              className="input-add-field"
              type="text"
              id="transportno_pakovanje"
              ref={transportno_pakovanje_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">subcategory</label>
            <input
              className="input-add-field"
              type="text"
              id="potkategorija"
              ref={potkategorija_Ref}
            />
          </div>
          <div
            style={{
              fontSize: "12pt",
              alignItems: "center",
              display: "none",
              width: "50%",
            }}
          >
            <label className="label-name">subcategory_list</label>
            <input
              className="input-add-field"
              type="text"
              id="subcategory_list"
            />
          </div>

          <div className="input-form">
            <label className="label-name">minimum_pack</label>
            <input
              className="input-add-field"
              type="text"
              id="minimalno_pakovanje"
              ref={minimalno_pakovanje_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">meta_description</label>
            <input
              className="input-add-field"
              type="text"
              id="meta_description"
              ref={meta_description_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">square footage</label>
            <input
              className="input-add-field"
              type="text"
              id="kvadratura"
              ref={kvadratura_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">extended_description</label>
            <input
              className="input-add-field"
              type="text"
              id="prosireni_opis"
              ref={prosireni_opis_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">certificate</label>
            <input
              className="input-add-field"
              type="text"
              id="sertifikat"
              ref={sertifikat_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">
              modelcnt<span className="color-red">*</span>
            </label>
            <input
              className="input-add-field"
              type="number"
              min="1"
              max="10"
              defaultValue={1}
              onChange={(e) => {
                cnthandlechange(Number(e.target.value));
              }}
            />
          </div>

          <div className="input-form">
            <label className="label-name">width</label>
            <input
              className="input-add-field"
              type="text"
              id="sirina"
              ref={sirina_Ref}
            />
          </div>

          <div className="input-form">
            <label className="label-name">
              product_code<span className="color-red">*</span>
            </label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[...Array(Number(modelcntvalue))].map((_, index) => (
                <div key={index}>
                  <input
                    className="input-add-field"
                    type="text"
                    id={"sifra_proizvoda" + index}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="input-form">
            <label className="label-name">weight</label>
            <input
              className="input-add-field"
              type="text"
              id={"tezina"}
              ref={tezina_Ref}
            />
          </div>

          <div className="input-form">
            <label className="label-name">
              product_name_model<span className="color-red">*</span>
            </label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[...Array(Number(modelcntvalue))].map((_, index) => (
                <div key={index}>
                  <input
                    className="input-add-field"
                    type="text"
                    id={"naziv_proizvoda_model" + index}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="input-form">
            <label className="label-name">height</label>
            <input
              className="input-add-field"
              type="text"
              id="visina"
              ref={visina_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">thickness</label>
            <input
              className="input-add-field"
              type="text"
              id="debljina"
              ref={debljina_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">length</label>
            <input
              className="input-add-field"
              type="text"
              defaultValue={0}
              id="duljina"
              ref={duljina_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">composition</label>
            <input
              className="input-add-field"
              type="text"
              id="sastav"
              ref={sastav_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">color</label>
            <input
              className="input-add-field"
              type="text"
              id="boja"
              ref={boja_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">resistance_type</label>
            <input
              className="input-add-field"
              type="text"
              id="tip_otpornosti"
              ref={tip_otpornosti_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">place_and_method_of_storage</label>
            <input
              className="input-add-field"
              type="text"
              id="mesto_i_nacin_skladistenja"
              ref={mesto_i_nacin_skladistenja_Ref}
            />
          </div>
          <div className="input-form">
            <label className="label-name">
              count<span className="color-red">*</span>
            </label>
            <input
              className="input-add-field"
              type="number"
              defaultValue={0}
              id="count"
              ref={count_Ref}
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
            <label className="label-name">ancestor</label>
            <input className="input-add-field" type="text" id={"ancestor"} />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">lifetime</label>
            <input className="input-add-field" type="text" id="lifetime" />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">prateca_oprema_dodaci</label>
            <input
              className="input-add-field"
              type="text"
              id="prateca_oprema_dodaci"
            />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">additional_notes</label>
            <input
              className="input-add-field"
              type="text"
              id="additional_notes"
            />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">----------CUSTOMIZE----------</label>
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">sticker</label>
            <input className="input-add-field" type="text" id="sticker" />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">variation</label>
            <input className="input-add-field" type="text" id="variation" />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">url</label>
            <input className="input-add-field" type="text" id="url" />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">----------RANDOM----------</label>
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">field_id</label>
            <input className="input-add-field" type="text" id="field_id" />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">qr_kod</label>
            <input className="input-add-field" type="text" id="qr_kod" />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">
              ----------DEFAULT VALUE----------
            </label>
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">guarantee</label>
            <input className="input-add-field" type="text" id="guarantee" />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">technical drawing</label>
            <input
              className="input-add-field"
              type="text"
              id="technical_drawing"
            />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">model_more_images</label>
            <input
              className="input-add-field"
              type="text"
              defaultValue={"FALSE"}
              id="model_more_images"
            />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">package_dimensions</label>
            <input
              className="input-add-field"
              type="text"
              id="package_dimensions"
            />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">application_places</label>
            <input
              className="input-add-field"
              type="text"
              id="application_places"
            />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">installation_mode</label>
            <input
              className="input-add-field"
              type="text"
              id="installation_mode"
            />
          </div>
          <div style={{ fontSize: "12pt", alignItems: "center" }}>
            <label className="label-name">volume</label>
            <input className="input-add-field" type="text" id="volume" />
          </div>
        </div>
        <button onClick={handleSubmit} className="btn-add">
          Add Product
        </button>
      </div>
    </div>
  );
}

export default ShopView;
