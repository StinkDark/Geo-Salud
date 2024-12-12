'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ref, set, get } from "firebase/database";
import { database } from "@/config/firebase";
import "./page.css";

const RegistroHospital = () => {
    const [nombreHospital, setNombreHospital] = useState("");
    const [direccion, setDireccion] = useState("");
    const [nit, setNit] = useState("");
    const [responsableNombre, setResponsableNombre] = useState("");
    const [responsableDocumento, setResponsableDocumento] = useState("");
    const [cargo, setCargo] = useState("");
    const [capacidadUrgencias, setCapacidadUrgencias] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [eps, setEps] = useState([]);
    const [nuevaEps, setNuevaEps] = useState("");
    const router = useRouter();

    const onChangeCapacidad = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setCapacidadUrgencias(value);
        }
    };

    const agregarEps = () => {
        if (nuevaEps && !eps.includes(nuevaEps)) {
            setEps([...eps, nuevaEps]);
            setNuevaEps("");
        }
    };

    const eliminarEps = (index) => {
        const newEps = eps.slice();
        newEps.splice(index, 1);
        setEps(newEps);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hospitalData = {
            nombre: nombreHospital,
            direccion,
            nit,
            capacidadUrgencias,
            responsable: {
                nombre: responsableNombre,
                documento: responsableDocumento,
                cargo,
                contrasena
            },
            epsAtendidas: eps
        };

        try {
            // Validar si el hospital ya existe en Firebase
            const refHospital = ref(database, `hospitales/${nit}`);
            const snapshot = await get(refHospital);

            if (snapshot.exists()) {
                alert("Ya existe un hospital con este NIT.");
                return;
            }

            await set(refHospital, hospitalData);
            alert("Hospital registrado exitosamente.");
            router.push("/Ingreso/login/hospital");
        } catch (error) {
            console.error("Error al registrar el hospital:", error);
            alert("Hubo un error al registrar el hospital.");
        }
    };

    return (
        <div className="form-container">
            <h2>Registro del Hospital</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del hospital"
                    value={nombreHospital}
                    onChange={(e) => setNombreHospital(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="NIT"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nombre del Responsable"
                    value={responsableNombre}
                    onChange={(e) => setResponsableNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Documento del Responsable"
                    value={responsableDocumento}
                    onChange={(e) => setResponsableDocumento(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Cargo del Responsable"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Capacidad Urgencias"
                    value={capacidadUrgencias}
                    onChange={onChangeCapacidad}
                    min="0"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                
                {/* Añadir EPS */}
                <div>
                    <input
                        type="text"
                        placeholder="Nueva EPS"
                        value={nuevaEps}
                        onChange={(e) => setNuevaEps(e.target.value)}
                    />
                    <button type="button" onClick={agregarEps}>
                        ➕ Añadir EPS
                    </button>

                    {eps.length > 0 && (
                        <div>
                            {eps.map((item, idx) => (
                                <span key={idx}>{item}
                                    <button type="button" onClick={() => eliminarEps(idx)}>❌</button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit">Registrar Hospital</button>
            </form>
        </div>
    );
};

export default RegistroHospital;
