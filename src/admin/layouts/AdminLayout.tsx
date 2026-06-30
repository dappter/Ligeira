import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import './AdminLayout.css'

export function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content-wrapper">
        <Header />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
