import React from 'react'

const PageBackground = ({ image, overlay = 'rgba(0,0,0,0.5)', children }) => {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 'calc(100vh - 48px)' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: overlay }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, height: 'calc(100vh - 48px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
        <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto', color: '#fff', textAlign: 'center' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageBackground


