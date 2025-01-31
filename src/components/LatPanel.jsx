import { useContext, useState } from 'react'
import { appContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import React from 'react'
import { CreateStudentModal as CreateStudent } from './Modals'
import logo from '../img/logo FACO.png'

const LatPanel = () => {

	const navigate = useNavigate()
	const { userInfo } = useContext(appContext)
	const [createStudentModal, setCreateStudentModal] = useState(false)

	return(
		<>
			<div className='LatPanel'>
				<Button size='large' type='primary' onClick={() => navigate('/home')} >Inicio</Button>
				<Button size='large' type='primary' onClick={() => setCreateStudentModal(true)}>Registrar estudiante</Button>
				<Button size='large' type='primary' onClick={() => navigate('/home/sections')} >Secciones</Button>
				<Button size='large' type='primary' onClick={() => navigate('/home/checkInfo')} >Consultar informacion</Button>
				<img src={logo} draggable={false} />
			</div>

			<CreateStudent
				open={createStudentModal}
				onCancel={()=>setCreateStudentModal(false)}
				
			/>
		</>
	)
}

export default LatPanel