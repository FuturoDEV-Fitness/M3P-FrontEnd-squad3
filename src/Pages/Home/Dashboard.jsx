import { Link } from 'react-router-dom'

import Map from '../../Components/Map/Map'




import Header from '../../Components/Header/Header'
import styles from './dashboard.module.css'
function Dashboard(){
    return(
        <div>
            <Header>
                <Link to='/login'>Login</Link>
                <Link to='/novoUsuario'>Cadastrar</Link>
            </Header>

            <Map />
        </div>
    )
}

export default Dashboard