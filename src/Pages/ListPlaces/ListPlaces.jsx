import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../Components/Temas/temaBotao'

import Card from '../../Components/Card/Card'
import Header from '../../Components/Header/Header'
import styles from './listPlaces.module.css'
function ListPlaces(){

    ///OBS: PÁGINA EM CONSTRUÇÃO!!!!! 
    
    let locais = [{
        id: 1,
        nome: 'Praia do Santinho',
        cidade: 'Florianópolis',
        estado: 'SC',
        usuario: 'Aurora',
        descricao: 'Praia tranquila com água cristalina',
        tipo: [
            'Surf',
            'Corrida'
        ],
        ruaLocal: 'Avenida Brigadeiro Faria Lima',
        cepLocal: '88058310',
        bairroLocal: 'Santinho',
        numeroLocal: '',
        complementoLocal: 'Acesso depois das dunas',
        link: 'https://www.google.com/maps'
        },
        {
            id: 2,
            nome: 'Praia do Forte',
            cidade: 'Florianópolis',
            estado: 'SC',
            usuario: 'Aurora',
            descricao: 'Mar agitado',
            tipo: [
                'Surf'
            ],
            ruaLocal: 'Avenida Hermosillo',
            cepLocal: '88058310',
            bairroLocal: 'Praia Brava',
            numeroLocal: '',
            complementoLocal: '',
            link: 'https://www.google.com/maps'
        }
    ]

    function editar(){
        alert('Editar')
        console.log('editar')
    }

    function deletar(){
        alert('Deletar')
        console.log('deletar')
    }

    function logout(){
        window.location.href = '/login'
    }

    return(
        <div>
            <Header>
                {<Link to='/'>Home</Link>}
                <button onClick={() => logout()} className={styles.botaoLogout}>Logout</button>
            </Header>


            {!!locais && locais.map((item => (
                <Card key={item.id} >  

                    <div className={styles.divTitulo}>
                        <h3>{item.nome}</h3>
                        <p>{item.cidade}/{item.estado}</p>
                        <p>Por: {item.usuario}</p>
                    </div>

                    <hr />
                    <hr />

                    <div className={styles.divConteudo}>
                        <p className={styles.descricao}>{item.descricao}</p>
                        <p>Sugestões de atividades físicas nesse local:</p>
                        <ul type={"circle"}>
                            {item.tipo ? item.tipo.map((item, index) => (
                                <li key={index}>{item}</li>
                            )) : <li>Alongamento</li>}
                            {/* Se o usuário não marcar nada, vou exibir Alongamento */}
                        </ul>

                        <div className={styles.divFlex}>
                            <img src="/local.png" alt="imagem-ilustrativa"  height={"50px"}/>
                            <div className={styles.divGrid}>
                                <p className={styles.rua}>Rua: {item.ruaLocal}</p>
                                <p className={styles.cep}>CEP: {item.cepLocal}</p>
                                <p className={styles.bairro}>Bairro: {item.bairroLocal}</p>
                                <p className={styles.num}>Número: {item.numeroLocal}</p>
                                <p className={styles.compl}>Complemento: {item.complementoLocal}</p>
                                <p className={styles.link}>GoogleMaps:  {item.link}</p>
                            </div>
                        </div>

                        <div className={styles.divBotoes}>

                            <ThemeProvider theme={theme}>
                                <Button
                                onClick={() => editar()}
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{"mt":2, "mr":2}}>
                                    Editar
                                </Button>
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <Button
                                    onClick={() => deletar()}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{"mt":2}}>
                                        Excluir
                                </Button>
                            </ThemeProvider>
                        </div>
                    </div>
                </Card>
            ) 
            
            ))}


        </div>
    )
}

export default ListPlaces