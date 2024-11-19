import './App.css'
import { Routes, Route } from 'react-router-dom'
import { StudentPage } from './pages/StudentPage.jsx'
import { TeacherPage } from './pages/TeacherPage.jsx'


function App() {
  return(
    <>
    <Routes>
          <Route path="/student" element={<StudentPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
    </Routes>
    </>
  )
}

export default App
