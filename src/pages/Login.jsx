import { Form, Input, Button } from 'antd'
import { useContext, useState } from 'react'
import { appContext } from '../context/appContext' 
import { encrypt } from '../functions/hash'
import { login } from '../client/client'
import { useNavigate } from 'react-router-dom'

const Login = () => {

	const navigate = useNavigate()
	const { setUserData, setLogged, messageApi } = useContext(appContext)
	const [loading, setLoading] = useState(false)

	const submitLogin = async () => {
		setLoading(true)
		const identification = document.getElementById('identification').value
		const password = document.getElementById('password').value

		const data = {
			identification: identification,
			passwordHash: await encrypt(password)
		}
		let res = await login(data)
		if(res.status == 200){
			setUserData(res.data)
			setLogged(true)
			navigate('/home')
		}else{
			setLoading(false)
			messageApi.open({
				type: 'error',
				content: res.response.data
			})
		}
	}

	return(
		<div className='Login'>
			<Form disabled={loading} className='loginForm' onFinish={submitLogin}>
				<h1>Control de estudios</h1>
				<h2>Iniciar sesion</h2>
				<Form.Item name='identification'>
					<Input placeholder='Identificacion'/>
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