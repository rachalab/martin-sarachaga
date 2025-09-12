'use client'
import { useRef, useEffect } from 'react';
import SmoothScrollbar from 'smooth-scrollbar';

export default function Layout({ children, ...rest }) {
  
  let $content = useRef();
  let scrollbar = useRef();

  useEffect(() => {

    const contentScroll = $content.current;

    scrollbar.current = SmoothScrollbar.init(contentScroll, {
      damping: 0.06,
      delegateTo: document.querySelector('#scroll-container'),
    });

    scrollbar.current.setPosition(0, 0);
    scrollbar.current.track.xAxis.element.remove();             

    /* return () => {      
       if (scrollbar.current) {
        scrollbar.current.destroy();
        scrollbar.current = null;
      } 
    }; */
    
  }, []); 

  return (
    <main data-scrollbar ref={$content} {...rest} id="scroll-container">{children}</main>
  );
}