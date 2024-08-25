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

import Slika7 from '../../assets/blogOne/slika7.webp';
import Slika10 from '../../assets/blogOne/slika10.webp';
import Slika1 from '../../assets/blogOne/slika1.webp';
import SlikaGips from '../../assets/blogOne/gips-karton-ploce.webp';

const banner_img_link = 'https://thumbs.dreamstime.com/b/group-industrial-workers-banner-blank-isolated-over-white-background-207139483.webp'
const img_link = 'https://alfatim.rs/wp-content/uploads/2021/12/Moler-featured-slika.webp';
const p_text = 'Ekološka svest postala je sveprisutna tema koja je u poslednjoj deceniji izuzetno dobila na značaju. Građevinski sektor je jedan od najuticajnijih kada je u pitanju ekološki uticaj na sredinu, potrošnja resursa ili emisija štetnih gasova. Iz ovog razloga je veoma važno da što veći broj ljudi koji posluju u okviru ove industrije, prepozna važnost zaštite životne sredine i u svoj posao implementira ekološki prihvatljivije materijale.'
const p_podnaslov = `Postoji dosta razlika između ove dve vrste materijala, ali neke od najistaknutijih su sledeće:`

function
  BlogItemPageB() {

  const routeHistoryUpdate = useBreadCrumbsUpdateContext();

  useEffect(() => {
    routeHistoryUpdate(['Početna', 'Blog', '5 razloga da suvom gradnjom zamenite tradicionalnu']);
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

  const handleAlatiClick = () => {
    localStorage.setItem("potkategorije", "PRATEĆI GIPS PROGRAM,Alati-skalpeli-noževi-testere-žičane četke-makaze-pištolji-heftalice-merni alati i libele-mikseri-gleterice-špahtle-mistrije-četke-valjci-ostali alati")
    window.location.href = '/proizvodi#filteri=PRATEĆI GIPS PROGRAM,Alati&stranica=1'
  }

  return (
    <div className='container divBlogPostItemContainerContainer'>
      <div className='divBlogPostItemContainer container'>
        <h1 className='divBlogPostItemTitle'>5 razloga da suvom gradnjom zamenite tradicionalnu</h1>
        <div className="blogpost-bottomLabel"><ClockCircleOutlined style={{ marginLeft: "8px", paddingLeft: "5px" }}></ClockCircleOutlined><label style={{ marginLeft: "5px" }}>{"4 minuta citanja"}</label>{','} {'25.02.2023.'} </div>
        <label>Izgradnja zahteva vreme, rad i posvećenost, ali da li ste ikada razmišljali da li postoji rešenje koje bi olakšalo ceo proces?</label><br></br> <br></br>
        <div className='divBlogItemPageImgBanner container'>
          <img src={Slika1}></img>
        </div>

        {/* <h1 className='divBlogPostItemh1'>Uvod</h1> */}
        {/* <p className='pBlogPostItemText'>
          {p_text}
        </p> */}
        <h2 className='divBlogPostItemh2'>Šta je suva gradnja?</h2>
        <p className='pBlogPostItemText'>
          Suva gradnja je tehnologija građenja koja se izvodi bez upotrebe vode, gline, cementa i drugih klasičnih građevinskih materijala. Umesto toga, koristi se širok spektar modernih građevinskih materijala, kao što su gips-karton ploče, paneli od OSB-a, drvo, čelični profili i drugi materijali koji se mogu lako montirati i demontirati. Ovaj proces izgradnje omogućava brzu i ekonomičnu gradnju, sa manje otpada, manjom potrošnjom energije i manjim zagađenjem okoline u poređenju sa tradicionalnom gradnjom. Suva gradnja se često koristi za izgradnju unutrašnjih pregrada, plafona, izolacije, kao i za izgradnju potpunih kuća i drugih vrsta građevina.       
        </p>

        <div className='divBlogItemPageImgBanner'>
          <img src={SlikaGips} alt='slika merdevina' style={{maxHeight: "500px"}}></img>
        </div>
      
        
        {/* <div className='divBlogItemPageImages'>
                <img src={img_link}></img>
                <img src={img_link}></img>
                <img src={img_link}></img>
            </div> */}
        <h2 className='divBlogPostItemh2'>Razlika između suve i tradicionalne gradnje</h2>
        <p className='pBlogPostItemText'>
          Suva gradnja obuhvata konstrukciju koja koristi prefabrikovane ploče, kao što su gips-karton ploče, koje se montiraju na metalne ili drvene konstrukcije. S druge strane, tradicionalna gradnja koristi metode poput opeke, betona i cementa. Razlike između suve gradnje i tradicionalne gradnje uključuju: 
          <ol>
            <li>
              <b>Vreme izgradnje</b> <br></br>
              Suva gradnja je znatno brža od tradicionalne gradnje. Ova vrsta gradnje ne zahteva vreme za sušenje materijala kao što su beton ili malter koji se koriste u tradicionalnoj gradnji. Sve što je potrebno je montaža gips-karton ploča što uz pomoć <a className='aBlogShopRedirect' onClick={()=> handleAlatiClick()}>raznih alata</a> možete obaviti brzo i lako. 
            </li><br></br>
            <li>
              <b>Težina</b> <br></br>
              Materijali korišćeni u suvoj gradnji su obično lakši od onih u tradicionalnoj gradnji. To ne samo da olakšava transport materijala na mesto gradnje, već i samo podizanje i montažu. Ovo može smanjiti fizički napor i rizik od povreda tokom izgradnje.
            </li><br></br>
            <li>
              <b>Fleksibilnost</b> <br></br>
              Suva gradnja omogućava veću fleksibilnost u dizajniranju i izmenama prostora. Pregradni zidovi se mogu lako premestiti ili ukloniti, što omogućava brze i jednostavne promene u rasporedu prostorija. Ovo može biti posebno korisno u komercijalnim prostorima gde se potrebe prostora često menjaju.
            </li><br></br>
            <li>
              <b>Izolacija</b> <br></br>
              Gips-karton ploče pružaju dobru toplotnu i zvučnu izolaciju. Na ovaj način poboljšava se energetska efikasnost objekta, smanjuju troškovi grejanja i hlađenja. Takođe, bolja zvučna izolacija može doprineti udobnosti prostora, smanjujući buku između prostorija ili sa spoljne strane.
            </li><br></br>
            <li>
              <b>Održavanje i popravke</b> <br></br>
              Suva gradnja omogućava lakše i brže popravke i održavanje u poređenju sa tradicionalnom gradnjom. Ako je potrebno, oštećene gips-karton ploče se mogu lako zameniti. Takođe, pristup instalacijama kao što su električne instalacije ili vodovod je jednostavniji, jer se mogu postaviti u prostoru između ploča, a zatim lako pristupiti uklanjanjem samo dela ploče.
            </li><br></br>
          </ol>
        </p>
        <label>
          Uverite se u jednostavnost procesa suve gradnje:
        </label> <br></br><br></br>
        <iframe width="100%"
         height="315"
         src="https://www.youtube.com/embed/D2IH4NPT2zs"
         title="YouTube video player"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
         ></iframe>
        

        <h2 className='divBlogPostItemh2'>Razvoj suve gradnje u budućnosti</h2>
        <p className='pBlogPostItemText'>
        Poslednjih godina industrija suve gradnje doživela je značajan rast, jer se sve više ljudi okreće ovoj metodi gradnje zbog pomenutih prednosti. U skladu sa tehnološkim napretkom, možemo očekivati da će industrija suve gradnje nastaviti da se razvija u smislu:
        <ul style={{listStyle:'none'}}>
          <li>
          -Primena novih materijala - Razvoj novih materijala za suvu gradnju će se nastaviti i verovatno će se pojaviti novi materijali koji će biti lakši, izdržljiviji, otporniji na vatru i održiviji.
          </li>
          <li>
          -Korišćenje robotike - Robotika bi mogla biti iskorišćena za izgradnju zidova, postavljanje izolacije, krova i drugih elemenata konstrukcije.
          </li>
          <li>
          -Pametni domovi - Kako se pametna kućna tehnologija bude razvijala, očekuje se da će se i industrija suve gradnje prilagoditi i ponuditi kuće koje su opremljene ovim tehnologijama.
          </li>
          <li>
          -Korišćenje 3D štampanja - 3D štampanje može biti primenjeno na izgradnju određenih delova suve gradnje, kao što su zidovi, blokovi za temelje, krovne ploče i drugi elementi.
          </li>
          <li>
          -Povećanje održivosti - Industrija suve gradnje već je poznata po svojoj održivosti, ali se očekuje da će se u budućnosti više raditi na tome da se ovaj vid gradnje učini još održivijim i da se uključe novi materijali.
          <br></br><br></br>Sve u svemu, suva gradnja će se nastaviti razvijati i rasti u skladu sa tehnologijom, a očekuje se da će postati dominantan način gradnje u budućnosti, zbog svojih brojnih prednosti.          </li>
        </ul>
        </p>
        


        <div className='divBlogItemPageImgBanner' style={{display:"flex", justifyContent:"center"}}>
          <img src={Slika7} style={{width:"unset", maxHeight: window.innerWidth > 500 ? "400px" : "250px"}}></img>
          <img src={Slika10} style={{width:"unset", maxHeight: window.innerWidth > 500 ? "400px" : "250px"}}></img>
        </div>

        <h2 className='divBlogPostItemh2'>Ekološka prednost suve gradnje</h2>
        <p className='pBlogPostItemText'>
        Suva gradnja predstavlja ekološki prihvatljivu opciju u građevinskoj industriji. Gips-karton, glavni materijal u suvoj gradnji, je prirodni, obnovljivi i potpuno reciklabilni resurs. Osim toga, proces suve gradnje zahteva manje energije i vode u poređenju sa tradicionalnom gradnjom, čime se smanjuje emisija ugljen-dioksida. Ova vrsta gradnje omogućava efikasniju upotrebu materijala, smanjujući otpad na gradilištima. Kroz sve ove aspekte, suva gradnja doprinosi očuvanju prirodnih resursa i zaštiti životne sredine.
        </p>
        


        <h2 className='divBlogPostItemh2'>Budućnost gradnje</h2>

        <p className='pBlogPostItemText'>
        Suva gradnja se sve više prepoznaje kao budućnost građevinske industrije. Njeni brojni benefiti čine je idealnom za moderno doba. Osim toga, u eri kada su promene klimatskih uslova i održivost ključni globalni izazovi, suva gradnja pruža rešenja koja su ne samo praktična i ekonomična, već i ekološki odgovorna. Kako se tehnologija i inovacije nastavljaju razvijati, mogućnosti i prednosti koje suva gradnja pruža samo će se proširiti, što je čini ključnim igračem u oblikovanju budućnosti građevinske industrije.
        </p>
        {/* <br></br>
        <br></br> */}
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
        {/* <label><b>#suvagradnja #tradicionalnagradnja #gips-kartonploče #prednostisuvegradnje #ekologija #ekološkaprednost #budućnostgradnje</b></label> */}
      </div>

    </div>
  )
}

export default BlogItemPageB