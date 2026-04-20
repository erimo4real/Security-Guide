import { useState } from 'react'

export default function Checklist({ items, storageKey }) {
  const saved = storageKey ? JSON.parse(localStorage.getItem(storageKey) || '[]') : []
  const [checked, setChecked] = useState(new Set(saved))

  const toggle = (i) => {
    const next = new Set(checked)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setChecked(next)
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify([...next]))
  }

  const all = items.length
  const done = checked.size
  const pct = Math.round((done / all) * 100)

  return (
    <div className="cl-progress">
      <div className="cl-row">
        <span className="cl-label">Progress</span>
        <span className="cl-count">{done} / {all} ({pct}%)</span>
      </div>
      <div className="cl-bar">
        <div className="cl-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function ChecklistItem({ label, checked: isChecked, onToggle }) {
  return (
    <li className={isChecked ? 'done' : ''} onClick={onToggle}>
      <span className="chkbox">
        {isChecked && (
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="2 6 5 9 10 3" />
          </svg>
        )}
      </span>
      {label}
    </li>
  )
}
