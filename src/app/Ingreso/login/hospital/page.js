'use client';

import { useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/config/firebase";
import { useRouter } from "next/navigation";
import "./page.css"

const LoginHospital = () => {
  const [nit, setNit] = useState("");
  const [documento, setDocumento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hospitalRef = ref(database, `hospitales/${nit}`);
      const snapshot = await get(hospitalRef);

      if (snapshot.exists()) {
        const datosHospital = snapshot.val();

        if (
          String(datosHospital.responsable.documento).trim() === String(documento).trim() &&
          String(datosHospital.responsable.contrasena).trim() === String(contrasena).trim()
        ) {
          alert("Inicio de sesión exitoso");
          sessionStorage.setItem("nombreHospital", nit);
          router.push("/inicio/hospital");
        } else {
          alert("Contraseña o documento incorrecto");
        }
      } else {
        alert("Hospital no encontrado en el sistema");
      }
    } catch (err) {
      console.error("Error al recuperar datos:", err);
      alert("Hubo un error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-6xl mx-4 transform transition-all hover:scale-105">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          🚀 Iniciar Sesión Hospital
        </h2>

        {/* Formulario en Distribución Horizontal */}
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          {/* NIT Hospital */}
          <input
            type="text"
            placeholder="NIT del Hospital"
            value={nit}
            onChange={(e) => setNit(e.target.value)}
            required
            className="w-1/3 md:w-1/4 px-5 py-3 rounded-lg border bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Número del Responsable */}
          <input
            type="text"
            placeholder="Número del Responsable"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
            className="w-1/3 md:w-1/4 px-5 py-3 rounded-lg border bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="w-1/3 md:w-1/4 px-5 py-3 rounded-lg border bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Botón de Iniciar Sesión */}
          <button
            type="submit"
            className="mt-6 w-full md:w-auto bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            🔥 Iniciar Sesión
          </button>

          {/* Botón para Registrar Hospital */}
          <button
            type="button"
            onClick={() => router.push('/Ingreso/registro')}
            className="w-full md:w-auto mt-4 bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg shadow hover:bg-gray-400 transition"
          >
            📜 Registrar Hospital
          </button>
        </form>

        {/* Información Adicional */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-600">
            ⚠️ Mantenga sus datos actualizados para asegurar el acceso continuo al sistema.
          </p>
        </div>

        <p className="mt-6 text-center text-gray-500">
          © {new Date().getFullYear()} GeoSalud. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginHospital;
