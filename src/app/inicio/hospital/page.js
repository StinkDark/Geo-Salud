// Importa hooks y funciones necesarias de React y Firebase
'use client';
import { useState, useEffect } from "react";
import { ref, get, update } from "firebase/database";
import { database } from "@/config/firebase";
import { useRouter } from "next/navigation";
import "./hospital-inicio.css";

const InicioHospital = () => {
    // Estados para manejar los datos del hospital y su capacidad
    const [hospitalData, setHospitalData] = useState({});  // Datos del hospital
    const [capacidadUrgencias, setCapacidadUrgencias] = useState("");  // Capacidad de urgencias actual
    const [editableCapacidad, setEditableCapacidad] = useState("");  // Capacidad editable por el usuario
    const [location, setLocation] = useState({ lat: "", lng: "" });  // Ubicación del hospital (latitud y longitud)
    const router = useRouter();  // Hook para redirigir a otras páginas

    const nombreHospital = sessionStorage.getItem("nombreHospital");  // Obtiene el nombre del hospital desde sessionStorage

    // Cargar y usar Google Maps solo una vez
    useEffect(() => {
        const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;  // Obtiene la clave de la API de Google Maps desde el archivo .env

        // Función para cargar el script de Google Maps
        const cargarGoogleMaps = () => {
            if (!window.google) {
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
                script.async = true;
                script.onload = () => console.log("Google Maps API cargada correctamente.");
                script.onerror = () => console.error("Error al cargar Google Maps API.");
                document.head.appendChild(script);
            }
        };

        // Función para obtener datos del hospital desde Firebase
        const obtenerDatos = async () => {
            try {
                if (nombreHospital) {
                    const refHospital = ref(database, `hospitales/${nombreHospital}`);
                    const snapshot = await get(refHospital);

                    if (snapshot.exists()) {
                        const datos = snapshot.val();

                        // Establece datos del hospital en el estado
                        setHospitalData(datos);
                        setCapacidadUrgencias(datos.capacidadUrgencias);
                        setEditableCapacidad(datos.capacidadUrgencias);

                        // Geocodificar dirección y obtener coordenadas usando Google Maps
                        if (datos.direccion && window.google && window.google.maps) {
                            const geocoder = new window.google.maps.Geocoder();
                            geocoder.geocode({ address: datos.direccion }, (results, status) => {
                                if (status === "OK" && results && results[0]) {
                                    const { lat, lng } = results[0].geometry.location;
                                    setLocation({ lat, lng });
                                    console.log(`Latitud: ${lat}, Longitud: ${lng}`);
                                }
                            });
                        }
                    } else {
                        console.error("No se encontraron datos para el hospital.");
                        alert("No se encontraron datos del hospital.");
                        router.replace("/LoginHospital");  // Redirige al usuario a la página de login del hospital
                    }
                }
            } catch (error) {
                console.error("Error al obtener datos del hospital:", error);
                alert("Hubo un error al cargar los datos del hospital.");
            }
        };

        cargarGoogleMaps();  // Carga Google Maps
        obtenerDatos();  // Obtiene datos del hospital
    }, [nombreHospital, router]);

    // Función para actualizar la capacidad de urgencias en Firebase
    const actualizarCapacidad = async () => {
        try {
            const refHospital = ref(database, `hospitales/${nombreHospital}`);
            await update(refHospital, { capacidadUrgencias: editableCapacidad });
            alert("Capacidad de urgencias actualizada correctamente.");
            setCapacidadUrgencias(editableCapacidad);
        } catch (error) {
            console.error("Error al actualizar la capacidad:", error);
            alert("No se pudo actualizar la capacidad.");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Información del Hospital</h2>

            {/* Muestra información del hospital si está disponible */}
            {hospitalData.nombre ? (
                <>
                    <div className="info-section">
                        {/* Muestra datos del hospital */}
                        <p><strong>Nombre del Hospital:</strong> {hospitalData.nombre}</p>
                        <p><strong>Dirección:</strong> {hospitalData.direccion}</p>
                        <p><strong>NIT:</strong> {hospitalData.nit}</p>

                        <div>
                            <label>
                                <strong>Capacidad Total en Urgencias:</strong>
                                {/* Input para modificar la capacidad de urgencias */}
                                <input
                                    type="number"
                                    value={editableCapacidad}
                                    onChange={(e) => setEditableCapacidad(e.target.value)}
                                    min="0"
                                />
                                {/* Botón para actualizar la capacidad */}
                                <button onClick={actualizarCapacidad}>
                                    Actualizar
                                </button>
                            </label>
                        </div>

                        <p><strong>Responsable:</strong> {hospitalData.responsable?.nombre}</p>
                        <p><strong>Cédula del Responsable:</strong> {hospitalData.responsable?.documento}</p>

                        {/* Muestra la ubicación si se obtuvieron coordenadas */}
                        {location.lat && (
                            <div>
                                <p><strong>Ubicación:</strong></p>
                                <p>Latitud: {location.lat}, Longitud: {location.lng}</p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p>Cargando datos...</p>  // Muestra mensaje mientras se cargan los datos
            )}
        </div>
    );
};

export default InicioHospital;
