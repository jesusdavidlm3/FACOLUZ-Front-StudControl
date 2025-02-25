import React, { useContext, useEffect, useState } from "react";
import { appContext } from '../context/appContext'
import { Select, Input, Button, Form } from 'antd'
import { aviableStudentsList, asignIntoAsignature, getAsignatureList, removeFromAsignature, aviableTeachersList, asignTeacher } from "../client/client";

const Asignature = () => {

    const {selectedSection, selectedAsignature, messageApi, contextHolder} = useContext(appContext)
    const [assignedList, setAsignedList] = useState([])
    const [currentTeacher, setCurrentteacher] = useState()
    const [aviableShowList, setAviableShowList] = useState([])
    const [aviableTeachers, setAviableTeachers] = useState([])

    useEffect(() => {
        getAsignedlist()
        getAviableTeacherlist()
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
            getAsignedlist()
            messageApi.success(res.data)
        }else{
            messageApi.error("ah ocurrido un error")
        }
    }

    const removeStudent = async(e) => {
        const res = await removeFromAsignature(e.id)
        if(res.status == 200){
            getAsignedlist()
            messageApi.success("Retirado con exito")
        }else{
            messageApi.error("ah ocurrido un error")
        }
    }

    async function getAsignedlist() {
        const res = await getAsignatureList(selectedSection, selectedAsignature)
        const teacher = res.data.find(item => item.role == 1)
        const students = res.data.filter(item => item.role == 2)
        setCurrentteacher(teacher.id)
        setAsignedList(students)
    }

    async function getAviableTeacherlist() {
        const res = await aviableTeachersList()
        const data = res.data.map(item => ({
            value: item.id,
            label: `${item.name} ${item.lastname}`
        }))
        setAviableTeachers(data)
    }

    async function sendAsignTeacher(e){
        const data = {
            section: selectedSection,
            asignature: selectedAsignature,
            userId: e,
            role: 1
        }

        const res = await asignTeacher(data)
        if(res.status == 200){
            messageApi.success("Docente asignado")
        }
        getAsignedlist()
    }

    return(
        <div className="Asignature">
            {contextHolder}
            <h1 className="purple">Materia: {selectedAsignature}, Seccion: {selectedSection}</h1>
            <h2 className="purple">Asignaciones</h2>
            <div className="container">
                <div className="list">
                    <h3>Asignados a la seccion</h3>
                    <Form>
                        <Form.Item label="Profesor: ">
                            <Select value={currentTeacher} placeholder='Seleccione a un profesor' showSearch options={aviableTeachers} onChange={e => sendAsignTeacher(e)}/>
                        </Form.Item>
                    </Form>
                    {assignedList.map(item => (
                        <div className="listItem">
                            <p>{item.name} {item.lastname} - {item.identification}</p>
                            <Button variant="solid" color="danger" onClick={() => removeStudent(item)}>Retirar</Button>
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