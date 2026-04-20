import { useState, useEffect } from 'react'
import { useSearch } from '../context/SearchContext'

export default function SearchOverlay({ topics = [] }) {
  const { searchQuery, setSearchQuery } = useSearch()
  const [results, setResults] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault()
        setShow(true)
      }
      if (e.key === 'Escape') setShow(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (searchQuery.length > 1) {
      const q = searchQuery.toLowerCase()
      const found = topics.filter(t =>
        t.title.toLowerCase().includes(q) ||
        (t.subtitle || '').toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q)
      ).slice(0, 8)
      setResults(found)
    } else {
      setResults([])
    }
  }, [searchQuery])

  const navigate = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setShow(false)
    setSearchQuery('')
  }

  return (
    <>
      <div className={`s-overlay ${show ? 'show' : ''}`} onClick={() => setShow(false)} />
      <div className={`s-panel ${show ? 'show' : ''}`}>
        <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--tx4)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            autoFocus={show}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search... (press / to focus)"
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', fontFamily: 'var(--sans)', background: 'transparent', color: 'var(--tx1)' }}
          />
        </div>
        <div className="s-results">
          {results.length === 0 && searchQuery.length > 1 ? (
            <div className="s-empty">No results for "{searchQuery}"</div>
          ) : results.length > 0 ? (
            results.map((r) => (
              <div key={r.id} className="s-item" onClick={() => navigate(r.id)}>
                <span className="s-item-ico">{r.icon}</span>
                <div className="s-item-info">
                  <strong>{r.title}</strong>
                  {r.subtitle && <span>{r.subtitle}</span>}
                </div>
                <span className="s-item-tag">{r.tag || 'section'}</span>
              </div>
            ))
          ) : (
            <div className="s-empty">Press <strong>/</strong> to search</div>
          )}
        </div>
      </div>
    </>
  )
}
