import { Outlet } from 'react-router-dom'
import MyComponent from './Service/MyComponent.jsx'

import './App.css'
function App() {

  return (
    <>
    
      <MyComponent />
      <Outlet />
      
    </>
  )
}

export default App
