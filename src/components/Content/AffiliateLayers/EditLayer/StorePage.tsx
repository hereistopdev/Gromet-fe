import React, { useEffect, useRef, useState } from 'react';
import { RightOutlined, LeftOutlined, SlidersOutlined, LoadingOutlined } from '@ant-design/icons';
import { baseApi } from "../../../../constants";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './StorePage.css';
import {
  Checkbox,
  Collapse,
  Pagination,
  Row,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  useBreadCrumbsContext,
  useBreadCrumbsUpdateContext,
} from '../Context/BreadCrumbsContext';
import { Card } from 'antd';
//import products from './products.json';
import { CheckboxChangeEventTarget } from 'antd/es/checkbox/Checkbox';

import type { MenuProps } from 'antd';
import useWindowWidth from '../../../../hooks/useWindowWidth';
import { getImagePath } from '../../../../hooks/helpers';
import { Product } from '../ProductPage';
// import { getValue } from '@testing-library/user-event/dist/utils';
import ProductCard from '../ProductCard/ProductCard';
import { preventImgRightClick } from '../../../../helpers/helpers';
import axios from 'axios';

const { Meta } = Card;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', <></>, [
    getItem(
      'Item 1',
      'g1',
      null,
      [getItem('Option 1', '1'), getItem('Option 2', '2')],
      'group'
    ),
    getItem(
      'Item 2',
      'g2',
      null,
      [getItem('Option 3', '3'), getItem('Option 4', '4')],
      'group'
    ),
  ]),

  getItem('Navigation Two', 'sub2', <></>, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', <></>, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem(
    'Group',
    'grp',
    null,
    [getItem('Option 13', '13'), getItem('Option 14', '14')],
    'group'
  ),
];

const layersPagePath = ['Proizvodi', 'Proizvodi '];
const { Panel } = Collapse;


// indexes of next two arrays have to match.
export const composite_categories = [
  "Aluminijumske lajsne", 
  "Pvc lajsne", 
  "Trake", 
  "Folije", 
  "Alati", 
]

export const subCategoryLocalStorageList = [
  'Aluminijumske lajsne-početne-ugaone',
  'PVC LAJSNE-ugaone-okapnice-lajsne za prozore-lajsne za fasadu',
  'TRAKE-bandaž trake-krep trake-zaštitne trake-dihtung trake-ostale trake',
  'FOLIJE-krovne folije-folije za zaštitu-termosilent-građevinske folije-folija za plastenike',
  'Alati-skalpeli-noževi-testere-žičane četke-makaze-pištolji-heftalice-merni alati i libele-mikseri-gleterice-špahtle-mistrije-četke-valjci-ostali alati',
]

