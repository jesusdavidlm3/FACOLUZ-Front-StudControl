import { Button } from "antd";
import React, { useContext, useState } from "react";
import { appContext } from "../context/appContext";
import { ManagePeriodModal } from '../components/Modals'

const ManageSemester = () => {

    const {startedPeriod} = useContext(appContext)
    const [modalOpen, setModalOpen] = useState(false)

    return(
        <div className="ManageSemester">
            { startedPeriod ? (<>
                <h1>El semestre actual ya se encuentra en curso, las modificaciones no estan permitidas</h1>
                <Button color="purple" variant="solid" onClick={() => setModalOpen(true)}>Finalizar semestre</Button>
                <h3>Nota: Al finalizar el semestre todas las secciones y asignaciones se vaciaran de forma automatica</h3>
            </>):(<>
                <h1>El semestre actual aun no se encuentra en curso</h1>
                <Button color="purple" variant="solid" onClick={() => setModalOpen(true)}>Iniciar semestre</Button>
                <h3>Nota: Al iniciar el semestre no sera posible realizar modificaciones o asignaciones a las secciones</h3>
            </>) }

            <ManagePeriodModal 
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
            />
        </div>
    )
}

export default ManageSemester;