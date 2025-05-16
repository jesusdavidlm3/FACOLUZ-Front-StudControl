import { appContext } from './appContext'
import { useState } from 'react'
import { message } from 'antd'
import React from 'react'

const ContextProvider = ({children}) => {

	const [userData, setUserData] = useState('')
	const [logged, setLogged] = useState(false)
	const [messageApi, contextHolder] = message.useMessage()
	const [selectedSection, setSelectedSection] = useState()
	const [selectedAsignature, setSelectedAsignature] = useState()
	const [teachersList, setTeachersList] = useState([])
	const [startedPeriod, setStartedPeriod] = useState([])

	return(
		<appContext.Provider value={{
			userData,
			setUserData,
			logged,
			setLogged,
			messageApi,
			contextHolder,
			selectedSection,
			setSelectedSection,
			selectedAsignature,
			setSelectedAsignature,
			teachersList,
			setTeachersList,
			startedPeriod,
			setStartedPeriod
		}} >
			{children}
		</appContext.Provider>
	)
}

export default ContextProvider