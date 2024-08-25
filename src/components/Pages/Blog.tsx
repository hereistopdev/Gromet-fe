import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost';
import './Blog.css';
import { Button } from 'antd';
import { useBreadCrumbsUpdateContext } from '../Content/AffiliateLayers/Context/BreadCrumbsContext';

import blog0 from '../../assets/blogOne/slika1.webp';
import blog1 from '../../assets/blogtwo/slika8.webp';
import blog2 from '../../assets/blogThree/police-za-izlaganje.webp'

import blog0_thumbnails from '../../assets/blogOne/blog1.webp';

import blog1_thumbnails from '../../assets/blogtwo/blog2.webp';
import blog2_thumbnails from '../../assets/blogThree/blog3.webp';



export const minuti_citanja = [
  2,
  4,
  4
]
const thumbnails = [
  blog2_thumbnails,
  blog0_thumbnails,
  blog1_thumbnails
]

export const latestNews = [
  blog2,
  blog0,
  blog1,
  // 'https://cdn.thomasnet.com/insights-images/embedded-images/5445a95e-38e6-4c43-b429-5b9d9ddfa417/cbacee4d-0bfe-4517-9850-01cf95f8eec7/FullHD/best-tool-box-organizers-min.webp',
  // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1TI_vJsc8-RdYhFBE7j4mNtX3cR9aQs5FA&usqp=CAU',
  // 'data:image/jpeg;base64,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',
  // 'https://images.unsplash.com/photo-1435575653489-b0873ec954e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
  // 'data:image/jpeg;base64,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',
  // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwLUARNCkhu5mV2MPWSWsJx1yAAsHoIlSdurOlp_nPlBFpgonvHYeK7FyYvrrLg54voqY&usqp=CAU',
];

export const authors = ['Gromet'];
export const categories = [
  'Novo u ponudi',
  'Gradjevinarstvo',
  'Ekologija',
  // 'Gradjevinarstvo',
  // 'Novinarstvo',
  // 'Dizajn',
  // 'Enterijer',
  // 'Alati',
  // 'Materijal',
  // 'Masine',
  // 'Skice',
];
export const dates = [
  '11.06.2023',
  '06.06.2023',
  '05.06.2023',
  // '25.02.2023',
  // '26.02.2023',
  // '27.02.2023',
  // '28.02.2023',
  // '01.03.2023',
  // '02.03.2023',
  // '03.03.2023',
];
export const titles = [
  'Unapredite izlaganje proizvoda uz naše nove police za izlaganje',
  '5 razloga da suvom gradnjom zamenite tradicionalnu',
  'Top 10 najboljih ekoloških materijala za održivu gradnju',
  // 'Exploring the Versatility of Concrete: Innovative Uses and Designs',
  // 'The Pros and Cons of Using Natural Stone in Your Construction Project',
  // 'Breaking Down the Benefits of Metal Roofing for Commercial Buildings',
  // 'The Evolution of Sustainable Building Materials: What to Look for in Green Construction',
  // 'Why Insulated Concrete Forms are a Game-Changer in Modern Home Building',
  // 'From Traditional to Modern: A Guide to Choosing the Right Brick for Your Project',
];
export const href = [
  '/blog/Unapredite-izlaganje-proizvoda-uz-naše-nove-police-za-izlaganje',
  "/blog/5-razloga-da-suvom-gradnjom-zamenite-tradicionalnu",
  "/blog/Top-10-najboljih-ekoloških-materijala-za-održivu-gradnju",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
];

