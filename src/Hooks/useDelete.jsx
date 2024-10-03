import axios from 'axios'

export const useDeleteUser = async(id) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzI3ODkzMTExLCJleHAiOjE3MjgwNjU5MTF9.7tMsibjhrV3VW1SBkrMkWzHKWKiMB7Q7whmqr8lDSZ8'
    try {
        const response = await axios.delete(`http://localhost:3000/usuario/${id}`)

        console.log(`status: ${response.status}`) //Verificando o status

    } catch (error) {
        console.log(error)  
    }
}