'use client';

import Link from "next/link";
import { useState } from "react";
import './Navbar.css';

const Navbar = () => {
    const [dropdownIngreso, setDropdownIngreso] = useState(false);
    const [dropdownAliados, setDropdownAliados] = useState(false);

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
                <li><Link href="/">Geosalud</Link></li>
                
                {/* Dropdown Ingreso */}
                <li 
                    className="dropdown" 
                    onMouseEnter={() => toggleDropdown("ingreso")} 
                    onMouseLeave={() => setDropdownIngreso(false)}
                >
                    Ingreso
                    {dropdownIngreso && (
                        <div className="dropdown-content">
                            <Link href="/Ingreso/login/usuario">Usuario</Link>
                            <Link href="/Ingreso/login/hospital">hospital</Link>
                        </div>
                    )}
                </li>

                <li><Link href="/sobre-nosotros">Sobre Nosotros</Link></li>

                {/* Dropdown Aliados */}
                <li 
                    className="dropdown" 
                    onMouseEnter={() => toggleDropdown("aliados")} 
                    onMouseLeave={() => setDropdownAliados(false)}
                >
                    Nuestros Aliados
                    {dropdownAliados && (
                        <div className="dropdown-content">
                            <Link href="/nuestros-aliados">Ver Aliados</Link>
                        </div>
                    )}
                </li>

                <li><Link href="/soporte">Soporte</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
