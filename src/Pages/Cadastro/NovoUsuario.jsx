import { useForm } from 'react-hook-form'
import { useState } from 'react'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Button }from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import theme from '../../Components/Temas/temaBotao'
import { ThemeProvider } from '@mui/material/styles'

import useCep from '../../Hooks/useCep.jsx'

import styles from './novoUsuario.module.css'

const formSchema = yup.object().shape({
    nomeUsuario: yup.string().max(50, 'Maximo de 50 caracteres').required('Nome é obrigatório'),
    cpf: yup.string().required('CPF é obrigatório').matches(/^[0-9]{11}$/, 'Insira 11 dígitos (somente números').max(11, 'Máximo 11 dígitos (somente números)'),    
    email: yup.string().email('Formato de e-mail inválido!').required('E-mail é obrigatório').max(50, 'Maximo de 50 caracteres'),   
    senha: yup.string().required('Senha é obrigatória').min(8, 'Minimo de 8 caracteres').max(16, 'Maximo de 16 caracteres'),
    dataNascimento: yup.string().required('Data de nascimento é obrigatória'),
    cep: yup.string().required('CEP é obrigatório').matches(/^[0-9]{8}$/, 'Insira 8 dígitos (somente números)').max(8, 'Máximo 8 dígitos (somente números)'),
    ruaUsuario: yup.string().required('Rua é obrigatória').max(50, 'Maximo de 50 caracteres'),
    bairroUsuario: yup.string().required('Bairro é obrigatório').max(50, 'Maximo de 50 caracteres'),
    numeroUsuario: yup.string().required('Número é obrigatório'),
    complementoUsuario: yup.string().max(50, 'Maximo de 50 caracteres'),
    cidadeUsuario: yup.string().required('Cidade é obrigatória').max(50, 'Maximo de 50 caracteres'),
    estadoUsuario: yup.string().required('Estado é obrigatório').max(50, 'Maximo de 50 caracteres'),
})

function NovoUsuario(){
    let dadosCep = {}

    //Função para mostrar ou ocultar a senha
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(formSchema)
    })

    async function formularioCadastro(dadosForm){
        console.log(dadosForm)
        //Aqui vamos chamar cadastrarUsuario(dadosForm)
    }

    //Buscar Cep
    const buscarCep = async () => {
        let cep = getValues('cep')
        dadosCep = (await useCep(cep)).data
        if(dadosCep.erro){
            alert('Cep inválido')
        } else {
            setValue('ruaUsuario', dadosCep.logradouro)
            setValue('bairroUsuario', dadosCep.bairro)
            setValue('cidadeUsuario', dadosCep.localidade)
            setValue('estadoUsuario', dadosCep.uf)
        }
    }

    return(
        <div>
            <h1>Tela de cadastro de Usuário</h1>

            <div className={styles.containerNovoUsuario}>
                <h3>Preencha os campos abaixo para cadastrar-se!</h3>

                <form className={styles.formNovoUsuario} onSubmit={handleSubmit(formularioCadastro)}>
                    <label htmlFor="nomeUsuario">Nome</label>
                    <input  type="text" placeholder="Informe o nome" name="nomeUsuario"
                        {...register("nomeUsuario")}                                       
                    />
                    {errors?.nomeUsuario && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.nomeUsuario.message}</p>}

                    <label htmlFor="sexo">Sexo</label>
                    <select {...register("sexo")}>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                    </select>

                    <label htmlFor="cpf">CPF</label>
                    <input  type="text" placeholder="Informe o CPF (somente dígitos)" name="cpf"
                        {...register("cpf")}                                                
                    />
                    {errors?.cpf && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.cpf.message}</p>}

                    <label htmlFor="dataNascimento">Data teste</label>
                    <input  type="date" name="dataNascimento" format='DD-MM-YYYY'
                        {...register("dataNascimento")}                                                   
                    />
                    {errors?.dataNascimento && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.dataNascimento.message}</p>}

                    <label htmlFor="email">E-mail</label>
                    <input  type="email" placeholder="Informe o e-mail" name="email"
                        {...register("email")}                                              
                    />
                    {errors?.email && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.email.message}</p>}

                    <label htmlFor="senha">Senha</label>
                    <div className={styles.containerSenha}>
                        <input type={showPassword ? 'text' : 'password'}
                        placeholder="Informe uma senha" name='senha'
                            {...register("senha")}
                        />

                        <div onClick={handleClickShowPassword} className={styles.iconeSenha}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </div>
                    </div>
                    {errors?.senha && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.senha.message}</p>}

                    <label htmlFor="cep">CEP</label>
                    <input  type="text" placeholder="Informe o CEP (somente dígitos)" name="cep"
                        {...register("cep", {
                            onBlur: () => buscarCep()
                        })}                                                   
                    />
                    {errors?.cep && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.cep.message}</p>}

                    <label htmlFor="ruaUsuario">Rua</label>
                    <input  type="text" placeholder="Informe a rua" name="ruaUsuario"
                        {...register("ruaUsuario")}                                                   
                    />
                    {errors?.ruaUsuario && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.ruaUsuario.message}</p>}

                    <label htmlFor="bairroUsuario">Bairro</label>
                    <input  type="text" placeholder="Informe o bairro" 
                        {...register("bairroUsuario")}                                                   
                    />
                    {errors?.bairroUsuario && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.bairroUsuario.message}</p>}

                    <label htmlFor="numeroUsuario">Número</label>
                    <input  type="number" placeholder="Informe o número" min={0}
                        {...register("numeroUsuario")}                                                   
                    />
                    {errors?.numeroUsuario && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.numeroUsuario.message}</p>}

                    <label htmlFor="complementoUsuario">Complemento</label>
                    <input  type="text" placeholder="Complemento (se houver)" 
                        {...register("complementoUsuario")}                                                   
                    />
                    {errors?.complementoUsuario && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.complementoUsuario.message}</p>}

                    <label htmlFor="cidadeUsuario">Cidade</label>
                    <input  type="text" placeholder="Informe a cidade" 
                        {...register("cidadeUsuario", {
                            required: "Campo obrigatório!",
                            maxLength: {value:50, message:"Deve possuir no máximo 50 caracteres"}
                        })}                                                   
                    />
                    {errors?.cidadeUsuario && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.cidadeUsuario.message}</p>}

                    <label htmlFor="estadoUsuario">Estado</label>
                    <input  type="text" placeholder="Informe o estado" 
                        {...register("estadoUsuario", {
                            required: "Campo obrigatório!",
                        })}                                                   
                    />
                    {errors?.estadoUsuario && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.estadoUsuario.message}</p>}
                    
                    <div className={styles.botaoCadastrar}>
                        <ThemeProvider theme={theme}>
                            <Button      
                                onClick={handleSubmit(formularioCadastro)}                          
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

export default NovoUsuario