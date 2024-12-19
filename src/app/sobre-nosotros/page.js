// Activa el componente en el cliente
'use client';

import { useRouter } from "next/navigation";
import './page.css'


const SobreNosotros = () => {
    const router = useRouter();

    // Función para redireccionar al login del usuario
    const login = () => {
        router.push('/Ingreso/login/usuario');
    };

    return (

        /*nota importante: en Tailwind.css los bordes se colocan dentro del className de cada etiqueta y comienzan con la palabra: border , ejemplo: border-2 border-solid border-white, 
        cuando desee eliminarlos dirijase al className donde se encuentre y los borra*/

        /*nota importante: Si nota que aparecen bordes en su pagina y sin embargo no estan creados en su className, dirijase al archivo page.css correspondiente a dicha pagina
        lo ma probable es que haya sido creado allí y cuando no los necesite, los puede borrar*/

        <div className="contenedor-principal text-sm border-2 border-solid sm:contenedor-principal border-2 border-solid text-xs text-left">

            {/* Encabezado principal del componente */}
            <h1 className="flex justify-center font-bold text-3xl">🌐 Sobre GeoSalud</h1>

            {/* Descripción breve del propósito del proyecto */}
            <p className="flex flex-start mb-2 sm:flex flex-start mb-2 "><strong>📌 Simplificamos tu acceso a la atención médica de emergencia.</strong></p>

            {/* Sección '¿Quiénes Somos?' */}
            <h2 className="font-bold">👥 ¿Quiénes Somos?</h2>

            <article className="sm:text-xs mb-10 border-2 border-solid border-white">
                <div>
                    <p className="parrafo text-xs sm:text-xs">
                        En GeoSalud, nuestra misión es conectar a las personas con los servicios de emergencia más cercanos de manera efectiva.
                        Sabemos que en momentos de urgencia, el tiempo y la información correcta pueden marcar la diferencia. 
                    </p>
                </div>
            </article>


            {/* Sección '¿Qué te ofrecemos?' con una lista de servicios */}
            <h2 className="font-bold">📜 ¿Qué te ofrecemos?</h2>

            {/* Contenedor para los servicios ofrecidos */}
            <div className="contenedor-servicios border-2 border-solid sm:border-2 border-solid ">

                {/* Servicio 1: Localizar hospitales cercanos */}
                <div className="servicio">
                    🗺️ <strong>Localizar hospitales cercanos</strong>
                    <p>Usa tu ubicación para encontrar opciones rápidas y seguras.</p>
                </div>

                {/* Servicio 2: Filtrar según tu EPS */}
                <div className="servicio">
                    🏥 <strong>Filtrar según tu EPS</strong>
                    <p>Asegúrate de recibir atención en hospitales compatibles con tu cobertura.</p>
                </div>

                {/* Servicio 3: Ver tiempos de llegada estimados */}
                <div className="servicio ">
                    🚗 <strong>Ver tiempos de llegada estimados</strong>
                    <p>Descubre cuánto tardarás en llegar a cada hospital.</p>
                </div>

                {/* Servicio 4: Consultar ocupación en urgencias */}
                <div className="servicio">
                    📊 <strong>Consultar ocupación en urgencias</strong>
                    <p>Conoce el estado actual del área de urgencias para tomar decisiones informadas.</p>
                </div>

                {/* Servicio 5: Tiempos de Respuesta Optimizados */}
                <div className="servicio">
                    🕒 <strong>Tiempos de Respuesta Optimizados</strong>
                    <p>La rapidez y eficiencia garantizan tu acceso inmediato a servicios médicos.</p>
                </div>

                {/* Servicio 6: Seguridad y Privacidad */}
                <div className="servicio ">
                    🔒 <strong>Seguridad y Privacidad</strong>
                    <p>Tu información personal y médica se maneja con altos estándares de privacidad.</p>
                </div>

            </div>

            {/* Sección 'Tecnología al servicio de tu salud' */}

            <article className="sm:text-xs mb-10">
            <h2 className="font-bold">🛠️ Tecnología al servicio de tu salud</h2>
                <div>
                    <p className="parrafo text-xs border-2 border-solid border-white sm:text-xs border-2 border-solid border-white">
                    Nuestra herramienta combina mapas interactivos, datos en tiempo real y un sistema intuitivo que prioriza tus necesidades,
                    ayudándote a encontrar soluciones médicas en situaciones críticas.
                    </p>
                </div>
            </article>

            {/* Botón para iniciar sesión */}
            <div className="cuenta bg:gray font-bold text-navy text-lg border-2 border-solid border-rounded flex justify-center ">
                <button onClick={login}>Empieza ahora</button>
            </div>

        </div>
    );
};

export default SobreNosotros;
