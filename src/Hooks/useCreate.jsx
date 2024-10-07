import axios from "axios";

export const useCreateUser = async (dataUser) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/autentic/cadastroUsuario",
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
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:3000/locais",
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
