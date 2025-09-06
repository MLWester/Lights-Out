import React from 'react'

const Loading = ({ rows = 8 }) => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-6 bg-gray-200 rounded my-2 w-full"
          style={{ width: `${80 + Math.random() * 20}%` }}
        />
      ))}
    </div>
  )
}

export default Loading
