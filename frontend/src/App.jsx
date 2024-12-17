import './App.css'
import {Routes, Route} from 'react-router-dom'
import {StudentPage} from './pages/StudentPage.jsx'
import {TeacherPage} from './pages/TeacherPage.jsx'
import {RegistrationPage} from './pages/RegistrationPage.jsx'
import {LoginPage} from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage.jsx';
import '../src/styles/reset.css'


function App() {
    return (
        <>
            <Routes>
                < Route path='/student' element={<StudentPage/>}/>
                < Route path='/teacher' element={<TeacherPage/>}/>
                < Route path='/signup' element={<RegistrationPage/>}/>
                < Route path='/signin' element={<LoginPage/>}/>
                < Route path='/admin' element={<AdminPage/>}/>
            </Routes>
        </>
    )
}

export default App
