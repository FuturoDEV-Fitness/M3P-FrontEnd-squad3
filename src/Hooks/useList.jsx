import axios from 'axios'
import { useState } from 'react'

export const useListUserId = async() => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userId')

    let data

    try {
        const response = await axios.get(`http://localhost:3000/usuario/${id}`)	

        data = response.data

        console.log(`status: ${response.status}`)

    } catch (error) {
        console.log(error)
    }

    return { data }
}
