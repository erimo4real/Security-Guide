import BackToTop from '../components/BackToTop'

const fileStats = [
  { name: 'AuthPRD.jsx', path: 'src/pages/AuthPRD.jsx', lines: 320 },
  { name: 'SecurityGuide.jsx', path: 'src/pages/SecurityGuide.jsx', lines: 263 },
  { name: 'App.jsx', path: 'src/App.jsx', lines: 204 },
  { name: 'DataAnalyst.jsx', path: 'src/pages/DataAnalyst.jsx', lines: 200 },
  { name: 'content.js', path: 'src/data/content.js', lines: 196 },
  { name: 'SearchOverlay.jsx', path: 'src/components/SearchOverlay.jsx', lines: 74 },
  { name: 'Checklist.jsx', path: 'src/components/Checklist.jsx', lines: 40 },
  { name: 'analystContent.js', path: 'src/data/analystContent.js', lines: 35 },
  { name: 'CodeBlock.jsx', path: 'src/components/CodeBlock.jsx', lines: 34 },
  { name: 'SearchContext.jsx', path: 'src/context/SearchContext.jsx', lines: 28 },
  { name: 'Card.jsx', path: 'src/components/Card.jsx', lines: 24 },
  { name: 'ThemeContext.jsx', path: 'src/context/ThemeContext.jsx', lines: 20 },
  { name: 'BackToTop.jsx', path: 'src/components/BackToTop.jsx', lines: 16 },
  { name: 'main.jsx', path: 'src/main.jsx', lines: 15 },
  { name: 'Note.jsx', path: 'src/components/Note.jsx', lines: 11 },
]

export default function CodeStats() {
  return (
    <>
      <div className="topic">
        <div className="topic-header security">
          <div className="topic-tag security">📊 Codebase Stats</div>
          <h1>Source Files<br/>Line Count</h1>
          <p>A breakdown of all JavaScript/JSX source files in the React application, sorted by line count.</p>
          <div className="topic-stats">
            <div className="t-stat"><span className="t-stat-ico">📁</span><div><div className="t-stat-val">15</div><div className="t-stat-lbl">Files</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">📝</span><div><div className="t-stat-val">1,163</div><div className="t-stat-lbl">Total Lines</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">📄</span><div><div className="t-stat-val">783</div><div className="t-stat-lbl">Largest</div></div></div>
          </div>
        </div>
      </div>

      <div className="topic-divider"><hr/></div>

      <div className="topic">
        <h3 className="lbl">All Source Files (sorted by line count)</h3>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>File Path</th>
                <th>Lines</th>
              </tr>
            </thead>
            <tbody>
              {fileStats.map((file, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><strong>{file.name}</strong></td>
                  <td><code>{file.path}</code></td>
                  <td>{file.lines}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="lbl">Summary</h3>
        <div className="two-col">
          <div className="icard">
            <div className="icard-tag">Pages</div>
            <h4>4 main pages</h4>
            <p>AuthPRD, SecurityGuide, DataAnalyst, and this CodeStats page.</p>
          </div>
          <div className="icard">
            <div className="icard-tag">Components</div>
            <h4>7 reusable components</h4>
            <p>Card, CodeBlock, Note, SearchOverlay, BackToTop, Checklist, and Nav.</p>
          </div>
          <div className="icard">
            <div className="icard-tag">Context</div>
            <h4>2 context providers</h4>
            <p>ThemeContext for dark/light mode, SearchContext for search state.</p>
          </div>
          <div className="icard">
            <div className="icard-tag">Data</div>
            <h4>2 data files</h4>
            <p>content.js (security data), analystContent.js (analytics use cases).</p>
          </div>
        </div>
      </div>

      <BackToTop />
    </>
  )
}