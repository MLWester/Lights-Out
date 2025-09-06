import React from 'react'

const Card = ({ title, description, cta, onClick, children }) => {
  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="p-5">
        {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
        {description && <p className="text-gray-600 mb-3">{description}</p>}
        {children}
        {cta && (
          <div className="mt-3 text-red-600 font-medium">{cta}</div>
        )}
      </div>
    </div>
  )
}

export default Card


