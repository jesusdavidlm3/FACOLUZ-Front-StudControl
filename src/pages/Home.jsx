import React, { useContext, useEffect } from 'react'
import { appContext } from '../context/appContext'
import { getSettingsStartedPeriod } from '../client/client'

const Home = () => {

	const {setStartedPeriod, messageApi, ContextHolder} = useContext(appContext)

	useEffect(() => {
		getInitSettings()
	}, [])

	const getInitSettings = async() => {
		const res = await getSettingsStartedPeriod()
		if(res.status == 200){
			setStartedPeriod(Boolean(res.data[0].value))
		}else{
			messageApi.open({
				type: "success",
				content: "Ah ocurrido un error de servidor, notifique"
			})
		}
	}

	return(
		<div className='HomePage'>
			{ContextHolder}
			<div className='BackgroundPage'>
				<h1>Bienvenido al modulo de Control de estudios</h1>
				<h3>
					En este modulo podra gestionar Secciones y asignaciones de los estudiantes y 
					profesores ademas de gestionar el periodo academico..
				</h3>
				<h3>Para empezar seleccione una opcion del menu en la barra de navegacion</h3>
			</div>
			<h4>Todos los derechos reservados 2025© Universidad del Zulia, Facultad de odontologia, Departamento de T.I.C.</h4>
		</div>
	)
}

export default Home