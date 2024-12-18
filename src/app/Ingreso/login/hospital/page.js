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
                    alert("Inicio de sesión exitoso");

                    // Guarda el NIT del hospital en sessionStorage para mantener la sesión activa.
                    sessionStorage.setItem("nombreHospital", nit);

                    // Redirecciona al hospital a la página de inicio después del inicio de sesión.
                    router.push("/inicio/hospital");
                } else {
                    alert("Contraseña o documento incorrecto");
                }
            } else {
                alert("Hospital no encontrado en el sistema");  // Notifica si el hospital no existe en la base de datos.
            }
        } catch (err) {
            console.error("Error al recuperar datos:", err);
            alert("Hubo un error al iniciar sesión");  // Muestra un mensaje de error si falla la solicitud.
        }
    };

    return (
        <div className="login-container max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md text-center font-sans text-gray-700 animate-fadeInLogin duration-1000 ease-in">
            <h2 className="text-5xl font-bold text-#0077b6-500 mb-4 ">Iniciar Sesión Hospital</h2>

            {/* Formulario para el inicio de sesión del hospital */}
            <form 
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}>
                <label className="font-bold text-gray-800 text-left">NIT del Hospital</label>
                <input
                    className="w-11/12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 w-11/12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-300"
                    placeholder="Ingrese el NIT del hospital"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                    required
                />
                
                <label className="font-bold text-gray-800 text-left">Número de Documento</label>
                <input
                    className="w-11/12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 w-11/12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-300"
                    placeholder="Número del documento"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    type="text"
                    required
                />
                
                <label className="font-bold text-gray-800 text-left">Contraseña</label>
                <input
                    className="w-11/12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 w-11/12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-300"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    type="password"
                    required
                />

                <button className="px-4 py-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700 transition-colors duration-300 ease-in-out hover:scale-105 active:scale-95"
                type="submit">Iniciar Sesión</button>  {/* Botón para enviar el formulario */}
            </form>

            {/* Botón adicional para redirigir al formulario de registro de hospitales */}
            <button 
            className="px-4 py-2 m-5 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700 transition-colors duration-300 ease-in-out hover:scale-105 active:scale-95"
            onClick={() => router.push('/Ingreso/registro')}>
                Registrar Hospital
            </button>
        </div>
    );
};

export default LoginHospital;