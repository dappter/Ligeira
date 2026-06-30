export function Dashboard() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Visão geral do sistema</p>
      </div>
      <div className="page-content" style={{ display: 'grid', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="card glass" style={{ padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Visitantes Hoje</h3>
            <p style={{ fontSize: '2rem', fontWeight: '800', marginTop: '8px' }}>1,248</p>
            <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>+12% em relação a ontem</span>
          </div>
          <div className="card glass" style={{ padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Leads Capturados</h3>
            <p style={{ fontSize: '2rem', fontWeight: '800', marginTop: '8px' }}>42</p>
            <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>+5% em relação a ontem</span>
          </div>
          <div className="card glass" style={{ padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Consultas de Cobertura</h3>
            <p style={{ fontSize: '2rem', fontWeight: '800', marginTop: '8px' }}>356</p>
            <span style={{ color: 'var(--warning)', fontSize: '0.85rem' }}>-2% em relação a ontem</span>
          </div>
          <div className="card glass" style={{ padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Taxa de Conversão</h3>
            <p style={{ fontSize: '2rem', fontWeight: '800', marginTop: '8px' }}>3.4%</p>
            <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>+0.2% em relação a ontem</span>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div className="card glass" style={{ padding: '24px', borderRadius: '12px', minHeight: '300px' }}>
            <h3>Gráfico de Visitas (Simulado)</h3>
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Área reservada para Chart.js ou Recharts
            </div>
          </div>
          <div className="card glass" style={{ padding: '24px', borderRadius: '12px', minHeight: '300px' }}>
            <h3>Atividades Recentes</h3>
            <ul style={{ listStyle: 'none', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--brand-orange)' }}>João</strong> alterou o plano 500MB</li>
              <li style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--brand-orange)' }}>Sistema</strong> gerou backup</li>
              <li style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--brand-orange)' }}>Maria</strong> publicou um artigo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
