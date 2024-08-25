import React, { useEffect } from "react";
import "./About.css";

import AboutUsBanner from "../../assets/O nama 2.webp";
import { useBreadCrumbsUpdateContext } from "../Content/AffiliateLayers/Context/BreadCrumbsContext";
function About() {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();
  useEffect(() => {
    routeHistoryUpdate(["Početna", "O nama"]);
  }, []);

  return (
    <div className="block">
      <div className="container">
        <img className="imgAboutUsBanner" src={AboutUsBanner}></img>
        <div className="document">
          <div className="document__header">
            <h1 className="document__title">O nama</h1>
          </div>
          <div className="document__content typography about-content">
            <span>
              <b>Gromet doo</b> je dinamična kompanija posvećena uvozu,
              veleprodaji i distribuciji proizvoda iz domena suve gradnje.
            </span>
            {/* <br /> */}
            <span>
              {" "}
              Od momenta osnivanja 2012. godine povezani smo sa našim klijentima
              duž cele teritorije Srbije u pogledu odlične saradnje i pružanja
              najboljih usluga. Kako smo proširivali naš asortiman proizvoda,
              tako smo kontinuirano poboljšavali kvalitet našeg poslovanja,
              privlačeći sve veći broj zadovoljnih klijenata. Danas možemo sa
              ponosom istaći da imamo preko 900 klijenata širom Srbije.
            </span>
            <p>
              Nalazimo se u Nišu, sa glavnim magacinom na adresi Leskovačka bb.
              Međutim, prepoznajući potrebu za proširenjem i optimizacijom naše
              dostave, otvorili smo novi magacin u Beogradu 2020. godine na
              adresi Beogradska 58, 11272 Dobanovci, čime smo omogućili bržu i
              efikasniju dostavu za naše klijente u Beogradu i Vojvodini.
            </p>
            <b>MISIJA</b>
            <p>
              Posvećeni smo poboljšanju standarda suve gradnje kroz kontinuirano
              uvođenje novih materijala i alata, pružajući našim partnerima
              priliku za veću efikasnost i uštedu. Naš cilj je da pružimo
              konstantnu podršku, stručne savete i sigurnost lagera,
              omogućavajući našim partnerima da brzo i kvalitetno obavljaju
              svoje poslove uz povećanje svoje zarade.
            </p>

            <b>VIZIJA</b>
            <p>
              Težimo ka tome da postanemo prepoznatljivi u industriji suve
              gradnje kao lider u pružanju inovativnih proizvoda i usluga,
              postavljajući standarde kvaliteta i efikasnosti. Naša vizija
              obuhvata izgradnju dugoročnih partnerstava, gde su poverenje,
              kvalitet i uzajamna korist ključni.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
