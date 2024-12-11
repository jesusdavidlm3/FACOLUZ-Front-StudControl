import { useContext, useState } from 'react'
import { appContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const LatPanel = () => {

	const navigate = useNavigate()
	const { userInfo } = useContext(appContext)

	return(
		<>
			<div className='LatPanel'>
				<Button size='large' type='primary' onClick={() => navigate('/home/')}>Opcion 1</Button>
				<Button size='large' type='primary' onClick={() => navigate('/home')} >Opcion 2</Button>
				<Button size='large' type='primary' onClick={() => navigate('/home')} >Opcion 3</Button>
				<Button size='large' type='primary' onClick={() => navigate('/home/')}>Opcion 4</Button>
			</div>
		</>
	)
}

export default LatPanel