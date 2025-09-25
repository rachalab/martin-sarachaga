"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }) {

  //States utilizados en Subasta Presencial
  const [dataAuctionPieces, setDataAuctionPieces] = useState([]);
  const [currentAuctionNight, setCurrentAuctionNight] = useState('all');
  const [currentAuctionCategory, setCurrentAuctionCategory] = useState('all');
  const [currentAuctionAuthor, setCurrentAuctionAuthor] = useState('all');
  const [auctionFilterPanelStatus, setAuctionFilterPanelStatus] = useState(false);

  const [ showNavBar, setShowNavBar] = useState(false);
 

  return (
    <AppContext.Provider
    value={{
      showNavBar,
      setShowNavBar,
      dataAuctionPieces,
      setDataAuctionPieces,
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
