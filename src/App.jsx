import { useState, useEffect } from 'react'
import { useTheme } from './context/ThemeContext'
import { useSearch } from './context/SearchContext'
import SecurityGuide from './pages/SecurityGuide'
import DataAnalyst from './pages/DataAnalyst'
import AuthPRD from './pages/AuthPRD'
import CodeStats from './pages/CodeStats'
import DevBestPractices from './pages/DevBestPractices'
import SearchOverlay from './components/SearchOverlay'
import BackToTop from './components/BackToTop'

const SECURITY_TOPICS = [
  { id: 's1', title: 'Environment Variables', icon: '🔐', tag: 'Web Security' },
  { id: 's2', title: 'Error Handling', icon: '⚠️', tag: 'Web Security' },
  { id: 's3', title: 'Input Validation', icon: '✅', tag: 'Web Security' },
  { id: 's4', title: 'Rate Limiting', icon: '⏱️', tag: 'Web Security' },
  { id: 's5', title: 'HTTPS & Redirects', icon: '🔒', tag: 'Web Security' },
  { id: 's6', title: 'CORS Config', icon: '🌐', tag: 'Web Security' },
  { id: 's14', title: 'Vulnerabilities', icon: '☠️', tag: 'Web Security' },
  { id: 's15', title: 'Launch Checklist', icon: '✅', tag: 'Web Security' },
  { id: 'p1', title: 'Executive Summary', icon: '📄', tag: 'Auth PRD' },
  { id: 'p2', title: 'Architecture', icon: '🏗️', tag: 'Auth PRD' },
  { id: 'p3', title: 'Data Models', icon: '📒', tag: 'Auth PRD' },
  { id: 'p6', title: 'API Endpoints', icon: '📃', tag: 'Auth PRD' },
  { id: 'p8', title: 'Dev Roadmap', icon: '🚀', tag: 'Auth PRD' },
  { id: 'p9', title: 'Success Criteria', icon: '🏆', tag: 'Auth PRD' },
  { id: 'stats', title: 'Code Stats', icon: '📊', tag: 'Documentation' },
  { id: 'best', title: 'Before You Build', icon: '⚠️', tag: 'Best Practices' },
]

