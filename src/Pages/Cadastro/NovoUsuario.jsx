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

import styles from './novoUsuario.module.css'

const formSchema = yup.object().shape({
    nomeUsuario: yup.string().max(50, 'Maximo de 50 caracteres').required('Nome é obrigatório'),
    cpf: yup.string().required('CPF é obrigatório').matches(/^[0-9]{11}$/, 'Insira 11 dígitos (somente números').max(11, 'Insira 11 dígitos (somente números)'),    
    email: yup.string().email('Formato de e-mail inválido!').required('E-mail é obrigatório').max(50, 'Maximo de 50 caracteres'),   
    senha: yup.string().required('Senha é obrigatória').min(8, 'Minimo de 8 caracteres').max(16, 'Maximo de 16 caracteres'),
    dataNascimento: yup.string().required('Data de nascimento é obrigatória'),
})

function NovoUsuario(){

    //Função para mostrar ou ocultar a senha
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(formSchema)
    })

    async function formularioCadastro(dadosForm){
        console.log(dadosForm)
    }

    //Buscar Cep

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
                    {errors?.data && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.data.message}</p>}

                    <label htmlFor="email">E-mail</label>
                    <input  type="email" placeholder="Informe o e-mail" name="email"
                        {...register("email")}                                              
                    />
                    {errors?.email && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.email.message}</p>}

                    <label htmlFor="senha">Senha</label>
                    <div className={styles.containerSenha}>
                        <input type={showPassword ? 'text' : 'password'}
                        placeholder="Informe uma senha"
                            {...register("senha")}
                        />

                        <div onClick={handleClickShowPassword} className={styles.iconeSenha}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </div>
                    </div>
                    {errors?.senha && <p className={styles.msgErro}><WarningAmberIcon fontSize="small" sx={{"mr":1}}/>{errors.senha.message}</p>}

                    <div className={styles.botaoLogin}>
                        <ThemeProvider theme={theme}>
                            <Button                                
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