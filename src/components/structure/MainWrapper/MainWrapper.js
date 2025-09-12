'use client'
import { useWindowSize } from "@uidotdev/usehooks";
import CustomScrollbar from '../../../customScrollbar/CustomScrollbar';

export default function MainWrapper({ children }) {

    const size = useWindowSize();

    if(size.width >= 1025) {
        return(<CustomScrollbar>{children}</CustomScrollbar>);
    } else {
        return (<main>{children}</main>);
    }
}