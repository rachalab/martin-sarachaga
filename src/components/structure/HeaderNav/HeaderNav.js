'use client';
import { useState } from 'react';
import { useAppContext } from '../../../app/context/AppContext';
import NavLink from './NavLink/NavLink';
import { useRouter, usePathname } from 'next/navigation';
import styles from "./HeaderNav.module.scss"; 

export default function HeaderNav(){
  const pathname = usePathname();
  const router = useRouter();
  const [ menuState, setMenuState ] = useState(false);
  const { showNavBar, setShowNavBar } = useAppContext(); 

  function changeMenuState() {
    !menuState ? setMenuState(true) : setMenuState(false);
  }

  function toHome() {  
    pathname !== '/' && setShowNavBar(false);
    !menuState && router.push('/');   
  }

  const menuLinks = [
    { 
      title: 'subasta presencial', 
      url: '/subasta-presencial', 
    },
    { 
      title: 'subastas virtuales', 
      url: '/subastas-virtuales', 
    },
    { 
      title: 'Venta privada', 
      url: '/venta-privada', 
    },
    { 
      title: 'la casa', 
      url: '/la-casa', 
    },
  ]


  return (
    <header className={pathname === '/' ?
        showNavBar ? `${styles.header} ${styles.in_home} ${styles.active}` : `${styles.header} ${styles.in_home}`
        : `${styles.header} ${styles.inner_pages}`
      }>

      <div className={!menuState ? `${styles.navbar}` : `${styles.navbar} ${styles.is_menu}`}>
        <button type="button" onClick={ () => toHome() } className={styles.logotype}>MARTÍN SARÁCHAGA SUBASTAS</button>      
        <button type="button" className={!menuState ? `${styles.menu_btn}` : `${styles.menu_btn} ${styles.close}`} onClick={ () => changeMenuState() }><span/><span/></button>       
      </div>      
      
      {menuState &&
      <nav className={styles.inner_menu}>        
        <div className={styles.items_wrapper}>
          {menuLinks.map((menuLink, key)=>
            <NavLink key={key} href={menuLink.url} className={styles.item} onClick={ () => setTimeout(() => { changeMenuState(false) }, 200) }>{menuLink.title}</NavLink>
          )}
        </div>
      </nav>
      }

    </header>
  )
}