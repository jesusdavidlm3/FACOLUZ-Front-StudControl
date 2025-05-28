import React, { useState, useContext } from 'react'
import { appContext } from '../context/appContext';
import { Input, Button, Divider, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DeleteStudent, ReactivateStudent } from '../components/Modals';
import { searchByNameOrId } from '../client/client';

const UserManagement = () => {

    const { messageApi, contextHolder } = useContext(appContext)
    const [reactivateModal, setReactivateModal] = useState(false)
    const [deleteStudentModal, setDeleteStudentModal] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState("")
    const [list, setList] = useState([])

    const updateList = async(e) => {
        console.log(e)
        const res = await searchByNameOrId(e)
        if(res.status == 200){
            if(res.data.length < 1){
                messageApi.open({
                    type: "error",
                    content: "No se han encontrado resultados"
                })
            }else{
                setList(res.data)
            }
        }else{
            console.log(res)
            messageApi.open({
                type: "error",
                content: res.data ? (res.data):("ah ocurrido un error al buscar")
            })
        }
    }

    return(
        <div className="UserManagement">
            {contextHolder}
            <div className="searchBar">
                <Input.Search onSearch={e => updateList(e)} placeholder='Buscar por cedula o nombre'/>
                <Button variant='solid' color='primary' onClick={() => setReactivateModal(true)}>Reactivar usuario</Button>
            </div>
            <Divider>Listado de estudiantes</Divider>
            <List bordered>
                { list.map(item => (<List.Item style={{display: "flex", justifyContent: "space-between"}}>
                    {item.name} {item.lastname}
                    <Button
                        shape='circle'
                        color='danger'
                        variant='solid'
                        icon={<DeleteOutlined/>}
                        onClick={() => {setSelectedStudent(item.id); setDeleteStudentModal(true)}}
                    />
                </List.Item>)) }
            </List>

            <DeleteStudent
                open={deleteStudentModal}
                onCancel={() => setDeleteStudentModal(false)}
                studentId={selectedStudent}
            />
            <ReactivateStudent
                open={reactivateModal}
                onCancel={() => setReactivateModal(false)}
            />
        </div>
    )
}

export default UserManagement;