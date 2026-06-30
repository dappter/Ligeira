import { useState, useEffect } from 'react'
import { DataTable } from '../../components/DataTable'
import { Plus, Trash2, X } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  author: string
  date: string
  status: string
}

const DEFAULT_POSTS: BlogPost[] = [
  { id: 1, title: 'Como a fibra óptica melhora a sua experiência em jogos online', author: 'Lara Alves', date: '25/06/2026', status: 'Publicado' },
  { id: 2, title: 'Guia definitivo: Como escolher a velocidade ideal de internet', author: 'Marcos Silva', date: '18/06/2026', status: 'Publicado' },
  { id: 3, title: 'Ligeira Telecom expande cobertura no interior de Milagres', author: 'Assessoria', date: '10/06/2026', status: 'Rascunho' },
]

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('Publicado')

  useEffect(() => {
    const saved = localStorage.getItem('admin_blog_posts')
    if (saved) {
      setPosts(JSON.parse(saved))
    } else {
      setPosts(DEFAULT_POSTS)
      localStorage.setItem('admin_blog_posts', JSON.stringify(DEFAULT_POSTS))
    }
  }, [])

  const saveToLocalStorage = (newList: BlogPost[]) => {
    setPosts(newList)
    localStorage.setItem('admin_blog_posts', JSON.stringify(newList))
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta postagem?')) {
      const updated = posts.filter(p => p.id !== id)
      saveToLocalStorage(updated)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !author) return

    const newPost: BlogPost = {
      id: Date.now(),
      title,
      author,
      date: new Date().toLocaleDateString('pt-BR'),
      status
    }

    saveToLocalStorage([...posts, newPost])
    setIsModalOpen(false)
    setTitle('')
    setAuthor('')
  }

  const columns = [
    { key: 'title', title: 'Título', render: (row: BlogPost) => <strong>{row.title}</strong> },
    { key: 'author', title: 'Autor' },
    { key: 'date', title: 'Data de Publicação' },
    { key: 'status', title: 'Status', render: (row: BlogPost) => (
      <span style={{
        padding: '4px 8px',
        borderRadius: '9999px',
        fontSize: '0.8rem',
        fontWeight: 600,
        backgroundColor: row.status === 'Publicado' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 191, 26, 0.1)',
        color: row.status === 'Publicado' ? 'var(--success)' : 'var(--brand-orange)'
      }}>
        {row.status}
      </span>
    ) }
  ]

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Artigos do Blog</h1>
          <p>Escreva, edite e gerencie os posts publicados no blog da Ligeira Telecom.</p>
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
          <Plus size={18} /> Novo Artigo
        </button>
      </div>
      
      <div className="page-content">
        <DataTable 
          data={posts} 
          columns={columns} 
          searchPlaceholder="Buscar artigos..." 
          actions={(row: BlogPost) => (
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
            <h2 style={{ marginBottom: '20px' }}>Novo Artigo</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Título do Post</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="Ex: Guia sobre velocidade de internet fibra"
                  required
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Autor</label>
                <input 
                  type="text" 
                  value={author} 
                  onChange={e => setAuthor(e.target.value)} 
                  placeholder="Ex: Equipe Ligeira"
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
                  <option value="Publicado">Publicado</option>
                  <option value="Rascunho">Rascunho</option>
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
                Publicar Artigo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
