import { ReactNode } from 'react'
import { ChevronLeft, ChevronRight, Search, MoreVertical } from 'lucide-react'
import './DataTable.css'

interface Column<T> {
  key: string
  title: string
  render?: (row: T) => ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchPlaceholder?: string
  actions?: (row: T) => ReactNode
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchPlaceholder = 'Buscar...',
  actions
}: DataTableProps<T>) {
  return (
    <div className="datatable-container card">
      <div className="datatable-toolbar">
        <div className="datatable-search">
          <Search size={18} className="text-muted" />
          <input type="text" placeholder={searchPlaceholder} />
        </div>
        <div className="datatable-filters">
          {/* Filters would go here */}
        </div>
      </div>
      
      <div className="datatable-table-wrapper">
        <table className="datatable">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>{col.title}</th>
              ))}
              {actions && <th style={{ width: '80px', textAlign: 'center' }}>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="datatable-empty">
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              data.map(row => (
                <tr key={row.id}>
                  {columns.map(col => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td style={{ textAlign: 'center' }}>
                      <div className="datatable-actions-inline" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="datatable-pagination">
        <span className="pagination-info">Mostrando 1 a {data.length} de {data.length} registros</span>
        <div className="pagination-controls">
          <button disabled><ChevronLeft size={18} /></button>
          <button className="active">1</button>
          <button disabled><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  )
}
