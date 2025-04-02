import React, { useState } from "react";
import { Input } from "antd";
import { getInfoByIdentification } from '../client/client'

const CheckInfo = () => {

    const [info, setInfo] = useState(null)

    const getInfo = async(e) => {
        const res = await getInfoByIdentification(e)
        console.log(res.data[0])
        setInfo(res.data[0])
    }

    return(
        <div className="CheckAsign">
            <h1 className="purple">Consultar informacion</h1>
            <Input.Search size="large" placeholder="Ingrese cedula a consultar" id="searchParam" onSearch={e => getInfo(e)}/>

            { info != null && (info.type == 1 || info.type == 2) ? (
                <div className="infoContainer">
                    <h1>Informacion del {info.type == 1 && <>docente</>}{info.type == 2 && <>estudiante</>}</h1>
                    <h2>Cedula: {info.id} </h2>
                    <h2>Nombre: {info.name} {info.lastname} </h2>
                    <h2>
                        Es {info.type == 1 && <>profesor</>}{info.type == 2 && <>estudiante</>} en la seccion {info.section} de {info.asignature}
                    </h2>
                </div> 
            ):(
                <div className="infoContainer">
                    <h1>No hay informacion para mostrar</h1>
                </div>
            ) }
        </div>
    )
}

export default CheckInfo;