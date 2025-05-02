import React, { useContext, useState } from "react";
import { appContext } from "../context/appContext";
import { Button } from 'antd'
import { ConfirmClearAllSections } from '../components/Modals'
import { routerContext } from "../context/routerContext";
import LatPanel from "../components/LatPanel";

const Sections = () => {

    const [clearAllSectionsModal, setClearAllSectionsModal] = useState(false)
    const {setView} = useContext(routerContext)
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
            <h1 className="purple">Secciones Disponibles</h1>
            <div className="listContainer">
                {aviableSections.map(item => (
                    <div key={item} className="listItem" onClick={() => {setSelectedSection(item), setView("Section")}}>
                        <h2>{item}</h2>
                    </div>
                ))}
            </div>
            <Button color="danger" variant="solid" onClick={() => setClearAllSectionsModal(true)}> Limpiar secciones </Button>
            <ConfirmClearAllSections onCancel={() => setClearAllSectionsModal(false)} open={clearAllSectionsModal} />
        </div>
    )
}

export default Sections;