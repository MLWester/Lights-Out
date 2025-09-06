import React from 'react'

const Table = ({ columns, data, keyField = 'id', stickyHeader = true }) => {
  return (
    <div className="overflow-x-auto" style={{ maxWidth: '960px', margin: '0 auto' }}>
      <table className="min-w-full text-center border-separate border-spacing-y-0" style={{ margin: '0 auto' }}>
        <thead className={stickyHeader ? 'sticky top-12 z-10' : ''}>
          <tr>
            {columns.map((col) => (
              <th key={col.key || col.accessor} className="px-3 py-2 text-gray-200 text-xs uppercase text-center" style={{ background:'#111827' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row[keyField] ?? idx}>
              {columns.map((col) => (
                <td key={col.key || col.accessor} className="px-3 py-3 text-sm text-center" style={{ background:'#ffffff', color:'#111827', borderBottom:'1px solid #e5e7eb' }}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table


