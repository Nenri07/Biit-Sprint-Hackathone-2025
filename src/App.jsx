import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUpPage from './pages/Signup'
import LoginPage from './pages/loginpage'

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<SignUpPage />} />
    </Routes>
  )
}

export default App
