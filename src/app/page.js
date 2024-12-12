'use client'; 
// Indica que este componente es un componente cliente en Next.js (se ejecuta del lado del cliente).

import "./page.css"; 
// Importa el archivo CSS para estilizar este componente.

import { useEffect, useState } from "react"; 
// Importa los hooks `useEffect` y `useState` de React para manejar estados y efectos secundarios.

const Lobby = () => { 
    // Declara el componente funcional `Lobby`.

    const [currentFact, setCurrentFact] = useState(""); 
    // Define un estado `currentFact` inicializado como una cadena vacía, que almacenará el dato curioso actual.

    useEffect(() => { 
        // Utiliza el hook `useEffect` para ejecutar código después de que el componente se renderice.

        const facts = [ 
            // Define un arreglo de datos curiosos sobre la salud.
            "El corazón humano late aproximadamente 100,000 veces al día.",
            "El ojo humano puede distinguir aproximadamente 10 millones de colores.",
            "El cerebro humano tiene más conexiones neuronales que estrellas en la Vía Láctea.",
            "Los médicos lavan sus manos más de 20 veces al día.",
            "La mayoría de los hospitales modernos usan inteligencia artificial para predecir necesidades."
        ];

        const updateFact = () => { 
            // Declara una función que selecciona aleatoriamente un dato curioso del arreglo `facts`.
            setCurrentFact(facts[Math.floor(Math.random() * facts.length)]); 
            // Actualiza el estado `currentFact` con un dato curioso seleccionado al azar.
        };

        updateFact(); 
        // Llama a `updateFact` inmediatamente después de montar el componente para mostrar un dato inicial.

        const interval = setInterval(updateFact, 5000); 
        // Configura un intervalo que ejecuta `updateFact` cada 5000 milisegundos (5 segundos).

        return () => clearInterval(interval); 
        // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria.
    }, []); 
    // El arreglo vacío `[]` asegura que `useEffect` solo se ejecute al montar y desmontar el componente.

    return ( 
        // Renderiza el contenido del componente.
        <div> 
            {/* Container principal */}
            <div className="lobby-container"> 
                {/* Contenedor principal estilizado con la clase `lobby-container`. */}

                <header className="welcome-section"> 
                    {/* Sección de bienvenida estilizada con la clase `welcome-section`. */}
                    <h1>🌐 Bienvenidos a GeoSalud</h1> 
                    {/* Título principal del componente. */}
                    <p>La tecnología al servicio del sector salud</p> 
                    {/* Subtítulo que describe brevemente la función del proyecto. */}
                </header>

                <div className="map-section"> 
                    {/* Sección que contiene un mapa interactivo. */}
                    <img
                        src="https://alpoma.net/carto/wp-content/uploads/2019/07/An_Animated_Map_of_the_Earth.gif" 
                        // URL de una imagen de un mapa interactivo animado.
                        alt="Mapa interactivo" 
                        // Texto alternativo para accesibilidad.
                        onClick={() => window.open("https://www.google.com/maps", "_blank")} 
                        // Al hacer clic en la imagen, se abre Google Maps en una nueva pestaña del navegador.
                    />
                    <p>Haz clic en el mapa para abrir Google Maps</p> 
                    {/* Texto que instruye al usuario sobre cómo interactuar con el mapa. */}
                </div>

                {/* Datos curiosos */}
                <div className="fact-card"> 
                    {/* Tarjeta que muestra un dato curioso estilizado con la clase `fact-card`. */}
                    <h2>💡 Dato Curioso</h2> 
                    {/* Título de la sección de datos curiosos. */}
                    <p>{currentFact}</p> 
                    {/* Muestra el dato curioso actual desde el estado `currentFact`. */}
                </div>
            </div>
        </div>
    );
};

export default Lobby; 
// Exporta el componente `Lobby` para que pueda ser utilizado en otras partes de la aplicación.
