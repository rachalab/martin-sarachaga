import AppContext from "./context/AppContext";
import HeaderNav from "../components/structure/HeaderNav/HeaderNav";
import "./globals.scss";

export const metadata = {
  title: "Martín Saráchaga Subastas",
  description: "description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#000"/>
      <body>
        <div className="master_grid"><div/><div/><div/><div/><div/><div/></div>
        <AppContext>
          <div id="modal-root"/>
          <HeaderNav />
          <div id="filters-btn-root"/>          
          {children}        
        </AppContext>
      </body>
    </html>
  );
}