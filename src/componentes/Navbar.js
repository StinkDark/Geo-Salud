'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../config/firebase";


const Navbar = () => {
    const [dropdownIngreso, setDropdownIngreso] = useState(false);
    const [dropdownAliados, setDropdownAliados] = useState(false);
    const [eps, setEps] = useState([]);

    // Función para alternar el dropdown
    const toggleDropdown = (type) => {
        if (type === "ingreso") {
            setDropdownIngreso(!dropdownIngreso);
            setDropdownAliados(false);
        } else if (type === "aliados") {
            setDropdownAliados(!dropdownAliados);
            setDropdownIngreso(false);
        }
    };

    // Obtener EPS desde Firebase en tiempo real
    useEffect(() => {
        const refHospitales = ref(database, "hospitales");

        const unsubscribe = onValue(refHospitales, (snapshot) => {
            if (snapshot.exists()) {
                const datosHospitales = snapshot.val();

                // Obtener EPS únicas desde hospitales
                const epsUnicas = new Set();
                Object.values(datosHospitales).forEach(hospital => {
                    hospital.epsAtendidas?.forEach(eps => epsUnicas.add(eps));
                });

                setEps(Array.from(epsUnicas));
            }
        });

        return () => unsubscribe();
    }, []);

    return (

         /*nota importante: en Tailwind.css los bordes se colocan dentro del className de cada etiqueta y comienzan con la palabra: border , ejemplo: border-2 border-solid border-white, 
        cuando desee eliminarlos dirijase al className donde se encuentre y los borra*/

        /*nota importante: Si nota que aparecen bordes en su pagina y sin embargo no estan creados en su className, dirijase al archivo page.css correspondiente a dicha pagina
        lo ma probable es que haya sido creado allí y cuando no los necesite, los puede borrar*/
        


        <nav className="navbar-container bg-cyan-600 text-white flex flex-wrap justify-center items-center p-4 gap-4 font-bold border-2 border-solid border-white rounded shadow-lg">
        {/* Botón GeoSalud */}
        <button className="bg-white text-cyan-700 font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-cyan-500 hover:text-white shadow-md">
          <Link href="/">GeoSalud</Link>
        </button>
  
        {/* Botón con dropdown de "Ingreso" */}
        <div
          className="relative dropdown-ingreso"
          onClick={() => toggleDropdown("ingreso")}
        >
          <button className="bg-white text-cyan-700 font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-cyan-500 hover:text-white shadow-md">
            Ingreso
          </button>
          <div
            className={`bg-white text-cyan-700 shadow-lg rounded mt-2 p-2 absolute transition-all duration-200 ease-in-out ${
              dropdownIngreso ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {dropdownIngreso && (
              <>
                <Link
                  href="/Ingreso/login/usuario"
                  className="block px-4 py-2 hover:bg-cyan-100 hover:text-cyan-900 rounded transition-all"
                >
                  Usuario
                </Link>
                <Link
                  href="/Ingreso/login/hospital"
                  className="block px-4 py-2 hover:bg-cyan-100 hover:text-cyan-900 rounded transition-all"
                >
                  Hospital
                </Link>
              </>
            )}
          </div>
        </div>
  
        {/* Botón Sobre Nosotros */}
        <button className="bg-white text-cyan-700 font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-cyan-500 hover:text-white shadow-md">
          <Link href="/sobre-nosotros">Sobre Nosotros</Link>
        </button>
  
        {/* Botón con dropdown de "Nuestros Aliados" */}
        <div
          className="relative dropdown-aliados"
          onClick={() => toggleDropdown("aliados")}
        >
          <button className="bg-white text-cyan-700 font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-cyan-500 hover:text-white shadow-md">
            Nuestros Aliados
          </button>
          <div
            className={`bg-white text-cyan-700 shadow-lg rounded mt-2 p-2 absolute transition-all duration-200 ease-in-out ${
              dropdownAliados ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {dropdownAliados && (
              <>
                {eps && eps.length > 0 ? (
                  eps.map((epsItem, index) => (
                    <p
                      key={index}
                      className="block px-4 py-2 hover:bg-cyan-100 hover:text-cyan-900 rounded transition-all"
                    >
                      {epsItem}
                    </p>
                  ))
                ) : (
                  <p className="text-sm">Cargando Aliados...</p>
                )}
              </>
            )}
          </div>
        </div>
  
        {/* Botón Soporte */}
        <button className="bg-white text-cyan-700 font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-cyan-500 hover:text-white shadow-md">
          Soporte
        </button>
      </nav>
    );
  };
  
  export default Navbar;