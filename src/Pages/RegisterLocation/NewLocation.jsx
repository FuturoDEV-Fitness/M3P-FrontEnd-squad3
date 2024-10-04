import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Button }from '@mui/material'
import theme from '../../Components/Temas/temaBotao'
import { ThemeProvider } from '@mui/material/styles'

import Header from '../../Components/Header/Header.jsx'
import useCep from '../../Hooks/useCep.jsx'
import { useCreateLocation } from '../../Hooks/useCreate.jsx'

import styles from './newLocation.module.css'

const formSchema = yup.object().shape({
    nome: yup.string().max(50, 'Maximo de 50 caracteres').required('Nome é obrigatório'), 
    latitude: yup.string().required('Latitude é obrigatória'),
    longitude: yup.string().required('Longitude é obrigatória'),   
    cep: yup.string().required('CEP é obrigatório').matches(/^[0-9]{8}$/, 'Insira 8 dígitos (somente números)').max(8, 'Máximo 8 dígitos (somente números)'),
    rua: yup.string().required('Rua é obrigatória').max(50, 'Maximo de 50 caracteres'),
    bairro: yup.string().required('Bairro é obrigatório').max(50, 'Maximo de 50 caracteres'),
    numero: yup.string().required('Numero é obrigatório'),
    complemento: yup.string(),
    cidade: yup.string().required('Cidade é obrigatória').max(50, 'Maximo de 50 caracteres'),
    estado: yup.string().required('Estado é obrigatório').max(50, 'Maximo de 50 caracteres'),
    descricao: yup.string().max(200, 'Maximo de 200 caracteres'),
    atividades: yup.array().required('Selecione ao menos uma atividade')
})

