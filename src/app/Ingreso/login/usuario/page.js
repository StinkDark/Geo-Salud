'use client';  // Activa el componente como cliente en Next.js, necesario para hooks y navegación.

import { useState } from "react";  // Importa el hook `useState` para manejar el estado del formulario.
import { useRouter } from "next/navigation";  // Importa el hook `useRouter` para redireccionar entre páginas en Next.js.
import { ref, get } from "firebase/database";  // Importa funciones para obtener datos desde Firebase.
import { database } from "@/config/firebase";  // Importa la configuración de Firebase.
import "./usuario.css";  // Importa el archivo CSS para estilizar el componente.

const LoginUsuario = () => {
    // Estado para el nombre del usuario
    const [nombre, setNombre] = useState("");  
    // Estado para la EPS ingresada por el usuario
    const [eps, setEps] = useState("");
    // Estado para manejar posibles errores en el formulario
    const [error, setError] = useState("");
    const router = useRouter();  // Hook `useRouter` para realizar navegación entre páginas.

    // Función que maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();  // Previene el comportamiento predeterminado del formulario HTML.

        // Validación: Verifica si el usuario ha completado todos los campos
        if (!nombre || !eps) {
            setError("Por favor completa todos los campos.");  // Muestra un mensaje de error.
            return;  // Detiene la ejecución del envío del formulario si algún campo está vacío.
        }

        try {
            // Obtiene todos los datos de hospitales desde la base de datos Firebase
            const refHospitales = ref(database, "hospitales");
            const snapshot = await get(refHospitales);

            if (snapshot.exists()) {
                const hospitales = snapshot.val();  // Obtiene todos los hospitales de la base de datos.

                // Filtra los hospitales según la EPS ingresada por el usuario
                const hospitalesParaEPS = Object.values(hospitales).filter(
                    (hospital) => hospital.epsAtendidas?.includes(eps)
                );

                if (hospitalesParaEPS.length > 0) {
                    // Si existen hospitales para la EPS, guarda información en `sessionStorage`
                    sessionStorage.setItem("nombreUsuario", nombre);
                    sessionStorage.setItem("epsUsuario", eps);

                    alert("Inicio de sesión exitoso");  // Muestra alerta de éxito.

                    // Redirecciona al usuario a la página de inicio de usuarios
                    router.push("/inicio/usuarios");
                } else {
                    setError("No se encontraron hospitales para tu EPS.");  // Muestra un error si no se encuentra la EPS.
                }
            }
        } catch (error) {
            console.error("Error al verificar datos:", error);
            setError("Hubo un error al conectar con la base de datos.");  // Manejo de posibles errores en Firebase.
        }
    };

    return (
        <div className="usuario-container">
            {/* Formulario para el inicio de sesión del usuario */}
            <form onSubmit={handleSubmit}>
                <h2>Inicio de Sesión en GeoSalud</h2>

                {/* Muestra errores si los campos no son correctos */}
                {error && <p className="error">{error}</p>}

                {/* Campo de texto para el nombre del usuario */}
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required    // Asegura que el campo no esté vacío.
                />
                
                {/* Campo de texto para la EPS del usuario */}
                <input
                    type="text"
                    placeholder="Nombre EPS"
                    value={eps}
                    onChange={(e) => setEps(e.target.value)}
                    required    // Asegura que el campo no esté vacío.
                />

                {/* Botón para enviar el formulario */}
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginUsuario;  // Exporta el componente `LoginUsuario`.
