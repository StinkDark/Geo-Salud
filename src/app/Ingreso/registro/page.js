'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { get, set } from "firebase/database";
import { database } from "@/config/firebase";
import Tooltip from 'react-tooltip';
import "./page.css";

const RegistroHospital = () => {
    const [nombreHospital, setNombreHospital] = useState("");
    const [direccion, setDireccion] = useState("");
    const [nit, setNit] = useState("");
    const [responsableNombre, setResponsableNombre] = useState("");
    const [responsableDocumento, setResponsableDocumento] = useState("");
    const [cargo, setCargo] = useState("");
    const [eps, setEps] = useState([]);
    const [nuevaEps, setNuevaEps] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hospitalData = {
            nombre: nombreHospital,
            direccion,
            nit,
            responsable: {
                nombre: responsableNombre,
                documento: responsableDocumento,
                cargo
            },
            epsAtendidas: eps
        };

        try {
            await set(ref(database, `hospitales/${nit}`), hospitalData);
            alert("Hospital registrado exitosamente.");
            router.push("/Ingreso/login/hospital"); 
        } catch (error) {
            console.error("Error al registrar el hospital:", error);
            alert("Hubo un error al registrar el hospital.");
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
                    title="Ingresa nombre del Hospital"
                />

                <input
                    type="text"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                    title="Ingresa la dirección del hospital"
                />

                <input
                    type="text"
                    placeholder="NIT"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                    required
                    title="Ingresa el NIT del hospital"
                />

                <input
                    type="text"
                    placeholder="Nombre del Responsable"
                    value={responsableNombre}
                    onChange={(e) => setResponsableNombre(e.target.value)}
                    required
                    tittle="Ingrese el nombrer de la persona encargada del hospital"
                />

                <input
                    type="text"
                    placeholder="Documento del Responsable"
                    value={responsableDocumento}
                    onChange={(e) => setResponsableDocumento(e.target.value)}
                    required
                   tittle="Ingrese ID del encargado"
                />

                <input
                    type="text"
                    placeholder="Cargo del Responsable"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    required
                     tittle="Ingrese cargo del representarte"
                />

                {/* Tooltip y añadir EPS */}
                <div className="eps-section">
                    <input
                        type="text"
                        placeholder="Nombre de EPS"
                        value={nuevaEps}
                        onChange={(e) => setNuevaEps(e.target.value)}
                        title="Añade las eps que son atendidas en el hospital"
                    />
                    <button type="button" onClick={agregarEps} title="Añadir una EPS al hospital">➕</button>

                    {eps.length > 0 && (
                        <div>
                            <p><strong>EPS Registradas:</strong></p>
                            {eps.map((epsItem, index) => (
                                <span key={index} className="eps-item" title={`Hospital EPS: ${epsItem}`}>
                                    {epsItem}
                                    <button type="button" onClick={() => eliminarEps(index)}>❌</button>
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
