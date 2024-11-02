import './App.css'
import { Routes, Route } from 'react-router-dom'
import { StudentPage } from './pages/StudentPage.jsx'


function App() {
  return(
    <>
    <Routes>
          <Route path="/student" element={<StudentPage />} />
    </Routes>
    </>
  )
}

export default App
