'use client'
 
import { useEffect } from "react";
import TagManager from 'react-gtm-module';


const GoogleTagManager = () => {
  


    useEffect(() => {
        TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_TAGMANAGER_GTM_ID });
    }, []);

  return null;
};

export default GoogleTagManager;
