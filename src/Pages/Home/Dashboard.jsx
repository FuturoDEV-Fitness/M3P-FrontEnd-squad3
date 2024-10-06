import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";

import Map from "../../Components/Map/Map";

import Card from "../../Components/Card/Card";

import { useListAll, useListAllUser } from "../../Hooks/useList";

import Header from "../../Components/Header/Header";
import styles from "./dashboard.module.css";
function Dashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    listAll();
  }, []);

  let teste = ''
  for (let i = 0; i < locations.length; i++) {
    if (i === locations.length - 1) {
      teste += locations[i].itens_checkbox
    } else {
      teste += `${locations[i].itens_checkbox},` 
    }    
  }

  let teste2 = teste.split(",")
  console.log(teste2)


  async function listAll() {
    setUsers((await useListAllUser()).data);
    setLocations((await useListAll()).data);
  }

  const numUsers = users.length;
  const numLocations = locations.length;

  return (
    <div>
      <Header>
        <Link to="/login">Login</Link>
        <Link to="/minhaConta">Minha conta</Link>
        <Link to="/novoLocal">Novo local</Link>
        <Link to="/meusLocais">Listar locais</Link>
        <Link to="/novoUsuario">Criar conta</Link>
        <button onClick={() => logout()} className={styles.botaoLogout}>
          Logout
        </button>
      </Header>

      <div className={styles.logo}>
        <img src="/logo.png" alt="" width={"80px"} />
        <h1>BuscaFit</h1>
      </div>
      <h1 className={styles.textoInicial}>
        Aqui você pode encontrar e compartilhar dicas de locais para prática de
        alguma atividade física!
      </h1>

      <Map />

      <div className={styles.divTexto}>
        <h2>Venha contribuir você também!!</h2>
        <h3>
          Atualmente, somos {numUsers} usuários cadastrados. Dos quais,{" "}
          {numUsers} estão ativos nesse momento!
        </h3>
        <h3>Contamos com {numLocations} locais cadastrados!</h3>
        <p style={{ marginTop: "1em" }}>
          <Link to={"/novoLocal"} className={styles.link}>
            Cadastrar Novo Local!
          </Link>
        </p>
      </div>

      <h1 className={styles.texth1}>
        Esses são os locais cadastrados no  
        <span style={{ color: "var(--verdeLogo)" }}>
          <em> BuscaFit</em>
        </span>{" "}        
      </h1>

      {locations.length > 0 ? (
        locations.map((item) => (
          <Card key={item.id}>
            <div className={styles.divTitulo}>
              <h3>{item.nomeLocal}</h3>
              <p>
                {item.cidade}/{item.estado}
              </p>
            </div>

            <hr />
            <hr />

            <div className={styles.divConteudo}>
              <p className={styles.descricao}>{item.descricao}</p>
              <p className={styles.descricao}>
                Sugestões de atividades físicas nesse local:
              </p>

              <ul type={"circle"}>
                {teste2.length > 0 ? teste2.map((atividade, index) => (
                  <li key={index}>{atividade}</li>
                )) : <li>Caminhada</li>}
                {/* Se o usuário não marcar nada, vou exibir Caminhada */}
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
                    <Link to={item.linkMap}
                      target="_blank"
                      className={styles.linkMap}
                    >
                        Abrir com Google Maps
                    </Link>
                  </div>    
                </div>
              </div>
            </div>
          </Card>
        ))
      ): (
        <Card>
          <p>Sem dados para mostrar</p>
        </Card>
      )} 
    </div>
  );
}

export default Dashboard;
