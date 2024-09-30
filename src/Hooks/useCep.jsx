import axios from 'axios'

async function useCep(cep){
    let data

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        data = response.data

        if(data.erro === 'true'){
            throw new Error('CEP inválido')
        }

    } catch(error) {
        console.log(error)
    }

    return { data}    
}

export default useCep