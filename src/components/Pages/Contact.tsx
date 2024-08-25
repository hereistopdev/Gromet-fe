import { Row } from "antd";
import React, { useEffect } from "react";
import "./Contact.css";

import ContactPhoto from "../../assets/Kontakt.webp";
import Leskovac from "../../assets/Leskovac.webp";
import Nis from "../../assets/Nis.webp";
import { useBreadCrumbsUpdateContext } from "../Content/AffiliateLayers/Context/BreadCrumbsContext";

function Contact() {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();

  useEffect(() => {
    routeHistoryUpdate(["Početna", "Kontakt"]);
  }, []);

  return (
    <div className="block">
      <div className="container">
        {/* <div className="BlogPagePageHeaderTitle page-header__title">
          <h1>Kontakt</h1>
        </div> */}
        <div className="faq__section">
          <div
            className="faq__section-body divContactContainerFlex"
            style={{ marginBottom: "10px" }}
          >
            <div className="divContactLeft">
              <div className="divContactLeftAdressTitle">
                <label
                  className="sedisteFirme28"
                  style={{ fontSize: "28px !important" }}
                >
                  SEDIŠTE FIRME
                </label>
              </div>
              <Row className="contactTextStandard">
                GROMET DOO, Kej kola srpskih sestara 15/12, 18 000 Niš
              </Row>
              {/* <Row className="contactTextStandard">
                <b>Email:</b> <a href="mailto:info@gromet.rs">info@gromet.rs</a>
              </Row> */}
              <Row className="contactTextStandard">
                <b>Matični broj: &nbsp;</b> 20798432
              </Row>
              <Row className="rowBoldedContact" style={{ fontWeight: "400" }}>
                <b>PIB:&nbsp;</b> 107418887
              </Row>
              <Row className="contactTextStandard">
                <b>Unicredit banka:&nbsp;</b> 170-30025153000-74
              </Row>
              <Row className="contactTextStandard">
                <b>Procredit banka:&nbsp;</b>220-123907-75
              </Row>
              <Row className="contactTextStandard">
                <b>AIK banka:&nbsp;</b> 105-14269-96
              </Row>
              <Row className="contactTextStandard">
                <b>OTP banka:&nbsp;</b> 325-950050041745213
              </Row>
              <Row className="contactTextStandard">
                <b>NLB Komercijalna banka:&nbsp;</b> 205-000000052966065
              </Row>
              <Row className="contactTextStandard">
                <b>E-mail za reklamacije:&nbsp;</b>{" "}
                <a href="mailto:reklamacije@gromet.rs">reklamacije@gromet.rs</a>
              </Row>
              <Row className="contactTextStandard">
                <b>E-mail za za porudžbine:&nbsp;</b>{" "}
                <a href="mailto:prodaja@gromet.rs">prodaja@gromet.rs</a>
              </Row>
            </div>
            <div className="divContactRight">
              <img src={ContactPhoto} className="imgContactImg"></img>
            </div>

            {/* <div className='divContactRight'>
                <img className='contactPhotoSrc' src={ContactPhoto}></img>
            </div> */}
          </div>
          {/* <div className="BlogPagePageHeaderTitle page-header__title">
            <h1>Magacini</h1>
          </div> */}
          <div className="faq__section-body divContactContainerFlex">
            <div className="divContactLeft">
              <div className="divContactLeftAdressTitle">
                <label>MAGACIN NIŠ</label>
              </div>
              <Row className="contactTextStandard">
                <b>Leskovačka bb, 18 000 Niš</b>
              </Row>
              <Row className="contactTextStandard">
                <b>Kontakt:&nbsp;</b> 018/ 260-063; 062/768-510
              </Row>
              {/* <Row className="contactTextStandard">
                <b>Email: </b>{' '}
                <a href="mailto:info@gromet.rs"> info@gromet.rs</a>
              </Row> */}
              <br />
              <Row className="contactTextStandard">Radno vreme:</Row>
              <Row className="contactTextStandard">
                <ul>
                  <li>Ponedeljak - Petak: 08.00- 16.00h</li>
                  <li>Vikendom ne radimo</li>
                </ul>
              </Row>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2903.0827865786705!2d21.867686376540984!3d43.312526374397514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDPCsDE4JzQ1LjEiTiAyMcKwNTInMTIuOSJF!5e0!3m2!1ssr!2srs!4v1684441171964!5m2!1ssr!2srs"
                className="contactPhotoSrcHalf"
                width="600"
                height="450"
                style={{ border: 0 }}
                // allowfullscreen=""
                loading="lazy"
                // referrerpolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* <iframe
                className="contactPhotoSrcHalf"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6940.751843952392!2d21.940802338445625!3d42.994563894604866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47559dd046e2b3e1%3A0xed1ac30c4b591708!2sLESKOVAC!5e0!3m2!1ssr!2srs!4v1677801037221!5m2!1ssr!2srs"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe> */}
              {/* <img className='contactPhotoSrcHalf' src={Leskovac}></img> */}
            </div>

            <div className="divContactRight">
              <div className="divContactLeftAdressTitle">
                <label>MAGACIN BEOGRAD</label>
              </div>
              <Row className="contactTextStandard">
                <b>Beogradska 58, 11272 Dobanovci</b>
              </Row>
              <Row className="contactTextStandard">
                <b>Kontakt:&nbsp; </b> 011/ 411-2335; 062/768-514
              </Row>
              {/* <Row className="contactTextStandard">
                <b>Email: </b>{' '}
                <a href="mailto:info@gromet.rs"> info@gromet.rs</a>
              </Row> */}
              <br />
              <Row className="contactTextStandard">Radno vreme:</Row>
              <Row className="contactTextStandard">
                <ul>
                  <li>Ponedeljak - Petak: 08.00- 16.00h</li>
                  <li>Vikendom ne radimo</li>
                </ul>
              </Row>

              {/* <img className='contactPhotoSrcHalf' src={Nis}>
                </img> */}

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2829.948982864955!2d20.23438971229992!3d44.82260397095011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDTCsDQ5JzIxLjQiTiAyMMKwMTQnMTMuMSJF!5e0!3m2!1ssr!2srs!4v1685584468088!5m2!1ssr!2srs"
                className="contactPhotoSrcHalf"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>

              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7528.679364170516!2d21.889519493686038!3d43.32048633667366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b0b43bbdeb79%3A0xfad80518e091d85c!2z0KLRgNCzINCa0YDQsNGZ0LAg0JzQuNC70LDQvdCw!5e0!3m2!1ssr!2srs!4v1677800933197!5m2!1ssr!2srs"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
