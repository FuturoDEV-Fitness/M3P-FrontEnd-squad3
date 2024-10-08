import axios from "axios";

const host = 'https://m3p-backend-squad3-p7i7.onrender.com'

export const useDeleteUser = async () => {
  //`http://localhost:3000/usuarios/${id}`
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  try {
    const response = await axios.delete(
      `${host}/usuarios/${id}`,
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

export const useDeleteLocation = async (id) => {
  //`http://localhost:3000/locais/${id}`
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${host}/locais/${id}`, 
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`status: ${response.status}`); //Verificando o status
  } catch (error) {
    console.log(error);
  }
};
