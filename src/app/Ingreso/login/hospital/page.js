'use client';  // Activa el componente como cliente en Next.js, necesario para hooks y navegación.

import { useState } from "react";  // Importa el hook `useState` para manejar el estado del formulario.
import { ref, get } from "firebase/database";  // Importa las funciones de Firebase para acceder a la base de datos.
import { database } from "@/config/firebase";  // Importa la configuración de Firebase.
import { useRouter } from "next/navigation";  // Importa el hook `useRouter` para la navegación en Next.js.


const LoginHospital = () => {
    // Declaración de estados para manejar el valor de los campos del formulario.
    const [nit, setNit] = useState("");  // Estado para el NIT del hospital.
    const [documento, setDocumento] = useState("");  // Estado para el número de documento del responsable.
    const [contrasena, setContrasena] = useState("");  // Estado para la contraseña del hospital.
    const router = useRouter();  // Hook para redirigir al usuario dentro de Next.js.

    // Función que maneja el envío del formulario.
    const handleSubmit = async (e) => {
        e.preventDefault();  // Previene el comportamiento predeterminado del formulario HTML.

        try {
            // Referencia a la base de datos de Firebase para acceder al hospital con el NIT ingresado.
            const hospitalRef = ref(database, `hospitales/${nit}`);
            const snapshot = await get(hospitalRef);

            if (snapshot.exists()) {
                const datosHospital = snapshot.val();  // Obtiene los datos del hospital desde Firebase.

                console.log("Datos recuperados desde Firebase:", datosHospital);

                // Verifica si el documento y la contraseña coinciden con los datos del hospital.
                if (
                    String(datosHospital.responsable.documento).trim() === String(documento).trim() &&
                    String(datosHospital.responsable.contrasena).trim() === String(contrasena).trim()
                ) {
                

                    // Guarda el NIT del hospital en sessionStorage para mantener la sesión activa.
                    sessionStorage.setItem("nombreHospital", nit);

                    // Redirecciona al hospital a la página de inicio después del inicio de sesión.
                    router.push("/inicio/hospital");
                } else {
                  
                }
            } else {
                
            }
        } catch (err) {
            console.error("Error al recuperar datos:", err);
          
        }
    };

    return (
        <div className="login-container mt-8 max-w-sm mx-auto p-8 bg-white rounded-lg shadow-lg text-center font-sans text-gray-700 animate-fadeInLogin duration-1000 ease-in">
        <h2 className="text-2xl font-bold text-cyan-600 mb-6">Iniciar Sesión Hospital</h2>

        {/* Formulario para el inicio de sesión del hospital */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            
            <label className="font-semibold text-gray-800 text-left">NIT del Hospital</label>
            <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition duration-200"
                placeholder="Ingrese el NIT del hospital"
                value={nit}
                onChange={(e) => setNit(e.target.value)}
                required
            />
            
            <label className="font-semibold text-gray-800 text-left">Número de Documento</label>
            <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition duration-200"
                placeholder="Número del documento"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                type="text"
                required
            />
            
            <label className="font-semibold text-gray-800 text-left">Contraseña</label>
            <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition duration-200"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                type="password"
                required
            />

            {/* Botón de inicio de sesión */}
            <button 
                className="px-6 py-3 mt-4 mb-5 rounded-md bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition-all duration-300 ease-in-out"
                type="submit">
                Iniciar Sesión
            </button>
        </form>

        {/* Botón para redirigir al registro de hospitales */}
        <button 
            className="px-6 py-3 rounded-md bg-cyan-600 text-white font-bold hover:bg-gray-400 transition-all duration-300 ease-in-out"
            onClick={() => router.push('/Ingreso/registro')}>
            Registrar Hospital
        </button>
    </div>
);
};

// Asegúrate de cerrar bien la función antes del export
export default LoginHospital;