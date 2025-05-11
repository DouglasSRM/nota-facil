import './styles/App.css'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signin from './pages/Signin'
import { ProtectRoute } from './pages/ProtectRoute'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element = {<Login/>}/>
              
              <Route path="/home" element={
                <ProtectRoute>
                  <Home/>
               </ProtectRoute>
              }/> 

            <Route path="/signin" element = {<Signin/>}/> 
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
