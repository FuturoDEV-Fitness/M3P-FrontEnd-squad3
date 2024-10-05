import axios from "axios";

export const useCreateUser = async (dataUser) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/autentic/cadastroUsuario",
      dataUser
    );

    console.log(`status: ${response.status}`); //Verificando o status
  } catch (error) {
    console.log(error);
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

    console.log(`status: ${response.status}`); //Verificando o status
  } catch (error) {
    console.log(error);
  }
};
