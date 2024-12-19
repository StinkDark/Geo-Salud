'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./page.css";

const LoginUsuario = () => {
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre) {
            setError("Por favor, ingresa tu nombre.");
            return;
        }

        try {
            // Guardar el nombre en sessionStorage
            sessionStorage.setItem("nombreUsuario", nombre);

            
            router.push("/inicio/usuarios");
        } catch (err) {
            console.error(err);
            setError("Error al guardar datos.");
        }
    };

    return (
        <div className="usuario-container  mx-auto p-6 bg-gray-100 rounded-lg shadow-md text-center font-sans text-gray-700 animate-fadeInLogin duration-1000 ease-in
        sm:bg-gray-100 rounded-sm shadow-md text-center font-sans text-blue animate-fadeInLogin duration-1000 ease-in max-w-90
        md:bg-gray-100 rounded-sm shadow-md text-center font-sans text-blue animate-fadeInLogin duration-1000 ease-in max-w-90
        lg:bg-gray-100 rounded-sm shadow-md text-center font-sans text-blue animate-fadeInLogin duration-1000 ease-in max-w-90">

            
            <h2 className="font-bold m-10 text-navy sm:font-bold m-10 text-navy
             md:font-bold m-10 text-navy 
             lg:font-bold m-10 text-navy 
             xl:sm:font-bold m-10 text-navy ">Inicio de Sesión Usuario</h2>

            <form 
            className="border-2 border-white border-solid h-1000 sm: flex flex-col items-center bg:gray"
            onSubmit={handleSubmit}>
                <h2 className="font-bold m-5 text-navy sm:font-bold text-navy">Nombre</h2>

                {error && <p className="error">{error}</p>}

                <input
                    className="m-5 sm:m-5 h-10 w-100  "
                    type="text"
                    placeholder="Nombre del Usuario"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <button 
                className="border-2 border-solid border-blue p-2 rounded font-bold"
                type="submit ">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginUsuario;
