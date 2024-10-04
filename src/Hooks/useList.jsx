import axios from 'axios'
import { useState } from 'react'

export const useListUserId = async() => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userId')

    let data

    try {
        const response = await axios.get(`http://localhost:3000/usuario/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })	

        data = response.data

        console.log(`status: ${response.status}`)

    } catch (error) {
        console.log(error)
    }

    return { data }
}

export const useListAllLocation = async() => {
    //Todos os locais do usuário que está logado no sistema
    const token = localStorage.getItem('token')

    let data

    try {
        const response = await axios.get('http://localhost:3000/local', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })	

        data = response.data

        console.log(`status: ${response.status}`)

    } catch (error) {
        console.log(error)
    }

    return { data }
}
