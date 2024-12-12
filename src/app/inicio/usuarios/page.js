'use client';
import { useState } from "react";
import { ref, get, onValue } from "firebase/database";
import { database } from "@/config/firebase";

const InicioSesion = () => {
  const [nombre, setNombre] = useState("");
  const [eps, setEps] = useState("");
  const [hospitales, setHospitales] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`Usuario: ${nombre}`);
    console.log(`EPS: ${eps}`);

    try {
      const refHospitales = ref(database, "hospitales");

      // Obtener datos de Firebase
      const snapshot = await get(refHospitales);

      if (snapshot.exists()) {
        const datosHospitales = snapshot.val();

        // Filtrar hospitales según EPS
        const hospitalesAtendiendoEPS = Object.values(datosHospitales).filter(
          (hospital) => hospital.epsAtendidas?.includes(eps)
        );

        setHospitales(hospitalesAtendiendoEPS);
      } else {
        console.error("No se encontraron hospitales.");
        setHospitales([]);
      }
    } catch (error) {
      console.error("Error al obtener los hospitales:", error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="EPS"
          value={eps}
          onChange={(e) => setEps(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>

      <div>
        <h2>Hospitales Disponibles</h2>
        {hospitales.length > 0 ? (
          hospitales.map((hospital) => (
            <div key={hospital.nit}>
              <p><strong>Nombre:</strong> {hospital.nombre}</p>
              <p><strong>Dirección:</strong> {hospital.direccion}</p>
              <p><strong>Capacidad Urgencias:</strong> {hospital.capacidadUrgencias}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron hospitales para tu EPS.</p>
        )}
      </div>
    </div>
  );
};

export default InicioSesion;
