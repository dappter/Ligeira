import { useState, useEffect } from 'react'
import { DataTable } from '../../components/DataTable'
import { Check, X, Trash2, Plus } from 'lucide-react'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Form states
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState('5')

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

  const handleOpenAddModal = () => {
    setName('')
    setCity('')
    setContent('')
    setRating('5')
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !city || !content) return

    const newTestimonial: Testimonial = {
      id: Date.now(),
      name,
      city,
      content,
      rating: Number(rating),
      status: 'Aprovado'
    }
    
    // Add to beginning of list
    saveToLocalStorage([newTestimonial, ...testimonials])
    setIsModalOpen(false)
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
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Moderação de Depoimentos</h1>
          <p>Aprove, recuse ou adicione manualmente depoimentos para exibição na página inicial.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--brand-orange)',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Plus size={18} /> Novo Depoimento
        </button>
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

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="card glass" style={{
            width: '90%',
            maxWidth: '500px',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
            <h2 style={{ marginBottom: '20px' }}>Novo Depoimento</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Nome do Cliente</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Ex: João Silva"
                  required
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Cidade</label>
                <input 
                  type="text" 
                  value={city} 
                  onChange={e => setCity(e.target.value)} 
                  placeholder="Ex: Juazeiro do Norte"
                  required
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Depoimento</label>
                <textarea 
                  value={content} 
                  onChange={e => setContent(e.target.value)} 
                  placeholder="Escreva o depoimento..."
                  required
                  rows={4}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Avaliação (Estrelas)</label>
                <select 
                  value={rating} 
                  onChange={e => setRating(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.8)', color: 'white' }}
                >
                  <option value="5">5 Estrelas</option>
                  <option value="4">4 Estrelas</option>
                  <option value="3">3 Estrelas</option>
                  <option value="2">2 Estrelas</option>
                  <option value="1">1 Estrela</option>
                </select>
              </div>
              <button 
                type="submit"
                style={{
                  marginTop: '10px',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'var(--brand-orange)',
                  color: '#1a0066',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Adicionar Depoimento
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
