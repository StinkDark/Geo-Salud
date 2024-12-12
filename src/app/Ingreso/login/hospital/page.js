'use client';
import { useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/config/firebase";
import { useRouter } from "next/navigation";
import "./page.css";

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

                console.log("Datos recuperados desde Firebase:", datosHospital);

                if (
                    String(datosHospital.responsable.documento).trim() === String(documento).trim() &&
                    String(datosHospital.responsable.contrasena).trim() === String(contrasena).trim()
                ) {
                    alert("Inicio de sesión exitoso");

                    // Guardar el NIT del hospital en sessionStorage
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
        <div className="login-container">
            <h2>Iniciar Sesión Hospital</h2>
            <form onSubmit={handleSubmit}>
                <label>NIT del Hospital</label>
                <input
                    placeholder="Ingrese el NIT del hospital"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                    required
                />
                <label>Número de Documento</label>
                <input
                    placeholder="Número del documento"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    type="text"
                    required
                />
                <label>Contraseña</label>
                <input
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    type="password"
                    required
                />
                
                <button type="submit">Iniciar Sesión</button>
            </form>

            {/* Botón para redirigir al registro de hospitales */}
            <button onClick={() => router.push('/Ingreso/registro')}>
                Registrar Hospital
            </button>
        </div>
    );
};

export default LoginHospital;
