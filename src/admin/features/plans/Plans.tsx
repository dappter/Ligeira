import { useState, useEffect } from 'react'
import { DataTable } from '../../components/DataTable'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

interface Plan {
  id: number
  name: string
  speed: string
  price: string
  status: string
}

const DEFAULT_PLANS = [
  { id: 1, name: 'Ligeira 300 Mega', speed: '300Mbps', price: 'R$ 69,90', status: 'Ativo' },
  { id: 2, name: 'Ligeira 400 Mega', speed: '400Mbps', price: 'R$ 74,90', status: 'Ativo' },
  { id: 3, name: 'Ligeira 600 Mega', speed: '600Mbps', price: 'R$ 83,90', status: 'Ativo' },
  { id: 4, name: 'Ligeira 800 Mega', speed: '800Mbps', price: 'R$ 99,90', status: 'Ativo' },
]

export function Plans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  
  // Form states
  const [name, setName] = useState('')
  const [speed, setSpeed] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState('Ativo')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('admin_plans')
    if (saved) {
      setPlans(JSON.parse(saved))
    } else {
      setPlans(DEFAULT_PLANS)
      localStorage.setItem('admin_plans', JSON.stringify(DEFAULT_PLANS))
    }
  }, [])

  const saveToLocalStorage = (newPlans: Plan[]) => {
    setPlans(newPlans)
    localStorage.setItem('admin_plans', JSON.stringify(newPlans))
  }

  const handleOpenAddModal = () => {
    setEditingPlan(null)
    setName('')
    setSpeed('')
    setPrice('')
    setStatus('Ativo')
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (plan: Plan) => {
    setEditingPlan(plan)
    setName(plan.name)
    setSpeed(plan.speed)
    setPrice(plan.price)
    setStatus(plan.status)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      const updated = plans.filter(p => p.id !== id)
      saveToLocalStorage(updated)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !speed || !price) return

    if (editingPlan) {
      // Edit
      const updated = plans.map(p => 
        p.id === editingPlan.id ? { ...p, name, speed, price, status } : p
      )
      saveToLocalStorage(updated)
    } else {
      // Add
      const newPlan: Plan = {
        id: Date.now(),
        name,
        speed,
        price,
        status
      }
      saveToLocalStorage([...plans, newPlan])
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'name', title: 'Nome do Plano', render: (row: Plan) => <strong>{row.name}</strong> },
    { key: 'speed', title: 'Velocidade' },
    { key: 'price', title: 'Preço' },
    { key: 'status', title: 'Status', render: (row: Plan) => (
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
          <h1>Gestão de Planos</h1>
          <p>Cadastre e edite os planos de internet oferecidos.</p>
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
          <Plus size={18} /> Novo Plano
        </button>
      </div>
      
      <div className="page-content">
        <DataTable 
          data={plans} 
          columns={columns} 
          searchPlaceholder="Buscar planos..." 
          actions={(row: Plan) => (
            <>
              <button 
                onClick={() => handleOpenEditModal(row)}
                className="action-btn-small" 
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
                title="Editar"
              >
                <Edit2 size={14} />
              </button>
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
            <h2 style={{ marginBottom: '20px' }}>{editingPlan ? 'Editar Plano' : 'Novo Plano'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Nome do Plano</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Ex: Ligeira 500 Mega"
                  required
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Velocidade</label>
                <input 
                  type="text" 
                  value={speed} 
                  onChange={e => setSpeed(e.target.value)} 
                  placeholder="Ex: 500Mbps"
                  required
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Preço</label>
                <input 
                  type="text" 
                  value={price} 
                  onChange={e => setPrice(e.target.value)} 
                  placeholder="Ex: R$ 99,90"
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
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
