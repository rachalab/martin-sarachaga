import MainWrapper from "../components/structure/MainWrapper/MainWrapper";
import HeaderNav from "../components/structure/HeaderNav/HeaderNav";
import "./globals.scss";

export const metadata = {
  title: "Martín Saráchaga Subastas",
  description: "description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="master_grid"><div/><div/><div/><div/><div/><div/></div>
        <HeaderNav />
        {children}
      </body>
    </html>
  );
}