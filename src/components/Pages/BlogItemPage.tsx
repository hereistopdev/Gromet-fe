import React, { useEffect, useState } from 'react'
import './BlogItemPage.css';

import icon_viber from '../../assets/icons/VIBER.webp';
import icon_facebook from '../../assets/icons/FACEBOOK.webp';
import icon_messenger from '../../assets/icons/MESSENGER.webp';
import icon_instagram from '../../assets/icons/INSTAGRAM.webp';
import icon_email from '../../assets/icons/EMAIL.webp';
import icon_copy from '../../assets/icons/COPY LINK.webp';
import { Dropdown } from 'antd';
import { CopyToClipboard } from '../../hooks/helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ClockCircleOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { useBreadCrumbsUpdateContext } from '../Content/AffiliateLayers/Context/BreadCrumbsContext';

import Slika8 from '../../assets/blogtwo/slika8.webp';
import Slika2 from '../../assets/blogtwo/slika2.webp';
import Slika4 from '../../assets/blogtwo/slika4.webp';

const banner_img_link = 'https://thumbs.dreamstime.com/b/group-industrial-workers-banner-blank-isolated-over-white-background-207139483.webp'
const img_link = 'https://alfatim.rs/wp-content/uploads/2021/12/Moler-featured-slika.webp';
const p_text = 'Ekološka svest postala je sveprisutna tema koja je u poslednjoj deceniji izuzetno dobila na značaju. Građevinski sektor je jedan od najuticajnijih kada je u pitanju ekološki uticaj na sredinu, potrošnja resursa ili emisija štetnih gasova. Iz ovog razloga je veoma važno da što veći broj ljudi koji posluju u okviru ove industrije, prepozna važnost zaštite životne sredine i u svoj posao implementira ekološki prihvatljivije materijale.'
const p_podnaslov = `Postoji dosta razlika između ove dve vrste materijala, ali neke od najistaknutijih su sledeće:`

