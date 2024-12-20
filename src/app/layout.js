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
    /* Nota importante: en Tailwind.css los bordes se colocan dentro del className de cada etiqueta y comienzan con la palabra: border, 
       ejemplo: border-2 border-solid border-white. Cuando desee eliminarlos diríjase al className donde se encuentren y bórrelos */

    <html lang="en">
      <body
        // Prueba del responsive design, para tamaño pequeño el background será de color negro, para dispositivos medianos, será azul.
        className="bg-blue sm:bg-blue md:bg-blue border-2 border-solid border-white"
      >
        {/* Navbar principal */}
        <Navbar />
        {children}

        {/* Footer */}
        <footer className="bg-cyan-600 text-white py-2">
          <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
            <div className="text-center md:text-left mb- md:mb-0">
              <h1 className="text-center font-bold text-2xl text-gray-200">Geosalud</h1>
              <p className="text-sm text-gray-300">Tu salud, nuestra prioridad</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-200">© 2024 Geosalud. Todos los derechos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
