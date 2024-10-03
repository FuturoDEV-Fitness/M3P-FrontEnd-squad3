import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useContext } from 'react';

//Páginas
import App from '../App.jsx';
import Dashboard from '../Pages/Home/Dashboard.jsx';
import Login from '../Pages/Login/Login.jsx';
import NewUser from '../Pages/RegisterUser/NewUser.jsx';
import MyAccount from '../Pages/MyAccount/MyAccount.jsx';
import EditUser from '../Pages/EditUser/EditUser.jsx';

import NewLocation from '../Pages/RegisterLocation/NewLocation.jsx';

import { AuthContext } from '../Context/AuthContext.jsx';

// const PrivateRoute = ({ children}) => {
//     const { logged } = useContext(AuthContext)
//     return logged ? children : <Navigate to='/login' replace />
// }

const PrivateRoute = ({ children}) => {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to='/login' replace />
}

const routers = createBrowserRouter([
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
        element: <NewUser />
    },

    {
        path: '/',
        element: (<PrivateRoute> <App /> </PrivateRoute>),
        children: [
            {
                path: "/minhaConta",
                element: <MyAccount />
            },
            {
                path: "/editarUsuario",
                element: <EditUser />
            },
            {
                path: "/novoLocal",
                element: <NewLocation />
            }
        ]
    }
])

export default routers