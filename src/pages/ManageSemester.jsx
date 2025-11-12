import { Button, Divider } from "antd";
import React, { useContext, useState } from "react";
import { appContext } from "../context/appContext";
import { ManagePeriodModal } from '../components/Modals'

const ManageSemester = () => {

    const {startedPeriod} = useContext(appContext)
    const [modalOpen, setModalOpen] = useState(false)

    return(
        <div className="ManageSemester">
            <Divider className="PageTitle"><h1>Manejo del periodo academico</h1></Divider>
            
            <div className="Content">
                { startedPeriod ? (<>
                    <h2>El semestre actual ya se encuentra en curso, las modificaciones no estan permitidas</h2>
                    <Button color="purple" variant="solid" onClick={() => setModalOpen(true)}>Finalizar semestre</Button>
                    <h3>Nota: Al finalizar el semestre todas las secciones y asignaciones se vaciaran de forma automatica</h3>
                </>):(<>
                    <h2>El semestre actual aun no se encuentra en curso</h2>
                    <Button color="purple" variant="solid" onClick={() => setModalOpen(true)}>Iniciar semestre</Button>
                    <h3>Nota: Al iniciar el semestre no sera posible realizar modificaciones o asignaciones a las secciones</h3>
                </>) }
            </div>

            <div className="EmptyFooter"/>

            <ManagePeriodModal 
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
            />
        </div>
    )
}

export default ManageSemester;