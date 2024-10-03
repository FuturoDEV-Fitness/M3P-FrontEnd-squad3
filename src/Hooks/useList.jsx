import axios from 'axios'
import { useState } from 'react'

export const useListUserId = async(id) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzI3ODkzMTExLCJleHAiOjE3MjgwNjU5MTF9.7tMsibjhrV3VW1SBkrMkWzHKWKiMB7Q7whmqr8lDSZ8'

    let data

    //na vida real esses dados virão pelo localStorage ou por decode Token

    try {
        const response = await axios.get(`http://localhost:3000/usuario/${id}`)	

        data = response.data

        console.log(`status: ${response.status}`)

    } catch (error) {
        console.log(error)
    }

    return { data }
}
