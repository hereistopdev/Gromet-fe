import React, { useEffect, useState } from 'react';
import './HelpFAQMobile.css';
import FaqBanner from '../../assets/Pomoc i podrska.webp';

import icon1 from '../../assets/icons/Poruƒivanje.webp';
import icon2 from '../../assets/icons/Isporuka.webp';
import icon3 from '../../assets/icons/Reklamacije i Povrat.webp';
import icon4 from '../../assets/icons/Ostale informacije.webp';
import FaqItem from './FaqItem';
import { useBreadCrumbsUpdateContext } from '../Content/AffiliateLayers/Context/BreadCrumbsContext';

const text_Ostalo = 'Ostalo';
const text_Reklamacije = 'Reklamacije i povrat';
const text_Isporuka = 'Nacin i rok isporuke';
const text_Porucivanje = 'Porucivanje';

const porucivanje = [
  {
    title: 'Ko može poručiti naše proizvode?',
    text: '<p>Gromet DOO je firma koja se bavi veleprodajom proizvoda za fasadu, unutrašnje radove i izolaciju. Firma posluje sa pravnim licima, a ukoliko želite da kupite naše proizvode a nemate registrovanu firmu, možete nas kontaktirati kako bismo Vas usmerili ka maloprodajama naših partnera.</p>',
  },
  {
    title: 'Kako da poručite ukoliko nemate registrovanu firmu?',
    text: '<p>Ukoliko nemate registrovanu firmu, kontaktirajte nas kako biste dobili informacije o maloprodajama naših partnera.</p>',
  },

  {
    title: 'Na koji način možete poručiti naše proizvode?',
    text: '<p>Naše proizvode možete poručiti pozivom na broj 060/0768-777</p> <p> Ili putem e-mail adrese: <a href="mailto:prodaja@gromet.rs">prodaja@gromet.rs</a> Prilikom porudžbine potrebno je dostaviti tačne šifre i količine artikala, kao i način isporuke koji želite. Nakon dobijene porudžbine ćete dobiti predračun na mail kako biste izvršili uplatu. Roba će biti spremna nakon uplate.</p>',
  },

  // {
  //   title: 'Da li mogu poručiti putem e-maila?',
  //   text: "<p>Naše proizvode možete poručiti putem e- mail adrese: <a href='mailto:info@gromet.rs'>info@gromet.rs</a> </p> <p>Prilikom porudžbine potrebno je dostaviti tačne šifre i količine artikala, kao i način isporuke koji želite. Nakon dobijene porudžbine ćete dobiti predračun na mail kako biste izvršili uplatu. Roba će biti spremna nakon uplate.</p>",
  // },
  {
    title: 'Kako možete platiti porudžbinu?',
    text: '<p>Plaćanje se vrši putem računa firme s obzirom na to da radimo sa pravnim licima.</p>',
  },
];
const isporuka = [
  {
    title: 'Koji su načini isporuke robe?',
    text: '<p>Postoje 3 mogućnosti isporuke:</p> <p>- <b>Našim prevozom</b> - Nakon izvršene porudžbine, na Vašu e-mail adresu stići će detalji porudžbine. Rok za obradu porudžbine je do 3 radna dana. Nakon toga, ukoliko su poručeni proizvodi dostupni, dobićete preciznije informacije o roku isporuke. Ukoliko neki od poručenih artikala nije na stanju, bićete blagovremeno obavešteni.</p> <p> - <b>Kurirskom službom</b> -  Ako nije moguće dostaviti robu sopstvenim prevozom u određenom vremenskom periodu i na određenim delovima teritorije Srbije, postoji mogućnost da se ista dostavi kurirskom službom.</p> <p>- <b>Lično preuzimanje u magacinu</b> -  Ukoliko kupac želi da porudžbinu preuzme lično u jednom od naših magacina, može to učiniti na sledećim adresama:</p> <p>• Leskovačka bb, 18000 Niš</p> <p>• Beogradska 58, 11272 Beograd-Dobanovci</p>',
  },
  {
    title: 'Koji je rok isporuke robe?',
    text: '<p>Rok isporuke robe zavisi od načina isporuke:</p> <p><b> - Isporuka našim prevozom: </b> od 10 do 14 radnih dana. U slučaju da isporuka robe kasniti, bićete blagovremeno obavešteni.</p> <p>- <b>Isporuka kurirskom službom:</b> od 2 do 3  radna dana, osim ako rokovi isporuke nisu drugačije definisani  za vreme neradnih dana, o čemu ćete blagovremeno biti obavešteni.</p>',
  },
  {
    title: 'Koliki su troškovi isporuke?',
    text: '<p><b>BESPLATNA DOSTAVA</b> našim vozilom za porudžbine preko 20 000 dinara+pdv.</p><p> <b>KURIRSKOM SLUŽBOM:</b> <br/> - U našoj organizaciji-troškovi i način dostave zavise od gabarita i težine porudžbine. <br/> - U vašoj organizaciji-sami birate kurirsku službu za dostavu robe te troškovi zavise od toga.</p> <p>Za detalje pozvati na 060/0768777</p>',
  },
  {
    title: 'Koje su moje dužnosti po prijemu paketa?',
    text: '<p>Po prijemu robe dužni ste da se uverite u sledeće:</p> <ul> <li>Da ste proverili fizičku ispravnost primljenih proizvoda</li> <li>Da vam je dostavljen tačan broj paketa navedenih na otpremnici</li> <li>Da ste potpisali otpremnicu kao dokaz za isporučenu robu</li>  </ul>', //Da ste potpisali otpremnicu kao dokaz za isporučenu robu
  },
];
const reklamacije = [
  {
    title: 'Koji je rok za prijavu reklamacija?',
    text: '<p>Rok za prijavu reklamaciju je 7 radnih dana od dana prijema robe.</p>',
  },
  {
    title: 'Koji su uslovi za prijavu reklamacije?',
    text: '<p>Uslovi za prijavu reklamacije su sledeći:</p> <ul> <li>Stigla Vam je pogrešna roba</li> <li>Dobili ste oštećene artikle</li> <li>Dobili ste manje ili više robe u odnosu na fakturisanu količinu</li> </ul>',
  },
  {
    title: 'Na koji način mogu prijaviti reklamaciju?',
    text: "<p>Prijavljivanje reklamacije, možete izvršiti:</p> <ul> <li>Direktnim pozivom komercijaliste</li> <li>Slanjem email-a na <a href='mailto:reklamacije@gromet.rs'>reklamacije@gromet.rs</a></li> <li>Pozivom na broj 018/260-063, 011/411-23-35</li> </ul>",
  },
  {
    title: 'Koja je politika rešavanja reklamacija?',
    text: '<p>Ukoliko dođe do reklamacije postoje mogućnosti:</p> <ul> <li>Zamene artikala</li> <li>Povratka artikala</li> <li>Nadoknade manjka artikala</li> </ul>',
  },
  {
    title: 'Koje reklamacije nisu uvažene?',
    text: '<p>Reklamacije nisu uvažene u sledećim slučajevima:</p> <ul> <li>Ukoliko pre upotrebe niste proverili fizičku ispravnost proizvoda. GROMET DOO ne može vratiti  i zameniti već otvoren i upotrebljen proizvod </li> <li>Ukoliko ste odabrali isporuku putem kurirske službe. GROMET DOO ne snosi odgovornost za pošiljke poslate kurirskom službom ukoliko ste obavešteni i pošiljke su označene kao lomljive. Za takva oštećenja, reklamacije rešavate sa kurirskom službom.</li> </ul>',
  },
];
const ostalo = [
  {
    title: 'Politika privatnosti',
    text: <>
      <p><strong>Svrha politike privatnosti</strong></p>
      <p>
        Podaci o ličnosti su svi podaci koji se neposredno ili posredno odnose ili mogu da se odnose na
        vas kao fizičko lice. Kao zakonski osnov koji uređuje zaštitu podataka i uslove za obradu vaših
        podataka primenjujemo Zakon o zaštiti podataka o ličnosti (“Sl. glasnik RS”, br. 87/2018), u
        daljem tekstu ,,Zakon”).
        Gromet doo usvaja i objavljuje ovu Politiku privatnosti na svojoj internet prezentaciji
        www.gromet.rs radi utvrđivanja načela prilikom obrade podataka o ličnosti od strane Gromet
        doo kao i pravila prikupljanja, obrade i zaštite podataka o ličnosti, način ostvarivanja prava lica
        na koje se podaci odnose, a u cilju usklađivanja poslovanja i obavljanja delatnosti sa odredbama
        propisa kojima se uređuje zaštita podataka o ličnosti, najboljom praksom i međunarodno
        prihvaćenim standardima u obradi i zaštiti podataka o ličnosti.
        Svrha ove Politike privatnosti je da se doslednom primenom obezbedi zaštita osnovnih prava i
        sloboda fizičkih lica, a posebno njihovih prava na zaštitu podataka o ličnosti.
        Ovom Politikom privatnosti se utvrđuju pravila za zaštitu fizičkog lica prilikom prikupljanja i
        obrade podataka o ličnosti i pravila koja regulišu slobodan protok ovih podataka.
      </p>
      <p><strong>Svrha prikupljanja ličnih podataka</strong></p>
      <p>
        Gromet doo može sakupljati sve informacije koje nam šaljete zavisno od tipa formulara koje
        popunjavate uključujući ime, adresu, broj telefona, e-mail adresu, kao i ostale podatke koje
        možete ostaviti na sajtu. Uz pomoć tih podataka bićemo u mogućnosti da Vam isporučimo
        željenu robu, kao i da Vas obavestimo o trenutnom statusu narudžbine.
        Gromet doo se obavezuje da će čuvati privatnost svih svojih kupaca/korisnicika. Prikupljamo
        samo neophodne, osnovne podatke o kupcima/korisnicima i podatke neophodne za poslovanje
        i informisanje, u skladu sa dobrim poslovnim običajima i u cilju pružanja kvalitetne usluge.
        Ostale informacije koje mogu biti zahtevane u skladu sa promena koje su naznačene na sajtu.
      </p>
      <p><strong>Zašto koristimo lične podatke</strong></p>
      <p>
        Gromet doo koristi sakupljene informacije prvenstveno u svrhu obrade zahteva korisnika i
        posetioca web sajta. Pored navedenih informacija prikupljamo, analiziramo i obrađujemo
        podatke o proizvodima koje naši posetioci traže i kupuju, kao i o stranicama koje posećuju. Te
        podatke koristimo da bismo poboljšali ponudu i izgled naših stranica, i omogućili Vam
        jednostavnije i preciznije korišćenje, kao i sigurniju i prijatniju kupovinu.
        Gromet doo ne razmenjuje ni jednu informaciju o korisnicima sa trećim licima. Možemo koristiti
        informacije u cilju održavanja kontakta sa korisnicima i obaveštavanja o razvoju našeg biznisa. U
        ovom slučaju korisnici imaju mogućnost da se ispišu sa mailing liste. Ukoliko u nekom trenutku
        u budućnosti budemo primorani da otkrijemo sakupljene informacije trećoj strani (npr.
        državnim organima), o tome će korisnik biti obavešten i dati svoju saglasnost. Gromet doo može
        povremeno objaviti informacije opšteg tipa trećim licima – na primer, broj posetilaca sajta koji
        su popunili neku online prijavu, ali pritom nikada neće uključiti informacije pomoću kojih bi se
        mogli identifikovati pojedinci, osobe koje su popunile pomenutu formu.
        Veb stranica www.gromet.rs upotrebljava softverske programe koji prate mrežni saobraćaj sa
        ciljem identifikacije pokušaja neautorizovanog pristupa. Ne preduzimamo povezivanje ovih
        adresa sa identitetom posetilaca, sve dok se ne konstatuje pokušaj neovlašćenog upada u
        sistem radi nanošenja štete ovoj Internet lokaciji. Podaci o pozicioniranju i lokaciji Usluge
        zasnovane na lokaciji utvrđuju lokaciju pomoću satelita, mobilne, Wi-Fi ili druge mreže na
        osnovu metoda pozicioniranja. Ove tehnologije mogu da obuhvataju razmenu podataka o vašoj
        lokaciji i jedinstvenih identifikatora uređaja i mobilne, Wi-Fi ili druge mreže sa www.gromet.rs.

        Naša internet prezentacija može da funkcioniše na platformama za više uređaja, koji takođe
        mogu da sakupljaju vaše podatke o lokaciji. Ne koristimo ove podatke da bismo Vas lično
        identifikovali bez Vašeg pristanka.
        Korišćenje proizvoda i usluga kada pristupate našem web sajtu, naši web-serveri automatski
        prave evidenciju vaše posete. Ova evidencija obično obuhvata IP adresu, vreme pristupanja,
        sajtove sa kojih dolazite, posećene stranice, korišćene veze i funkcije, pregledani ili traženi
        sadržaj, tip pregledača ili aplikacije i druge slične informacije
      </p>
      <p><strong>Zaštita ličnih podataka</strong></p>
      <p>
        Sve standardne mere predostrožnosti se preduzimaju kako bi se sprečio neovlašćen pristup
        Vašim ličnim podacima. Od korisnika se može zahtevati naknadna provera identiteta kako bi
        informacije o nalozima bile potpune. Gromet doo će povremeno slati Newsletter
        (obaveštenja/reklamni materijal) na primarni kontakt e-mail, a korisnici imaju mogućnosti da se
        ispišu sa ove mailing liste, ako to žele.
        Vaše transakcije sa nama, evidenciju vaših kupovina, preuzimanja, sadržaja koji ste nam pružili,
        Vaših zahteva, ugovora između Vas i Gromet doo pruženih proizvoda i usluga, detalja o plaćanju
        i isporuci, vaših kontakata i komunikacija i drugih interakcija sa nama čuvamo u našoj bazi
        podataka.
        Gromet doo garantuje da striktno primenjuje sve standardne bezbednosne mere štiteći lične
        podatke sakupljene od svojih korisnika. Ovo uključuje, ali nije ograničeno sa: pristupom ličnim
        podacima sa lozinkom, ograničenim pristupom osetljivim podacima, enkriptovanim transfer
        osetljivih podataka poslatih od strane korisnika na Gromet doo formama za prijavu, naručivanje
        itd. Ipak, mogu postojati propusti vezani za bezbednost koji nisu pod kontrolom Gromet doo.
        Odlukom da kompaniji Gromet doo obezbedi lične informacije korisnik razume i slaže se sa
        činjenicom da bezbednost, integritet i privatnost njegovih podataka ne može biti 100%
        garantovana. Gromet doo zadržava pravo da bilo kada izmeni ovu Politiku privatnosti. Svaka
        izmena postaje važeća nakon njenog objavljivanja na web sajtu www.gromet.rs
      </p>
    </>,
  },
  {
    title: 'Politika kolačića',
    text: <p>Kolačići su male datoteke koje se čuvaju na Vašem uređaju (laptop, tablet, smartphone itd.) i to
    prilikom posete naše internet stranice. Kolačići ne nanose štetu vašem uređaju, ne sadrže
    viruse, trojance ili druge zlonamerne softvere. U kolačićima se čuvaju informacije koje se
    dobijaju u vezi sa uređajem koji koristite. Međutim, to ne znači da smo upoznati sa Vašim
    identitetom. S jedne strane, korišćenje kolačića služi da Vam poseta internet stranici bude
    prijatnija. Na primer, koristimo takozvane <strong>kolačiće sesije</strong> kako bismo prepoznali da ste
    određene delove naše stranice već posetili ili da ste već prijavljeni na svom korisničkom nalogu.
    Oni se automatski brišu nakon što napustite našu internet stranicu. Pored toga, koristimo
    i <strong>privremene kolačiće</strong> koji se određeno vreme skladište na Vašem uređaju. Kada ponovo
    posetite našu internet stranicu, automatski se prepoznaje da ste već bili na stranici i koja
    podešavanja ste postavili, tako da ove radnje nećete morati da ponovite.
    Sa druge strane, kolačiće koristimo kako bismo <strong>statistički evidentirali</strong> korišćenje naše internet
    stranice, i to u cilju optimizacije ponude i prikaza informacija koje su prilagođene Vašim
    interesovanjima. Ovi kolačići nam omogućavaju da Vas automatski prepoznamo kada ponovo
    posetite našu internet stranicu. Ovi kolačići se automatski brišu nakon 5 godina.</p>,
  },
  {
    title: 'Opšti uslovi korišćenja',
    text: <>
    <p><strong>Opšte odricanje od odgovornosti</strong></p>
    <p>Važno je napomenuti da mi nastojimo da što preciznije opišemo, vizuelno prikažemo i objasnimo način i mesta primene i ugradnje naših proizvoda. Međutim, ne možemo uvek garantovati potpunost i tačnost svih datih informacija. Preporučujemo Vam da pre korišćenja naših artikala dobro proverite sva svojstva proizvoda i posavetujete se sa sturčnjacima o korišćenju.</p>
    <p>GROMET DOO ne garantuje da se neće dogoditi nikakva greška prilikom korišćenja naših proizvoda, niti da će naše usluge uvek biti na raspolaganju.</p>
    <p>Odricanje od odgovornosti za internet stranice trećih lica</p>
    <p><strong>a.</strong> Ova internet stranica sadrži linkove (hiperlinkove) za druge internet stranice kojima upravljaju treća lica i čiji sadržaj nije poznat kompaniji Gromet. Kompanija Gromet samo olakšava pristup takvim internet stranicama i ne snosi nikakvu odgovornost za njihov sadržaj. Jedina svrha naših linkova do internet stranica trećih lica jeste da vam olakša snalaženje na internetu. Izjave na stranicama do kojih ti linkovi vode nisu naše izjave. Izričito odbacujemo vezu sa sadržajem stranica trećih lica do kojih vode linkovi naznačeni na našoj internet stranici. Pre svega ne preuzimamo odgovornost ni za kakvo kršenje zakonskih odredaba ili povredu prava trećih lica na tim stranicama.</p>
    <p><strong>b.</strong> Kada je reč o internet stranama do kojih vode hiperlinkovi sa internet stranice kompanije Gromet, vlasnici tihinternet stranica snose isključivu odgovornost za sadržaj tih stranica kao i za prodaju proizvoda koji su na njima ponuđeni i rukovanje narudžbinama u vezi s tim proizvodima.</p>
    <p><strong>c.</strong> Gromet ne snosi odgovornost za kršenje autorskih prava, robnih žigova ili druge intelektualne svojine ili ličnih prava na stranicama do kojih vodi neki hiperlink.</p>
    <p><strong>d.</strong> U slučaju porudžbine ili bilo kakvog drugog pravnog posla u vezi sa nekom transakcijom, ugovor se sklapa isključivo između korisnika i vlasnika odgovarajuće internet stranice, ili između stranke koja robu nudi ili lica koje je zastupa a ni u kom slučaju između kompanije Gromet i korisnika. Molimo vas da uzmete u obzir opšte poslovne uslove ponuđača na veb-sajtu do koga vodi hiperlink.</p>
    <p><strong>e.</strong> Ovo odricanje od odgovornosti važi za sve linkove koji se pojavljuju na internet stranici Gromet.com kao i za sav sadržaj internet stranica na koje se korisnik usmerava putem takvih linkova.</p>
    </>,
  },
  {
    title: 'Autorska prava',
    text: <p>
      Naš sajt poštuje autorska prava i trudi se da bude u skladu sa zakonskim propisima o zaštiti
      autorskih prava. Svi tekstovi, slike i drugi materijali na našem sajtu su zaštićeni autorskim
      pravima i ne smeju se kopirati ili distribuirati u celosti ili u delovima bez izričitog pismenog
      odobrenja vlasnika autorskih prava. Ukoliko želite da koristite deo našeg materijala, molimo Vas
      da nas kontaktirate i zatražite dozvolu.
      Ukoliko primetite da naš sajt krši autorska prava drugog autora, molimo Vas da nas kontaktirate
      i obavestite nas o tome. Mi ćemo preduzeti odgovarajuće mere kako bismo uklonili sporni
      sadržaj ili se dogovorili sa vlasnikom autorskih prava o njegovoj upotrebi.
      Takođe, naš sajt poštuje autorska prava drugih autora i trudi se da bude u skladu sa zakonskim
      propisima o zaštiti autorskih prava. Ukoliko ste autor nekog dela koji smo objavili na našem
      sajtu, a niste dali dozvolu za to, molimo Vas da nas kontaktirate kako bismo uklonili sporni
      sadržaj ili se dogovorili oko njegove upotrebe.
    </p>,
  },
];