export const contents = [
  "Dragi partneri, Predstavljamo Vam najnoviji dodatak našoj ponudi - police za izlaganje. Ova usluga ima za cilj da vam pomogne da maksimalno iskoristite prostor u vašim prodavnicama, poboljšate prezentaciju naših proizvoda i povećate prodaju.",
  "Suva gradnja je tehnologija građenja koja se izvodi bez upotrebe vode, gline, cementa i drugih klasičnih građevinskih materijala. Umesto toga, koristi se širok spektar modernih građevinskih materijala, kao što su gips-karton ploče, paneli od OSB-a, drvo, čelični profili i drugi materijali koji se mogu lako montirati i demontirati. Ovaj proces izgradnje omogućava brzu i ekonomičnu gradnju, sa manje otpada, manjom potrošnjom energije i manjim zagađenjem okoline u poređenju sa tradicionalnom gradnjom. Suva gradnja se često koristi za izgradnju unutrašnjih pregrada, plafona, izolacije, kao i za izgradnju potpunih kuća i drugih vrsta građevina.",
  
  "Ekološka svest postala je sveprisutna tema koja je u poslednjoj deceniji izuzetno dobila na značaju. Građevinski sektor je jedan od najuticajnijih kada je u pitanju ekološki uticaj na sredinu, potrošnja resursa ili emisija štetnih gasova. Iz ovog razloga je veoma važno da što veći broj ljudi koji posluju u okviru ove industrije, prepozna važnost zaštite životne sredine i u svoj posao implementira ekološki prihvatljivije materijale.",

  // "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In that sense, all cultures...",
  // "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In that sense, all cultures...",
  // "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In that sense, all cultures...",
  // "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In that sense, all cultures...",
  // "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In that sense, all cultures...",
  // "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In that sense, all cultures...",
];
const text_popularno = 'Popularno';
const text_poslednje = 'Poslednje';

function Blog() {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();
  useEffect(() => {
    routeHistoryUpdate(['Početna', 'Blog']);
  }, []);

  const [panelShown, setPanelShown] = useState(text_popularno);
  return (
    <div className="container">
      <div className="BlogPagePageHeaderTitle page-header__title">
        <h1>Blog</h1>
      </div>
      <div className="divBlogContainer">
        <div className="divFlexBlogPostsContainer">
          {latestNews.map((news, index) => (
            <BlogPost
              key={index}
              {...{
                image: news,
                isSmall: false, 
                title: titles[index],
                category: categories[index],
                author: 'Gromet',
                date: dates[index],
                readTime: `${minuti_citanja[index]} minuta čitanja`,
                href: href[index],
                content: contents[index]
              }}
            ></BlogPost>
          ))}
        </div>

        <div className="divBlogRightContainer">
          <div className="block block-sidebar block-sidebar--position--end">

            <div className="block-sidebar__item blogPopularBlogNew">
              <Button
              className={  panelShown === text_popularno ? 'blogCardSelected' : ''}
                onClick={() => setPanelShown(text_popularno)}
              >
                {text_popularno}
              </Button>
              <Button
                className={  panelShown === text_poslednje ? 'blogCardSelected' : ''}
                onClick={() => setPanelShown(text_poslednje)}
              >
                {text_poslednje}
              </Button>
              <div className="widget-aboutus widget">
                <div
                  className="blogPopularnoLista"
                  style={{
                    display: panelShown === text_popularno ? 'flex' : 'none',
                  }}
                >
                  {thumbnails.map((news, index) => {
                    if (index % 2 === 0)
                      return (
                        <BlogPost
                          key={index}
                          {...{
                            image: news,
                            isSmall: true, 
                            title: titles[index],
                            category: categories[index],
                            author: '',
                            date: dates[index],
                            readTime: `${minuti_citanja[index]} minuta čitanja`,
                            href: href[index]
                          }}
                        ></BlogPost>
                      );
                  })}
                </div>
                <div
                  className="blogPoslednjeLista"
                  style={{
                    display: panelShown === text_poslednje ? 'flex' : 'none',
                  }}
                >
                  {thumbnails.map((news, index) => {
                    if (index % 2 !== 0)
                      return (
                        <BlogPost
                          key={index}
                          {...{
                            image: news,
                            isSmall: true, 
                            title: titles[index],
                            category: categories[index],
                            author: '',
                            date: dates[index],
                            readTime: `${minuti_citanja[index]} minuta čitanja`,
                            href: href[index]
                          }}
                        ></BlogPost>
                      );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
