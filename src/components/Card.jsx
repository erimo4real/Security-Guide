import { useState } from 'react'

export default function Card({ icon, bgColor, title, subtitle, badge, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`card ${open ? 'open' : ''}`}>
      <div className="card-head" onClick={() => setOpen(!open)}>
        <div className="card-icon" style={{ background: bgColor }}>{icon}</div>
        <div className="card-title">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {badge && <span className={`badge ${badge.cls}`}>{badge.text}</span>}
        <span className="card-chev">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}
