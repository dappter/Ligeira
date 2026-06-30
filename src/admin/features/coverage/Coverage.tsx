import { useState, useEffect } from 'react'
import { DataTable } from '../../components/DataTable'
import { Plus, Trash2, X } from 'lucide-react'

interface CoverageItem {
  id: number
  city: string
  neighborhood: string
  cepRange: string
  status: string
}

const DEFAULT_COVERAGE: CoverageItem[] = [
  { id: 1, city: 'Juazeiro do Norte', neighborhood: 'Centro', cepRange: '63010-000 - 63010-999', status: 'Ativo' },
  { id: 2, city: 'Brejo Santo', neighborhood: 'Alto da Bela Vista', cepRange: '63250-000 - 63250-999', status: 'Ativo' },
  { id: 3, city: 'Mauriti', neighborhood: 'Centro', cepRange: '63260-000 - 63260-999', status: 'Ativo' },
  { id: 4, city: 'Milagres', neighborhood: 'Centro', cepRange: '63280-000 - 63280-999', status: 'Ativo' },
  { id: 5, city: 'Penaforte', neighborhood: 'Centro', cepRange: '63290-000 - 63290-999', status: 'Ativo' },
]

export function Coverage() {
  const [coverageList, setCoverageList] = useState<CoverageItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Form states
  const [city, setCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [cepRange, setCepRange] = useState('')
  const [status, setStatus] = useState('Ativo')

  useEffect(() => {
    const saved = localStorage.getItem('admin_coverage')
    if (saved) {
      setCoverageList(JSON.parse(saved))
    } else {
      setCoverageList(DEFAULT_COVERAGE)
      localStorage.setItem('admin_coverage', JSON.stringify(DEFAULT_COVERAGE))
    }
  }, [])

  const saveToLocalStorage = (newList: CoverageItem[]) => {
    setCoverageList(newList)
    localStorage.setItem('admin_coverage', JSON.stringify(newList))
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Deseja realmente remover esta área de cobertura?')) {
      const updated = coverageList.filter(item => item.id !== id)
      saveToLocalStorage(updated)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!city || !neighborhood || !cepRange) return

    const newItem: CoverageItem = {
      id: Date.now(),
      city,
      neighborhood,
      cepRange,
      status
    }

    saveToLocalStorage([...coverageList, newItem])
    setIsModalOpen(false)
    setCity('')
    setNeighborhood('')
    setCepRange('')
  }

  const columns = [
    { key: 'city', title: 'Cidade', render: (row: CoverageItem) => <strong>{row.city}</strong> },
    { key: 'neighborhood', title: 'Bairro' },
    { key: 'cepRange', title: 'Faixa de CEP' },
    { key: 'status', title: 'Status', render: (row: CoverageItem) => (
      <span style={{
        padding: '4px 8px',
        borderRadius: '9999px',
        fontSize: '0.8rem',
        fontWeight: 600,
        backgroundColor: row.status === 'Ativo' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        color: row.status === 'Ativo' ? 'var(--success)' : 'var(--error)'
      }}>
        {row.status}
      </span>
    ) }
  ]

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Gestão de Cobertura</h1>
          <p>Gerencie as cidades e faixas de CEP atendidas pela Ligeira Telecom.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
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
          <Plus size={18} /> Nova Área
        </button>
      </div>
      
      <div className="page-content">
        <DataTable 
          data={coverageList} 
          columns={columns} 
          searchPlaceholder="Buscar cidades ou bairros..." 
          actions={(row: CoverageItem) => (
            <button 
              onClick={() => handleDelete(row.id)}
              className="action-btn-small" 
              style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'var(--error)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
              title="Excluir"
            >
              <Trash2 size={14} />
            </button>
          )}
        />
      </div>

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
            <h2 style={{ marginBottom: '20px' }}>Nova Área de Cobertura</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Bairro</label>
                <input 
                  type="text" 
                  value={neighborhood} 
                  onChange={e => setNeighborhood(e.target.value)} 
                  placeholder="Ex: Triângulo"
                  required
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Faixa de CEP</label>
                <input 
                  type="text" 
                  value={cepRange} 
                  onChange={e => setCepRange(e.target.value)} 
                  placeholder="Ex: 63040-000 - 63040-999"
                  required
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Status</label>
                <select 
                  value={status} 
                  onChange={e => setStatus(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.8)', color: 'white' }}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
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
                Cadastrar Área
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
