import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../context/appContext";

const Sections = () => {

    const navigate = useNavigate()
    const {setSelectedSection} = useContext(appContext)

    const aviableSections = [
        "001",
        "002",
        "003",
        "004",
        "005",
        "006"
    ]
    
    return(
        <div className="Sections">
            <h1>Secciones Disponibles</h1>
            <div className="listContainer">
                {aviableSections.map(item => (
                    <div key={item} className="listItem" onClick={() => {setSelectedSection(item), navigate("/home/section")}}>
                        <h2>{item}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sections;