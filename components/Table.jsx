import React from 'react'

const Table = ({ columns, data, keyField = 'id', stickyHeader = true }) => {
  return (
    <div className="overflow-x-auto" style={{ maxWidth: '960px', margin: '0 auto' }}>
      <table className="min-w-full text-center border-separate border-spacing-y-0" style={{ margin: '0 auto' }}>
        <thead className={stickyHeader ? 'sticky top-12 z-10' : ''}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key || col.accessor}
                className="px-3 py-2 text-gray-200 text-xs uppercase text-center"
                style={{
                  background: 'rgba(17, 24, 39, 0.75)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row[keyField] ?? idx}>
              {columns.map((col) => (
                <td
                  key={col.key || col.accessor}
                  className="px-3 py-3 text-sm text-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#F9FAFB',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
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


