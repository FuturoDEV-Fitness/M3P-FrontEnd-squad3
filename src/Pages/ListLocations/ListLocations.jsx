import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../Components/Temas/temaBotao'

import Card from '../../Components/Card/Card'
import Header from '../../Components/Header/Header'

import styles from './listLocations.module.css'
import { useListLocation } from '../../Hooks/useList';
function ListLocations(){

    ///OBS: PÁGINA EM CONSTRUÇÃO!!!!! 

    const [locations, setLocations] = useState([])

    useEffect(() => {
        ListLocations()
    }, [])

    async function ListLocations(){
        setLocations((await useListLocation()).data)
    }

    function editar(){
        alert('Editar')
        alert('editar')
    }

    function deletar(){
        alert('Deletar')
        alert('deletar')
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
                        
                        <ul type={"circle"}>
                            <li>Sugestões de atividades físicas nesse local:</li>
                        </ul>
                        <p className={styles.descricao}>{item.tipoAtividade}</p>

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
            )) : 
                <Card>
                    <p>Sem dados para mostrar</p>
                </Card>
            }
        </div>
    )
}

export default ListLocations