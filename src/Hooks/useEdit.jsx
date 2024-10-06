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
  //const navigate = useNavigate()
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

    if (response.status === 200) {
      alert("Alterado com sucesso!");
    }
  } catch (error) {
    alert("Erro ao alterar local!");
    console.log(error);
  }
};

// export const useLogout = async (dataUser) => {
//   const token = localStorage.getItem("token");
//   const logout = localStorage.getItem("userId");

//   try {
//     const response = await axios.post(
//       `http://localhost:3000/usuarios/${logout}`,
//       dataUser,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log(`status: ${response.status}`);
//   } catch (error) {
//     console.error(error);
//     alert("Não possível logout front");
//   }
// };
