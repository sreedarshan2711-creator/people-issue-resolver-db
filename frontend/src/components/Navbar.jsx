import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const isAdmin = localStorage.getItem('adminLoggedIn') === 'true'
  const citizenMobile = localStorage.getItem('citizenMobile')

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('citizenMobile')
    localStorage.removeItem('citizenName')
    navigate('/')
    setMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">⚖️</span>
          <span className="brand-name">PeopleVoice</span>
        </Link>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        {!isAdmin && !citizenMobile && (
          <li>
            <Link to="/login" className={isActive('/login') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </li>
        )}
        {citizenMobile && !isAdmin && (
          <>
            <li>
              <Link to="/register-complaint" className={isActive('/register-complaint') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                File Complaint
              </Link>
            </li>
            <li>
              <Link to="/citizen-dashboard" className={isActive('/citizen-dashboard') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                My Complaints
              </Link>
            </li>
          </>
        )}
        {isAdmin && (
          <li>
            <Link to="/admin-dashboard" className={isActive('/admin-dashboard') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Admin Panel
            </Link>
          </li>
        )}
        {(isAdmin || citizenMobile) && (
          <li>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
