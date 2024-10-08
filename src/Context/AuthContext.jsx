import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useEditUser } from "../Hooks/useEdit";

const host = 'https://m3p-backend-squad3-p7i7.onrender.com'

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState({
    userId: null, //id do usuário
    userToken: null, //token do usuário
    userName: null, //nome do usuário
  });

  const [logged, setLogged] = useState(false); //verifica se o usuário está logado

  //Validando se token não expirou
  function validateToken(token) {
    try {
      const decodedToken = jwtDecode(token);
      //console.log(decodedToken)
      const currentTime = Date.now() / 1000;

      return decodedToken.exp > currentTime; //true or false
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function logoutSession() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setSession({
      ...session,
      userToken: null,
      userId: null,
      userName: null,
    });

    setLogged(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    //Verificando se veio o token ne se ele é válido
    if (token && validateToken(token)) {
      setLogged(true);
      setSession({
        ...session,
        userToken: token,
        userId: userId,
        userName: userName,
      });
      localStorage.setItem("isLogged", true);

      try {
        //tenta decodificar o token
        const decodedToken = jwtDecode(token);
      } catch (error) {
        logoutSession();
      }
    } else {
      logoutSession();
    }
  }, []); //1ª renderização

  async function login(data) {
    //"http://localhost:3000/autentic/login"
    try {
      const response = await axios.post(
        `${host}/autentic/login`,
        data
      );

      if (!!response && response.status === 200) {
        //no token que vem do backend está incluso nome e id do usuário
        const { token, usuarioId, usuarioName } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", JSON.stringify(usuarioId));
        localStorage.setItem("userName", JSON.stringify(usuarioName));

        setSession({
          ...session,
          userToken: token,
          userId: usuarioId,
          userName: usuarioName,
        });

        setLogged(true);

        const data = {"isLog": "true"}

        await useEditUser(data)

        alert("Login efetuado com sucesso");
        window.location.href = "/";

      } else {
        throw new Error("Erro ao efetuar login");
      }
    }

    catch (error) {
      console.log(error)
      // Verifica se o erro tem uma resposta para capturar o status
      if (error.response) {
        alert(`${error.response.data.mensagem}`);
        return
      } 
    }
  }

  return (
    <AuthContext.Provider value={{ login, logged }}>
      {children}
    </AuthContext.Provider>
  );
};
