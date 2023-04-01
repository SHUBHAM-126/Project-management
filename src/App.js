import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'
import { useState } from 'react'


function App() {

  const { user, authIsReady, darkMode } = useAuthContext()

  const [mobMenu, setMobMenu] = useState(false)

  return (
    <div className={darkMode? "App darkmode" : "App"}>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar MenuState={mobMenu} SetMenuState={setMobMenu}/>}
          <div className='container'>
            <Navbar SetMenuState={setMobMenu} MenuState={mobMenu} />
            <Routes>
              <Route exact path='/' element={user ? <Dashboard/> : <Navigate to='/login'/>}/>
              <Route path='/create' element={user ? <Create/> : <Navigate to='/login'/>} />
              <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>} />
              <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>} />
              <Route path='/projects/:id' element={user ? <Project /> : <Navigate to='/login'/>} />
            </Routes>
          </div>
          {user && <OnlineUsers/>}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
