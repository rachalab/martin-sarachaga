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
  const { showNavBar } = useAppContext(); 

  function changeMenuState() {
    !menuState ? setMenuState(true) : setMenuState(false);
  }

  function toHome() {  
    !menuState && router.push('/');   
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
    <header className={pathname === '/' ?
        showNavBar ? `${styles.header} ${styles.in_home} ${styles.active}` : `${styles.header} ${styles.in_home}`
        : `${styles.header} ${styles.inner_pages}`
      }>

      <div className={!menuState ? `${styles.navbar}` : `${styles.navbar} ${styles.is_menu}`}>

        <h1 className={styles.brand}>
          <button type="button" onClick={ () => toHome() } className={styles.logotype}>MARTÍN SARÁCHAGA SUBASTAS</button> 
        </h1>       
  
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