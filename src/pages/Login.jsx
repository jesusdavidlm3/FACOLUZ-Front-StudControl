import { Form, Input, Button, InputNumber } from 'antd'
import { useContext, useState } from 'react'
import { appContext } from '../context/appContext' 
import { encrypt } from '../functions/hash'
import { login } from '../client/client'
import React from 'react'
import { routerContext } from '../context/routerContext'

const Login = () => {
	const {setView} = useContext(routerContext)
	const { setUserData, setLogged, messageApi, contextHolder } = useContext(appContext)
	const [loading, setLoading] = useState(false)

	const submitLogin = async () => {
		setLoading(true)
		const id = document.getElementById('id').value
		const password = document.getElementById('password').value

		const data = {
			id: id,
			passwordHash: await encrypt(password)
		}
		let res = await login(data)
		if(res.status == 200){
			setUserData(res.data)
			setLogged(true)
			setView('Home')
		}else{
			setLoading(false)
			if(res.response.data == undefined){
				messageApi.error("no hay conexion")
			}else{
				messageApi.error(res.response.data)
			}
		}
	}

	return(
		<div className='Login'>
			{contextHolder}
			<Form disabled={loading} className='loginForm' onFinish={submitLogin}>
				<h1>Control de estudios</h1>
				<h2>Iniciar sesion</h2>
				<Form.Item name='id'>
					<InputNumber placeholder='Identificacion'/>
				</Form.Item>
				<Form.Item name='password'>
					<Input.Password placeholder='Contraseña'/>
				</Form.Item>

				<Button htmlType='submit'>Iniciar Sesion</Button>
			</Form>
		</div>
	)
}

export default Login