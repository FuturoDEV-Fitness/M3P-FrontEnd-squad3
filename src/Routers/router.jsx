import { createBrowserRouter } from 'react-router-dom';

import App from '../App.jsx';
import Dashboard from '../Pages/Home/Dashboard.jsx';
import Login from '../Pages/Login/Login.jsx';
import NovoUsuario from '../Pages/Cadastro/NovoUsuario.jsx';
import MyAccount from '../Pages/MyAccount/MyAccount.jsx';
import EditUser from '../Pages/EditUser/EditUser.jsx';

import ListPlace from '../Pages/ListPlaces/ListPlaces.jsx';

const routers = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/novoUsuario",
                element: <NovoUsuario />
            },
            {
                path: "/listaLocais",
                element: <ListPlace />
            },
            {
                path: "/minhaConta",
                element: <MyAccount />
            },
            {
                path: "/editarMinhaConta",
                element: <EditUser />
            }
        ]
    }
])

export default routers