function HelpFAQMobile() {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();
  useEffect(() => {
    routeHistoryUpdate(['Početna', 'Pomoć i podrška']);

    const query = new URLSearchParams(window.location.search);
    if(query){
      const question = query.get('q');
      switch(question){
        case text_Ostalo.toLowerCase():
          setPanelShown(text_Ostalo);
          break;
        case "reklamacije":
          setPanelShown(text_Reklamacije);
          break;
        case "isporuka":
          setPanelShown(text_Isporuka);
          break;
        case "porucivanje":
          setPanelShown(text_Porucivanje);
          break;
        default:
          break;
      }
      const item = query.get('p');
      const number = Number(item);
      if(number && !Number.isNaN(number)){
        setItemShown(number);
      }else{
        setItemShown(0);
      }
      window.scrollTo({ top: 550, behavior: 'smooth' })
    }
  }, []);

  

  const [panelShown, setPanelShown] = useState('');
  const [itemShown, setItemShown] = useState(0);
 

    const handleChange = (newValue :string) => {

      switch(newValue){
        case text_Ostalo:
          if(text_Ostalo === panelShown){
            setPanelShown('');
            break;
          }else{
            setPanelShown(text_Ostalo);
          }
          break;
        case text_Reklamacije:
          if(text_Reklamacije === panelShown){
            setPanelShown('');
            break;
          }else{
            setPanelShown(text_Reklamacije);
          }
          break;
        case text_Isporuka:
            if(text_Isporuka === panelShown){
            setPanelShown('');
            break;
          }else{
            setPanelShown(text_Isporuka);
          }
          break;
        case text_Porucivanje:
            if(text_Porucivanje === panelShown){
              setPanelShown('');
              break;
            }else{
              setPanelShown(text_Porucivanje);
            }
          break;
        default:
          break;
      }
    }
    

  return (
    <div className="block">
      <div className="container">
        <img className="imgAboutUsBanner" src={FaqBanner}></img>
        <div className="document faqdocument">
          <div className="document__header">
            <h1 className="document__title">Pomoć i podrška</h1>
          </div>
          <div className="faqCardPanelContainerMobile">
            <div className="document__content typography">
              <div className="divOfferCardsContainer container">
                <div className="faqIconListContainer block-features__list faqIconListContainerMobile">
                  <div className="block-features__item">
                    <div
                      className="faqIconContainer block-features__icon faqIconContainerMobile"
                      onClick={() => handleChange(text_Porucivanje)}
                      style={{
                        border:
                          panelShown === text_Porucivanje
                            ? '1px solid #004D8C'
                            : '',
                      }}
                    >
                      <img
                        src={icon1}
                        style={{
                          filter:
                            panelShown === text_Porucivanje
                              ? 'grayscale(0)'
                              : 'grayscale(100%)',
                        }}
                      />
                        <div className="block-features__content">
                        {/* <div className="block-features__subtitle">Total Guests</div> */}
                        <div
                            className="faqCardTitle block-features__title"
                            style={{
                            color:
                                panelShown === text_Porucivanje
                                ? '#004D8C'
                                : '#3d464d',
                            }}
                        >
                            Poručivanje
                        </div>
                        </div>
                    </div>
                    
                    <div
                    className="divHiddenFaqPage"
                    hidden={panelShown !== text_Porucivanje}
                    >
                    {porucivanje.map((item, index) => {
                        return <FaqItem key={item.title} {...item} activeKey={String(itemShown)}  index={String(index)}></FaqItem>;
                    })}
                    </div>
                  </div>
                  <div className="block-features__divider"></div>
                  <div className="block-features__item">
                    <div
                      className="faqIconContainer block-features__icon faqIconContainerMobile"
                      onClick={() => handleChange(text_Isporuka)}
                      style={{
                        border:
                          panelShown === text_Isporuka
                            ? '1px solid #004D8C'
                            : '',
                      }}
                    >
                      <img
                        src={icon2}
                        style={{
                          filter:
                            panelShown === text_Isporuka
                              ? 'grayscale(0)'
                              : 'grayscale(100%)',
                        }}
                      />
                        <div className="block-features__content">
                        {/* <div className="block-features__subtitle">Cities</div> */}
                        <div
                            className="faqCardTitle block-features__title"
                            style={{
                            color:
                                panelShown === text_Isporuka ? '#004D8C' : '#3d464d',
                            }}
                        >
                            Isporuka
                        </div>
                        </div>
                    </div>
                    <div
                        className="divHiddenFaqPage"
                        hidden={panelShown !== text_Isporuka}
                    >
                        {isporuka.map((item, index) => {
                            return <FaqItem key={item.title} {...item} activeKey={String(itemShown)}  index={String(index)}></FaqItem>;
                        })}
                    </div>
                  </div>
                  <div className="block-features__divider"></div>
                  <div className="block-features__item">
                    <div
                      className="faqIconContainer block-features__icon faqIconContainerMobile"
                      onClick={() => handleChange(text_Reklamacije)}
                      style={{
                        border:
                          panelShown === text_Reklamacije
                            ? '1px solid #004d8c'
                            : '',
                      }}
                    >
                      <img
                        src={icon3}
                        style={{
                          filter:
                            panelShown === text_Reklamacije
                              ? 'grayscale(0)'
                              : 'grayscale(100%)',
                        }}
                      />
                        <div className="block-features__content">
                        {/* <div className="block-features__subtitle">Castles</div> */}
                        <div
                            className="faqCardTitle block-features__title"
                            style={{
                            color:
                                panelShown === text_Reklamacije
                                ? '#004D8C'
                                : '#3d464d',
                            }}
                        >
                            Reklamacije i povrat
                        </div>
                        </div>
                    </div>
                    <div
                        className="divHiddenFaqPage"
                        hidden={panelShown !== text_Reklamacije}
                        >
                        {reklamacije.map((item, index) => {
                            return <FaqItem key={item.title} {...item} activeKey={String(itemShown)}  index={String(index)}></FaqItem>;
                        })}
                    </div>
                  </div>
                  <div className="block-features__divider"></div>
                  <div className="block-features__item">
                    <div
                      className="faqIconContainer block-features__icon faqIconContainerMobile"
                      onClick={() => handleChange(text_Ostalo)}
                      style={{
                        border:
                          panelShown === text_Ostalo ? '1px solid #004D8C' : '',
                      }}
                    >
                      <img
                        src={icon4}
                        style={{
                          filter:
                            panelShown === text_Ostalo
                              ? 'grayscale(0)'
                              : 'grayscale(100%)',
                        }}
                      />
                        <div className="block-features__content">
                        {/* <div className="block-features__subtitle">Countries</div> */}
                        <div
                            className="faqCardTitle block-features__title"
                            style={{
                            color:
                                panelShown === text_Ostalo ? '#004D8C' : '#3d464d',
                            }}
                        >
                            Ostale informacije
                        </div>
                        </div>
                    </div>
                    <div
                        className="divHiddenFaqPage"
                        hidden={panelShown !== text_Ostalo}
                        >
                        {ostalo.map((item, index) => {
                            return <FaqItem key={item.title} {...item} activeKey={String(itemShown)}  index={String(index)}></FaqItem>;
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpFAQMobile;
