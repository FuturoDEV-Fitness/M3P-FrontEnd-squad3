import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/Temas/temaBotao';

import Card from '../../Components/Card/Card';
import Header from '../../Components/Header/Header';
import styles from './listUsers.module.css';
function ListUsers(){


    ///OBS: PÁGINA EM CONSTRUÇÃO!!!!! 
    //se escolher excluir a conta, redirecionar para login
    //se escolher editar a conta, redirecionar para tela de edição

    let usuarios = [{
        id: 1,
        nome: 'Aurora',
        },
        {
            id: 2,
            nome: 'Maria'
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


            {!!usuarios && usuarios.map((item => (
                <Card key={item.id} >  

                    <div className={styles.divTitulo}>
                        <h3>Seja bem vinda(o), {item.nome}!</h3>
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
                                <p className={styles.link}>GoogleMaps: {item.link}</p>
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

export default ListUsers