function StorePage() {
  const routeHistoryUpdate = useBreadCrumbsUpdateContext();
 
  const routeHistory = useBreadCrumbsContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (layersPagePath.includes(routeHistory[routeHistory.length - 1])) {
      navigate('/proizvodi');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeHistory]);

  const defaultNumPerPage = window.innerWidth > 900 ? 9 : 15;
  const [numEachPage, setNumEachPage] = useState(defaultNumPerPage);
  const [productsList, setProductsList] = useState<any[]>([]);//useState([]);//useState([...products]);
  const [minPage, setMinPage] = useState(0);
  const [maxPage, setMaxPage] = useState(numEachPage);
  const [defaultPaginationPage, setDefaultPaginationPage] = useState(1);




  const handlePageChange = (value: number) => {
    setMinPage((value-1) * numEachPage);
    setMaxPage((value) * numEachPage);
   
    localStorage.setItem('PageChange', value.toString());
    const filters = window.location.hash;
    const index = filters.split('filteri=')[1]?.split("&")[0];
    // perserve page hash
    console.log("handle page change window.location hash", index)
    if(index){
      window.location.hash = "filteri="+ index + "&" + "stranica=" + value;
      // setFilteredProducts(filterState(index.split(','), "Kategorija"));
    }else{
      window.location.hash = "stranica="+value;
    }

    window.scrollTo({ top: 100, behavior: 'smooth' });
  };
  const handlePageSizeChange = (value: number) => {
    setMinPage(minPage * numEachPage);
    setMaxPage(maxPage * numEachPage);
  };
  const handleSelectChange = (value: any) => {
    setNumEachPage(value);
    setMinPage(0 * value);
    setMaxPage(1 * value);
    localStorage.setItem('PageSizeChange', value.toString());
  };

  const [filteredProducts, setFilteredProducts] = useState(productsList);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);


  useEffect(() => {
    let token = localStorage.getItem('accessToken');
    axios.get(`${baseApi}/products/getProducts`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(res => {
      if (res.data.data)
        setProductsList(res.data.data);
        setFilteredProducts(res.data.data);
    });
  }, []);

  const filterProducts = (filter: any, filterName: string, affectSubcategories :boolean) => {
    const panel = document.getElementById(`${filter.id}`)?.parentNode;
    let activeFilters: Array<string> = [];

    // console.log(`${filter.id}:`, panel);

    if (panel) {
      panel.childNodes.forEach((filterDiv: any, index) => {
        let inputValue :boolean;
        // ant-collapse-no-arrow
        if ((filterDiv as HTMLElement).classList.contains('ant-collapse-no-arrow') === true) {
          inputValue = (
            filterDiv.childNodes[0].childNodes[0].childNodes[0] as HTMLInputElement
          ).checked;
          // .childNodes[0].childNodes[0]
          // console.log(`childNode without arrow`, filterDiv.id, inputValue);
        } else {
          inputValue  = (
            filterDiv.childNodes[0].childNodes[1] //.childNodes[0].childNodes[0]
              .childNodes[0] as HTMLInputElement
          ).checked;
          setTimeout(() => {
            if(filterDiv?.childNodes[1]?.childNodes[0]?.childNodes){
              const subcategories = Array.from(filterDiv?.childNodes[1]?.childNodes[0]?.childNodes).filter((node :any) => node.nodeName === 'INPUT');
             if(subcategories && affectSubcategories && filter.id === filterDiv.id){
                subcategories.forEach((subcategory :any) => {(subcategory as HTMLInputElement).checked = inputValue;});
              }
            }
          }, 800);
        }
        // console.log("jebem ti ovaj input value:", inputValue, filterDiv.id)
        if (inputValue) {
          activeFilters.push(filterDiv.id as string);
        }
      });
    }
    // localStorage.setItem('activeFilters', activeFilters.toString());
    // console.log('active filters', activeFilters, filter);
    const finalList : Array<any> = filterState(activeFilters, filterName, filter);
    
    const mockStickerId = "chbxNovo";
    const finalFinalList = checkStickers(mockStickerId, finalList)

    setFilteredProducts(finalFinalList);    
  };

  const filterState = (activeFilters: Array<string>, filterName: string, eventTarget? :any) => {

    let currentList: Array<any> = [];
    window.location.hash = '';
    const pageLocalStorage = localStorage.getItem('PageChange');
    const pageNumber = pageLocalStorage && eventTarget === undefined ? Number(pageLocalStorage) : 1;
    // console.log(pageNumber, "pnmbr", activeFilters,filterName, eventTarget )
    handlePageChange(pageNumber);
    if (activeFilters.length > 0) {
      //console.log("filterState active filters in hash = ", activeFilters, pageNumber);
     
      window.location.hash = "filteri=" + activeFilters.toString();
      setTimeout(() => {
        updateSubCategoryStorage(activeFilters);
      }, 850);
      handlePageChange(pageNumber);
      
      activeFilters.forEach((filter) => {
        const filterResult =
          filterName === 'Kategorija'
            ? productsList.filter((product) => product?.kategorija_artikla.length === filter.length &&
                product?.kategorija_artikla
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              )
            : productsList.filter((product) => product?.potkategorija.length === filter.length &&
                product?.potkategorija
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              );
        filterResult.forEach((el) => {
          if (
            !currentList.find(
              (product) => product.naziv_artikla === el?.naziv_artikla
            ) && eventTarget !== "useeffect"
          ) {
            if(el.potkategorija !== "/" && eventTarget?.id !== el.kategorija_artikla && composite_categories.map(el => el.toLowerCase()).includes(el.kategorija_artikla.toLowerCase())){
                 const elCategory = document.getElementById(el.kategorija_artikla);
                  // console.log("elkategory el:", elCategory);
                  if(elCategory){
                    elCategory?.childNodes[1]?.childNodes[0]?.childNodes.forEach((child :any) => {
                      // console.log("element loop", child, child.id, el, child.checked)
                      if(String(child.id).toLowerCase() === el.potkategorija.toLowerCase()){
                        const isSubCategoryChosen = (child as HTMLInputElement).checked;
                        // console.log("isSubCategoryChosen loop",isSubCategoryChosen, child.checked)
                        if(isSubCategoryChosen){
                         currentList.push(el);
                        }
                      }
                  })                                   
                }
              
              }else{
                currentList.push(el);
              }
          }
        });
      });
    } else {
      currentList = [...productsList];
    }
    // console.log('filters done', currentList);
    return currentList;
  };

  // store state of all subcategories based on their category.
  const updateSubCategoryStorage = (activeFilters :string[]) => {
    activeFilters.forEach((categoryName :string, index :number) => {

      const div = document.getElementById(categoryName);
      const hasSubcategories = !div?.classList.contains('ant-collapse-no-arrow');
      // console.log("div and hasSubcategories", div, hasSubcategories);
      
      // const categoriesList = productsList.filter(p => p.kategorija_artikla === categoryName ).map(p => p.potkategorija)
      // const subcategories = Array.from(new Set(categoriesList))//.map(el => "-"+el.toLowerCase());
      // console.log("subcats store page", subcategories.toString());
      // localStorage.setItem('potkategorije', categoryName + subcategories.toString());

      if(hasSubcategories){
        let activeSubcategories :string = ''; 
        const Subcategories = div?.childNodes[1].childNodes[0].childNodes.forEach(childNode => {
          if(childNode.nodeName === 'INPUT' && (childNode as HTMLInputElement).checked){
            activeSubcategories+= "-" + (childNode as HTMLInputElement).id
            if(activeSubcategories.length > 1)
              activeFilters[index] = categoryName + activeSubcategories;
          }
        })
       

        // console.log("yeey: "+categoryName, activeSubcategories);
      }
    })

    // console.log("ready to push storage", activeFilters);
    localStorage.setItem('potkategorije', activeFilters.toString());
    // window.location.hash = "filteri=" + activeFilters.toString();
  }


  //on change for subcategory clicked
  const filterProductsBySubcategory = (filter: any) => {
    // console.log(filter, 'asds');
    const parentCategory = filter.dataset.kategorija;
    const panel = document.getElementById(`${parentCategory}`);

    if (panel) {
      const activeSubCategories :string[] = getActiveSubcategories(panel);
      // console.log("filetr klliknut", filter, "panel kategorija", panel, activeSubCategories,activeSubCategories.length);
      if(activeSubCategories.length === 0 ){
        // make uncheck panel function from this code below
       const panelInput = (panel.childNodes[0].childNodes[1] //.childNodes[0].childNodes[0]
        .childNodes[0] as HTMLInputElement);
       panelInput.checked = false;
      // console.log("panelINput", panelInput);
       filterProducts({ id: 'Fasadne mrežice' }, 'Kategorija', false);
        return;
      }
      if(activeSubCategories.length === 1 ){
        // make uncheck panel function from this code below
        // console.log("yo");
       const panelInput = (panel.childNodes[0].childNodes[1] //.childNodes[0].childNodes[0]
        .childNodes[0] as HTMLInputElement);
        // console.log("chekirano");
       panelInput.checked = true;
      // console.log("panelINput", panelInput);
       filterProducts({ id: 'Fasadne mrežice' }, 'Kategorija', false);
       
      }
      const category: string = (panel as HTMLElement).id;
      filterStateBySubCategory(category, activeSubCategories);
    }
  };

  const getActiveSubcategories = (panel :any) :string[] => {
    const activeSubCategories :string[] = [];
    panel.childNodes[1].childNodes[0].childNodes.forEach((labelWrapper: any) => {
      let inputValue  :boolean;

      if(labelWrapper.nodeName === "INPUT"){
        console.log("stanje:", labelWrapper.checked);
        inputValue = labelWrapper.checked;
        if(inputValue === true){
          activeSubCategories.push(labelWrapper.id);
        }
      }
    })
    return activeSubCategories;
  }

  //takes category and list of active subcategories and sets state.
  const filterStateBySubCategory = (category : string , activeSubCategories : string[]) => {
    // const persist :any= [];
    const persist = filteredProducts.filter(
              (product) => product.kategorija_artikla.toLowerCase() !== category.toLowerCase() && checkHash(product.kategorija_artikla)
            );
    let forFiltering: any = productsList.filter(
              (product) => product.kategorija_artikla.toLowerCase() === category.toLowerCase()
            );
    console.log('forfiltering', forFiltering, category, activeSubCategories.map((subcat:string) => subcat.toLowerCase()));
    forFiltering = forFiltering.filter((product :any) => activeSubCategories.map((subcat:string) => subcat.toLowerCase()).includes(product.potkategorija.toLowerCase())) 
    console.log('forfiltering after', forFiltering, forFiltering.length + persist.length, persist);
    setFilteredProducts([...forFiltering, ...persist]);

    const stranica = window.location.hash;
    const filters = stranica.split('filteri=')[1]?.split("&")[0];
    if(filters){
      const activeFilters = decodeURI(filters).split(',')
      updateSubCategoryStorage(activeFilters);
    }
  }

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const width = useWindowWidth();

  useEffect(() => {
    const pageSizeChange = Number(localStorage.getItem('PageSizeChange'));
    const pageChange = Number(localStorage.getItem('PageChange'));
    if (pageChange) {
      setMinPage((pageChange - 1) * numEachPage);
      setMaxPage(pageChange * numEachPage);
    }
    if (pageSizeChange) {
      setNumEachPage(pageSizeChange);
      setMinPage(0 * pageSizeChange);
      setMaxPage(1 * pageSizeChange);
    }
    // console.log('saved state is:', pageSizeChange, pageChange, activeFilters);


    const   btn_left = document.getElementById('btn-left'),
    btn_right = document.getElementById('btn-right'),
    content = document.querySelector('.divProductScrollContainer');

    if(content && btn_left && btn_right) {
      const content_scroll_width = content.scrollWidth;
      let content_scoll_left = content.scrollLeft;
      
      btn_right.addEventListener('click', () => {
        // console.log("first right clicked", content_scoll_left, content_scroll_width)
        content_scoll_left += 150;
      if (content_scoll_left >= content_scroll_width) { content_scoll_left = content_scroll_width; }
      content.scrollLeft = content_scoll_left;
      });


      btn_left.addEventListener('click', () => {
        // console.log("first left clicked", content.scrollLeft)
        content_scoll_left -= 150;
        if (content_scoll_left <= 0) {
            content_scoll_left = 0;
        }
        content.scrollLeft = content_scoll_left;
     
      });
    }

    preventImgRightClick();
    const imgs = document.querySelectorAll('img');
    imgs.forEach((img) => img.addEventListener('contextmenu', (e) => {e.preventDefault()}))
    
    routeHistoryUpdate(['Početna', 'Proizvodi']);
  }, []);
  

  const clearAllCategories = () => {
    const ul = document.querySelector('.ulProductStoreFiltercheckboxes');

    const collapse = ul?.querySelectorAll('.ant-collapse');
    if (collapse) {
      console.log(
        'collapse children',
        Array.from(collapse[0].childNodes).filter((node: any) =>
          node.classList.contains('ant-collapse-no-arrow')
        )
      );
      Array.from(collapse[0].childNodes)
        .filter((node: any) => node.classList.contains('ant-collapse-no-arrow'))
        .forEach((div) => {
          const input = div.childNodes[0]//.childNodes[0].childNodes[0]
            .childNodes[0].childNodes[0] as HTMLInputElement;
          input.checked = false;
          input.parentElement!.classList.remove('ant-checkbox-checked');
          console.log(
            'yoo label:',
            div.childNodes[0].childNodes[0]//.childNodes[0].childNodes[1]
              .textContent
          );
        });

      console.log(
        'collapse children wit harrow',
        Array.from(collapse[0].childNodes).filter(
          (node: any) => !node.classList.contains('ant-collapse-no-arrow')
        )
      );
      Array.from(collapse[0].childNodes)
        .filter(
          (node: any) => !node.classList.contains('ant-collapse-no-arrow')
        )
        .forEach((div) => {
          console.log("div",div);
          // .childNodes[0].childNodes[0]
          const input = div.childNodes[0].childNodes[1].childNodes[0] as HTMLInputElement;
          input.checked = false;
          // input.parentElement!.classList.remove('ant-checkbox-checked');

          console.log("first", div.childNodes)
          div?.childNodes[1]?.childNodes[0]?.childNodes?.forEach((childLabel :any) => {
            if(childLabel.nodeName === "INPUT"){
              (childLabel as HTMLInputElement).checked = false;
            }
            // (childLabel.childNodes[0] as HTMLSpanElement).classList.remove('ant-checkbox-checked');
            // (childLabel.childNodes[0].childNodes[0] as HTMLInputElement).checked = false;
          });
          console.log(
            'yoo label with arrow:',
            div.childNodes[0].childNodes[1] //.childNodes[0].childNodes[1]
              .textContent
          );
        });
    }
    window.location.hash = '#stranica=1';
    setFilteredProducts(productsList);
    handlePageChange(1);
  };


  const clearAllFilterStickers = () => {
    const ul = document.querySelector('.ulProductStoreFiltercheckboxes');

    const collapse = ul?.querySelectorAll('.ant-collapse');
    if (collapse) {
      console.log(
        'collapse children stickers:',
        Array.from(collapse[1].childNodes).filter((node: any) =>
          node.classList.contains('ant-collapse-no-arrow')
        )
      );
      Array.from(collapse[1].childNodes)
        .filter((node: any) => node.classList.contains('ant-collapse-no-arrow'))
        .forEach((div) => {
          const input = div.childNodes[0] //.childNodes[0].childNodes[0]
            .childNodes[0].childNodes[0] as HTMLInputElement;
          input.checked = false;
          // input.parentElement!.classList.remove('ant-checkbox-checked');
        });
    }
    setFilteredProducts(productsList);
  };

  const filterStickers = (filter: any, listForFiltering : Array<any>) => {
    handlePageChange(1);
    console.log('first', filter.id);
    const panel = document.getElementById(`${filter.id}`)?.parentNode;
    console.log('first', panel);
    let activeFilters: Array<string> = [];
    if (panel) {
      panel.childNodes.forEach((stickerDiv: any, index) => {
        let inputValue;
        inputValue = stickerDiv.childNodes[0].childNodes[0].childNodes[0] as HTMLInputElement; //.childNodes[0].childNodes[0]
        console.log('stickerDiv', stickerDiv, inputValue);

        if (inputValue && inputValue.checked) {
          activeFilters.push(inputValue.id.split('x')[1] as string);
        }
      });
    }
    if (activeFilters.length > 0) {
      const filterResult = listForFiltering.filter((product) =>{
        // console.log("STICKER", product.stiker);
       return Array.isArray(product.stiker)
        ? product.stiker.some((sticker :any) =>
        activeFilters
        .map((el) => el.toUpperCase())
        .includes(sticker.toUpperCase())
        )
        : activeFilters.map(el => el.toUpperCase()).includes(product.stiker.toUpperCase())
      }
      );
      console.log(
        'active filters',
        activeFilters,
        filteredProducts,
        filterResult
      );
      setFilteredProducts(filterResult);
    } else {
      // console.log("else grana");
      // dummy filter to grab all active categories and filter the products;
      filterProducts({ id: 'Fasadne mrežice' }, 'Kategorija', false);
    }
    
  };

  const checkStickers = (filter: any, listForFiltering : Array<any>) => {

    let filterResult = listForFiltering;
    const panel = document.getElementById(`${filter.id}`)?.parentNode;
    // console.log('checkStickerscheckStickers', panel,filter,  listForFiltering);
    let activeFilters: Array<string> = [];
    if (panel) {
      panel.childNodes.forEach((stickerDiv: any, index) => {
        let inputValue;
        inputValue = stickerDiv.childNodes[0].childNodes[0].childNodes[0] as HTMLInputElement; //.childNodes[0].childNodes[0]
        // console.log('stickerDiv', stickerDiv, inputValue);

        if (inputValue && inputValue.checked) {
          activeFilters.push(inputValue.id.split('x')[1] as string);
        }
      });
    }
    if (activeFilters.length > 0) {
      filterResult = listForFiltering.filter((product) =>{
        // console.log("STICKER", product.stiker);
       return Array.isArray(product.stiker)
        ? product.stiker.some((sticker :any) =>
        activeFilters
        .map((el) => el.toUpperCase())
        .includes(sticker.toUpperCase())
        )
        : activeFilters.map(el => el.toUpperCase()).includes(product.stiker.toUpperCase())
      }
      
      );
    
      // console.log(
      //   'checkFiltersSTICKERS',
      //   activeFilters,
      //   listForFiltering,
      //   filterResult
      // );
    }
    return filterResult;
}

  useEffect(() => {
    const stranica = window.location.hash;
    const index = stranica.split('stranica=')[1];
    const filters = stranica.split('filteri=')[1]?.split("&")[0];

    // const subcategories = filters.split('potkategorije=')[1]?.split("&")[0];
    // console.log("gotsubcategories from url = ", subcategories);
    if(filters){
      const activeFilters = decodeURI(filters).split(',')
      console.log("first activeFilters filters", activeFilters, filters);
      localStorage.setItem('activeFilters', filters);
      setLoadingProducts(true);
      activeFilters.forEach(filterCategory => {
        
        // const el = filterCategory.split('-')[0];
        // console.log("el is now", el, filterCategory.split('-')[0] )
        const id = document.getElementById(filterCategory);
        if(id){
          const input = id?.querySelector('input');
          if(input){
            let nesto  = (input as HTMLInputElement);
            nesto.checked = true;

            setTimeout(() => {
              console.log("ovo je input", input, input?.checked)
              // if(!input?.parentElement?.classList.contains("ant-checkbox-checked"))
              //   input?.parentElement?.classList.add("ant-checkbox-checked");
              nesto.checked = true;
              // nesto.ariaChecked = "true";
              nesto.value = "true";
              // .parentElement?.parentElement?
              input.parentElement?.parentElement?.parentElement?.childNodes[1]?.childNodes[0]?.childNodes?.forEach((childLabel :any) => {
              const isInput = childLabel.nodeName === "INPUT";
              const potkategorije :string  = localStorage.getItem('potkategorije') ? localStorage.getItem('potkategorije')! : '' ;
              const categories = potkategorije.split(',');
              const currentCategory = categories.find(el => el.toLowerCase().includes(filterCategory.toLowerCase()))
              const isSelectedSubCategory = currentCategory && currentCategory.split('-').includes(childLabel.id);
              console.log("setujem ga nakon 1000ms", categories,filterCategory, currentCategory?.split('-'), childLabel.id);
                if(isInput && isSelectedSubCategory){
                  (childLabel as HTMLInputElement).checked = true;
                }
              })
            }, 1000);
          }
        }
      })
      setTimeout(() => {
        console.log("sup hoe 3000");
        
        setFilteredProducts(filterState(activeFilters, "Kategorija"));
        setLoadingProducts(false);
      }, (1200));

    }
    if(index){
      handlePageChange(Number(index));
    }
    
    preventImgRightClick();
    const imgs = document.querySelectorAll('img');
    imgs.forEach((img) => img.addEventListener('contextmenu', (e) => {e.preventDefault()}))
  }, []);

  const checkHash = (kategorija_artikla :string) => {
    const hash  = decodeURI(window.location.hash);

    // console.log("checkHash called", kategorija_artikla);

    let hasFilter = false;
    if(hash && hash.includes('filteri=') && hash.indexOf('&') !== -1){
      const filters = hash.substring(hash.indexOf('filteri=')+ 'filteri='.length, hash.indexOf('&')).split(',');
      filters.forEach(filter => {
        // const cat = filter.split('-')[0];
        // console.log("filter",filter, filter.split('-')[0], cat, kategorija_artikla, cat === kategorija_artikla);
        if(filter === kategorija_artikla){
            hasFilter = true;
        }
      })
    }
    return hasFilter;
  }


  const handleFilterLabelClick = (e :any, kategorija_artikla :string) => {
    const label = e as HTMLLabelElement;
    (label.previousElementSibling as HTMLInputElement).checked =  !(label.previousElementSibling as HTMLInputElement).checked;
    filterProducts({id: kategorija_artikla}, 'Kategorija', true)
  }

  const handleFilterSubCategoryLabelClick = (e :any) => {
    const label = e as HTMLLabelElement;
    (label.previousElementSibling as HTMLInputElement).checked =  !(label.previousElementSibling as HTMLInputElement).checked;
    filterProductsBySubcategory(e)
  }
  return (
    <div className='container'>
      <div
        className={`menubar-overlay ${
          isFilterOpen ? 'mobile-fade-in' : 'mobile-fade-out'
        }`}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      ></div>
      <div className='page-header__title' style={{ marginLeft: '0px' }}>
        <h1
          style={{ marginTop: '0px', marginBottom: '10px', fontWeight: '700' }}
        >
          Proizvodi
        </h1>
      </div>

      {/*button for mobile screens  */}
{  window.innerWidth < 900 &&   <div className="divFiltersBtnMobileContainer">

      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className='filters-btn'
      >
        <SlidersOutlined style={{transform: "rotate(90deg)", marginRight: "5px"}} />
        Filteri &nbsp;
       { [... new Set(filteredProducts.map(products => products.kategorija_artikla))].length < [... new Set(productsList.map(products => products.kategorija_artikla))].length && [... new Set(filteredProducts.map(products => products.kategorija_artikla))].length != 0  && <span 
          style={{
            backgroundColor:"#F07C00",
            color:"white",
            width: "23px",
            display: "inline-block",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center"
            }}>
          {[... new Set(filteredProducts.map(products => products.kategorija_artikla))].length}
        </span>
      }
      </button>
      {/* <RightOutlined /> */}
      <>
      Prikazano  {[... new Set(filteredProducts.map(products => products.kategorija_artikla))].length} od 22 kategorije
      </>
      </div> 
          }
      <div
        className='SSPEditAffiliateLayerContainer container'
        style={{ padding: '0px 0px 0px 0px' }}
      >
         { loadingProducts && 
         <div className='divProductsLoading'>
           <LoadingOutlined className='spinnerProductsLoading'></LoadingOutlined>

         </div>
          }
        <div className='productPageContainer'>
          <div
            className='divProductStoreFiltersContainer'
            style={{
              transform:
                isFilterOpen || width > 991
                  ? 'translateX(0)'
                  : 'translateX(-100%)',
            }}
          >
            <div className='divProductStoreFilters'
             style={{
              width: window.innerWidth > 1000 ? "260px" : "300px"
             }}
             >
              <ul className='ulProductStoreFiltercheckboxes'>
                <div
                  style={{
                    marginBottom: '10px',
                  }}
                />
                <h4
                  className='widget-filters__title widget__title'
                  style={{
                    marginBottom: '0px',
                    paddingBottom: '0px',
                    fontSize: '20px',
                  }}
                >
                  Kategorije
                  <label
                    className='labelSpecialClearAllFilter'
                    style={{
                      position: 'relative',
                      left: '30px',
                      top: '4px',
                      marginBottom: '0px',
                      paddingBottom: '18px',
                      fontSize: '12px !important',
                      color: 'gray',
                      cursor: 'pointer !important',
                    }}
                    onClick={() => {
                      clearAllCategories();
                    }}
                  >
                    Poništi izbor
                  </label>
                </h4>

                <div
                  className='close-filter-btn'
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <span
                    style={{ transform: 'translateY(1px) rotate(45deg)' }}
                  ></span>
                  <span
                    style={{ transform: 'translateY(-1px) rotate(-45deg)' }}
                  ></span>
                </div>

                <Collapse
                  defaultActiveKey={[]}
                  onChange={() => {}}
                  expandIconPosition={'end'}
                  style={{
                    color: '#343a40 !important',
                    textAlign: 'left',
                    width: '100%',
                    marginLeft: '0px',
                    paddingLeft: '-10px',
                    borderRadius: '0px',
                    border: '0px',
                    backgroundColor: '#fff',
                    fontWeight: '700',
                    fontSize: '15px',
                    lineHeight: '18px',
                    height:"90%"
                  }}
                  key={'Kategorije'}
                >
                  {[
                    ...new Set(
                      productsList.map(
                        (filteredProduct, index) =>
                          filteredProduct?.kategorija_artikla
                      )
                    ),
                  ]
                    .filter((el) => el && el.length > 1)
                    .map((kategorija_artikla, index) => {
                      return (
                        <Panel
                          forceRender={true}
                          header={
                            <>
                              <input
                                type='checkbox'
                                id={kategorija_artikla}
                                key={kategorija_artikla}
                                checked={checkHash(kategorija_artikla)}
                                onChange={ (e) => filterProducts(e.target, 'Kategorija', true) }
                                style={{
                                  fontWeight: '400',
                                  fontSize: '15px',
                                  lineHeight: '18px',
                                  color: '#3d464d',
                                }}
                              >
                              </input>
                              <label 
                                className='labelCategory' 
                                onClick={(e) => handleFilterLabelClick(e.target,kategorija_artikla)}
                              >
                                {kategorija_artikla &&
                                  kategorija_artikla.length > 1 &&
                                  kategorija_artikla?.charAt(0) +
                                    kategorija_artikla
                                      ?.substring(1)
                                      .toLowerCase()}
                              </label>
                            </>
                          }
                          key={kategorija_artikla ? kategorija_artikla : index}
                          id={kategorija_artikla}
                          showArrow={
                            productsList
                              .filter(
                                (product) =>
                                  product.kategorija_artikla ===
                                  kategorija_artikla
                              )
                              .map((product) =>
                                product?.potkategorija_lista.split(',')
                              )
                              .flat()
                              .filter((potkategorija) => potkategorija !== '/')
                              .length > 0
                          }
                          collapsible={
                            productsList
                              .filter(
                                (product) =>
                                  product.kategorija_artikla ===
                                  kategorija_artikla
                              )
                              .map((product) =>
                                product?.potkategorija_lista.split(',')
                              )
                              .flat()
                              .filter((potkategorija) => potkategorija !== '/')
                              .length > 0
                              ? 'header'
                              : 'disabled'
                          }
                        >
                          {/* potkategorije */}
                          {[
                            ...new Set(
                              productsList
                                .filter(
                                  (product) =>
                                    product.kategorija_artikla ===
                                    kategorija_artikla
                                )
                                .map((product) =>
                                  product?.potkategorija_lista.split(',')
                                )
                                .flat()
                                .filter(
                                  (potkategorija) => potkategorija !== '/'
                                )
                            )
                          ].map((potkategorija) => {
                            if (potkategorija) {
                              return (
                                <>
                                <input
                                  type='checkbox'
                                  // defaultChecked={true}
                                  id={potkategorija}
                                  key={potkategorija}
                                  data-kategorija={kategorija_artikla}
                                  onChange={(e) =>{ filterProductsBySubcategory(e.target)}}
                                  style={{
                                    fontWeight: '400',
                                    fontSize: '15px',
                                    lineHeight: '18px',
                                    color: '#3d464d',
                                  }}
                                  // checked={isSubcategoryChecked}
                                >
                                </input>
                                <label className='labelSubCategory' data-kategorija={kategorija_artikla}  onClick={(e) =>{handleFilterSubCategoryLabelClick(e.target)}}>
                                  {potkategorija?.charAt(0) +
                                    potkategorija?.substring(1).toLowerCase()}
                                </label>
                                </>
                              );
                            }
                          })}
                        </Panel>
                      );
                    })}
                </Collapse>
                {/* <br />
                <br />
                <br /> */}
                <h4
                  className='widget-filters__title widget__title'
                  style={{
                    marginTop: '20px',
                    marginBottom: '0px',
                    paddingBottom: '0px',
                    fontSize: '20px',
                  }}
                >
                  Filteri
                  <label
                    className='labelSpecialClearAllFilter'
                    style={{
                      position: 'relative',
                      left: window.innerWidth > 1000 ? '75px' : "114px",
                      marginBottom: '0px',
                      paddingBottom: '16px',
                      fontSize: '12px !important',
                      color: 'gray',
                    }}
                    onClick={() => clearAllFilterStickers()}
                  >
                    Poništi filtere
                  </label>
                </h4>

                <Collapse
                  defaultActiveKey={['0', '1']}
                  onChange={() => {}}
                  expandIconPosition={'end'}
                  style={{
                    color: '#343a40 !important',
                    textAlign: 'left',
                    width: '100%',
                    marginLeft: '0px',
                    paddingLeft: '-10px',
                    borderRadius: '0px',
                    border: '0px',
                    backgroundColor: '#fff',
                    fontWeight: '700',
                    fontSize: '15px',
                    lineHeight: '18px',
                  }}
                >
                  <Panel
                    header={
                      <>
                         <input
                          type='checkbox'
                          id={'chbxNovo'}
                          key={'chbxNovo'}
                          onChange={(e) => filterStickers(e.target, filteredProducts)}
                          style={{
                            fontWeight: '400',
                            fontSize: '15px',
                            lineHeight: '18px',
                            color: '#3d464d',
                          }}
                        >
                        </input>
                        <label className='labelSubCategory' style={{marginTop: "7px"}}>
                          Novi proizvodi
                        </label>
                      </>
                    }
                    id={'chbxNovo'}
                    key={'chbxNovo'}
                    showArrow={false}
                    collapsible='disabled'
                  ></Panel>
                  <Panel
                    header={
                      <>
                       <input
                          type='checkbox'
                          id={'chbxNajprodavaniji'}
                          key={'chbxNajprodavaniji'}
                          onChange={(e) => filterStickers(e.target, filteredProducts)}
                          style={{
                            fontWeight: '400',
                            fontSize: '15px',
                            lineHeight: '18px',
                            color: '#3d464d',
                          }}
                        >
                        </input>
                        <label className='labelSubCategory' style={{marginTop: "7px"}}>
                          Najprodavaniji proizvodi
                        </label>
                      </>
                    }
                    id={'chbxNajprodavaniji'}
                    key={'chbxNajprodavaniji'}
                    showArrow={false}
                    collapsible='disabled'
                  ></Panel>
                </Collapse>
              </ul>
              
            </div>
          </div>
         
        
          <div className='divProductStoreContainer container'>
            {filteredProducts.length === 0 && (
              <div
                style={{
                  width: '500px',
                  fontSize: '24px',
                  marginTop: '30px',
                  marginLeft: '0px',
                  textAlign: 'left',
                }}
              >
                Nijedan proizvod ne odgovara odabranim filterima.
              </div>
            )}

            {!loadingProducts && <div className='shop-pagination'>
              <div
              className='divShowPerPage container'
              style={{ width: '100% !important', height: '25px'}}
            >
                <div className='divShowPerPageLeft'>
                  <label style={{fontSize:"14px"}}>
                    Prikazano:{' '}
                    {`${
                      maxPage < filteredProducts.length
                        ? minPage === 0
                          ? numEachPage
                          : maxPage
                        : filteredProducts.length
                    } od ${filteredProducts.length} proizvoda`}
                  </label>
                </div>
                <div></div>
                {/* desktop showperpage */}
                {window.innerWidth > 900 && <div className='divShowPerPageRight'>
                  <label>Po strani:</label>
                  <select
                    value={numEachPage}
                    onChange={(e) => {
                      handleSelectChange(e.target.value);
                    }}
                  >
                    <option>9</option>
                    <option>12</option>
                    <option>15</option>
                    <option>18</option>
                    <option>21</option>
                    <option>24</option>
                  </select>
                </div>}
              </div>
              {filteredProducts
                .slice(minPage, maxPage)
                .map((product, index) => {
                  const imagePath = getImagePath(product as Product);

                  return (
                    <a style={{ position: 'relative' }} href={`/proizvod${product?.url}`}>
                      {(Array.isArray(product?.stiker) ? product?.stiker.includes('NOVO') : product?.stiker === 'NOVO') && 
                        <div className='product-card__badges-list'>
                          <div className='product-card__badge product-card__badge--new'>
                            NOVO
                          </div>
                        </div>
                      }
                      {(Array.isArray(product?.stiker) ? product?.stiker.includes('NAJPRODAVANIJI') : product?.stiker === 'NAJPRODAVANIJI') && (
                        <div className={ (Array.isArray(product?.stiker) ? product?.stiker.includes('NOVO') : product?.stiker === 'NOVO') ? 'product-card__badges-list product-card__badges-listBOTH' : 'product-card__badges-list'}>
                          <div className='product-card__badge product-card__badge--hot'>
                          NAJPRODAVANIJI
                          </div>
                        </div>
                      )}

                      <Card
                        key={index}
                        onClick={() => {
                          navigate(`/proizvod${product?.url}`);
                        }}
                        hoverable
                        style={{
                          width: '270px',
                          textAlign: 'left',
                          justifyContent: 'left',
                          alignContent: 'left',
                          alignItems: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '460px',
                          overflow: 'clip',
                          whiteSpace: 'pre-line',
                          borderRadius: '0px',
                          
                        }}
                        cover={
                          <LazyLoadImage
                            style={{ width: '100% !important' }}
                            alt={product.naziv_artikla}
                            src={`${baseApi}/assets/products/` + imagePath + '.webp'}
                            effect='blur'
                          />
                        }
                      >
                        <Meta
                          title={
                            <div className='product-card__code'>
                              {'Ukupno modela: '}{' '}
                              <strong
                                style={{ color: '#004D8C', marginLeft: '2px' }}
                              >
                                {product &&
                                Array.isArray(product?.naziv_proizvoda_model)
                                  ? product?.sifra_proizvoda.length
                                  : 1}
                              </strong>
                            </div>
                          }
                          description={
                            <div className='product-card__name'>
                              <a href={`/proizvod${product?.url}`}>
                                {product?.naziv_artikla}
                              </a>
                              {product?.meta_description && !Array.isArray(product?.meta_description) &&
                                product?.meta_description.length > 5 && (
                                  <p>{product?.meta_description}</p>
                                )}
                              {product?.meta_description &&
                                Array.isArray(product?.meta_description) && (
                                  <p>{product?.meta_description[0]}</p>
                                )}
                            </div>
                          }
                        />
                      </Card>
                    </a>
                  );
                })}

              <Pagination
                pageSize={numEachPage}
                defaultCurrent={Number(window.location.hash.split('stranica=')[1]) ? Number(window.location.hash.split('stranica=')[1]) : 1 }
                current={ Number(window.location.hash.split('stranica=')[1]) ? Number(window.location.hash.split('stranica=')[1]) : defaultPaginationPage}
                total={filteredProducts.length}
                // pageSizeOptions={[5,10,15,20,25]}
                showSizeChanger={false}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
              />
            </div>}
          </div>


        </div>

      
      </div>
      <div
        className="divFeaturedProductsContainer container ProductShopFeaturedProducts"
        style={{ marginBottom: '20px' }}
      >
        {/* horizontal scroll list */}
        <div className="block-header" style={{ width: '100%' }}>
          <h3 className="block-header__title">Novi proizvodi</h3>
          <div className="block-header__divider"></div>
          <>
          <LeftOutlined id='btn-left' />
          <RightOutlined id='btn-right'/>
          </>
        </div>
        <div className="divProductScrollContainer">
          <Row style={{ width: '100%', flexWrap: 'nowrap' }}>
            {productsList.slice(0,6).map((product, index) => {
              const imagePath = getImagePath(product as Product);
              return <ProductCard
              key={index}
              product={product as Product}
              picture={`${baseApi}/assets/products/`+imagePath+".webp"}
              ></ProductCard>
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default StorePage;
