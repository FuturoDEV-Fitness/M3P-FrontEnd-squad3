import axios from 'axios'

export const useDeleteUser = async() => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userId')
    
    try {
        const response = await axios.delete(`http://localhost:3000/usuario/${id}`)

        console.log(`status: ${response.status}`) //Verificando o status

    } catch (error) {
        console.log(error)  
    }
}

export const useDeleteLocation = async(id) => {
    const token = localStorage.getItem('token')
    
    try {
        const response = await axios.delete(`http://localhost:3000/local/${id}`)

        console.log(`status: ${response.status}`) //Verificando o status

    } catch (error) {
        console.log(error)  
    }
}