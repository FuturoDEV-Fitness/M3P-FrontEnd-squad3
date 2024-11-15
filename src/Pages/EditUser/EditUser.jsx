import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Components/Temas/temaBotao";

import Header from "../../Components/Header/Header.jsx";

import useCep from "../../Hooks/useCep.jsx";
import { useEditUser } from "../../Hooks/useEdit.jsx";

import styles from "./editUser.module.css";

const formSchema = yup.object().shape({
  nome: yup
    .string()
    .max(50, "Maximo de 50 caracteres")
    .required("Nome é obrigatório"),
  email: yup
    .string()
    .email("Formato de e-mail inválido!")
    .required("E-mail é obrigatório")
    .max(50, "Maximo de 50 caracteres"),
  //   password: yup.string(),
  data_nascimento: yup.string().required("Data de nascimento é obrigatória"),
  cep: yup
    .string()
    .required("CEP é obrigatório")
    .matches(/^[0-9]{8}$/, "Insira 8 dígitos (somente números)")
    .max(8, "Máximo 8 dígitos (somente números)"),
  ruaUsuario: yup.string().required("Rua é obrigatória"),
  bairroUsuario: yup.string().required("Bairro é obrigatório"),
  numeroUsuario: yup.string().required("Número é obrigatório"),
  cidadeUsuario: yup.string().required("Cidade é obrigatória"),
  estadoUsuario: yup.string().required("Estado é obrigatório"),
});

function EditUser() {
  useEffect(() => {
    getUser();
  }, []);

  const navigate = useNavigate();

  const host = 'https://m3p-backend-squad3-p7i7.onrender.com'

  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [user, setUser] = useState([]);

  const getUser = async () => {
    //`http://localhost:3000/usuarios/${id}`
    try {
      let response = await fetch(
        `${host}/usuarios/${id}`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let dados = await response.json();
      setUser(dados);

      console.log(user);

      setValue("nome", dados.nome);
      setValue("sexo", dados.sexo);
      setValue("cep", dados.cep);
      setValue("email", dados.email);

      let splitAdress = dados.endereco.split(","); //endreço vem como string e é transformado em um array de 6 posições!
      console.log(splitAdress);

      setValue("ruaUsuario", splitAdress[0]);
      setValue("bairroUsuario", splitAdress[1]);
      setValue("numeroUsuario", splitAdress[2]);
      setValue("cidadeUsuario", splitAdress[3]);
      setValue("estadoUsuario", splitAdress[4]);
    } catch (error) {
      console.log(error);
    }
  };

  let dataCep = {};

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
      data_nascimento: formValue.data_nascimento,
      email: formValue.email,
      cep: formValue.cep,
      endereco: `${formValue.ruaUsuario}, ${formValue.bairroUsuario}, ${formValue.numeroUsuario}, ${formValue.cidadeUsuario}, ${formValue.estadoUsuario}`,
      //endereco é uma coluna onde comtém todos os dados de endereço do usuário
    };

    console.log(dataForm);
    await useEditUser(dataForm);

    alert("Atualizado com sucesso!");

    navigate("/minhaConta");
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

  async function logout() {
    const data = {"isLog": "false"}

    await useEditUser(data)

    localStorage.clear();
    navigate("/login");
  }

  return (
    <div>
      <Header>
        <Link to="/">Home</Link>
        <Link to="/minhaConta">Minha conta</Link>
        <button onClick={() => logout()} className={styles.botaoLogout}>
          Logout
        </button>
      </Header>

      <div className={styles.containerNovoUsuario}>
        <h3>Altere os campos desejados</h3>

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
            type="text"
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
                Enviar
              </Button>
            </ThemeProvider>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
