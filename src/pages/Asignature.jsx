import React, { useContext, useEffect, useState } from "react";
import { appContext } from '../context/appContext'
import { Select, Input, Button } from 'antd'
import { aviableStudentsList, asignIntoAsignature, getAsignatureList } from "../client/client";

const Asignature = () => {

    const {selectedSection, selectedAsignature, messageApi} = useContext(appContext)
    const [assignedList, setAsignedList] = useState([])
    const [aviableShowList, setAviableShowList] = useState([])

    useEffect(() => {
        getAsignedlist()
    }, [])

    const searchStudents = async (e) => {
        if(e != ''){
            const data = await aviableStudentsList(e)
            setAviableShowList(data.data)
        }else{
            setAviableShowList([])
        }
    }

    const asignStudent = async(e) => {
        const data = {
            section: selectedSection,
            asignature: selectedAsignature,
            userId: e.id,
            role: 2
        }

        const res = await asignIntoAsignature(data)
        console.log(res)
        if(res.status == 200){
            messageApi.open({
                type: "success",
                content: res.data
            })
        }else{
            messageApi.open({
                type: "error",
                content: "ah ocurrido un error"
            })
        }
    }

    async function getAsignedlist() {
        const res = await getAsignatureList(selectedSection, selectedAsignature)
        setAsignedList(res.data)
    }

    return(
        <div className="Asignature">
            <h1 className="purple">Materia: {selectedAsignature}, Seccion: {selectedSection}</h1>
            <h2 className="purple">Asignaciones</h2>
            <div className="container">
                <div className="list">
                    <h3>Asignados a la seccion</h3>
                    <Select placeholder='Asigne a un profesor' showSearch/>
                    {assignedList.map(item => (
                        <div className="listItem">
                            <p>{item.name} {item.lastname} - {item.identification}</p>
                            <Button variant="solid" color="danger" onClick={() => asignStudent(item)}>Retirar</Button>
                        </div>
                    ))}
                </div>

                <div className="list">  
                    <h3>Alumnos disponibles</h3>
                    <Input.Search placeholder='Busque nombre o cedula' onSearch={(e => searchStudents(e))}/>
                    {aviableShowList.map(item => (
                        <div className="listItem">
                            <p>{item.name} {item.lastname} - {item.identification}</p>
                            <Button variant="solid" color="primary" onClick={() => asignStudent(item)}>Asignar</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 

export default Asignature;