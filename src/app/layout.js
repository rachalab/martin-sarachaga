import { builder } from "@builder.io/sdk";
import AppContext from "./context/AppContext";
import HeaderNav from "../components/structure/HeaderNav/HeaderNav";
import Announcement from "../components/structure/Announcement/Announcement";
import GoogleTagManager from "../components/GoogleTagManager/GoogleTagManager";

import "./globals.scss";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export const metadata = {
  title: "Martín Saráchaga Subastas",
  description: "description",
};

export default async function RootLayout({ children }) {

  const contentBanner = await builder.get("banner").toPromise();

  return (
    <html lang="en">
      <head>
      <meta name="facebook-domain-verification" content="jk0xtnvkxlxlaxislecylig9ccfl5l" />
      <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" /> 
      <meta name="theme-color" content="#000"/>
      </head>

      <body>
        <AppContext>          
          <div id="modal-root"/>
          {contentBanner && contentBanner?.data?.active && <Announcement content={contentBanner?.data} model={"banner"} /> }
          <HeaderNav />
          <div id="filters-btn-root"/>
          <>{children}</>
        </AppContext>
        <GoogleTagManager />
      </body>

    </html>
  );
}