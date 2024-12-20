'use client';

import { useRouter } from "next/navigation";


const SobreNosotros = () => {
  const router = useRouter();

  // Función para redireccionar al login del usuario
  const login = () => {
    router.push('/Ingreso/login/usuario');
  };

  return (
    <div className=" animate-fadeIn duration-1500 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 py-6 bg-white">
      
      {/* Contenedor principal que envuelve todo el contenido con estilo */}
      <div className="w-full max-w-3xl mx-auto p-5 border-2 border-gray-300 rounded-lg shadow-md">

        {/* Encabezado principal del componente */}
        <h1 className="text-3xl sm:text-3xl font-bold text-center text-cyan-600 mb-4">
          🏥 Sobre GeoSalud
        </h1>

        {/* Descripción breve del propósito del proyecto */}
        <p className="text-center mb-6 text-sm sm:text-lg text-gray-700">
          📌 Simplificamos tu acceso a la atención médica de emergencia.
        </p>

        {/* Sección '¿Quiénes Somos?' */}
        <h2 className="font-bold text-xl sm:text-2xl text-cyan-600 mb-2 text-center">👥 ¿Quiénes Somos?</h2>
        <article className="mb-10 max-w-3xl text-center">
          <p className="text-xs sm:text-base text-gray-600">
            En GeoSalud, nuestra misión es conectar a las personas con los servicios de emergencia más cercanos de manera efectiva.
            Sabemos que en momentos de urgencia, el tiempo y la información correcta pueden marcar la diferencia.
          </p>
        </article>

        {/* Sección '¿Qué te ofrecemos?' con una lista de servicios */}
        <h2 className="font-bold text-xl sm:text-2xl text-cyan-600 mb-4 text-center">📜 ¿Qué te ofrecemos?</h2>

        {/* Contenedor para los servicios ofrecidos */}
        <div className="space-y-6 w-full max-w-4xl">
          {/* Servicio 1: Localizar hospitales cercanos */}
          <div className="service-item p-4 border-2 border-gray-300 rounded-lg shadow-md">
            <span className="text-cyan-600 font-semibold">🗺️ Localizar hospitales cercanos</span>
            <p className="text-xs sm:text-sm text-gray-700">Usa tu ubicación para encontrar opciones rápidas y seguras.</p>
          </div>

          {/* Servicio 2: Filtrar según tu EPS */}
          <div className="service-item p-4 border-2 border-gray-300 rounded-lg shadow-md">
            <span className="text-cyan-600 font-semibold">🏥 Filtrar según tu EPS</span>
            <p className="text-xs sm:text-sm text-gray-700">Asegúrate de recibir atención en hospitales compatibles con tu cobertura.</p>
          </div>

          {/* Servicio 3: Ver tiempos de llegada estimados */}
          <div className="service-item p-4 border-2 border-gray-300 rounded-lg shadow-md">
            <span className="text-cyan-600 font-semibold">🚗 Ver tiempos de llegada estimados</span>
            <p className="text-xs sm:text-sm text-gray-700">Descubre cuánto tardarás en llegar a cada hospital.</p>
          </div>

          {/* Servicio 4: Consultar ocupación en urgencias */}
          <div className="service-item p-4 border-2 border-gray-300 rounded-lg shadow-md">
            <span className="text-cyan-600 font-semibold">📊 Consultar ocupación en urgencias</span>
            <p className="text-xs sm:text-sm text-gray-700">Conoce el estado actual del área de urgencias para tomar decisiones informadas.</p>
          </div>

          {/* Servicio 5: Tiempos de Respuesta Optimizados */}
          <div className="service-item p-4 border-2 border-gray-300 rounded-lg shadow-md">
            <span className="text-cyan-600 font-semibold">🕒 Tiempos de Respuesta Optimizados</span>
            <p className="text-xs sm:text-sm text-gray-700">La rapidez y eficiencia garantizan tu acceso inmediato a servicios médicos.</p>
          </div>

          {/* Servicio 6: Seguridad y Privacidad */}
          <div className="service-item p-5 border-2 border-gray-300 rounded-lg shadow-md">
            <span className="text-cyan-600 font-semibold">🔒 Seguridad y Privacidad</span>
            <p className="text-xs sm:text-sm text-gray-700">Tu información personal y médica se maneja con altos estándares de privacidad.</p>
          </div>
        </div>

        {/* Sección 'Tecnología al servicio de tu salud' */}
        <div className="service-item p-5 border-2 border-gray-300 rounded-lg shadow-md mt-8">
          <h2 className="text-cyan-600 font-semibold">🛠️ Tecnología al servicio de tu salud</h2>
          <p className="text-xs sm:text-sm text-gray-700">
            Nuestra herramienta combina mapas interactivos, datos en tiempo real y un sistema intuitivo que prioriza tus necesidades,
            ayudándote a encontrar soluciones médicas en situaciones críticas.
          </p>
        </div>

        {/* Botón para iniciar sesión */}
        <div className="flex justify-center w-full mt-8">
          <button
            onClick={login}
            className="bg-cyan-600 text-white font-bold text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Empieza ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
