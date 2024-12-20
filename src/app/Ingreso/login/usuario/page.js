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
        <div className="p-4 justify-center min-h-screen bg-gray-200">
        {/* Contenedor principal con estilo refinado */}
        <div className="usuario-container w-full sm:max-w-md md:max-w-lg lg:max-w-xl p-6 bg-white rounded-lg shadow-xl text-center font-sans animate-fadeInLogin duration-1000 ease-in">
          
          {/* Título del formulario */}
          <h2 className="font-bold text-2xl sm:text-3xl text-cyan-600 mb-8">
            🧑‍💼 <strong>Inicio de Sesión Usuario</strong>
          </h2>
  
          {/* Formulario de inicio de sesión */}
          <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
            {/* Campo para el nombre */}
            <label className="font-bold text-lg text-gray-700" htmlFor="nombre">
              Nombre
            </label>
  
            {/* Mensaje de error */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
  
            <input
              id="nombre"
              className="p-3 w-full sm:w-80 md:w-96 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
              placeholder="Nombre del Usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
  
            {/* Botón de inicio de sesión */}
            <button
              type="submit"
              className="w-full sm:w-80 md:w-96 bg-cyan-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-cyan-700 transition duration-300"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginUsuario;