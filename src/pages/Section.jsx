import React, { useContext, useEffect } from "react";
import { appContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Section = () => {

    const {selectedSection, setSelectedAsignature} = useContext(appContext)
    const navigate = useNavigate()

    useEffect(() => {
        getSectionData()
    }, [])

    async function getSectionData() {
        
    }

    return(
        <div className="Section">
            <h1 className="purple">Materias Disponibles</h1>
            <h2>Seccion: {selectedSection}</h2>
            <div className="container">
                <div className="listItem" onClick={() => {setSelectedAsignature("pp3"), navigate("/home/asignature")}}>
                    <h2>Practicas profesionales 3</h2>
                    <h3>Docentes: 0</h3>
                    <h3>Alumnos: 0</h3>
                </div>
                <div className="listItem" onClick={() => {setSelectedAsignature("pp4"), navigate("/home/asignature")}}>
                    <h2>Practicas profesionales 4</h2>
                    <h3>Docentes: 0</h3>
                    <h3>Alumnos: 0</h3>
                </div>
            </div>
        </div>
    )
}

export default Section;