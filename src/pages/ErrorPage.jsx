import { WarningOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import { appContext } from '../context/appContext'
import { routerContext } from '../context/routerContext'

const ErrorPage = () => {

	const {setView} = useContext(routerContext)
	const {setUserData, setLogged, setSelectedSection, setSelectedAsignature} = useContext(appContext)

	const reset = () => {
		setUserData(false)
		setLogged(false)
		setSelectedSection(false)
		setSelectedAsignature(false)
		setView('Login')
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