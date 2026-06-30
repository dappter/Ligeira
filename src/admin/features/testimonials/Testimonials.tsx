import { useState, useEffect } from 'react'
import { DataTable } from '../../components/DataTable'
import { Check, X, Trash2 } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  city: string
  content: string
  rating: number
  status: 'Pendente' | 'Aprovado' | 'Recusado'
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Marcos Silva', city: 'Juazeiro do Norte', content: 'Internet muito estável, suporte rápido pelo WhatsApp. Indico para todos no Cariri!', rating: 5, status: 'Aprovado' },
  { id: 2, name: 'Ana Souza', city: 'Brejo Santo', content: 'Instalação foi super rápida e o sinal de Wi-Fi é excelente em toda a casa.', rating: 5, status: 'Aprovado' },
  { id: 3, name: 'Carlos Santos', city: 'Milagres', content: 'Contratei o plano de 600 mega e está excelente. Os downloads são muito velozes.', rating: 4, status: 'Pendente' },
  { id: 4, name: 'Renata Lins', city: 'Mauriti', content: 'Tive um pequeno problema com a fatura mas resolveram rapidamente.', rating: 4, status: 'Pendente' },
]

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('admin_testimonials')
    if (saved) {
      setTestimonials(JSON.parse(saved))
    } else {
      setTestimonials(DEFAULT_TESTIMONIALS)
      localStorage.setItem('admin_testimonials', JSON.stringify(DEFAULT_TESTIMONIALS))
    }
  }, [])

  const saveToLocalStorage = (newList: Testimonial[]) => {
    setTestimonials(newList)
    localStorage.setItem('admin_testimonials', JSON.stringify(newList))
  }

  const handleApprove = (id: number) => {
    const updated = testimonials.map(t => 
      t.id === id ? { ...t, status: 'Aprovado' as const } : t
    )
    saveToLocalStorage(updated)
  }

  const handleReject = (id: number) => {
    const updated = testimonials.map(t => 
      t.id === id ? { ...t, status: 'Recusado' as const } : t
    )
    saveToLocalStorage(updated)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Deseja realmente excluir este depoimento?')) {
      const updated = testimonials.filter(t => t.id !== id)
      saveToLocalStorage(updated)
    }
  }

  const columns = [
    { key: 'name', title: 'Nome', render: (row: Testimonial) => <strong>{row.name}</strong> },
    { key: 'city', title: 'Cidade' },
    { key: 'content', title: 'Depoimento', render: (row: Testimonial) => (
      <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={row.content}>
        {row.content}
      </div>
    ) },
    { key: 'rating', title: 'Avaliação', render: (row: Testimonial) => (
      <span style={{ color: '#FFBF1A', fontWeight: 'bold' }}>{'★'.repeat(row.rating)}{'☆'.repeat(5 - row.rating)}</span>
    ) },
    { key: 'status', title: 'Status', render: (row: Testimonial) => {
      let bgColor = 'rgba(255, 191, 26, 0.1)'
      let color = 'var(--brand-orange)'
      if (row.status === 'Aprovado') {
        bgColor = 'rgba(16, 185, 129, 0.1)'
        color = 'var(--success)'
      } else if (row.status === 'Recusado') {
        bgColor = 'rgba(239, 68, 68, 0.1)'
        color = 'var(--error)'
      }
      return (
        <span style={{
          padding: '4px 8px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: 600,
          backgroundColor: bgColor,
          color: color
        }}>
          {row.status}
        </span>
      )
    } }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Moderação de Depoimentos</h1>
        <p>Aprove ou recuse os depoimentos enviados pelos clientes para exibição na página inicial.</p>
      </div>
      
      <div className="page-content">
        <DataTable 
          data={testimonials} 
          columns={columns} 
          searchPlaceholder="Buscar depoimentos..." 
          actions={(row: Testimonial) => (
            <>
              {row.status !== 'Aprovado' && (
                <button 
                  onClick={() => handleApprove(row.id)}
                  className="action-btn-small" 
                  style={{ background: 'rgba(16,185,129,0.1)', border: 'none', color: 'var(--success)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
                  title="Aprovar"
                >
                  <Check size={14} />
                </button>
              )}
              {row.status !== 'Recusado' && (
                <button 
                  onClick={() => handleReject(row.id)}
                  className="action-btn-small" 
                  style={{ background: 'rgba(255,191,26,0.1)', border: 'none', color: 'var(--brand-orange)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
                  title="Recusar"
                >
                  <X size={14} />
                </button>
              )}
              <button 
                onClick={() => handleDelete(row.id)}
                className="action-btn-small" 
                style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'var(--error)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
                title="Excluir"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        />
      </div>
    </div>
  )
}
