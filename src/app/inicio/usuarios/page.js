// Activa el componente en el cliente
'use client';

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/config/firebase";
import { useRouter } from "next/navigation";
import "./usuario-inicio.css";

// Componente principal para mostrar la información de usuarios y hospitales disponibles
const InicioUsuarios = () => {
    // `useRouter` para manejar la navegación entre páginas
    const router = useRouter(); 

    // Estado para almacenar el nombre del usuario
    const [nombreUsuario, setNombreUsuario] = useState("");
    // Estado para almacenar la EPS a la que pertenece el usuario
    const [epsUsuario, setEpsUsuario] = useState("");
    // Estado para almacenar la lista de hospitales disponibles
    const [hospitales, setHospitales] = useState([]);

    // Hook `useEffect` para cargar datos y suscribirse a la base de datos Firebase al montar el componente
    useEffect(() => {
        // Obtiene el nombre y la EPS del usuario desde el almacenamiento de sesión
        const nombre = sessionStorage.getItem("nombreUsuario");
        const eps = sessionStorage.getItem("epsUsuario");

        if (nombre && eps) {
            // Si el nombre y la EPS existen, actualiza el estado
            setNombreUsuario(nombre);
            setEpsUsuario(eps);

            // Obtiene la referencia a la base de datos en Firebase para obtener información de hospitales
            const refHospitales = ref(database, "hospitales");

            // Suscripción en tiempo real para obtener actualizaciones de datos de hospitales
            const unsubscribe = onValue(refHospitales, (snapshot) => {
                const hospitalesData = snapshot.val();

                // Filtra hospitales basados en la EPS a la que el usuario pertenece
                const hospitalesParaEPS = Object.values(hospitalesData).filter(
                    (hospital) => hospital.epsAtendidas?.includes(eps)
                );

                // Actualiza el estado con hospitales disponibles para la EPS del usuario
                setHospitales(hospitalesParaEPS);
            });

            // Limpia la suscripción cuando el componente se desmonta
            return () => unsubscribe(); 
        } else {
            // Si no existe información en el almacenamiento de sesión, redirecciona al login del usuario
            router.push('/LoginUsuario'); 
        }
    }, [router]);

    return (
        <div>
            <h1>Inicio</h1>

            {/* Muestra el nombre del usuario si está disponible */}
            {nombreUsuario && <p><strong>Hola, {nombreUsuario}</strong></p>}
            {epsUsuario && <p><strong>Tu EPS:</strong> {epsUsuario}</p>}

            <h2>Hospitales Disponibles</h2>

            {/* Renderiza la lista de hospitales basados en la EPS del usuario */}
            {hospitales.length > 0 ? (
                hospitales.map((hospital, idx) => (
                    <div key={idx}>
                        {/* Muestra el nombre del hospital */}
                        <p><strong>Nombre Hospital:</strong> {hospital.nombre}</p>
                        {/* Muestra la dirección del hospital */}
                        <p><strong>Dirección:</strong> {hospital.direccion}</p>
                        {/* Muestra la capacidad de urgencias del hospital */}
                        <p><strong>Capacidad de Urgencias:</strong> {hospital.capacidadUrgencias}</p>
                    </div>
                ))
            ) : (
                // Mensaje en caso de no encontrar hospitales para la EPS
                <p>No se encontraron hospitales para tu EPS.</p>
            )}
        </div>
    );
};

export default InicioUsuarios;
