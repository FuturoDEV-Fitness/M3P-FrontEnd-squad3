import axios from 'axios'

export const useEditUser = async(dataUser) => {
    const token = localStorage.getItem('token')
    id = localStorage.getItem('userId')
    
    try {
        const response = await axios.put(`http://localhost:3000/usuario/${id}`, dataUser)

        console.log(`status: ${response.status}`) //Verificando o status

    } catch (error) {
        console.log(error)  
    }
}