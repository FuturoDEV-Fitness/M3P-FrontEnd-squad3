import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDeleteUser } from "../../Hooks/useDelete";
import { useListAllLocation, useListUserId } from "../../Hooks/useList";

import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Components/Temas/temaBotao";

import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";
import styles from "./myAccount.module.css";
function MyAccount() {
  const [user, setUser] = useState({});
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    listUser();
    ListLocations();
  }, []);

  console.log(locations);

  async function ListLocations() {
    setLocations((await useListAllLocation()).data);
  }

  async function listUser() {
    setUser((await useListUserId()).data);
  }

  console.log(user);
  console.log(locations);
  const numLocations = locations.length;

  function editar() {
    navigate("/editarUsuario");
  }

  async function deletar() {
    await useDeleteUser();
    logout();
  }

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div>
      <Header>
        {<Link to="/">Home</Link>}
        <Link to="/novoLocal">Novo local</Link>
        <Link to="/meusLocais">Meus locais</Link>
        <button onClick={() => logout()} className={styles.botaoLogout}>
          Logout
        </button>
      </Header>

      <Card>
        <div className={styles.divTitulo}>
          <h3>Seja bem vinda(o), {user.nome} !</h3>
        </div>

        <hr />
        <hr />

        <div className={styles.divConteudo}>
          <p className={styles.descricao}>Nome: {user.nome}</p>
          <p className={styles.descricao}>Email: {user.email}</p>

          {numLocations > 0 ? (
            <p className={styles.descricao}>
              Você possui {numLocations} locais cadastrados:
            </p>
          ) : (
            <p className={styles.descricao}>
              Você ainda não possui locais cadastrados!
            </p>
          )}

          {locations ? (
            locations.map((location) => (
              <p key={location.id} className={styles.descricao}>
                {location.nomeLocal} - {location.cidade}/{location.estado}
              </p>
            ))
          ) : (
            <p></p>
          )}

          <div className={styles.divBotoes}>
            <ThemeProvider theme={theme}>
              <Button
                onClick={() => editar()}
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2, mr: 2 }}
              >
                Editar dados
              </Button>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Button
                onClick={() => deletar()}
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Excluir conta
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </Card>

      <p className={styles.atencao}>
        <span style={{ color: "red" }}>ATENÇÃO</span>: Ao clicar em excluir
        conta, todos os locais cadastrado por você serão excluídos!
      </p>
    </div>
  );
}

export default MyAccount;
