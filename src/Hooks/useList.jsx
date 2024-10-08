import axios from "axios";

const host = 'https://m3p-backend-squad3-p7i7.onrender.com'

export const useListUserId = async () => {
  //`http://localhost:3000/usuarios/${id}`
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  let data;

  try {
    const response = await axios.get(
      `${host}/usuarios/${id}`,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    data = response.data;

    console.log(`status: ${response.status}`);
  } catch (error) {
    console.log(error);
  }

  return { data };
};

export const useListAllUser = async () => {
  //"http://localhost:3000/autentic/listarTodosUsu"
  const token = localStorage.getItem("token");
  let data;
  try {
    const response = await axios.get(
      `${host}autentic/listarTodosUsu`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    data = response.data;

    console.log(`status: ${response.status}`);
  } catch (error) {
    console.log(error);
  }

  return { data };
};

export const useListAllLocation = async () => {
  //Todos os locais do usuário que está logado no sistema
  //"http://localhost:3000/locais/seus-locais"
  const token = localStorage.getItem("token");

  let data;

  try {
    const response = await axios.get(
      `${host}/locais/seus-locais`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    data = response.data;

    console.log(`status: ${response.status}`);
  } catch (error) {
    console.log(error);
  }

  return { data };
};

export const useListAll = async () => {
  //"http://localhost:3000/locais-publi/getAll"
  let data;
  try {
    const response = await axios.get(
      `${host}/locais-publi/getAll`
    );

    data = response.data;

    console.log(`status: ${response.status}`);
  } catch (error) {
    console.log(error);
  }

  return { data };
};
