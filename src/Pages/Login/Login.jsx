import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Button} from '@mui/material'

import { ThemeProvider } from '@mui/material/styles'
import theme from '../../Components/Temas/temaBotao'

import styles from './login.module.css'

const formSchema = yup.object().shape({
    email: yup.string().email('Formato de e-mail inválido!').required('Campo obrigatório'), 
    senha: yup.string().required('Senha é obrigatória').min(8, 'Minimo de 8 caracteres').max(16, 'Maximo de 16 caracteres')
})

function Login() {
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

    async function formularioLogin(dadosForm){
        console.log(dadosForm)
    }

    return (
        <div>
            <h1>Login</h1>

            <div className={styles.containerLogin}>
            <h1 >Seja bem vinda(o) ao</h1>
                <div className={styles.logoLogin}>
                    <h2>Exercite</h2>
                    <img src="/logo.png" alt="" width={"80px"} />
                </div>

                <form className={styles.formLogin} onSubmit={handleSubmit(formularioLogin)}>
                    <label htmlFor="email">E-mail</label>
                    <input  type="email" placeholder="Informe o e-mail" 
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
                                    Login
                            </Button>
                        </ThemeProvider>
                    </div>
                </form>

                <p >Não possui uma conta? <Link to="/novoUsuario" className={styles.linkLogin}>Cadastre-se</Link>!</p>
            </div>
        </div>
    )
}

export default Login