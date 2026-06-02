import { Route , Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/loginPage'
import AdminPage from './pages/adminPage'
import Test from './pages/test'


function App() {
 
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/admin/*' element={<AdminPage/>} />
        <Route path='/test' element={<Test/>} />
      </Routes>
    </>
  )
}

export default App