function Nav({ currentSection, onNavigate, isDark, toggleTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />
      
      <nav className="nav">
        <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {sidebarOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            ) : (
              <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
            )}
          </svg>
        </button>

        <div className="nav-brand" onClick={() => onNavigate('security')}>
          <div className="brand-icon">🔒</div>
          <span className="brand-name">Secure<em>Stack</em></span>
        </div>

        <div className="nav-sep" />

        <div className="nav-tabs">
          <button className={`nav-tab ${currentSection === 'security' ? 'active' : ''}`} onClick={() => onNavigate('security')}>
            <span className="tab-dot" style={{ background: 'var(--blue)' }} />
            Web Security
          </button>
          <button className={`nav-tab ${currentSection === 'analytics' ? 'active' : ''}`} onClick={() => onNavigate('analytics')}>
            <span className="tab-dot" style={{ background: 'var(--purple)' }} />
            Data Analytics
          </button>
          <button className={`nav-tab ${currentSection === 'prd' ? 'active' : ''}`} onClick={() => onNavigate('prd')}>
            <span className="tab-dot" style={{ background: 'var(--teal)' }} />
            Auth PRD
          </button>
          <button className={`nav-tab ${currentSection === 'stats' ? 'active' : ''}`} onClick={() => onNavigate('stats')}>
            <span className="tab-dot" style={{ background: 'var(--amber)' }} />
            Docs
          </button>
          <button className={`nav-tab ${currentSection === 'bestpractices' ? 'active' : ''}`} onClick={() => onNavigate('bestpractices')}>
            <span className="tab-dot" style={{ background: 'var(--red)' }} />
            Best Practices
          </button>
        </div>

        <div className="nav-search-wrap">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search... (press /)"
            readOnly
            onFocus={() => onNavigate('security')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </nav>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sb-section">
          <div className="sb-section-label"><span className="sb-dot" style={{ background: 'var(--blue)' }} />Web Security</div>
          <button className="sb-item" onClick={() => { onNavigate('security'); setSidebarOpen(false) }}>
            <span className="sb-ico">🔐</span>Environment Variables
          </button>
          <button className="sb-item" onClick={() => { onNavigate('security'); setSidebarOpen(false) }}>
            <span className="sb-ico">⚠️</span>Error Handling
          </button>
          <button className="sb-item" onClick={() => { onNavigate('security'); setSidebarOpen(false) }}>
            <span className="sb-ico">✅</span>Input Validation
          </button>
          <button className="sb-item" onClick={() => { onNavigate('security'); setSidebarOpen(false) }}>
            <span className="sb-ico">⏱️</span>Rate Limiting
          </button>
          <button className="sb-item" onClick={() => { onNavigate('security'); setSidebarOpen(false) }}>
            <span className="sb-ico">🔒</span>HTTPS
          </button>
          <button className="sb-item" onClick={() => { onNavigate('security'); setSidebarOpen(false) }}>
            <span className="sb-ico">☠️</span>Vulnerabilities
          </button>
          <button className="sb-item" onClick={() => { onNavigate('security'); setSidebarOpen(false) }}>
            <span className="sb-ico">✅</span>Launch Checklist
          </button>
        </div>
        <div className="sb-section">
          <div className="sb-section-label"><span className="sb-dot" style={{ background: 'var(--teal)' }} />Auth PRD</div>
          <button className="sb-item" onClick={() => { onNavigate('prd'); setSidebarOpen(false) }}>
            <span className="sb-ico">📄</span>Executive Summary
          </button>
          <button className="sb-item" onClick={() => { onNavigate('prd'); setSidebarOpen(false) }}>
            <span className="sb-ico">🏗️</span>Architecture
          </button>
          <button className="sb-item" onClick={() => { onNavigate('prd'); setSidebarOpen(false) }}>
            <span className="sb-ico">📃</span>API Endpoints
          </button>
          <button className="sb-item" onClick={() => { onNavigate('prd'); setSidebarOpen(false) }}>
            <span className="sb-ico">🚀</span>Dev Roadmap
          </button>
        </div>
        <div className="sb-section">
          <div className="sb-section-label"><span className="sb-dot" style={{ background: 'var(--purple)' }} />Data Analytics</div>
          <button className="sb-item" onClick={() => { onNavigate('analytics'); setSidebarOpen(false) }}>
            <span className="sb-ico">🏠</span>Personal Finance
          </button>
          <button className="sb-item" onClick={() => { onNavigate('analytics'); setSidebarOpen(false) }}>
            <span className="sb-ico">⏰</span>Time & Productivity
          </button>
          <button className="sb-item" onClick={() => { onNavigate('analytics'); setSidebarOpen(false) }}>
            <span className="sb-ico">🏋️</span>Health & Fitness
          </button>
          <button className="sb-item" onClick={() => { onNavigate('analytics'); setSidebarOpen(false) }}>
            <span className="sb-ico">🛠️</span>Tools & Start Here
          </button>
        </div>
        <div className="sb-section">
          <div className="sb-section-label"><span className="sb-dot" style={{ background: 'var(--amber)' }} />Documentation</div>
          <button className="sb-item" onClick={() => { onNavigate('stats'); setSidebarOpen(false) }}>
            <span className="sb-ico">📊</span>Code Stats
          </button>
          <button className="sb-item" onClick={() => { onNavigate('bestpractices'); setSidebarOpen(false) }}>
            <span className="sb-ico">⚠️</span>Before You Build
          </button>
        </div>
      </aside>
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="fb-brand">Secure<em>Stack</em></div>
          <p>Web security & data analytics reference for everyday professionals.</p>
        </div>
        <div className="fl">
          <h4>Web Security</h4>
          <a href="#s1">Env Variables</a>
          <a href="#s4">Rate Limiting</a>
          <a href="#s6">CORS Config</a>
          <a href="#s14">Vulnerabilities</a>
        </div>
        <div className="fl">
          <h4>Auth PRD</h4>
          <a href="#p1">Executive Summary</a>
          <a href="#p2">Architecture</a>
          <a href="#p6">API Endpoints</a>
          <a href="#p8">Dev Roadmap</a>
        </div>
        <div className="fl">
          <h4>Data Analytics</h4>
          <a href="#a1">Personal Finance</a>
          <a href="#a5">Business</a>
          <a href="#a7">Tools & Start Here</a>
        </div>
      </div>
      <div className="footer-bar">
        <p>SecureStack — Web Security, Data Analytics & Auth PRD · April 2026</p>
        <span className="ver">v3.0</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [currentSection, setCurrentSection] = useState('security')
  const { clearFilters } = useSearch()

  useEffect(() => {
    const handler = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      const progressBar = document.getElementById('progress-bar')
      if (progressBar) progressBar.style.width = `${scrollPercent}%`
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavigate = (section) => {
    clearFilters()
    setCurrentSection(section)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <div id="progress-bar" />

      <Nav 
        currentSection={currentSection} 
        onNavigate={handleNavigate}
      />

      <div className="layout">
        <main className="main">
          {currentSection === 'security' && <SecurityGuide />}
          {currentSection === 'analytics' && <DataAnalyst />}
          {currentSection === 'prd' && <AuthPRD />}
          {currentSection === 'stats' && <CodeStats />}
          {currentSection === 'bestpractices' && <DevBestPractices />}
        </main>
      </div>

      <Footer />
      <SearchOverlay topics={SECURITY_TOPICS} />
      <BackToTop />
    </div>
  )
}
