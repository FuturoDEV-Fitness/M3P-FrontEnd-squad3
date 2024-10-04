import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../Components/Temas/temaBotao'

import Card from '../../Components/Card/Card'
import Header from '../../Components/Header/Header'

import styles from './listLocations.module.css'
import { useListAllLocation } from '../../Hooks/useList';
import { useDeleteLocation } from '../../Hooks/useDelete';
function ListLocations(){

    ///OBS: PÁGINA EM CONSTRUÇÃO!!!!! 

    const [locations, setLocations] = useState([])

    useEffect(() => {
        ListLocations()
    }, [])

    console.log(locations)

    async function ListLocations(){
        setLocations((await useListAllLocation()).data)
    }

    function editar(id){
        window.location.href = `/editarLocal/${id}`
    }

    async function deletar(id){
        await useDeleteLocation(id)
        ListLocations()
    }

    function logout(){
        window.location.href = '/login'
    }

    let string = "Alongamento, Caminhada, Yoga"
    let array = string.split(",")

    return(
        <div>
            <Header>
                {<Link to='/'>Home</Link>}
                <Link to='/novoLocal'>Novo local</Link>
                <button onClick={() => logout()} className={styles.botaoLogout}>Logout</button>
            </Header>

            {locations.length > 0 ? locations.map((item) => (
                <Card key={item.id} >

                    <div className={styles.divTitulo}>
                        <h3>{item.nomeLocal}</h3>
                        <p>{item.cidade}/{item.estado}</p>
                        {<p>Por: {item.usuario.nome}</p>}
                    </div>

                    <hr />
                    <hr />

                    <div className={styles.divConteudo}>
                        <p className={styles.descricao}>{item.descricao}</p>
                        <p className={styles.descricao}>Sugestões de atividades físicas nesse local:</p>
                        <p className={styles.testep}>{item.tipoAtividade}</p>
                        
                        <ul type={"circle"}>
                            
                            {/* {array ? array.map((atividade, index) => (
                                <li key={index}>{atividade}</li>
                            )) : <li>Caminhada</li>} */}
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
                                onClick={() => editar(item.id)}
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{"mt":2, "mr":2}}>
                                    Editar
                                </Button>
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <Button
                                    onClick={() => deletar(item.id)}
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
            )) : 
                <Card>
                    <p>Sem dados para mostrar</p>
                </Card>
            }
        </div>
    )
}

export default ListLocations