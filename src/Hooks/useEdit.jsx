import axios from "axios";

const host = 'https://m3p-backend-squad3-p7i7.onrender.com'

export const useEditUser = async (dataUser) => {
  //`http://localhost:3000/usuarios/${id}`
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  try {
    const response = await axios.put(
      `${host}/usuarios/${id}`, dataUser,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(`status: ${response.status}`); //Verificando o status
  } catch (error) {
    console.log(error);
  }
};

export const useEditLocation = async (id, dataLocation) => {
  //`http://localhost:3000/locais/${id}`
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${host}/locais/${id}`, dataLocation,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(`status: ${response.status}`); //Verificando o status

    if (response.status === 200) {
      alert("Alterado com sucesso!");
    }
  } catch (error) {
    alert("Erro ao alterar local!");
    console.log(error);
  }
};