'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./page.css";

const LoginUsuario = () => {
    const [nombre, setNombre] = useState("");
    const [eps, setEps] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre || !eps) {
            setError("Por favor completa todos los campos.");
            return;
        }

      
        alert("Inicio de sesión exitoso");
        setError("");

       
        router.push("/inicio");
    };

    return (
        <div className="usuario-container">
            <form onSubmit={handleSubmit}>
                <h2>Bienvenido a GeoSalud</h2>
                <p>Por favor, inicia sesión para obtener información sobre los hospitales que atienden tu EPS.</p>

                {error && <p className="error">{error}</p>}

                <div className="input-group">
                    <i className="fas fa-user"></i>
                    <input
                        type="text"
                        placeholder="Ingresa tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <i className="hospital"></i>
                    <input
                        type="text"
                        placeholder="Nombre de tu EPS"
                        value={eps}
                        onChange={(e) => setEps(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    <i className="inicio"></i> Iniciar sesión
                </button>

                <p>
                    ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
                </p>
            </form>
        </div>
    );
};

export default LoginUsuario;
