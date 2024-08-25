import React, { useEffect, useState } from 'react'
import Help from './HelpFAQ';
import HelpFAQMobile from './HelpFAQMobile';

export default function HelpPageRouterComponent() {
    const [deviceWidth, setDeviceWidth] = useState<number>();

    useEffect(() =>{        
        setDeviceWidth(window.innerWidth);
    },[])

    useEffect(() =>{
        setDeviceWidth(window.innerWidth);
    },[window.innerWidth])

  return (
    <>
    {deviceWidth && deviceWidth < 1000 && 
        <HelpFAQMobile></HelpFAQMobile>
    }
    {deviceWidth && deviceWidth >= 1000 && 
        <Help></Help>
    }
    </>
  )
}
