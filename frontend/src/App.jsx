import './App.css'
import { Routes, Route } from 'react-router-dom'
import { StudentPage } from './pages/StudentPage.jsx'
import { RegistrationPage } from './pages/RegistrationPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import '../src/styles/reset.css'


function App() {
  return(
    <>
    <Routes>
          < Route path='/student' element={<StudentPage />} />
          < Route path='/signup' element={<RegistrationPage />} />
          < Route path='/login' element={<LoginPage />} />
    </Routes>
    </>
  )
}

export default App
