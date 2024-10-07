import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Components/Temas/temaBotao.jsx";

import Header from "../../Components/Header/Header.jsx";

import useCep from "../../Hooks/useCep.jsx";
import { useCreateUser } from "../../Hooks/useCreate.jsx";

import styles from "./newUser.module.css";

const formSchema = yup.object().shape({
  nome: yup
    .string()
    .max(50, "Maximo de 50 caracteres")
    .required("Nome é obrigatório"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .matches(/^[0-9]{11}$/, "Insira 11 dígitos (somente números")
    .max(11, "Máximo 11 dígitos (somente números)"),
  email: yup
    .string()
    .email("Formato de e-mail inválido!")
    .required("E-mail é obrigatório")
    .max(50, "Maximo de 50 caracteres"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Minimo de 8 caracteres")
    .max(16, "Maximo de 16 caracteres"),
  data_nascimento: yup.string().required("Data de nascimento é obrigatória"),
  cep: yup
    .string()
    .required("CEP é obrigatório")
    .matches(/^[0-9]{8}$/, "Insira 8 dígitos (somente números)")
    .max(8, "Máximo 8 dígitos (somente números)"),
  ruaUsuario: yup
    .string()
    .required("Rua é obrigatória")
    .max(50, "Maximo de 50 caracteres"),
  bairroUsuario: yup
    .string()
    .required("Bairro é obrigatório")
    .max(50, "Maximo de 50 caracteres"),
  numeroUsuario: yup.string().required("Numero é obrigatório"),
  cidadeUsuario: yup
    .string()
    .required("Cidade é obrigatória")
    .max(50, "Maximo de 50 caracteres"),
  estadoUsuario: yup
    .string()
    .required("Estado é obrigatório")
    .max(50, "Maximo de 50 caracteres"),
});

function NewUser() {
  let dataCep = {};

  const navigate = useNavigate();

  //Função para mostrar ou ocultar a senha
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  async function formRegister(formValue) {

    let dataForm = {
      nome: formValue.nome,
      sexo: formValue.sexo,
      cpf: formValue.cpf,
      cep: formValue.cep,
      endereco: `${formValue.ruaUsuario}, ${formValue.bairroUsuario}, ${formValue.numeroUsuario}, ${formValue.cidadeUsuario}, ${formValue.estadoUsuario}`,
      email: formValue.email,
      password: formValue.password,
      data_nascimento: formValue.data_nascimento,

      //endereco é uma coluna onde comtém todos os dados de endereço do usuário
    };

    console.log(dataForm);
    await useCreateUser(dataForm);

    navigate("/login");
  }

  //Buscar Cep
  const findCep = async () => {
    let cep = getValues("cep");
    dataCep = (await useCep(cep)).data;
    if (dataCep.erro) {
      alert("Cep inválido");
    } else {
      setValue("ruaUsuario", dataCep.logradouro);
      setValue("bairroUsuario", dataCep.bairro);
      setValue("cidadeUsuario", dataCep.localidade);
      setValue("estadoUsuario", dataCep.uf);
    }
  };

  return (
    <div>
      <Header>
        <Link to="/">Home</Link>
      </Header>

      <div className={styles.containerNovoUsuario}>
        <h3>Preencha os campos abaixo para cadastrar-se!</h3>

        <form
          className={styles.formNovoUsuario}
          onSubmit={handleSubmit(formRegister)}
        >
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            placeholder="Informe o nome"
            name="nome"
            {...register("nome")}
          />
          {errors?.nome && (
            <p className={styles.msgErro}>
              <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
              {errors.nome.message}
            </p>
          )}

          <label htmlFor="sexo">Sexo</label>
          <select {...register("sexo")}>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
            <option value="Outro">Outro</option>
          </select>

          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            placeholder="Informe o CPF (somente dígitos)"
            name="cpf"
            {...register("cpf")}
          />
          {errors?.cpf && (
            <p className={styles.msgErro}>
              <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
              {errors.cpf.message}
            </p>
          )}

          <label htmlFor="data_nascimento">Data Nascimento</label>
          <input
            type="date"
            name="data_nascimento"
            format="DD-MM-YYYY"
            {...register("data_nascimento")}
          />
          {errors?.data_nascimento && (
            <p className={styles.msgErro}>
              <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
              {errors.data_nascimento.message}
            </p>
          )}

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder="Informe o e-mail"
            name="email"
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
              name="password"
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

          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            placeholder="Informe o CEP (somente dígitos)"
            name="cep"
            {...register("cep", {
              onBlur: () => findCep(),
            })}
          />
          {errors?.cep && (
            <p className={styles.msgErro}>
              <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
              {errors.cep.message}
            </p>
          )}

          <label htmlFor="ruaUsuario">Rua</label>
          <input
            type="text"
            placeholder="Informe a rua"
            name="ruaUsuario"
            {...register("ruaUsuario")}
          />
          {errors?.ruaUsuario && (
            <p className={styles.msgErro}>
              <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
              {errors.ruaUsuario.message}
            </p>
          )}

          <label htmlFor="bairroUsuario">Bairro</label>
          <input
            type="text"
            placeholder="Informe o bairro"
            {...register("bairroUsuario")}
          />
          {errors?.bairroUsuario && (
            <p className={styles.msgErro}>
              <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
              {errors.bairroUsuario.message}
            </p>
          )}

          <label htmlFor="numeroUsuario">Número</label>
          <input
            type="number"
            placeholder="Informe o número"
            min={0}
            {...register("numeroUsuario")}
          />
          {errors?.numeroUsuario && (
            <p className={styles.msgErro}>
              <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
              {errors.numeroUsuario.message}
            </p>
          )}

          <label htmlFor="cidadeUsuario">Cidade</label>
          <input
            type="text"
            placeholder="Informe a cidade"
            {...register("cidadeUsuario", {
              required: "Campo obrigatório!",
              maxLength: {
                value: 50,
                message: "Deve possuir no máximo 50 caracteres",
              },
            })}
          />
          {errors?.cidadeUsuario && (
            <p className={styles.msgErro}>
              <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
              {errors.cidadeUsuario.message}
            </p>
          )}

          <label htmlFor="estadoUsuario">Estado</label>
          <input
            type="text"
            placeholder="Informe o estado"
            {...register("estadoUsuario", {
              required: "Campo obrigatório!",
            })}
          />
          {errors?.estadoUsuario && (
            <p className={styles.msgErro}>
              <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
              {errors.estadoUsuario.message}
            </p>
          )}

          <div className={styles.botaoCadastrar}>
            <ThemeProvider theme={theme}>
              <Button
                onClick={handleSubmit(formRegister)}
                type="submit"
                variant="contained"
                color="primary"
                sx={{ my: 2 }}
              >
                Cadastrar
              </Button>
            </ThemeProvider>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
