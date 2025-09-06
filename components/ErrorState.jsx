import React from 'react'

const ErrorState = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <div className="p-6 border border-red-200 bg-red-50 text-red-700 rounded-xl">
      <div className="flex items-center justify-between gap-4">
        <p>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="glass-btn" aria-label="Try again">Try again</button>
        )}
      </div>
    </div>
  )
}

export default ErrorState


