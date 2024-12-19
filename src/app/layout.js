import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "../componentes/Navbar";
import "../../src/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Geosalud",
  description: "Generated by Geosalud",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      //prueba del responsive design, para tamaño pequeño el background sera de color negro, para dispositivos medianos, el background sera azul
        className="bg:blue sm: bg-blue md:bg-blue "
      >


         {/* Navbar principal */}
         
        <Navbar />
        {children}


      </body>
    </html>
  );
}