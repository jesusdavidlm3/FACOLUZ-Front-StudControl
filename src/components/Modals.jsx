import React, { useContext, useState } from 'react'
import { Modal, Input, Form, Select, Button, Space, InputNumber } from "antd";
import * as lists from '../context/lists'
import { appContext } from '../context/appContext';
import { createUser } from '../client/client'
import { encrypt } from '../functions/hash'

export const CreateStudentModal = ({open, onCancel}) => {
    
    const {messageApi} = useContext(appContext)
    const [loading, setLoading] = useState(false)

    const [idType, setIdType] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')

    const submitNewStudent = async() => {
        setLoading(true)
        const data = {
            idType: idType,
            idNumber: `${idNumber}`,
            name: name,
            lastname: lastname,
            password: await encrypt(password),
            userType: 2
        }
        const res = await createUser(data)
        if(res.status == 200){
            setLoading(false)
            messageApi.open({
                type: 'success',
                content: 'Estudiante creado con exito'
            })
            onCancel()
        }else{
            setLoading(false)
            messageApi.open({
                type: 'error',
                content: res.response.data
            })
        }
    }

    return(
        <Modal
            destroyOnClose
            title='Registrar Estudiante'
            open={open}
            onCancel={onCancel}
            footer={[
                <Button onClick={onCancel} disabled={loading} variant="text" color="danger">Cancelar</Button>,
                <Button onClick={submitNewStudent} disabled={loading} type="primary">Guardar</Button>
            ]}
        >
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
				<Space.Compact style={{width: '100%'}}>
					<Select disabled={loading} onChange={(e) => setIdType(e)} placeholder='Tipo de identificacion' style={{width: '50%'}} options={lists.identificationList.slice(0, 2)}/>
					<InputNumber disabled={loading} onChange={(e) => setIdNumber(e)} placeholder='Numero' style={{width: '50%'}}/>
				</Space.Compact>
				<Space.Compact style={{width: '100%'}}>
					<Input disabled={loading} onChange={(e) => setName(e.target.value)} placeholder='Nombre' style={{width: '50%'}}/>
					<Input disabled={loading} onChange={(e) => setLastname(e.target.value)} placeholder='Apellido' style={{width: '50%'}}/>
				</Space.Compact>
				
				<Input.Password disabled={loading} placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)}/>
			</div>
        </Modal>
    )
}