'use client';

import Link from "next/link";
import { useState } from "react";
import './Navbar.css';

const Navbar = () => {
    // Estados para manejar el dropdown de "Ingreso" y "Aliados"
    const [dropdownIngreso, setDropdownIngreso] = useState(false);
    const [dropdownAliados, setDropdownAliados] = useState(false);

    // EPS manuales agregadas temporalmente mientras no estén en Firebase
    const eps = [
        { nombre: "SANITAS" },
        { nombre: "SURA" },
        { nombre: "MUTUAL SER" }
    ];

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

    return (
        <nav className="navbar-container">
            <ul>
                {/* Enlace principal a la página de inicio */}
                <li><Link href="/">Geosalud</Link></li>

                {/* Dropdown de "Ingreso" */}
                <li 
                    className="dropdown" 
                    onMouseEnter={() => toggleDropdown("ingreso")} 
                    onMouseLeave={() => setDropdownIngreso(false)}
                >
                    Ingreso
                    {dropdownIngreso && (
                        <div className="dropdown-content">
                            <Link href="/Ingreso/login/usuario">Usuario</Link>
                            <Link href="/Ingreso/login/hospital">Hospital</Link>
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
                                // Mapea el array de EPS manuales para crear enlaces dinámicamente
                                eps.map((epsItem, index) => (
                                    <Link key={index} href={`/nuestros-aliados/${epsItem.nombre}`}>
                                        {epsItem.nombre}
                                    </Link>
                                ))
                            ) : (
                                <p>Cargando Aliados...</p>
                            )}
                        </div>
                    )}
                </li>

                {/* Enlace a la sección "Soporte" */}
                <li><Link href="/soporte">Soporte</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
