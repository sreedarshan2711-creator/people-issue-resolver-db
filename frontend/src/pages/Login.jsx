import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' }

function Login() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('citizen')
  const [citizenForm, setCitizenForm] = useState({ mobile: '', name: '' })
  const [adminForm, setAdminForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const validateCitizen = () => {
    const errs = {}
    if (!citizenForm.name.trim()) errs.name = 'Name is required'
    if (!/^[6-9]\d{9}$/.test(citizenForm.mobile)) errs.mobile = 'Enter a valid 10-digit mobile number'
    return errs
  }

  const validateAdmin = () => {
    const errs = {}
    if (!adminForm.username.trim()) errs.username = 'Username is required'
    if (!adminForm.password) errs.password = 'Password is required'
    return errs
  }

  const handleCitizenLogin = (e) => {
    e.preventDefault()
    const errs = validateCitizen()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('citizenMobile', citizenForm.mobile)
      localStorage.setItem('citizenName', citizenForm.name)
      setLoading(false)
      navigate('/citizen-dashboard')
    }, 600)
  }

  const handleAdminLogin = (e) => {
    e.preventDefault()
    const errs = validateAdmin()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      if (adminForm.username === ADMIN_CREDENTIALS.username && adminForm.password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('adminLoggedIn', 'true')
        setLoading(false)
        navigate('/admin-dashboard')
      } else {
        setErrors({ auth: 'Invalid admin credentials' })
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-icon">⚖️</span>
          <h1>Welcome Back</h1>
          <p>Sign in to access your portal</p>
        </div>

        <div className="tab-group">
          <button className={`tab-btn ${activeTab === 'citizen' ? 'active' : ''}`} onClick={() => { setActiveTab('citizen'); setErrors({}); setMessage('') }}>
            👤 Citizen
          </button>
          <button className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => { setActiveTab('admin'); setErrors({}); setMessage('') }}>
            🛡️ Admin
          </button>
        </div>

        {activeTab === 'citizen' ? (
          <form onSubmit={handleCitizenLogin} className="auth-form">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={citizenForm.name}
                onChange={(e) => { setCitizenForm({ ...citizenForm, name: e.target.value }); setErrors({}) }}
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Mobile Number *</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={citizenForm.mobile}
                maxLength={10}
                onChange={(e) => { setCitizenForm({ ...citizenForm, mobile: e.target.value }); setErrors({}) }}
                className={errors.mobile ? 'input-error' : ''}
              />
              {errors.mobile && <span className="error-msg">{errors.mobile}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In as Citizen'}
            </button>
            <p className="auth-hint">No account needed — your mobile number is your identity.</p>
          </form>
        ) : (
          <form onSubmit={handleAdminLogin} className="auth-form">
            <div className="auth-notice">
              <strong>🔑 Admin Access</strong>
              <p>Username: <code>admin</code> &nbsp; Password: <code>admin123</code></p>
            </div>
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                placeholder="Admin username"
                value={adminForm.username}
                onChange={(e) => { setAdminForm({ ...adminForm, username: e.target.value }); setErrors({}) }}
                className={errors.username ? 'input-error' : ''}
              />
              {errors.username && <span className="error-msg">{errors.username}</span>}
            </div>
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                placeholder="Admin password"
                value={adminForm.password}
                onChange={(e) => { setAdminForm({ ...adminForm, password: e.target.value }); setErrors({}) }}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>
            {errors.auth && <div className="error-banner">{errors.auth}</div>}
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In as Admin'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
