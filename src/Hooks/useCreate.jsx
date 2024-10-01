import axios from 'axios'

export const useCreateUser = async(dataUser) => {
    try {
        const response = await axios.post('http://localhost:3000/usuario', dataUser)

        console.log(`status: ${response.status}`) //Verificando o status

    } catch (error) {
        console.log(error)  
    }
}