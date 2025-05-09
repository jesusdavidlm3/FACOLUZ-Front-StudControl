import React, { useContext, useState } from 'react'
import { Modal, Input, Form, Select, Button, Space, InputNumber, message } from "antd";
import * as lists from '../context/lists'
import { appContext } from '../context/appContext';
import { createUser, clearAllAsignatures, verifyStudentForAssign, asignIntoAsignature } from '../client/client'
import { encrypt } from '../functions/hash'
import { routerContext } from '../context/routerContext';

export const LogoutModal = ({open, onCancel}) => {

	const {setUserData, setLogged} = useContext(appContext)
	const {setView} = useContext(routerContext)

	const logout = () => {
		setUserData('')
		setLogged(false)
		setView('Login')
	}

	return(
		<Modal
			title='Cerrar sesion?'
			open={open}
			closable={false}
			footer={[
				<Button variant='solid' color='danger' onClick={logout} >Cerrar sesion</Button>,
				<Button onClick={onCancel} variant='text' >Cancelar</Button>
			]}
		>
		</Modal>
	)
}

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

export const ConfirmClearAllSections = ({open, onCancel}) => {

    const { messageApi } = useContext(appContext)
    const [safeWord, setSafeWord] = useState("")

    async function sendClear() {
        const res = await clearAllAsignatures()
        if(res.status == 200){
            messageApi.open({
                type: "success",
                content: "Secciones limpiadas"
            })
            onCancel()
        }else{
            messageApi.open({
                type: "error",
                content: "ah ocurrido un error"
            })
        }
    }

    return(
        <Modal
            open={open}
            title={`Escriba la palabra "borrar" para confirmar`}
            destroyOnClose
            onCancel={onCancel}
            footer={[
                <Button color='primary' variant='solid' disabled={safeWord != "borrar"} onClick={() => sendClear()}>Aceptar</Button>,
                <Button color='danger' variant='solid' onClick={onCancel}>Cancelar</Button>
            ]}
        >
            <Input onChange={e => setSafeWord(e.target.value)}></Input>
        </Modal>
    )
}

export const AssignAstudent = ({open, onCancel, assignature, section}) => {

    const [verification, setVerification] = useState(false)
    const [disable, setDisable] = useState(false)
    
    const verifyData = async(e) => {
        const res = await verifyStudentForAssign(e)
        if(res.data[0]){
            setVerification(res.data[0])
            setDisable(true)
        }
    }

    const confirmAssign = async() => {
        const idField = document.getElementById("idField").value
        const data = {
                section: section,
                asignature: assignature,
                userId: idField,
                role: 2
        }
        const res = await asignIntoAsignature(data)
        if(res.status == 200){
            onCancel()
            setVerification(false)
        }
        console.log(res)
    }

    return(
        <Modal
            open = {open}
            onCancel={() => {onCancel(); setVerification(false)}}
            destroyOnClose

            footer={[
                <Button color='primary' variant='solid' onClick={() => confirmAssign()} disabled={!disable}>inscribir</Button>,
                <Button color='danger' variant='solid' onClick={onCancel}>Cancelar</Button>
            ]}
        >
            <Input.Search placeholder='Cedula del estudiante' onSearch={e => verifyData(e)} disabled={disable} id='idField'/>
            { verification && <>
                <h3>Nombre: {verification.name} {verification.lastname}</h3>
            </> }
        </Modal>
    )
}