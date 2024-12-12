'use client';
import { useState, useEffect } from "react";
import { ref, get, update } from "firebase/database";
import { database } from "@/config/firebase";
import { useRouter } from "next/navigation";

const InicioHospital = () => {
    const [hospitalData, setHospitalData] = useState({});
    const [capacidadUrgencias, setCapacidadUrgencias] = useState("");
    const [editableCapacidad, setEditableCapacidad] = useState("");
    const router = useRouter();

    const nombreHospital = sessionStorage.getItem("nombreHospital");

    useEffect(() => {
        if (nombreHospital) {
            const obtenerDatos = async () => {
                try {
                    const refHospital = ref(database, `hospitales/${nombreHospital}`);
                    const snapshot = await get(refHospital);

                    if (snapshot.exists()) {
                        const datos = snapshot.val();
                        console.log("Datos del Hospital:", datos);  // Depuración

                        setHospitalData(datos);
                        setCapacidadUrgencias(datos.capacidadUrgencias);
                        setEditableCapacidad(datos.capacidadUrgencias);
                    } else {
                        console.error("No se encontraron datos para el hospital.");
                        alert("No se encontraron datos del hospital.");
                        router.replace("/LoginHospital");
                    }
                } catch (error) {
                    console.error("Error al obtener datos del hospital:", error);
                    alert("Hubo un error al cargar los datos del hospital.");
                }
            };

            obtenerDatos();
        } else {
            console.error("No se encontró el nombre del hospital en sessionStorage.");
            alert("Inicie sesión para obtener acceso al hospital.");
            router.replace("/LoginHospital");
        }
    }, [nombreHospital, router]);

    // Función para actualizar la capacidad en Firebase
    const actualizarCapacidad = async () => {
        try {
            const refHospital = ref(database, `hospitales/${nombreHospital}`);
            await update(refHospital, { capacidadUrgencias: editableCapacidad });
            alert("Capacidad de urgencias actualizada correctamente.");
            setCapacidadUrgencias(editableCapacidad);
        } catch (error) {
            console.error("Error al actualizar la capacidad:", error);
            alert("No se pudo actualizar la capacidad.");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Información del Hospital</h2>

            {/* Muestra información del hospital */}
            {hospitalData.nombre ? (
                <>
                    <div className="info-section">
                        <p><strong>Nombre del Hospital:</strong> {hospitalData.nombre}</p>
                        <p><strong>Dirección:</strong> {hospitalData.direccion}</p>
                        <p><strong>NIT:</strong> {hospitalData.nit}</p>

                        <div>
                            <label>
                                <strong>Capacidad Total en Urgencias:</strong>
                                <input
                                    type="number"
                                    value={editableCapacidad}
                                    onChange={(e) => setEditableCapacidad(e.target.value)}
                                    min="0"
                                />
                                <button onClick={actualizarCapacidad}>
                                    Actualizar
                                </button>
                            </label>
                        </div>

                        <p><strong>Responsable:</strong> {hospitalData.responsable?.nombre}</p>
                        <p><strong>Cédula del Responsable:</strong> {hospitalData.responsable?.documento}</p>
                    </div>
                </>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};

export default InicioHospital;
