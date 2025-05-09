import { Button } from "antd";
import React, { useState } from "react";

const ManageSemester = () => {

    const [condition, setCondition] = useState(false)

    return(
        <div className="ManageSemester">
            { condition ? (<>
                <h1>El semestre actual ya se encuentra en curso, las modificaciones no estan permitidas</h1>
                <Button color="purple" variant="solid" onClick={() => setCondition(!condition)}>Finalizar semestre</Button>
                <h3>Nota: Al finalizar el semestre todas las secciones y asignaciones se vaciaran de forma automatica</h3>
            </>):(<>
                <h1>El semestre actual aun no se encuentra en curso</h1>
                <Button color="purple" variant="solid" onClick={() => setCondition(!condition)}>Iniciar semestre</Button>
                <h3>Nota: Al iniciar el semestre no sera posible realizar modificaciones o asignaciones a las secciones</h3>
            </>) }
        </div>
    )
}

export default ManageSemester;