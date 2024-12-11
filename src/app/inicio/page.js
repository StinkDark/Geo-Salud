'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

const Inicio = () => {
    const [nombre] = useState("Juan Pérez");
    const [eps] = useState("EPS Salud Total");

    return (
        <div>
            <h1>Información del Usuario</h1>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>EPS:</strong> {eps}</p>

            <div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Google_Maps_logo.png"
                    alt="Mapa Referencial"
                    width="300"
                />
            </div>
        </div>
    );
};

export default Inicio;
