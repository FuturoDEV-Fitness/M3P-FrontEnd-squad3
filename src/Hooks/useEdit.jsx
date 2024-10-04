import axios from 'axios'

export const useEditUser = async(id, dataUser) => {
    const token = localStorage.getItem('token')

    try {
        const response = await axios.put(`http://localhost:3000/usuario/${id}`, dataUser, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(`status: ${response.status}`) //Verificando o status

    } catch (error) {
        console.log(error)  
    }
}

export const useEditLocation = async(id, dataLocation) => {
    const token = localStorage.getItem('token')

    try {
        const response = await axios.put(`http://localhost:3000/local/${id}`, dataLocation, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(`status: ${response.status}`) //Verificando o status

    } catch (error) {
        console.log(error)  
    }
}