import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Components/Temas/temaBotao";

import Header from "../../Components/Header/Header";
import { AuthContext } from "../../Context/AuthContext";

import styles from "./login.module.css";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Formato de e-mail inválido!")
    .required("Campo obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(5, "Minimo de 8 caracteres")
    .max(16, "Maximo de 16 caracteres"),
});

function Login() {
  const navigate = useNavigate();

  //Função para mostrar ou ocultar a senha
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { login } = useContext(AuthContext);

  async function formLogin(formValue) {
    await login(formValue);
  }

  return (
    <div>
      <Header>
        <Link to="/">Home</Link>
        <Link to="/novoUsuario">Criar conta</Link>
      </Header>

      <div className={styles.containerLogin}>
        <h1>Seja bem vinda(o) ao</h1>
        <div className={styles.logoLogin}>
          <h2>BuscaFit</h2>
          <img src="/logo.png" alt="" width={"80px"} />
        </div>

        <form className={styles.formLogin} onSubmit={handleSubmit(formLogin)}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder="Informe o e-mail"
            {...register("email")}
          />
          {errors?.email && (
            <p className={styles.msgErro}>
              <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
              {errors.email.message}
            </p>
          )}

          <label htmlFor="password">Senha</label>
          <div className={styles.containerSenha}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Informe uma senha"
              {...register("password")}
            />

            <div
              onClick={handleClickShowPassword}
              className={styles.iconeSenha}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>
          {errors?.password && (
            <p className={styles.msgErro}>
              <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
              {errors.password.message}
            </p>
          )}

          <div className={styles.botaoLogin}>
            <ThemeProvider theme={theme}>
              <Button 
                type="submit"
                variant="contained"
                color="primary"
                sx={{ my: 2 }}
              >
                Login
              </Button>
            </ThemeProvider>
          </div>
        </form>

        <p>
          Não possui uma conta?{" "}
          <Link to="/novoUsuario" className={styles.linkLogin}>
            Crie uma conta
          </Link>
          !
        </p>
      </div>
    </div>
  );
}

export default Login;
