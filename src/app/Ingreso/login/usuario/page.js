'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ref, get } from "firebase/database";
import { database } from "@/config/firebase";
import "./page.css";

const LoginUsuario = () => {
    const [nombre, setNombre] = useState("");
    const [eps, setEps] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !eps) {
            setError("Por favor completa todos los campos.");
            return;
        }

        try {
            // Buscar hospitales en la base de datos que correspondan a la EPS ingresada
            const refHospitales = ref(database, "hospitales");
            const snapshot = await get(refHospitales);

            if (snapshot.exists()) {
                const hospitales = snapshot.val();

                const hospitalesParaEPS = Object.values(hospitales).filter(
                    (hospital) => hospital.epsAtendidas?.includes(eps)
                );

                if (hospitalesParaEPS.length > 0) {
                    // Guardar la información en sessionStorage
                    sessionStorage.setItem("nombreUsuario", nombre);
                    sessionStorage.setItem("epsUsuario", eps);

                    alert("Inicio de sesión exitoso");

                    router.push("/inicio/usuarios");
                } else {
                    setError("No se encontraron hospitales para tu EPS.");
                }
            }
        } catch (error) {
            console.error("Error al verificar datos:", error);
            setError("Hubo un error al conectar con la base de datos.");
        }
    };

    return (
        <div className="usuario-container">
            <form onSubmit={handleSubmit}>
                <h2>Inicio de Sesión en GeoSalud</h2>

                {error && <p className="error">{error}</p>}

                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                
                <input
                    type="text"
                    placeholder="Nombre EPS"
                    value={eps}
                    onChange={(e) => setEps(e.target.value)}
                    required
                />

                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginUsuario;
