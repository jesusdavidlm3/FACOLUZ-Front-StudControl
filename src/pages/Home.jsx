import { Outlet, useLocation } from 'react-router-dom'
import LatPanel from '../components/LatPanel'

const Home = () => {

	const location = useLocation()

	return(
		<div className='Home'>
			<LatPanel />
			<Outlet/>
			{location.pathname == '/home' && <div className='emptySpace'/>}
		</div>
	)
}

export default Home