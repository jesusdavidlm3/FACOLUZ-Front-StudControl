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
        <div className="CheckInfo">
            <h1 className="purple">Consultar informacion</h1>
            <Input.Search size="large" placeholder="Ingrese cedula a consultar" id="searchParam" onSearch={e => getInfo(e)}/>

            { info != null && (info.type == 1 || info.type == 2) ? (
                <>
                    <h2 className="purple">Cedula: {info.identification} </h2>
                    <h2 className="purple">Nombre: {info.name} {info.lastname} </h2>
                    <h2 className="purple">
                        Es {info.type == 1 && <>profesor</>}{info.type == 2 && <>estudiante</>} en la seccion {info.section} de {info.asignature}
                    </h2>
                </> 
            ):(
                <>
                    <h1 className="purple">No hay informacion para mostrar</h1>
                </>
            ) }
        </div>
    )
}

export default CheckInfo;