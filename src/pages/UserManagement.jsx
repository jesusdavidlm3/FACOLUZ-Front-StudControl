import React, { useState, useContext, useEffect } from 'react'
import { appContext } from '../context/appContext';
import { Input, Button, Divider, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DeleteStudent, ReactivateStudent } from '../components/Modals';
import { searchByNameOrId } from '../client/client';
import Pagination from "../components/Pagination"

const UserManagement = () => {

    const { messageApi, contextHolder } = useContext(appContext)
    const [reactivateModal, setReactivateModal] = useState(false)
    const [deleteStudentModal, setDeleteStudentModal] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState("")
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        getContent()
    }, [page])

    async function getContent(){
        const searchInput = document.getElementById("searchInput").value
        if(!searchInput == ""){
            const res = await searchByNameOrId(searchInput, page)
            if(res.status == 200){
                if(res.data.length < 1){
                    messageApi.open({
                        type: 'error',
                        content: 'No se han encontrado resultados'
                    })
                }else{
                    setList(res.data)
                }
            }else{
                console.log(res)
                messageApi.open({
                    type: 'error',
                    content: res.data ? (res.data):("ah ocurrido un error al buscar")
                })
            }
        }
    }

    return(
        <div className="UserManagement">
            {contextHolder}
            <Divider><h1>Listado de estudiantes</h1></Divider>
            <div className="searchBar">
                <Input.Search onSearch={() => getContent()} id='searchInput' placeholder='Buscar por cedula o nombre'/>
                <Button variant='solid' color='primary' onClick={() => setReactivateModal(true)}>Reactivar usuario</Button>
            </div>
            <List bordered className='mainList'>
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

            <Pagination page={page} setPage={setPage}/>

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