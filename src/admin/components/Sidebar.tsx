import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, Megaphone, Tags, Wifi, Map, 
  MapPin, FileText, MessageSquare, Image, 
  Search, BarChart2, Target, FileBarChart, 
  Settings, Activity
} from 'lucide-react'
import './Sidebar.css'

export function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Marketing', path: '/marketing', icon: <Megaphone size={20} /> },
    { name: 'Ofertas', path: '/offers', icon: <Tags size={20} /> },
    { name: 'Planos', path: '/plans', icon: <Wifi size={20} /> },
    { name: 'Cobertura', path: '/coverage', icon: <MapPin size={20} /> },
    { name: 'Mapa de Demanda', path: '/demand-map', icon: <Map size={20} /> },
    { name: 'Blog', path: '/blog', icon: <FileText size={20} /> },
    { name: 'Depoimentos', path: '/testimonials', icon: <MessageSquare size={20} /> },
    { name: 'Mídia', path: '/media', icon: <Image size={20} /> },
    { name: 'SEO', path: '/seo', icon: <Search size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Campanhas', path: '/campaigns', icon: <Target size={20} /> },
    { name: 'Relatórios', path: '/reports', icon: <FileBarChart size={20} /> },
    { name: 'Configurações', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Logs', path: '/logs', icon: <Activity size={20} /> },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img
          src="/src/images/LIGEIRA LOGO HORIZONTAL - FUNDO ROXO.png"
          alt="Ligeira Telecom"
          className="sidebar-logo-img"
        />
        <span className="sidebar-badge">Admin</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end={item.path === '/'}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p className="sidebar-footer-text">Ligeira Telecom © 2026</p>
      </div>
    </aside>
  )
}
