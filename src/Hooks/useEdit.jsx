import axios from "axios";

export const useEditUser = async (dataUser) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  try {
    const response = await axios.put(
      `http://localhost:3000/usuarios/${id}`,
      dataUser,
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
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `http://localhost:3000/locais/${id}`,
      dataLocation,
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
