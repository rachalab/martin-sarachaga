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
  const [AuctionFilterPanelStatus, setAuctionFilterPanelStatus] = useState(false);
 

  return (
    <AppContext.Provider
    value={{
      dataAuctionPieces,
      setDataAuctionPieces,
      currentAuctionNight,
      setCurrentAuctionNight,
      currentAuctionCategory,
      setCurrentAuctionCategory,
      currentAuctionAuthor,
      setCurrentAuctionAuthor,
      AuctionFilterPanelStatus,
      setAuctionFilterPanelStatus
    }}>{children}</AppContext.Provider>
  );
}
