import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../context/appContext";
import { getSectionInfo } from "../client/client";
import { routerContext } from "../context/routerContext";

const Section = () => {

    const [asignaturesInfo, setAsignaturesInfo] = useState({})
    const {selectedSection, setSelectedAsignature} = useContext(appContext)
    const {setView} = useContext(routerContext)

    useEffect(() => {
        getSectionData()
    }, [])

    async function getSectionData() {
        const data = await getSectionInfo(selectedSection)
        setAsignaturesInfo(data.data)
    }

    return(
        <div className="Section">
            <h1 className="purple">Materias Disponibles</h1>
            <h2 className="purple">Seccion: {selectedSection}</h2>
            <div className="container">
                <div className="listItem" onClick={() => {setSelectedAsignature("pp3"), setView("Asignature")}}>
                    <h2>Practicas profesionales 3</h2>
                    <h3>Docentes: {asignaturesInfo.teachersListPP3}</h3>
                    <h3>Alumnos: {asignaturesInfo.studentsListPP3}</h3>
                </div>
                <div className="listItem" onClick={() => {setSelectedAsignature("pp4"), setView("Asignature")}}>
                    <h2>Practicas profesionales 4</h2>
                    <h3>Docentes: {asignaturesInfo.teachersListpp4}</h3>
                    <h3>Alumnos: {asignaturesInfo.studentsListpp4}</h3>
                </div>
            </div>
        </div>
    )
}

export default Section;