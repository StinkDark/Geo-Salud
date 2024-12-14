'use client'; // Esta línea indica que el componente se ejecutará del lado del cliente (navegador).

// Importación de hooks y funciones necesarias para el funcionamiento del componente
import { useState, useEffect } from "react";
import { ref, get, update } from "firebase/database"; // Importa funciones de Firebase Database.
import { database } from "@/config/firebase"; // Importa la configuración de Firebase.
import { useRouter } from "next/navigation"; // Importa el hook de navegación de Next.js.
import "./page.css"; // Importa el archivo CSS para el estilizado del componente.

const InicioHospital = () => {
    // Declaración del estado para almacenar información del hospital y otros datos
    const [hospitalData, setHospitalData] = useState({}); 
    const [capacidadUrgencias, setCapacidadUrgencias] = useState("");
    const [editableCapacidad, setEditableCapacidad] = useState("");
    const [location, setLocation] = useState({ lat: "", lng: "" });
    const [mapsLoaded, setMapsLoaded] = useState(false);
    const router = useRouter();
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Obtiene la clave de Google Maps desde el archivo .env.
    const nombreHospital = sessionStorage.getItem("nombreHospital"); // Obtiene el nombre del hospital desde el almacenamiento del navegador.

    // Función para cargar el script de Google Maps dinámicamente
    const cargarGoogleMaps = () => {
        if (!window.google && !document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
            // Si Google Maps no está cargado, crea y añade el script
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
            script.async = true;

            script.onload = () => {
                console.log("Google Maps API cargada correctamente.");
                setMapsLoaded(true); // Actualiza el estado mapsLoaded a true cuando Google Maps se carga correctamente.
            };

            script.onerror = () => console.error("Error al cargar Google Maps API.");
            document.head.appendChild(script); // Añade el script al documento.
        } else {
            setMapsLoaded(true);
            console.log("Google Maps API ya está cargada.");
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

                    setHospitalData(datos);
                    setCapacidadUrgencias(datos.capacidadUrgencias);
                    setEditableCapacidad(datos.capacidadUrgencias);

                    if (datos.direccion && mapsLoaded && window.google) {
                        const geocoder = new window.google.maps.Geocoder();

                        geocoder.geocode({ address: datos.direccion }, (results, status) => {
                            if (status === "OK" && results && results[0]) {
                                const { lat, lng } = results[0].geometry.location;
                                setLocation({ lat: lat(), lng: lng() });
                                console.log(`Latitud: ${lat()}, Longitud: ${lng()}`);
                                mostrarMapa(lat(), lng()); // Muestra el mapa con las coordenadas.
                            }
                        });
                    }
                } else {
                    alert("No se encontraron datos del hospital.");
                    router.replace("/LoginHospital"); // Redirecciona al login si no se encuentran datos.
                }
            }
        } catch (error) {
            console.error("Error al obtener datos del hospital:", error);
            alert("Hubo un error al cargar los datos del hospital.");
        }
    };

    // Función para actualizar la capacidad en Firebase
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

    // Función para mostrar el mapa con Google Maps en el contenedor 'map'
    const mostrarMapa = (lat, lng) => {
        const mapContainer = document.getElementById("map");

        if (mapContainer) {
            const mapInstance = new window.google.maps.Map(mapContainer, {
                center: { lat, lng },
                zoom: 15,
            });

            new window.google.maps.Marker({
                position: { lat, lng },
                map: mapInstance,
                title: hospitalData.nombre || "Hospital",
            });
        }
    };

    // Hook de React para cargar Google Maps y obtener datos del hospital al montar el componente
    useEffect(() => {
        cargarGoogleMaps();
        obtenerDatos();
    }, [nombreHospital, router, mapsLoaded]);

    return (
        <div className="dashboard-container">
            <h2>Información del Hospital</h2>

            {hospitalData.nombre ? (
                <>
                    <div className="info-section">
                        <p><strong>Nombre del Hospital:</strong> {hospitalData.nombre}</p>
                        <p><strong>Dirección:</strong> {hospitalData.direccion}</p>
                        <p><strong>NIT:</strong> {hospitalData.nit}</p>

                        <div>
                            <label>
                                <strong>Capacidad Total en Urgencias:</strong>
                                <input
                                    type="number"
                                    value={editableCapacidad}
                                    onChange={(e) => setEditableCapacidad(e.target.value)}
                                    min="0"
                                />
                                <button onClick={actualizarCapacidad}>
                                    Actualizar
                                </button>
                            </label>
                        </div>

                        <p><strong>Responsable:</strong> {hospitalData.responsable?.nombre}</p>
                        <p><strong>Cédula del Responsable:</strong> {hospitalData.responsable?.documento}</p>

                        <div id="map" style={{ width: "100%", height: "400px" }}></div>
                    </div>
                </>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};

export default InicioHospital;
