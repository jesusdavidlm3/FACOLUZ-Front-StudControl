import LatPanel from '../components/LatPanel'
import React, { useContext } from 'react'
import { appContext } from '../context/appContext'


const Home = () => {

	return(
		<div className='Home'>
			<LatPanel />
			<div className='emptySpace'>
				<h1 className='purple'>Bienvenido</h1>
			</div>
		</div>
	)
}

export default Home