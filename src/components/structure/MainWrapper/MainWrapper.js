'use client'
import { useWindowSize } from "@uidotdev/usehooks";
import CustomScrollbar from '../../../customScrollbar/CustomScrollbar';
import styles from "./MainWrapper.module.scss"; 

export default function MainWrapper({ children }) {

    const size = useWindowSize();

    if(size.width >= 1025) {
        return(<CustomScrollbar>{children}</CustomScrollbar>);
    } else {
        return (<main id="main-container" className={styles.main_container}>{children}</main>);
    }
}