import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useListUserId } from '../../Hooks/useList';

import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/Temas/temaBotao';

import Card from '../../Components/Card/Card';
import Header from '../../Components/Header/Header';
import styles from './myAccount.module.css';
function MyAccount(){
    const [user, setUser] = useState({});

    useEffect(() => {
        listUser()
    }, [])

    async function listUser(){
        const id = 12
        setUser((await useListUserId(id)).data)        
    }

    console.log(user)

    function editar(){
        window.location.href = '/editarMinhaConta'
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

            <Card>
                <div className={styles.divTitulo}>
                    <h3>Seja bem vinda(o), {user.nome} !</h3>
                </div>

                <hr />
                <hr />

                <div className={styles.divConteudo}>

                    <p>Nome: {user.nome}</p>
                    <p>Email: {user.email}</p>
                    <p>Você possui X locais cadastrados:</p>
                    <p>Local 1</p>
                    <p>Local 2</p>


                    <div className={styles.divBotoes}>

                        <ThemeProvider theme={theme}>
                            <Button
                            onClick={() => editar()}
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{"mt":2, "mr":2}}>
                                Editar dados
                            </Button>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <Button
                                onClick={() => deletar()}
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{"mt":2}}>
                                    Excluir conta
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </Card>

            <p style={{color: 'red'}}>Em algum lugar avisar que ao excluir a conta , todos os locais cadastrados por esse usuário serão deletados.</p>

        </div>
    )
}

export default MyAccount