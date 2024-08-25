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

import {ClockCircleOutlined} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { useBreadCrumbsUpdateContext } from '../Content/AffiliateLayers/Context/BreadCrumbsContext';

import BlogPicture from '../../assets/blogThree/police-za-izlaganje.webp'

const banner_img_link = 'https://thumbs.dreamstime.com/b/group-industrial-workers-banner-blank-isolated-over-white-background-207139483.webp'
const img_link = 'https://alfatim.rs/wp-content/uploads/2021/12/Moler-featured-slika.webp';
const p_text = '';
function BlogItemPageTwo() {

    const routeHistoryUpdate = useBreadCrumbsUpdateContext();
    
    useEffect(() => {
      routeHistoryUpdate(['Početna', 'Blog', 'Unapredite izlaganje proizvoda uz naše nove police za izlaganje']);
    }, []);
    
const shareButtonItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={'viber://forward?text='+ encodeURIComponent("Pogledajte ovaj proizvod na zvanicnom sajtu Grometa"+ " " + window.location.href)}
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
          href={'https://www.facebook.com/sharer/sharer.php?u='+ (window.location.href)}
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
          href={"mailto:?subject=Pogledajte ovaj blog na zvanicnom sajtu Grometa&body="+window.location.href}
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
      localStorage.setItem("potkategorije", "Alati-skalpeli-noževi-testere-žičane četke-makaze-pištolji-heftalice-merni alati i libele-mikseri-gleterice-špahtle-mistrije-četke-valjci-ostali alati")
      window.location.href = '/proizvodi#filteri=Alati&stranica=1'
    }
    return (
    <div className='container divBlogPostItemContainerContainer'>
        <div className='divBlogPostItemContainer container'>
            <h1 className='divBlogPostItemTitle'>Unapredite izlaganje proizvoda uz naše nove police za izlaganje</h1>
            <div className="blogpost-bottomLabel"><ClockCircleOutlined style={{marginLeft: "8px", paddingLeft:"5px"}}></ClockCircleOutlined><label style={{marginLeft: "5px"}}>{"2 minuta čitanja"}</label>{','} {'11.11.2023.'} </div>
            
           
            
            {/* <h1 className='divBlogPostItemh1'>Uvod</h1> */}
            <p className='pBlogPostItemText'>
                {'Poštovani saradnici, sa zadovoljstvom vam predstavljamo deo naše ponude - izložbene police. Police će vam omogućiti da optimalno iskoristite prostor u vašim radnjama, unapredite izlaganje naših proizvoda i pospešite prodaju.'}
            </p>
            {/* <h2 className='divBlogPostItemh2'>Podnaslov</h2> */}
            <p className='pBlogPostItemText'>
                {'Naše izložbene police su posebno kreirane da istaknu širok asortiman naših proizvoda. Izrađene su od visoko kvalitetnih materijala i nude veliku prilagodljivost za različite postavke unutar radnje. Modernim dizajnom, one će unaprediti izgled vašeg prodajnog prostora dodajući mu sofisticiranost i profesionalnost.'}
            </p>
            <div className='divBlogItemPageImgBanner container' style={{maxWidth: "960px", maxHeight: "400px"}}>
                <img src={BlogPicture} style={{maxWidth: "960px", maxHeight: "400px"}}></img>
            </div>

            {/* <h2 className='divBlogPostItemh2'>Podnaslov</h2> */}
            <p className='pBlogPostItemText'>
                {'Njihov jednostavan dizajn stavlja proizvode u fokus, privlačeći pažnju kupaca i olakšavajući proces odlučivanja o kupovini. Police su kreirane tako da se jednostavno uklapaju u različite prodajne prostore, bez ugrožavanja postojećeg ambijenta radnje.'}
            </p>

            {/* <h2 className='divBlogPostItemh2'>Podnaslov</h2> */}
            <p className='pBlogPostItemText'>
              {'Ove police imaju dodatne prednosti: pružaju bolji pregled prodate robe kao i robe koja treba da se naruči, istovremeno olakšavajući pregled za kupce. Na policama se nalazi ime i logo naše firme, služeći kao dodatna reklama.'}
            </p>

            {/* <div className='divBlogItemPageImages'>
                <img src={img_link}></img>
                <img src={img_link}></img>
                <img src={img_link}></img>
            </div> */}
            {/* <h2 className='divBlogPostItemh2'>Zakljucak</h2> */}
            <p className='pBlogPostItemText'>
                {'Pozivamo vas da testirate naše nove izložbene police. Uvereni smo da će one doneti dodatnu vrednost vašoj radnji, unaprediti prezentaciju naših proizvoda i pomoći u povećanju prodaje.'}
            </p>
            <p className='pBlogPostItemText'>
                {'Na koji način možete dobiti policu?'}
            </p>
            <p className='pBlogPostItemText'>
                {'Poručivanjem robe u određenoj vrednosti ostvarujete pravo na besplatnu policu i prateće elemente za tu robu. Za više informacija molimo Vas da kontaktirate naše kolege prodavce koji su zaduženi za Vas ili nas kontaktirajte na broj 060/0768777 ili e-mail prodaja@gromet.rs.'}
            </p>

            <a  onClick={() => handleAlatiClick()} style={{textDecoration: "underline", cursor: "pointer"}}>Pogledajte naše proizvode koje možete predstaviti policama</a>
            <br></br><br></br>
            
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
        {/* <label><b> #police #policezaizlaganje #prodaja #proizvodi #artikli</b></label> */}
        {/* <br></br> */}
        <a href='/novo' style={{textDecoration: "underline"}}>Pogledajte našu najnoviju ponudu proizvoda</a>
            <br></br>    
        </div>

    </div>
  )
}

export default BlogItemPageTwo