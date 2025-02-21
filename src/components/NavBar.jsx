import { Button } from 'antd'
import { useContext } from 'react'
import { appContext } from  '../context/appContext'
import React from 'react'
import logo from '../img/logo LUZ.png'
import { routerContext } from '../context/routerContext'

const NavBar = () => {

	const {userData, setUserData, setLogged} = useContext(appContext)
	const {setView} = useContext(routerContext)

	const logout = () => {
		setView('Login')
		setUserData('')
		setLogged(false)
	}

	return(
		<div className='NavBar'>
			<div className='Info'>
				<img src={logo} draggable={false}/>
				<h1>Bienvenido {userData.name} {userData.lastname}</h1>
			</div>
			<div className='Buttons'>
				{/* { location.pathname != '/home' && <Button onClick={() => navigate(-1)} >{'< Volver'}</Button> } */}
				<Button variant='solid' color='danger' onClick={logout}>Cerrar Sesion</Button>
			</div>
		</div>
	)
}

export default NavBar