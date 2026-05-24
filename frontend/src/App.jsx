import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import ComplaintForm from './pages/ComplaintForm'
import CitizenDashboard from './pages/CitizenDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ComplaintDetails from './pages/ComplaintDetails'

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-complaint" element={<ComplaintForm />} />
          <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/complaint/:id" element={<ComplaintDetails />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
