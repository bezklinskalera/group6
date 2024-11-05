import './App.css'
import { Routes, Route } from 'react-router-dom'
import { StudentPage } from './pages/StudentPage.jsx'
import { RegistrationPage } from './pages/SignUp.jsx'


function App() {
  return(
    <>
    <Routes>
          <Route path="/student" element={<StudentPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
    </Routes>
    </>
  )
}

export default App
