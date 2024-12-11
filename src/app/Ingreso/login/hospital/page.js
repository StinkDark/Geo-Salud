'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ref, get } from "firebase/database";
import { database } from "@/config/firebase";
import "./page.css";

const LoginHospital = () => {
    const [nombre, setNombre] = useState("");
    const [documento, setDocumento] = useState("");
    const [contrasena, setContrasena] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const hospitalRef = ref(database, `hospitales/${nombre}`);
            const snapshot = await get(hospitalRef);

            if (snapshot.exists()) {
                const datosHospital = snapshot.val();

                if (
                    datosHospital.documento === documento &&
                    datosHospital.contrasena === contrasena
                ) {
                    alert("Inicio de sesión exitoso");
                    router.push("/dashboard");
                } else {
                    alert("Error en la contraseña o documento");
                }
            } else {
                alert("Hospital no encontrado en el sistema");
            }
        } catch (err) {
            console.error(err);
            alert("Ocurrió un error al iniciar sesión");
        }
    };

    const handleRegistroHospital = () => {
        router.push("/registro-hospital");
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión Hospital</h2>

            <form onSubmit={handleSubmit}>
                <label>Nombre Hospital</label>
                <input
                    placeholder="Ingresa tu nombre de hospital"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <label>Número de Documento</label>
                <input
                    placeholder="Ingresa tu documento"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    type="text"
                    required
                />
                <label>Contraseña</label>
                <input
                    placeholder="Ingresa tu contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    type="password"
                    required
                />

                <button type="submit">Iniciar Sesión</button>
            </form>
            <button onClick={() => router.push('/Ingreso/registro')}>
                ¿No tienes cuenta? Regístrate
            </button>
        </div>
    );
};

export default LoginHospital;
