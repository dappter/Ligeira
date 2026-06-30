import { Bell, Search, User } from 'lucide-react'
import './Header.css'

export function Header() {
  return (
    <header className="admin-header">
      <div className="header-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Pesquisar no painel... (Ctrl+K)" />
      </div>
      
      <div className="header-actions">
        <button className="action-btn" title="Notificações">
          <Bell size={18} />
          <span className="badge">3</span>
        </button>
        <div className="user-profile">
          <div className="avatar">
            <User size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">Admin Ligeira</span>
            <span className="user-role">Gestor</span>
          </div>
          <button 
            className="action-btn" 
            title="Sair"
            onClick={() => {
              localStorage.removeItem('admin_logged')
              window.location.hash = '/login'
              window.location.reload()
            }}
            style={{ 
              marginLeft: '4px', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.2)', 
              color: '#f87171', 
              fontSize: '12px',
              fontWeight: 700,
              width: 'auto',
              padding: '0 12px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
