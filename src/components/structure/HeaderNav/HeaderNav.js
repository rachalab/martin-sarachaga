'use client';
import { useState } from 'react';
import Link from 'next/link';
import NavLink from './NavLink/NavLink';
import { usePathname } from 'next/navigation';
import styles from "./HeaderNav.module.scss"; 

export default function HeaderNav(){

  const pathname = usePathname();
  const [ menuState, setMenuState ] = useState(false);

  function changeMenuState() {
    !menuState ? setMenuState(true) : setMenuState(false);
  }

  const menuLinks = [
    { 
      title: 'subasta presencial', 
      url: '/', 
    },
    { 
      title: 'subastas virtuales', 
      url: '/', 
    },
    { 
      title: 'Venta privada', 
      url: '/', 
    },
    { 
      title: 'la casa', 
      url: '/', 
    },
  ]

  return (
    <header className={styles.header}>

      <div className={
        pathname != "/" ? 
        !menuState  ? `${styles.navbar} ${styles.no_iso}` : `${styles.navbar} ${styles.no_iso} ${styles.active}`
        : !menuState  ? `${styles.navbar}` : `${styles.navbar} ${styles.active}`
        }>
        <h1 className={styles.brand}><Link href="/" ><img src="/assets/images/sarachaga-brand.svg" alt="Logo" /></Link><Link href="/" >MARTÍN SARÁCHAGA SUBASTAS</Link></h1>       
  
        <button type="button" className={!menuState ? `${styles.menu_btn}` : `${styles.menu_btn} ${styles.close}`} onClick={ () => changeMenuState() }><span/><span/></button>        

      </div>      
      
      {menuState &&
      <nav className={styles.inner_menu}>        
        <div className={styles.items_wrapper}>
          {menuLinks.map((menuLink, key)=>
            <NavLink key={key} href={menuLink.url} className={styles.item} activeClassName={styles.active}  onClick={ () => changeMenuState(false) }>{menuLink.title}</NavLink>
          )}
        </div>
      </nav>
      }

    </header>
  )
}