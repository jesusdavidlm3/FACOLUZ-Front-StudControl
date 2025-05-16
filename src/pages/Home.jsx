import LatPanel from '../components/LatPanel'
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
		<div className='Home'>
			{ContextHolder}
			<h1 className='purple'>Bienvenido</h1>
		</div>
	)
}

export default Home