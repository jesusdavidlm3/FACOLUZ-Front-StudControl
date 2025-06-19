import React, { useContext, useState } from 'react'
import { Modal, Input, Form, Select, Button, Space, InputNumber, message } from "antd";
import * as lists from '../context/lists'
import { appContext } from '../context/appContext';
import {
    createUser, removeFromAsignature, verifyStudentForAssign, asignIntoAsignature,
    endOrStartPeriod, deleteUser, verifyForReactivate, reactivateUser
} from '../client/client'
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
            id: `${idNumber}`,
            name: name,
            lastname: lastname,
            passwordSHA256: await encrypt(password),
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

export const AssignAstudent = ({open, onCancel, assignature, section, update}) => {

    const [verification, setVerification] = useState(false)
    const [disable, setDisable] = useState(false)
    const {messageApi} = useContext(appContext)
    
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
            messageApi.open({
                type: 'success',
                content: res.data
            })
            update()
            setDisable(false)
            onCancel()
        }
    }

    return(
        <Modal
            open = {open}
            onCancel={() => {onCancel(); setVerification(false)}}
            destroyOnClose
            closable={false}

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

export const ManagePeriodModal = ({open, onCancel}) => {

    const {startedPeriod, setStartedPeriod, messageApi, contextHolder} = useContext(appContext)
    const send = async() => {
        const res = await endOrStartPeriod()
        console.log(res)
        if(res.status == 200){
            messageApi.open({
                type: "success",
                content: res.data
            })
            setStartedPeriod(!startedPeriod)
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
            title={startedPeriod ? (<>Abrir inscripciones?</>):(<>Cerrar inscripciones?</>)}
            open={open}
            onCancel={onCancel}
            closable={false}
            footer={[
                <Button color='primary' variant='solid' onClick={send}>{startedPeriod ? (<>Finalizar periodo</>):(<>Comenzar Periodo</>)}</Button>,
                <Button color='danger' variant='solid' onClick={onCancel}>Cancelar</Button>
            ]}
        >
            {contextHolder}
            {startedPeriod ? (<>
                <h4>Nota: Al abrir inscripciones se eliminaran todas las asignaciones actuales</h4>            
            </>):(<>
                <h4>Nota: al cerrar inscripciones no podra hacer modificaciones a las secciones</h4>
            </>)}
        </Modal>
    )
}

export const RetireStudent = ({open, onCancel, studentId, update}) => {

    const {messageApi, contextHolder} = useContext(appContext)

    const submitRetire = async() => {
        const res = await removeFromAsignature(studentId)
        if(res.status == 200){
            messageApi.open({
                type: "success",
                content: "Retirado con exito"
            })
            update()
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
            title="Retirar de la seccion?"
            footer={[
                <Button variant="solid" color="primary" onClick={submitRetire}>Retirar</Button>,
                <Button variant="solid" color="danger" onClick={onCancel}>Cancelar</Button>
            ]}
        >
            {contextHolder}
        </Modal>
    )
}

export const DeleteStudent = ({open, onCancel, studentId}) => {

    const {messageApi, contextHolder} = useContext(appContext)

    const confirmDelete = async() => {
        const res = await deleteUser(studentId)
        if(res.status == 200){
            messageApi.open({
                type: "success",
                content: "Desactivado con exito"
            })
            update()
            onCancel()
        }else{
            messageApi.open({
                type: "success",
                content: "ah ocurrido un error"
            })
        }
    }

    return(
        <Modal
            open={open}
            onCancel={onCancel}
            closable={false}
            title="Desactivar usuario del estudiante?"
            footer={[
                <Button variant='solid' color='danger' onClick={confirmDelete}>Desactivar</Button>,
                <Button variant='solid' color='primary' onClick={onCancel}>Cancelar</Button>,
            ]}
        >
            {contextHolder}
        </Modal>
    )
}

export const ReactivateStudent = ({open, onCancel}) => {

    const [disabled, setDisabled] = useState(false)
    const {messageApi, contextHolder} = useContext(appContext)
    const [name, setName] = useState(false)

    const verifyId = async(e) => {
        const res = await verifyForReactivate(e)
        console.log(res)
        if(res.status == 200){
            setName(`${res.data.name} ${res.data.lastname}`)
            setDisabled(true)
        }else{
            messageApi.open({
                type: "error",
                content: res.data ? (res.data):("ah ocurrido un error")
            })
        }
    }

    const reactivateStudent = async() => {
        const id = document.getElementById("idField").value
        const res = await reactivateUser(id)
        console.log(res)
        if(res.status == 200){
            messageApi.open({
                type: "success",
                content: "Usuario reactivado con exito"
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
            title="Reactivar estudiante?"
            open={open}
            onCancel={onCancel}
            footer={[
                <Button variant='solid' onClick={reactivateStudent} color='primary' disabled={!disabled}>Confirmar</Button>,
                <Button variant='solid' onClick={onCancel} color=''>Cancelar</Button>
            ]}
        >
            {contextHolder}
            <Input.Search
                placeholder='Cedula del estudiante'
                onSearch={e => verifyId(e)}
                id='idField'
                disabled={disabled}
            />
            {name && <h3>Reactivar usuario de: {name}</h3>}
        </Modal>
    )
}