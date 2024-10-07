import { Outlet } from 'react-router-dom'
import MyComponent from './Service/MyComponent'

import './App.css'
function App() {

  return (
    <>
      <Outlet />
      <MyComponent />
    </>
  )
}

export default App
