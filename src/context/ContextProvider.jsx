import { appContext } from './appContext'
import { useState } from 'react'
import { message } from 'antd'

const ContextProvider = ({children}) => {

	const [userData, setUserData] = useState('')
	const [logged, setLogged] = useState(false)
	const [messageApi, contextHolder] = message.useMessage()

	return(
		<appContext.Provider value={{
			userData,
			setUserData,
			logged,
			setLogged,
			messageApi,
			contextHolder,
		}} >
			{children}
		</appContext.Provider>
	)
}

export default ContextProvider