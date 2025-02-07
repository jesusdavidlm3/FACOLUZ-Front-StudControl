import { useNavigate } from 'react-router-dom'
import { WarningOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import { appContext } from '../context/appContext'

const ErrorPage = () => {

	const navigate = useNavigate()
	const {setUserData, setLogged, setSelectedSection, setSelectedAsignature} = useContext(appContext)

	const reset = () => {
		setUserData(false)
		setLogged(false)
		setSelectedSection(false)
		setSelectedAsignature(false)
		navigate('/login')
	}

	return(
		<div className='ErrorPage'>
			<WarningOutlined style={{fontSize: '200px'}} />
			<h1>Ah ocurrido un error</h1>
			<h3 onClick={reset} >Haga click aqui para volver</h3>
		</div>
	)
}

export default ErrorPage