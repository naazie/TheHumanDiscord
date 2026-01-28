import React from 'react'
import LoginPage from './components/auth/LoginPage.jsx'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './components/auth/RegisterPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './components/HomePage.jsx'

function App() {
  return (
    <>
    <Routes>
      <Route
        path="/"
        element={
          <div className='bg-[#21141E] min-h-screen w-screen'>
            <h1 className="text-violet-300 font-extrabold">
              Hellooo Babyyyy
            </h1>
          </div>
        }
      />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/home' element={
        <ProtectedRoute>
          <HomePage/>
        </ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App