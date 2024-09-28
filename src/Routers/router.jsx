import { createBrowserRouter } from 'react-router-dom'

import Login from '../Pages/Login/Login.jsx'
import NovoUsuario from '../Pages/Cadastro/NovoUsuario.jsx'
import App from '../App.jsx'

const routers = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/novoUsuario",
                element: <NovoUsuario />
            }
        ]
    }
])

export default routers