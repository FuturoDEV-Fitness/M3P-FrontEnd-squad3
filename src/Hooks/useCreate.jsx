import axios from "axios";

const host = 'https://m3p-backend-squad3-p7i7.onrender.com'

export const useCreateUser = async (dataUser) => {
  //"http://localhost:3000/autentic/cadastroUsuario"
  try {
    const response = await axios.post(
      `${host}/autentic/cadastroUsuario`,
      dataUser
    );

    if(response.status === 201) {
      alert('Usuário cadastrado com sucesso!')
    }

    console.log(`status: ${response.status}`); //Verificando o status
  }

  catch (error) {
    console.log(error)
    // Verifica se o erro tem uma resposta para capturar o status
    if (error.response) {
      alert(`${error.response.data.mensagem}`);
      return
    } 
  }
};

export const useCreateLocation = async (dataLocation) => {
  //"http://localhost:3000/locais"
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${host}/locais`,
      dataLocation,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if(response.status === 201) {
      alert('Usuário cadastrado com sucesso!')
    }

    console.log(`status: ${response.status}`); //Verificando o status
    
  } catch (error) {
    console.log(error)
    // Verifica se o erro tem uma resposta para capturar o status
    if (error.response) {
      alert(`${error.response.data.mensagem}`);
      return
    } 
  }
};
