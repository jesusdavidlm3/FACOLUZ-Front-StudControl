import { useContext, useState } from 'react'
import { routerContext } from '../context/routerContext'
import { appContext } from '../context/appContext'
import { Button } from 'antd'
import React from 'react'
import { CreateStudentModal as CreateStudent } from './Modals'
import logo from '../img/logo FACO.png'

const LatPanel = () => {

	const {setView} = useContext(routerContext)
	const { userInfo } = useContext(appContext)
	const [createStudentModal, setCreateStudentModal] = useState(false)

	return(
		<>
			<div className='LatPanel'>
				<Button size='large' type='primary' onClick={() => setView('Home')} >Inicio</Button>
				<Button size='large' type='primary' onClick={() => setCreateStudentModal(true)}>Registrar estudiante</Button>
				<Button size='large' type='primary' onClick={() => setView('Sections')} >Secciones</Button>
				<Button size='large' type='primary' onClick={() => setView('CheckAsign')} >Consultar asignacion</Button>
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