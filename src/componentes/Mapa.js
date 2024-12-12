'use client';
import { useState, useEffect } from "react";

const Mapa = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const script = document.createElement("script");

    // Agregamos la clave API al parámetro `key` en la URL del script
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;

    script.onload = () => {
      const mapInstance = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 4.60971, lng: -74.08175 },
        zoom: 12,
      });
      setMap(mapInstance);
      console.log("Mapa cargado correctamente.");
    };

    script.onerror = () => console.error("No se pudo cargar Google Maps.");
    document.head.appendChild(script);
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default Mapa;
