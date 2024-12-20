'use client';

import { useState, useEffect } from "react";
import { ref, get, update } from "firebase/database";
import { database } from "@/config/firebase";
import { useRouter } from "next/navigation";

const InicioHospital = () => {
    const [hospitalData, setHospitalData] = useState({});
    const [capacidadUrgencias, setCapacidadUrgencias] = useState("");
    const [editableCapacidad, setEditableCapacidad] = useState("");
    const [location, setLocation] = useState({ lat: "", lng: "" });
    const [mapsLoaded, setMapsLoaded] = useState(false);
    const [nombreHospital, setNombreHospital] = useState("");

    const router = useRouter();
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // Cargar `sessionStorage` solo en el cliente
    useEffect(() => {
        if (typeof window !== "undefined") {
            const hospitalNombre = sessionStorage.getItem("nombreHospital");
            if (hospitalNombre) {
                setNombreHospital(hospitalNombre);
            }
        }
    }, []);

    const cargarGoogleMaps = () => {
        if (!window.google && !document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
            script.async = true;

            script.onload = () => {
                console.log("Google Maps API cargada correctamente.");
                setMapsLoaded(true);
            };

            script.onerror = () => console.error("Error al cargar Google Maps API.");
            document.head.appendChild(script);
        } else {
            setMapsLoaded(true);
            console.log("Google Maps API ya está cargada.");
        }
    };

    const obtenerDatos = async () => {
        try {
            if (nombreHospital) {
                const refHospital = ref(database, `hospitales/${nombreHospital}`);
                const snapshot = await get(refHospital);

                if (snapshot.exists()) {
                    const datos = snapshot.val();

                    console.log("Datos obtenidos del hospital:", datos);

                    setHospitalData({
                        nombre: datos.nombre,
                        direccion: datos.direccion,
                        capacidadUrgencias: datos.capacidadUrgencias,
                        nit: datos.nit,
                        responsable: {
                            nombre: datos.responsable?.nombre,
                            cargo: datos.responsable?.cargo,
                            documento: datos.responsable?.documento
                        }
                    });
                    setCapacidadUrgencias(datos.capacidadUrgencias);
                    setEditableCapacidad(datos.capacidadUrgencias);

                    if (datos.direccion && mapsLoaded && window.google) {
                        const geocoder = new window.google.maps.Geocoder();

                        geocoder.geocode({ address: datos.direccion }, (results, status) => {
                            if (status === "OK" && results && results[0]) {
                                const { lat, lng } = results[0].geometry.location;
                                setLocation({ lat: lat(), lng: lng() });
                                mostrarMapa(lat(), lng());
                            }
                        });
                    }
                } else {
                    console.error("No se encontraron datos del hospital.");
                    router.replace("/LoginHospital");
                }
            }
        } catch (error) {
            console.error("Error al obtener datos del hospital:", error)
        }
    };

    const actualizarCapacidad = async () => {
        try {
            const refHospital = ref(database, `hospitales/${nombreHospital}`);
            await update(refHospital, { capacidadUrgencias: editableCapacidad });
            console.log("Capacidad de urgencias actualizada correctamente.");
            setCapacidadUrgencias(editableCapacidad);
        } catch (error) {
            console.error("Error al actualizar la capacidad:", error);
        }
    };

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

    const ocultarMapa = () => {
        const mapContainer = document.getElementById("map");
        if (mapContainer) {
            mapContainer.innerHTML = "";
            console.log("Mapa ocultado.");
        }
    };

    const dirigirseHospital = () => {
        if (location.lat && location.lng) {
            window.open(`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`);
        }
    };

    useEffect(() => {
        if (nombreHospital) {
            cargarGoogleMaps();
            obtenerDatos();
        }
    }, [nombreHospital, router, mapsLoaded]);

    return (
        <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-cyan-600 mb-4">Información del Hospital</h2>

            {hospitalData.nombre ? (
                <div className="info-section">
                    <p className="text-lg font-medium text-gray-700 mb-2"><strong>Nombre del Hospital:</strong> {hospitalData.nombre}</p>
                    <p className="text-lg font-medium text-gray-700 mb-2"><strong>Dirección:</strong> {hospitalData.direccion}</p>
                    <p className="text-lg font-medium text-gray-700 mb-4"><strong>NIT:</strong> {hospitalData.nit}</p>

                    <label className="block mb-4 text-black">
                        <strong className="text-lg">Capacidad Total en Urgencias:</strong>
                        <input
                            type="number"
                            value={editableCapacidad}
                            onChange={(e) => setEditableCapacidad(e.target.value)}
                            min="0"
                            className="mt-2 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={actualizarCapacidad}
                            className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            Actualizar
                        </button>
                    </label>

                    <div id="map" className="w-full h-96 mb-4 rounded-lg shadow-lg"></div>

                    <div className="flex justify-between">
                        <button
                            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                            onClick={ocultarMapa}
                        >
                            Ocultar Mapa
                        </button>
                        <button
                            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-600 transition duration-300"
                            onClick={dirigirseHospital}
                        >
                            Dirigirse al Hospital
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-cyan-600">Cargando datos...</p>
            )}
        </div>
    );
};

export default InicioHospital;