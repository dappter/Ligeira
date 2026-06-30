import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AdminLayout } from './layouts/AdminLayout'
import { Login } from './features/login/Login'
import { Dashboard } from './features/dashboard/Dashboard'
import { Marketing } from './features/marketing/Marketing'
import { Offers } from './features/offers/Offers'
import { Plans } from './features/plans/Plans'
import { Media } from './features/media/Media'
import { Coverage } from './features/coverage/Coverage'
import { DemandMap } from './features/demandMap/DemandMap'
import { Blog } from './features/blog/Blog'
import { Testimonials } from './features/testimonials/Testimonials'
import { SEO } from './features/seo/SEO'
import { Analytics } from './features/analytics/Analytics'
import { Campaigns } from './features/campaigns/Campaigns'
import { Reports } from './features/reports/Reports'
import { Settings } from './features/settings/Settings'
import { Logs } from './features/logs/Logs'

function AuthGuard() {
  const isLogged = localStorage.getItem('admin_logged') === 'true'
  return isLogged ? <Outlet /> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AuthGuard />}>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="offers" element={<Offers />} />
          <Route path="plans" element={<Plans />} />
          <Route path="coverage" element={<Coverage />} />
          <Route path="demand-map" element={<DemandMap />} />
          <Route path="blog" element={<Blog />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="media" element={<Media />} />
          <Route path="seo" element={<SEO />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logs" element={<Logs />} />
        </Route>
      </Route>
    </Routes>
  )
}
