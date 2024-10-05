import LinkIcon from "@mui/icons-material/Link";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../Components/Temas/temaBotao";

import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";

import { useDeleteLocation } from "../../Hooks/useDelete";
import { useListAllLocation } from "../../Hooks/useList";
import styles from "./listLocations.module.css";
function ListLocations() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);

  let teste = [];

  useEffect(() => {
    ListLocations();
  }, []);

  console.log(locations);

  async function ListLocations() {
    setLocations((await useListAllLocation()).data);
  }

  function editar(id) {
    navigate(`/editarLocal/${id}`);
  }

  async function deletar(id) {
    await useDeleteLocation(id);
    ListLocations();
  }

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  let string = "Alongamento, Caminhada, Yoga";
  let array = string.split(",");

  return (
    <div>
      <Header>
        {<Link to="/">Home</Link>}
        <Link to="/novoLocal">Novo local</Link>
        <button onClick={() => logout()} className={styles.botaoLogout}>
          Logout
        </button>
      </Header>

      {locations.length > 0 ? (
        locations.map((item) => (
          <Card key={item.id}>
            <div className={styles.divTitulo}>
              <h3>{item.nomeLocal}</h3>
              <p>
                {item.cidade}/{item.estado}
              </p>
              {<p>Usuário: {item.usuario.nome}</p>}
            </div>

            <hr />
            <hr />

            <div className={styles.divConteudo}>
              <p className={styles.descricao}>{item.descricao}</p>
              <p className={styles.descricao}>
                Sugestões de atividades físicas nesse local:
              </p>
              <p className={styles.testep}>{item.tipoAtividade}</p>

              <ul type={"circle"}>
                {/* {array ? array.map((atividade, index) => (
                                <li key={index}>{atividade}</li>
                            )) : <li>Caminhada</li>} */}
                {/* Se o usuário não marcar nada, vou exibir Alongamento */}
              </ul>

              <div className={styles.divFlex}>
                <img
                  src="/local.png"
                  alt="imagem-ilustrativa"
                  height={"50px"}
                />
                <div className={styles.divGrid}>
                  <p className={styles.rua}>Rua: {item.rua}</p>
                  <p className={styles.cep}>CEP: {item.cep_endereco}</p>
                  <p className={styles.bairro}>Bairro: {item.bairro}</p>
                  <p className={styles.num}>Número: {item.numero}</p>
                  <p className={styles.compl}>
                    Complemento: {item.complemento}
                  </p>

                  <div className={styles.divLink}>
                    <LinkIcon fontSize="medium" />
                    <Link
                      to={item.linkMap}
                      target="_blank"
                      className={styles.link}
                    >
                      Abrir com Google Maps
                    </Link>
                  </div>
                </div>
              </div>

              <div className={styles.divBotoes}>
                <ThemeProvider theme={theme}>
                  <Button
                    onClick={() => editar(item.idLocal)}
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, mr: 2 }}
                  >
                    Editar
                  </Button>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Button
                    onClick={() => deletar(item.idLocal)}
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Excluir
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Card>
          <p>Sem dados para mostrar</p>
        </Card>
      )}
    </div>
  );
}

export default ListLocations;
