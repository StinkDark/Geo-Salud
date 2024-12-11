'use client';
import { useRouter } from "next/navigation";
import './page.css';

const SobreNosotros = () => {
    const router = useRouter();

    const login = () => {
        router.push('/Ingreso/login/usuario');
    };

    return (
        <div className="sobre-container">
            <h1>🌐 Sobre GeoSalud</h1>

            <p><strong>📌 Simplificamos tu acceso a la atención médica de emergencia.</strong></p>

            <h2>👥 ¿Quiénes Somos?</h2>
            <p>
                En <strong>GeoSalud</strong>, nuestra misión es conectar a las personas con los servicios de emergencia más cercanos
                de manera rápida y eficiente. Sabemos que en momentos de urgencia, el tiempo y la información correcta pueden marcar la diferencia.
            </p>

            <h2>📜 ¿Qué te ofrecemos?</h2>
            <div className="features">
                <div className="feature">
                    🗺️ <strong>Localizar hospitales cercanos</strong>
                    <p>Usa tu ubicación para encontrar opciones rápidas y seguras.</p>
                </div>
                <div className="feature">
                    🏥 <strong>Filtrar según tu EPS</strong>
                    <p>Asegúrate de recibir atención en hospitales compatibles con tu cobertura.</p>
                </div>
                <div className="feature">
                    🚗 <strong>Ver tiempos de llegada estimados</strong>
                    <p>Descubre cuánto tardarás en llegar a cada hospital.</p>
                </div>
                <div className="feature">
                    📊 <strong>Consultar ocupación en urgencias</strong>
                    <p>Conoce el estado actual del área de urgencias para tomar decisiones informadas.</p>
                </div>
                <div className="feature">
                    🕒 <strong>Tiempos de Respuesta Optimizados</strong>
                    <p>La rapidez y eficiencia garantizan tu acceso inmediato a servicios médicos.</p>
                </div>
                <div className="feature">
                    🔒 <strong>Seguridad y Privacidad</strong>
                    <p>Tu información personal y médica se maneja con altos estándares de privacidad.</p>
                </div>
            </div>

            <h2>🛠️ Tecnología al servicio de tu salud</h2>
            <p>
                Nuestra herramienta combina mapas interactivos, datos en tiempo real y un sistema intuitivo que prioriza tus necesidades,
                ayudándote a encontrar soluciones médicas en situaciones críticas.
            </p>

            <div className="cuenta">
        
                <button onClick={login}>Empieza ahora</button>
            </div>
        </div>
    );
};

export default SobreNosotros;
