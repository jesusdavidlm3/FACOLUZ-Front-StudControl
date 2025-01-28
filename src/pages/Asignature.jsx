import React, { useContext } from "react";
import { appContext } from '../context/appContext'

const Asignature = () => {

    const {selectedSection, selectedAsignature} = useContext(appContext)

    return(
        <div className="Asignature">
            <h1>Materia: {selectedAsignature}, Seccion: {selectedSection}</h1>
        </div>
    )
} 

export default Asignature;