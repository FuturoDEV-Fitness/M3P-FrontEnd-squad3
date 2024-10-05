import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Map from "../../Components/Map/Map";

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
        <h1>Exercite</h1>
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
        <span style={{ color: "var(--verdeLogo)" }}>
          <em>Exercite</em>
        </span>{" "}
        essa ideia e junte-se aos nossos usuarios!
      </h1>
    </div>
  );
}

export default Dashboard;
