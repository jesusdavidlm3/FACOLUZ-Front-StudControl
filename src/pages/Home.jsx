import { Outlet, useLocation } from 'react-router-dom'
import LatPanel from '../components/LatPanel'
import React from 'react'


const Home = () => {

	const location = useLocation()

	return(
		<div className='Home'>
			<LatPanel />
			<Outlet/>
			{location.pathname == '/home' && <div className='emptySpace'>
				<h1 className='purple'>Bienvenido</h1>
			</div>}
		</div>
	)
}

export default Home