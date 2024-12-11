'use client';
import "./page.css";
import { useEffect, useState } from "react";


const Lobby = () => {
    const [currentFact, setCurrentFact] = useState("");

    useEffect(() => {
        const facts = [
            "El corazón humano late aproximadamente 100,000 veces al día.",
            "El ojo humano puede distinguir aproximadamente 10 millones de colores.",
            "El cerebro humano tiene más conexiones neuronales que estrellas en la Vía Láctea.",
            "Los médicos lavan sus manos más de 20 veces al día.",
            "La mayoría de los hospitales modernos usan inteligencia artificial para predecir necesidades."
        ];

        const updateFact = () => {
            setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
        };

        updateFact();
        const interval = setInterval(updateFact, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {/* Container principal */}
            <div className="lobby-container">
                <header className="welcome-section">
                    <h1>🌐 Bienvenidos a GeoSalud</h1>
                    <p>La tecnología al servicio del sector salud</p>
                </header>

                <div className="map-section">
                    <img
                        src="https://alpoma.net/carto/wp-content/uploads/2019/07/An_Animated_Map_of_the_Earth.gif"
                        alt="Mapa interactivo"
                        onClick={() => window.open("https://www.google.com/maps", "_blank")}
                    />
                    <p>Haz clic en el mapa para abrir Google Maps</p>
                </div>

                {/* Datos curiosos */}
                <div className="fact-card">
                    <h2>💡 Dato Curioso</h2>
                    <p>{currentFact}</p>
                </div>
            </div>
        </div>
    );
};

export default Lobby;