function
  BlogItemPage() {

  const routeHistoryUpdate = useBreadCrumbsUpdateContext();

  useEffect(() => {
    routeHistoryUpdate(['Početna', 'Blog', 'Top 10 najboljih ekoloških materijala za održivu gradnju']);
  }, []);

  const shareButtonItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={'viber://forward?text=' + encodeURIComponent("Pogledajte ovaj proizvod na zvanicnom sajtu Grometa" + " " + window.location.href)}
        >
          <img className='imgShareButtonDropDownIcon' src={icon_viber}></img>
          Viber
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={'https://www.facebook.com/sharer/sharer.php?u=' + (window.location.href)}
        >
          <img className='imgShareButtonDropDownIcon' src={icon_facebook}></img>
          Facebook
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={'fb-messenger://share/?link= ' + (window.location.href)}
        >
          <img
            className='imgShareButtonDropDownIcon'
            src={icon_messenger}
          ></img>
          Messenger
        </a>
      ),
    },
    // {
    //   key: '4',
    //   label: (
    //     <a
    //       target='_blank'
    //       rel='noopener noreferrer'
    //       href='https://www.luohanacademy.com'
    //     >
    //       <img
    //         className='imgShareButtonDropDownIcon'
    //         src={icon_instagram}
    //       ></img>
    //       Instagram
    //     </a>
    //   ),
    // },
    {
      key: '4',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={"mailto:?subject=Pogledajte ovaj blog na zvanicnom sajtu Grometa&body=" + window.location.href}
        >
          <img className='imgShareButtonDropDownIcon' src={icon_email}></img>
          Email
        </a>
      ),
    },
    {
      key: '6',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => CopyToClipboard(window.location.href)}
        >
          <img className='imgShareButtonDropDownIcon' src={icon_copy}></img>
          Kopiraj link
        </a>
      ),
    },
  ];
  const [showShare, setShowShare] = useState<boolean>(false);

  const handlePistoljiClick = () => {
    localStorage.setItem("potkategorije", "Alati-pištolji")
    window.location.href = '/proizvodi#filteri=Alati&stranica=1'
  }

  return (
    <div className='container divBlogPostItemContainerContainer'>
      <div className='divBlogPostItemContainer container'>
        <h1 className='divBlogPostItemTitle'>Top 10 najboljih ekoloških materijala za održivu gradnju</h1>
        <div className="blogpost-bottomLabel"><ClockCircleOutlined style={{ marginLeft: "8px", paddingLeft: "5px" }}></ClockCircleOutlined><label style={{ marginLeft: "5px" }}>{"4 minuta citanja"}</label>{','} {'25.02.2023.'} </div>

        <div className='divBlogItemPageImgBanner container'>
          <img src={Slika8}></img>
        </div>

        {/* <h1 className='divBlogPostItemh1'>Uvod</h1> */}
        <p className='pBlogPostItemText'>
          {p_text}
        </p>
        <h2 className='divBlogPostItemh2'>Razlika između ekoloških i konvencionalnih ekoloških materijala</h2>
        <p className='pBlogPostItemText'>
          {p_podnaslov}
          <ul>
            <li><b>Uticaj na životnu sredinu.</b> Ekološki materijali su dizajnirani i proizvedeni upravo na takav način da minimiziraju štetan uticaj na okolinu. Ova osobina ih i čini najvažnijim kada je reč o koršćenju u građevinske svrhe.</li>
            <li> <b>Sastav i  izvor materijala. </b> Ekološki materijali se često izrađuju od obnovljivih i recikliranih materijala. Sa druge strane, za izvore konvencionalnih materijala najčešće se koriste neobnovljive sirovine kao što su nafta, plastika ili čelik.</li>
            <li><b>Energetska efikasnost. </b> Ekološki materijali često imaju bolja svojstva toplotne i zvučne izolacije, što može doprineti energetskoj efikasnosti zgrada. Oni mogu smanjiti potrebu za grejanjem, hlađenjem i osvetljenjem, što dovodi do manje potrošnje energije. Konvencionalni materijali mogu biti manje efikasni u tom smislu i zahtevaju veću potrošnju energije za održavanje željenih uslova.</li>

          </ul>
        </p>
        {/* <div className='divBlogItemPageImages'>
                <img src={img_link}></img>
                <img src={img_link}></img>
                <img src={img_link}></img>
            </div> */}
        <h2 className='divBlogPostItemh2'>Šta građevinske materijale čini ekološkim?</h2>
        <p className='pBlogPostItemText'>
          {`Ne postoji konkretna odrednica koja bi istakla određeni materijal kao ekološki najisplativiji.
                  Ekološkim materijalom se mogu nazvati oni materijali bar po nekoj osnovi bolje doprinose 
                  očuvanju životne sredine od njegovih konvencionalnih zamena. Ova vrsta materijala naziva se i
                  “zelenim” materijalima.  Neki od kriterijuma koje moraju zadovoljiti kako bi se smatrali zelenim materijalima
                    su sledeći:`}

          <ul>
            <li><b>Moraju biti održivi.</b>  Tačnije, da dolaze iz obnovljivih izvora, recikliranih materijala ili
              materijala koji su izuzetno trajni.</li>
            <li><b>Posedovanje zdravstvenih i ekoloških sertifikata.</b> Ove sertifikate imaju mnogi zeleni
              materijali kao potvrdu njihove ekološke prihvatljivosti i zdravstvene bezbednosti.</li>
            <li><b>Zahtevaju malu količinu energije. </b>  Ovaj kriterijum podrazumeva energiju koja je potrebna
              za proizvodnju tog mateirjala, uključujući i sam transport materijala na gradilište.</li>
          </ul>
        </p>
        <div className='divBlogItemPageImages'>
          <img src={Slika2}></img>
          <img src={Slika4}></img>
          {/* <img src={img_link}></img> */}
        </div>
        <h2 className='divBlogPostItemh2'>10 najkorisnijih “zelenih” materijala</h2>
        <p className='pBlogPostItemText'>
          <ol>
            <li>
              <b>Reciklirano drvo</b> <br></br>
              Drvo je materijal koji se veoma često koristi prilikom gradnje. Iz tog razloga je ekološki najpogodnije koristiti reciklirano drvo, jer se na taj način smanjuje potrošnje sirovina, tj. smanjuje se i potreba za sečom novih stabala. Sve ovo dovodi i do manje otpada i smanjenja uticaja na klimatske promene. Pored toga je reciklirano drvo estetski vrlo zahvalan materijal jer se lako oblikuje u skladu sa vašim potrebama.
            </li><br></br>
            <li>
             <b>Bambus</b> <br></br>
              Za bambus je karakteristično da je jedna od najbrže rastućih biljaka na svetu. Nekada bambusi rastu i do metar dnevno. Upravo zbog te stope rasta je i pogodan materijal za gradnju jer podrazumeva brzo obnavljanje resursa, a pritom ima i veliku čvrstoću.
            </li><br></br>
            <li>
              <b>Prirodni kamen</b> <br></br>
              Zbog svoje čvrstoće i održivosti, kamen je jedan od najkorišćenijih ali i ekološki najisplativijih materijala. Ne zahteva ni visoku energetsku potrošnju kada je reč o njegovoj obradi.
            </li><br></br>
            <li>
              <b>Reciklirana plastika</b> <br></br>
              U prilog svim recikliranim materijalima ide u korist i najveću prednost predstavlja upravo činjenica da smanjuju otpad i samim tim štite okolinu. Smanjuje se i potreba za eksploatacijom i proizvodnjom novih sirovina.
            </li><br></br>
            <li>
              <b>Tvrda poliuretanska pena na biljnoj bazi</b> <br></br>
              Za razliku od krute pur pene, koja se često koristi kao izolacioni materijal, pur pena na biljnoj bazi je karakteristična po svom neobičnom sastavu. Naime, ona se sastoji od konoplje, morskih algi i bambusa. I sa ovakvim sastavom je pogodna za zvučnu izolaciju i zaštitu od buba i buđi. Takođe je i laka za korišćenje u kombinaciji sa <a className='aBlogShopRedirect' onClick={() => handlePistoljiClick()}>pištoljem za pur penu</a>.
            </li><br></br>
            <li>
              <b>Pluta</b> <br></br>
              Kao i u slučaju bambusa i za plutu je karakteristično brzo obnavljanje resursa. Nastaje od kore plutovine, odnosno vrste hrasta koji raste u mediteranskim zemljama. Ova kora se brzo regeneriše. Pokazala se kao dobar izolator, ali i kao dobar otpornik vlage. Ovaj materijal je verovatno moguće videti u skoro svakom domaćinstvu jer se pampuri koji služe za zatvarnje flaša prave od toga.
            </li><br></br>
            <li>
              <b>Beton od konoplje</b> <br></br>
              Izrađen je od konopljinih vlakana i kreča koji se koristi za njihovo vezivanje. Rezultat ovoga je jaka i poprilično laka struktura koja podseća na tradicionalni beton, zato je i dobra alternativa. Zbog svoje male težine je i veoma isplativ za transport jer ne zahteva veliki utrošak energije.
            </li><br></br>
            <li>
              <b>Slama</b> <br></br>
              Iako je verovatno zvuči kao čudan izbor za građevinski materijal, ali slama je veoma pogodan materijal kada govorimo o podlogama za zid. Tek nakon ovakve podloge se kuće malterišu, a studije su pokazale da su kuće sa ovakvom kombinacijom materijala otpornije na vatru.
            </li><br></br>
            <li>
              <b>Čelične šipke</b> <br></br>
              Čelik je jedan od najrecikliranijih materijala na svetu. Nakon rušenja zgrade, u 98% slučajeva se konstrukcijski čelik nosi dalje na reciklažu.
            </li><br></br>
            <li>
              <b>Micelija</b> <br></br>
              Micelija ili koreni pečuraka se mogu naći gotovo svuda. Verovatno vam je i najveće iznenađenje kako se to našlo na listi ekološki isplativih građevinskih materijala.  Vlakna ovih gljiva se mogu transformisati u građevinske cigle. Ovaj način korišćenja micelija još uvek nije u potpunosti zaživeo, ali predstavlja deo pokreta arhitekata za stvaranje “živih” gradova.
            </li><br></br>
          </ol>
        </p>

        <label>
          Ovde možete pogledati način na koji ove cigle nastaju:
        </label> <br></br><br></br>
        <iframe 
          width="100%" 
          height="315"
          src="https://www.youtube.com/embed/Pp7pSlwIlLA"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" >
        </iframe> 
          
        <p>
          Iako korisni, ovi materijali svakako sa sobom nose i neke izazove, kao kada je, recimo, u pitanju
          cena ili dostupnost ovakvih materijala. Ali, da li je zaista veća cifra na računu vredna toga da se
          u pitanje dovede budućnost čitave planete?
        </p> 

        <a href='/proizvodi' style={{textDecoration: "underline"}}>
          Pogledajte naše proizvode koji se koriste u procesu suve gradnje:
        </a>
        <br></br>
        <br></br>

        <div className='productPageShareIconLabel'>
          <Dropdown
            menu={{ items: [...shareButtonItems] }}
            placement='top'
            arrow
            open={showShare}
          >
            <button
              className='productPageShareIconLabelButton'
              onClick={() => setShowShare(!showShare)}
            >
              Podeli
              <LazyLoadImage
                effect='blur'
                className='productPageShareIcon'
                src='https://www.freeiconspng.com/thumbs/www-icon/vector-illustration-of-simple-share-icon--public-domain-vectors-23.png'
              />
            </button>
          </Dropdown>
        </div>
        <br></br>
        {/* <label><b>#ekologija #zaštitaživotnesredine #ekomaterijali</b></label> */}
      </div>

    </div>
  )
}

export default BlogItemPage