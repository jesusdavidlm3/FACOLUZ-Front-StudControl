import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../context/appContext";
import { Button, Form, List, Select, Tooltip, Divider, message } from 'antd'
import { AssignAstudent, RetireStudent } from '../components/Modals'
import { routerContext } from "../context/routerContext";
import { getAsignatureList } from "../client/client";
import { DeleteOutlined } from '@ant-design/icons'
import { aviableTeachersList, asignTeacher } from '../client/client'

const Sections = () => {

    const [assignStudentModal, setAssignStudentModal] = useState(false)
    const [retireStudentModal, setRetireStudentmodal] = useState(false)

    const [section, setSection] = useState(null)
    const [asignature, setAsignature] = useState(null)
    const [aviableTeachers, setAviableTeachers] = useState([])
    const [currentTeacher, setCurrentteacher] = useState([])
    const [students, setStudents] = useState([])
    const {teachersList, setTeachersList, messageApi, contextHolder, startedPeriod} = useContext(appContext)

    const [selectedStudent, setSelectedStudent] = useState('')

    const aviableSections = ["001","002","003","004","005","006"]
    const aviableAsignatures = ["PP3", "PP4"]
    
    useEffect(() => {
        getTeacherslist()
    }, [])

    const getTeacherslist = async() => {
        const res = await aviableTeachersList()
        console.log(res)
        if(res.status == 200){
            setTeachersList(res.data.map(item => ({label: `${item.name} ${item.lastname}`, value: item.id})))
        }else{
            messageApi.open({
                type: 'error',
                message: 'error al obtener lista de profesores'
            })
        }
    }

    const refreshInfo = async (asignature, section) => {
        if(!((asignature == null) || (section == null))){
            const res = await getAsignatureList(section, asignature)
            setStudents(res.data.filter(item => item.type != 1))
            setCurrentteacher(res.data.find(item => item.type == 1).id)
        }
    }

    const sendAsignTeacher = async(e) => {
        if(!((asignature == null) || (section == null))){
            const data = {
                section: section,
                asignature: asignature,
                userId: e,
                role: 1
            }
            const res = await asignTeacher(data)
            console.log(res)
            if(res.status == 200){
                setCurrentteacher(e)
                messageApi.open({
                    type: "success",
                    content: "Profesor asignado"
                })
            }else{
                messageApi.open({
                    type: "error",
                    content: "Ah ocurrido un error al asignar al profesor"
                })
            }
        }else{
            messageApi.open({
                type: "error",
                content: "Debe seleccionar materia y seccion para asignar"
            })
        }
    }

    return(
        <div className="Sections">
            {contextHolder}
            <Form className="selectors" layout="inline" style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                <Form.Item label="Seccion: " style={{width: '20vw'}}>
                    <Select 
                        options={aviableSections.map(item => ({label: item, value: item}))}
                        onChange={(e) => {setSection(e); refreshInfo(asignature, e)}}
                    />
                </Form.Item>
                <Form.Item label="Asignatura: " style={{width: '20vw'}}>
                    <Select
                        options={aviableAsignatures.map(item => ({label: item, value: item}))}
                        onChange={(e) => {setAsignature(e); refreshInfo(e, section)}}
                    />
                </Form.Item>
            </Form>
            <Form layout="inline">
                <Form.Item label="Profesor: ">
                    <Select
                        value={currentTeacher}
                        placeholder='Seleccione a un profesor'
                        showSearch
                        onChange={e => sendAsignTeacher(e)}
                        options={teachersList}
                        disabled={asignature == null || section == null || startedPeriod}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        variant="solid"
                        color="purple"
                        onClick={() => setAssignStudentModal(true)}
                        disabled={asignature == null || section == null || startedPeriod}
                    >
                        Agregar alumno
                    </Button>
                </Form.Item>
            </Form>

            <Divider>Alumnos</Divider>

            <List bordered>
                {students.map(item => (
                    <List.Item style={{display: "flex", justifyContent: "space-between"}}>
                        {item.name} {item.lastname}
                        <Tooltip title={startedPeriod ? ("Inscripcion cerrada, no se puede retirar"):("retirar")}>
                            <Button
                                disabled={startedPeriod}
                                variant="solid"
                                color="danger"
                                icon={<DeleteOutlined />}
                                shape="circle"
                                onClick={() => {setRetireStudentmodal(true); setSelectedStudent(item.id)}}
                            />
                        </Tooltip>
                    </List.Item>                
                ))}
            </List>

            <AssignAstudent
                assignature={asignature}
                onCancel={() => setAssignStudentModal(false)}
                open={assignStudentModal}
                section={section}
                update={() => refreshInfo(asignature,section)}
            />

            <RetireStudent
                open={retireStudentModal}
                onCancel={() => setRetireStudentmodal(false)}
                studentId={selectedStudent}
                update={() => refreshInfo(asignature,section)}
            />
        </div>
    )
}

export default Sections;