import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Dashboard from './pages/Dashboard'
import PostApplication from './pages/PostApplication'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/post/application/:jobId' element={<PostApplication />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
