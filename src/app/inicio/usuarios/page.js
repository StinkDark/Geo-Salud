'use client';

import { useState, useEffect } from "react";
import { ref, get, onValue } from "firebase/database";
import { database } from "@/config/firebase";
import "./page.css"
const InicioUsuario = () => {
  const [epsSeleccionada, setEpsSeleccionada] = useState("");
  const [hospitales, setHospitales] = useState([]);
  const [epsDisponibles, setEpsDisponibles] = useState([]);
  const [mostrarMapa, setMostrarMapa] = useState(null);
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Obtener hospitales para la EPS seleccionada
  const obtenerHospitalesPorEps = async (eps) => {
    try {
      console.log("Obteniendo hospitales para EPS:", eps);
      const refHospitales = ref(database, "hospitales");
      const snapshot = await get(refHospitales);

      if (snapshot.exists()) {
        const datosHospitales = snapshot.val();

        const hospitalesAtendidos = Object.values(datosHospitales).filter(hospital =>
          hospital.epsAtendidas?.includes(eps)
        );

        const hospitalesConCoordenadas = await Promise.all(
          hospitalesAtendidos.map(async (hospital) => {
            const coordenadas = await obtenerCoordenadasDesdeDireccion(hospital.direccion);
            return {
              ...hospital,
              coordenadas
            };
          })
        );

        console.log("Hospitales obtenidos:", hospitalesConCoordenadas);
        setHospitales(hospitalesConCoordenadas);
      }
    } catch (error) {
      console.error("Error al obtener hospitales:", error);
    }
  };

  // Manejo del cambio en el selector de EPS
  const handleEpsChange = (e) => {
    const eps = e.target.value;
    console.log("EPS seleccionada:", eps);
    setEpsSeleccionada(eps);
    obtenerHospitalesPorEps(eps);
  };

  // Obtener coordenadas desde Google Maps API
  const obtenerCoordenadasDesdeDireccion = async (direccion) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${googleApiKey}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
      return null;
    }
  };

  const generarUrlMapa = (hospital) => {
    console.log("Generando URL del mapa para:", hospital.coordenadas);
    return `https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${hospital.coordenadas?.lat},${hospital.coordenadas?.lng}`;
  };

  const handleMostrarMapa = (documento) => {
    console.log("Mostrando mapa para el documento:", documento);
    setMostrarMapa(prevEstado => prevEstado === documento ? null : documento);
  };

  // Escuchar cambios en tiempo real en la base de datos de Firebase
  useEffect(() => {
    const refHospitales = ref(database, "hospitales");

    const unsubscribe = onValue(refHospitales, (snapshot) => {
      console.log("Snapshot en tiempo real:", snapshot.val());

      if (snapshot.exists()) {
        const datosHospitales = snapshot.val();

        const epsUnicas = new Set();
        Object.values(datosHospitales).forEach(hospital => {
          hospital.epsAtendidas?.forEach(eps => epsUnicas.add(eps));
        });

        console.log("EPS únicos encontrados:", Array.from(epsUnicas));

        setEpsDisponibles(Array.from(epsUnicas));
      }
    });

    return () => {
      console.log("Desmontando el componente y limpiando suscripciones.");
      unsubscribe();
    };
  }, []);

  return (
    <div className="eps-container border-4 border-solid border-gray-300 p-8 m-10 flex flex-col gap-6 bg-white rounded-lg shadow-lg animate-fadeInLogin duration-1000 ease-in">
      {/* Título de la sección */}
      <h2 className="font-bold text-2xl text-cyan-600 mb-6">Selecciona tu EPS</h2>

      {/* Selector de EPS dinámico */}
      <label className="font-bold text-lg text-gray-700">
        EPS:
        <select
          className="block w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onChange={handleEpsChange}
          value={epsSeleccionada}
        >
          <option value="" disabled>Selecciona tu EPS</option>
          {epsDisponibles.map((eps) => (
            <option key={eps} value={eps}>{eps}</option>
          ))}
        </select>
      </label>

      {/* Información de Hospitales */}
      <div className="gap-6">
        <h3 className="font-bold text-xl text-gray-700 mb-4">Información de Hospitales</h3>

        {hospitales.length > 0 ? (
          hospitales.map((hospital) => (
            <div key={hospital.nit} className="hospital-container p-6 border-2 border-solid border-gray-300 rounded-lg mb-6">
              <div className="text-left text-gray-700">
                <p className="text-xl mb-2"><strong>Nombre:</strong> {hospital.nombre}</p>
                <p className="text-xl mb-2"><strong>Documento del Responsable:</strong> {hospital.responsable?.documento}</p>
                <p className="text-xl mb-2"><strong>Cargo:</strong> {hospital.responsable?.cargo}</p>
                <p className="text-xl mb-2"><strong>Dirección:</strong> {hospital.direccion}</p>
                <p className="text-xl mb-2"><strong>Camillas de Urgencias disponible:</strong> {hospital.capacidadUrgencias}</p>
              </div>

              {/* Botón para mostrar el mapa */}
              <button
                className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-700 transition duration-300 mt-4"
                onClick={() => handleMostrarMapa(hospital.documento)}
              >
                {mostrarMapa === hospital.documento ? "Ocultar Mapa" : "Mostrar Mapa"}
              </button>

              {/* Mapa y enlace para dirigirse al hospital */}
              {mostrarMapa === hospital.documento && (
                <>
                  <iframe
                    className="w-full h-64 my-4 rounded-lg shadow-lg"
                    title={`Mapa ${hospital.nombre}`}
                    loading="lazy"
                    src={generarUrlMapa(hospital)}
                  />
                  <a

                    href={`https://www.google.com/maps/search/?api=1&query=${hospital.coordenadas?.lat},${hospital.coordenadas?.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 bg-black text-white font-bold py-2 px-4 rounded-lg text-center hover:bg-cyan-700 transition duration-300"
                  >
                    Dirigirse a este hospital
                  </a>

                </>
              )}
            </div>
          ))
        ) : (
          <p>No hay hospitales registrados para tu EPS.</p>
        )}
      </div>
    </div>
  );
};

export default InicioUsuario;