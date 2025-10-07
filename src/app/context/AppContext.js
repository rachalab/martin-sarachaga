"use client";
import { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }) {

  //Para utilizar en CustomScrollbar
  let scrollbar = useRef();

  //States utilizados en Subasta Presencial
  const [dataAuctionPieces, setDataAuctionPieces] = useState([]);
  const [dataAuctionNighs, setDataAuctionNighs] = useState([]);
  const [currentAuctionNight, setCurrentAuctionNight] = useState(1);
  const [currentAuctionCategory, setCurrentAuctionCategory] = useState('all');
  const [currentAuctionAuthor, setCurrentAuctionAuthor] = useState('all');
  const [auctionFilterPanelStatus, setAuctionFilterPanelStatus] = useState(false);
  const [ showNavBar, setShowNavBar] = useState(false);
 

  return (
    <AppContext.Provider
    value={{
      scrollbar,
      showNavBar,
      setShowNavBar,
      dataAuctionPieces,
      setDataAuctionPieces,
      dataAuctionNighs,
      setDataAuctionNighs,
      currentAuctionNight,
      setCurrentAuctionNight,
      currentAuctionCategory,
      setCurrentAuctionCategory,
      currentAuctionAuthor,
      setCurrentAuctionAuthor,
      auctionFilterPanelStatus,
      setAuctionFilterPanelStatus
    }}>{children}</AppContext.Provider>
  );
}