function NewLocation(){
    let dataCep = {}

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(formSchema)
    })

    async function formRegister(formValue){

        let dataForm = {
            nome: formValue.nome,
            cep: formValue.cep,
            cidade: formValue.cidade,
            estado: formValue.estado,
            descricao: formValue.descricao,
            atividades: formValue.atividades,
            latitude: formValue.latitude,
            longitude: formValue.longitude
        }
        
        console.log(dataForm)
        await useCreateLocation(dataForm)

        alert('Local criado com sucesso!')
        navigate('/meusLocais')
    }

    const findCep = async () => {
        let cep = getValues('cep')
        dataCep = (await useCep(cep)).data
        if(dataCep.erro){
            alert('Cep inválido')
        } else {
            setValue('rua', dataCep.logradouro)
            setValue('bairro', dataCep.bairro)
            setValue('cidade', dataCep.localidade)
            setValue('estado', dataCep.uf)
        }
    }

    function logout(){
        localStorage.clear()
        navigate('/login')
    }

    return(
        <div>
            <Header>
                <Link to='/'>Home</Link>
                <Link to='/meusLocais'>Listar locais</Link> 
                <button onClick={() => logout()} className={styles.botaoLogout}>Logout</button>
            </Header>

            <div className={styles.containerCadastroLugar}>
                <h3>Contribua com nossa comunidade, preenchendo os campos abaixo!</h3>

                <form className={styles.formCadastroLugar} onSubmit={handleSubmit(formRegister)}>
                    <label htmlFor="nome" >Nome do local </label>
                    <input  type="text" placeholder="Informe o nome do local" name="nome" 
                        {...register("nome")}                                          
                    />
                    {errors?.nome && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.nome.message}</p>}

                    <label htmlFor="latitude" >Latitude</label>
                    <input  type="text" placeholder="Informe a latitude" name="latitude" 
                        {...register("latitude")}                                                   
                    />
                    {errors?.latitude && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.latitude.message}</p>}

                    <label htmlFor="longitude" >Longitude</label>
                    <input  type="text" placeholder="Informe a longitude" name="longitude" 
                        {...register("longitude")}                                        
                    />
                    {errors?.longitude && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.longitude.message}</p>}

                    <label htmlFor="cep">CEP</label>
                    <input  type="text" placeholder="Informe o CEP (somente dígitos)" name="cep"
                        {...register("cep", {
                            onBlur: () => findCep()
                        })}                                                   
                    />
                    {errors?.cep && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.cep.message}</p>}                    

                    <label htmlFor="rua" >Rua</label>
                    <input  type="text" placeholder="Informe a rua" name="rua" 
                        {...register("rua")}                                         
                    />
                    {errors?.rua && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.rua.message}</p>}

                    <label htmlFor="bairro" >Bairro</label>
                    <input  type="text" placeholder="Informe o bairro" name="bairro" 
                        {...register("bairro")}                                         
                    />
                    {errors?.bairro && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.bairro.message}</p>}

                    <label htmlFor="numero" >Número</label>
                    <input  type="text" placeholder="Informe o número" min={0} name="numero"
                        {...register("numero")}                                         
                    />
                    {errors?.numero && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.numero.message}</p>}

                    <label htmlFor="complemento" >Complemento</label>
                    <input  type="text" placeholder="Complemento (se houver)" name="complemento"
                        {...register("complemento")}                                       
                    />
                    {errors?.complemento && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.complemento.message}</p>}

                    <label htmlFor="cidade">Cidade</label>
                    <input  type="text" placeholder="Informe a cidade" name="cidade"
                        {...register("cidade")}                                          
                    />
                    {errors?.cidade && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.cidade.message}</p>}

                    <label htmlFor="estado" >Estado</label>
                    <input  type="text" placeholder="Informe o estado" name="estado"
                        {...register("estado")}                                          
                    />
                    {errors?.estado && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.estado.message}</p>}

                    <label htmlFor="descricao" >Breve descrição</label>
                    <textarea  type="text" placeholder="Descreva brevemente o lugar e a atividade física que pode ser praticada nesse local." name='descricao'
                        {...register("descricao")}>                                         
                    </textarea>
                    {errors?.descricao && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.descricao.message}</p>}

                    <p className={styles.pForm}>
                        Tipos de atividade física
                    </p>
                           
                    <div className={styles.gridLayout}>
                        <div>
                            <input type="checkbox" name="alongamento" value="Alongamento"
                                {...register("atividades")}
                            />
                            <label htmlFor="tipo" className={styles.labelCheckbox}>Alongamento</label>
                        </div>
                        <div>
                            <input type="checkbox" name="caminhada"value="Caminhada"
                                {...register("atividades")}
                            />
                            <label htmlFor="atividades" className={styles.labelCheckbox}>Caminhada</label>
                        </div>
                        <div>
                            <input type="checkbox" name="ciclismo"value="Ciclismo"
                                {...register("atividades")}                     
                            />
                            <label htmlFor="atividades" className={styles.labelCheckbox}>Ciclismo</label>
                        </div>
                        <div>
                            <input type="checkbox" name="corrida" value="Corrida"
                                {...register("atividades")}
                            />
                            <label htmlFor="atividades" className={styles.labelCheckbox}>Corrida</label>
                        </div>
                        <div>
                            <input type="checkbox" name="musculacao"value="Musculação"
                                {...register("atividades")}
                            />
                            <label htmlFor="atividades" className={styles.labelCheckbox}>Musculacao</label>
                        </div>
                        <div>
                            <input type="checkbox" name="skate"value="Skate"
                                {...register("atividades")}
                            />
                            <label htmlFor="atividades" className={styles.labelCheckbox}>Skate</label>
                        </div>
                        <div>
                            <input type="checkbox" name="surf" value="Surf"
                                {...register("atividades")}
                            />
                            <label htmlFor="atividades" className={styles.labelCheckbox}>Surf</label>
                        </div>
                        <div>
                            <input type="checkbox" name="yoga"value="Yoga"
                                {...register("atividades")}
                                />
                            <label htmlFor="atividades" className={styles.labelCheckbox}>Yoga</label>
                        </div>
                    </div>

                    <div className={styles.botaoCadastrar}>
                        <ThemeProvider theme={theme}>
                            <Button  
                                onClick={handleSubmit(formRegister)}                         
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{"my":2}}>
                                    Cadastrar
                            </Button>
                        </ThemeProvider>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewLocation