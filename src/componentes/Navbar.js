'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
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

        <nav className="navbar-container text-white sm:flex justify-evenly items-center m-2 gap-5 font-bold">
            <ul className=" flex justify-evenly sm:flex justify-evenly  m-2 gap-2 font-bold">
                <li className="relative font-bold transition-transform duration-300 ease-in-out flex-col"><Link href="/">Geosalud</Link></li>

                {/* Dropdown de "Ingreso" */}
                <li 
                    className="dropdown flex-col gap-10" 
                    onMouseEnter={() => toggleDropdown("ingreso")} 
                    onMouseLeave={() => setDropdownIngreso(false)}
                >
                    Ingreso
                    {dropdownIngreso && (
                        <div className="dropdown ">
                            <Link className="flex gap-y-4 text-black hover:bg-white/50 hover:scale-105 hover:font-bold rounded" href="/Ingreso/login/usuario">Usuario</Link>
                            <Link className="flex gap-y-4 text-black hover:bg-white/50 hover:scale-105 hover:font-bold rounded" href="/Ingreso/login/hospital">Hospital</Link>
                        </div>
                    )}
                </li>

                {/* Enlace a la sección "Sobre Nosotros" */}
                <li><Link href="/sobre-nosotros">Sobre Nosotros</Link></li>

                {/* Dropdown de "Nuestros Aliados" */}
                <li 
                    className="dropdown" 
                    onMouseEnter={() => toggleDropdown("aliados")} 
                    onMouseLeave={() => setDropdownAliados(false)}
                >
                    Nuestros Aliados
                    {dropdownAliados && (
                        <div className="dropdown-content">
                            {eps.length > 0 ? (
                                eps.map((epsItem, index) => (
                                    <div key={index} className="eps-info">
                                        <p className="flex gap-y-4 text-black hover:bg-white/50 hover:scale-105 hover:font-bold rounded"><strong>EPS:</strong> {epsItem}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Cargando Aliados...</p>
                            )}
                        </div>
                    )}
                </li>

                {/* Sección "Soporte" sin enlace */}
                <li className="dropdown">
                    Soporte
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;