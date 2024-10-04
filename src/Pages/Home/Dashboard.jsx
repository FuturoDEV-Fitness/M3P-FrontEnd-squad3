import { Link } from 'react-router-dom'

import Map from '../../Components/Map/Map'

import Header from '../../Components/Header/Header'
import styles from './dashboard.module.css'
function Dashboard(){
    function logout(){
        window.location.href = '/login'
    }

    return(
        <div>
            <Header>
                <Link to='/login'>Login</Link>
                <Link to='/minhaConta'>Minha conta</Link>
                <Link to='/novoLocal'>Novo local</Link>
                <Link to='/meusLocais'>Listar locais</Link>               
                <Link to='/novoUsuario'>Criar conta</Link>
                <button onClick={() => logout()} className={styles.botaoLogout}>Logout</button>

            </Header>

            <div className={styles.logo} >
                <img src="/logo.png" alt="" width={"80px"} />
                <h1>Exercite</h1>
            </div>
            <h1 className={styles.textoInicial}>Aqui você pode encontrar e compartilhar dicas de locais para prática de alguma atividade física!</h1>

            <Map />
        </div>
    )
}

export default Dashboard