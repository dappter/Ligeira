import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Lock, User, AlertCircle } from 'lucide-react'
import './Login.css'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.')
      return
    }
    // Simulate login success for any credentials
    localStorage.setItem('admin_logged', 'true')
    navigate('/')
  }

  return (
    <div className="login-container">
      <div className="login-card glass">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-bolt">⚡</div>
            <div className="logo-text">Ligeira<span>Telecom</span></div>
          </div>
          <p className="login-subtitle">Painel Administrativo — Acesso Restrito</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="input-group">
            <label htmlFor="username">Usuário</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="login-btn btn-orange">
            <Shield size={18} />
            <span>Entrar no Painel</span>
          </button>
        </form>
      </div>
    </div>
  )
}
