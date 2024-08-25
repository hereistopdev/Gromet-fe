import React, { useEffect } from 'react'
import { useBreadCrumbsUpdateContext } from '../Content/AffiliateLayers/Context/BreadCrumbsContext';

import './Terms.css';

function Terms() {

    const routeHistoryUpdate = useBreadCrumbsUpdateContext()
    useEffect(() => {
      routeHistoryUpdate(["Početna", "Uslovi"]);
    },[])


  return (
    <div className="block">
        <div className="container">
            <div className="document">
                <div className="document__header">
                    <h1 className="document__title">Terms And Conditions</h1>
                    <div className="document__subtitle">
                        This Agreement was last modified on 27 May 2018.
                    </div>
                </div>
                <div className="document__content typography">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Donec facilisis neque ut purus fermentum, 
                            ac pretium nibh facilisis. Vivamus venenatis viverra iaculis.
                             Suspendisse tempor orci non sapien ullamcorper dapibus. 
                             Suspendisse at velit diam. Donec pharetra nec enim blandit vulputate.
                              Suspendisse potenti. Pellentesque et molestie ante.
                               In feugiat ante vitae ultricies malesuada.
                        </p>
                    <h2>Definitions</h2>
                    <ol>
                    <li>
                        <strong>Risus</strong>
                        — Morbi posuere eleifend sollicitudin. 
                        Praesent eget ante in enim scelerisque scelerisque.
                        Donec mi lorem, molestie a sapien non, laoreet convallis felis. 
                        In semper felis in lacus venenatis, sit amet commodo leo interdum. 
                        Maecenas congue ut leo et auctor.
                    </li>
                    <li>
                        <strong>Praesent</strong>
                        — className aptent taciti sociosqu ad litora torquent per conubia nostra,
                        per inceptos himenaeos. 
                        Nulla orci ante, viverra in imperdiet in, pharetra et leo
                    </li>
                    <li>
                        <strong>Vestibulum</strong>
                    — Vestibulum arcu tellus, aliquam vel fermentum vestibulum,
                    lacinia pulvinar ipsum. In hac habitasse platea dictumst.
                    Integer felis libero, blandit scelerisque mauris eget,
                    porta elementum sapien. Mauris luctus arcu non enim lobortis gravida.
                    </li>
                    </ol>
                    <h2>Ornare dolor</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Donec facilisis neque ut purus fermentum, ac pretium nibh facilisis
                        . Vivamus venenatis viverra iaculis. Suspendisse tempor orci non sapien ullamcorper dapibus.
                        Suspendisse at velit diam. Donec pharetra nec enim blandit vulputate. Suspendisse potenti.
                        Pellentesque et molestie ante. In feugiat ante vitae ultricies malesuada.
                    </p>
                    <p>
                        For information about how to contact us, please visit our contact page.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Terms