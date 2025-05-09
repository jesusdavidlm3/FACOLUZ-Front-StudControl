import React, { useContext, useState } from "react";
import { appContext } from "../context/appContext";
import { Button, Form, List, Select, Tooltip, Divider } from 'antd'
import { AssignAstudent } from '../components/Modals'
import { routerContext } from "../context/routerContext";
import LatPanel from "../components/LatPanel";
import { getAsignatureList } from "../client/client";
import { DeleteOutlined } from '@ant-design/icons'

const Sections = () => {

    const [section, setSection] = useState(null)
    const [asignature, setAsignature] = useState(null)
    const [aviableTeachers, setAviableTeachers] = useState([])
    const [currentTeacher, setCurrentteacher] = useState([])
    const [students, setStudents] = useState([])
    const [assignStudentModal, setAssignStudentModal] = useState(false)

    const aviableSections = ["001","002","003","004","005","006"]
    const aviableAsignatures = ["PP3", "PP4"]
    
    const refreshInfo = async (asignature, section) => {
        if(!((asignature == null) || (section == null))){
            const res = await getAsignatureList(section, asignature)
            setStudents(res.data)
        }
    }

    return(
        <div className="Sections">
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
                    <Select value={currentTeacher} placeholder='Seleccione a un profesor' showSearch options={aviableTeachers} onChange={e => sendAsignTeacher(e)}/>
                </Form.Item>
                <Form.Item>
                    <Button variant="solid" color="purple" onClick={() => setAssignStudentModal(true)} >Agregar alumno</Button>
                </Form.Item>
            </Form>

            <Divider>Alumnos</Divider>

            <List bordered>
                {students.map(item => (
                    <List.Item style={{display: "flex", justifyContent: "space-between"}}>
                        {item.name} {item.lastname}
                        <Tooltip title="Retirar">
                            <Button variant="solid" color="danger" icon={<DeleteOutlined />} shape="circle"/>
                        </Tooltip>
                    </List.Item>                
                ))}
            </List>

            <AssignAstudent
                assignature={asignature}
                onCancel={() => setAssignStudentModal(false)}
                open={assignStudentModal}
                section={section}
            />
        </div>
    )
}

export default Sections;