import { useState } from 'react'

const syntax = (line) => {
  return line
    .replace(/(&lt;[^&]+&gt;)/g, '<span class="n">$1</span>')
    .replace(/(\/\/[^\n]*)/g, '<span class="c">$1</span>')
    .replace(/\b(const|let|var|function|export|import|from|if|else|return|throw|new|await|async|class|extends|forEach|typeof|instanceof|default|of|in|try|catch)\b/g, '<span class="k">$1</span>')
    .replace(/('.*?'|".*?"|`[^`]*`)/g, '<span class="s">$1</span>')
    .replace(/(\d+)/g, '<span class="v">$1</span>')
    .replace(/(\w+)(\()/g, '<span class="f">$1</span>(')
}

export default function CodeBlock({ code, lang = 'js' }) {
  const [copied, setCopied] = useState(false)
  const lines = code.trim().split('\n')

  const copy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="cb">
      <div className="cb-head">
        <span className="cb-lang">{lang}</span>
        <button className={`cb-copy ${copied ? 'ok' : ''}`} onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        {lines.map((line, i) => (
          <code key={i} dangerouslySetInnerHTML={{ __html: syntax(line) }} />
        ))}
      </pre>
    </div>
  )
}
