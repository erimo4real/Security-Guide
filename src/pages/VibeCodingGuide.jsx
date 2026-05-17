import Card from '../components/Card'
import Note from '../components/Note'
import BackToTop from '../components/BackToTop'

const sections = [
  {
    num: 1,
    title: 'What Is Vibe Coding?',
    icon: '🤖',
    bgColor: '#e0f2fe',
    content: `Vibe coding is a development approach where you describe what you want to build in natural language — your "vibe" — and use AI to generate, iterate, and refine code.`,
    items: [
      { label: 'You are the architect', desc: 'Act as the director, not the typist. AI handles boilerplate and implementation.' },
      { label: 'Iteration is fast', desc: 'Minutes instead of hours. Describe → Review → Iterate.' },
      { label: 'Review everything', desc: 'Never blindly accept code. You must understand what each block does.' },
    ],
    quote: 'You fully give in to the vibes, embrace exponentials, and forget that the code even exists. — Andrej Karpathy',
  },
  {
    num: 2,
    title: 'Core Philosophy & Mindset',
    icon: '🧠',
    bgColor: '#dcfce7',
    content: 'You are the CEO, AI is your senior developer. You set direction, review output, and make final calls.',
    items: [
      { label: 'Stay in the loop', desc: 'Don\'t need to understand every line, but must understand what each block does.' },
      { label: 'Iterate aggressively', desc: 'First output is rarely perfect. Expect 2–4 rounds of refinement.' },
      { label: 'Context is king', desc: 'More precise context = better output. Vague input = vague code.' },
      { label: 'Trust but verify', desc: 'AI makes mistakes. It hallucinates libraries, gets API signatures wrong.' },
    ],
  },
  {
    num: 3,
    title: 'Before You Start — Setup Checklist',
    icon: '✅',
    bgColor: '#fef3c7',
    content: 'Essential setup before you start vibe coding:',
    items: [
      { label: 'Choose your AI tool', desc: 'Claude, Cursor, GitHub Copilot, ChatGPT, or v0' },
      { label: 'Code editor ready', desc: 'VS Code recommended' },
      { label: 'Git initialized', desc: 'Commit early, commit often' },
      { label: '.gitignore in place', desc: 'Prevent accidental secrets commits' },
    ],
    note: 'Create a project context document once per project and paste it at the start of every AI conversation.',
  },
  {
    num: 4,
    title: 'The Vibe Coding Workflow',
    icon: '🔄',
    bgColor: '#ede9fe',
    content: 'Six phases to follow for every feature:',
    items: [
      { label: '1. DEFINE', desc: 'Know what you want. What feature? Inputs? Outputs? Edge cases?' },
      { label: '2. PROMPT', desc: 'Paste project context + specific request + constraints + code examples' },
      { label: '3. REVIEW', desc: '60-second review rule: Does it do what I asked? Any unrecognized libraries?' },
      { label: '4. RUN', desc: 'Copy code, run it, test happy path + at least one edge case' },
      { label: '5. ITERATE', desc: 'Copy exact error messages back to AI. Be specific about fixes.' },
      { label: '6. COMMIT', desc: 'If it works, commit. You want to roll back AI changes easily.' },
    ],
  },
  {
    num: 5,
    title: 'Prompt Engineering for Developers',
    icon: '📝',
    bgColor: '#fce7f3',
    content: 'The anatomy of a great dev prompt:',
    items: [
      { label: 'CONTEXT', desc: 'What is the project/file/function' },
      { label: 'TASK', desc: 'What you want built' },
      { label: 'FORMAT/STYLE', desc: 'How it should look/behave' },
      { label: 'CONSTRAINTS', desc: 'What to avoid or must include' },
      { label: 'EXAMPLE', desc: 'Code to follow for style consistency' },
    ],
    note: 'Power tips: Say what you DON\'T want. Ask for one thing at a time. Use role prompting.',
  },
  {
    num: 6,
    title: 'Working on New Projects',
    icon: '🚀',
    bgColor: '#d1fae5',
    content: 'The green field workflow:',
    items: [
      { label: 'Architecture first', desc: 'Ask AI to suggest tech stack with pros/cons' },
      { label: 'Scaffold the project', desc: 'Set up TypeScript, ESLint, folder structure' },
      { label: 'Build vertically', desc: 'One feature end-to-end before all features partially' },
      { label: 'Define data models', desc: 'Design schema/types before writing code' },
      { label: 'Auth first', desc: 'Set up auth before anything else' },
    ],
  },
  {
    num: 7,
    title: 'Working on Existing Projects',
    icon: '🏗️',
    bgColor: '#ffedd5',
    content: 'The #1 challenge: AI doesn\'t know your codebase. You must provide context.',
    items: [
      { label: 'Paste relevant files', desc: 'For small components, paste directly' },
      { label: 'Describe architecture', desc: 'Explain folder structure, state management, patterns' },
      { label: 'Use context tools', desc: 'Cursor AI or Claude Code auto-index your codebase' },
      { label: 'Touch nothing else', desc: 'Tell AI exactly what NOT to change' },
    ],
  },
  {
    num: 8,
    title: 'Handling Errors & Debugging',
    icon: '🐛',
    bgColor: '#fee2e2',
    content: 'The perfect error report template:',
    items: [
      { label: 'Error message', desc: 'Full text, not paraphrased' },
      { label: 'Stack trace', desc: 'If available' },
      { label: 'The code', desc: 'That caused it' },
      { label: 'What you were doing', desc: 'When it happened' },
      { label: 'What you expected', desc: 'Vs what actually happened' },
    ],
    note: 'Common errors: TypeScript (fix with proper types), Runtime (add error handling), Logic bugs (no error — describe expected vs actual), UI/CSS (describe visual problem)',
  },
  {
    num: 9,
    title: 'Code Review & Quality Control',
    icon: '👀',
    bgColor: '#e0e7ff',
    content: 'Your AI code review checklist:',
    items: [
      { label: 'Correctness', desc: 'Does it do what I asked? Edge cases handled?' },
      { label: 'Security', desc: 'No SQL injection, no hardcoded secrets, input sanitized' },
      { label: 'Performance', desc: 'No O(n²) loops, no unnecessary re-renders' },
      { label: 'Maintainability', desc: 'Readable, single-responsibility, descriptive names' },
      { label: 'Dependencies', desc: 'Know every package, no unnecessary ones added' },
    ],
  },
  {
    num: 10,
    title: 'Common Vibe Coding Patterns',
    icon: '🔁',
    bgColor: '#ccfbf1',
    content: 'Reusable patterns that work:',
    items: [
      { label: 'Component Factory', desc: 'Generate many similar components from one reference' },
      { label: 'API Endpoint Generator', desc: 'Create endpoints following existing patterns' },
      { label: 'Test Writer', desc: 'Happy path + edge case + error tests' },
      { label: 'Refactor Pass', desc: 'Break up long functions, extract duplication' },
      { label: 'Documentation Generator', desc: 'Generate docs from code' },
    ],
  },
  {
    num: 11,
    title: 'What NOT to Do — Anti-Patterns',
    icon: '❌',
    bgColor: '#fecaca',
    content: 'Avoid these common mistakes:',
    items: [
      { label: 'Copy-paste without reading', desc: 'Even 30 seconds catches most issues' },
      { label: 'One giant prompt', desc: 'Break big tasks into focused prompts' },
      { label: 'No git commits', desc: 'You might lose hours of working code' },
      { label: 'Ignoring errors', desc: 'Fix root cause, don\'t add @ts-ignore' },
      { label: 'No context', desc: 'AI can\'t help what it doesn\'t see' },
      { label: 'Vibing forever', desc: 'Build → Test → Build → Test' },
    ],
  },
  {
    num: 12,
    title: 'Tools & Stack Recommendations',
    icon: '🛠️',
    bgColor: '#ede9fe',
    content: 'Best AI tools for vibe coding:',
    items: [
      { label: 'Claude', desc: 'Complex reasoning, architecture, refactoring' },
      { label: 'Cursor', desc: 'Full IDE integration, codebase context' },
      { label: 'GitHub Copilot', desc: 'Inline autocomplete in VS Code' },
      { label: 'v0 by Vercel', desc: 'React UI components' },
      { label: 'Bolt.new', desc: 'Full-stack prototypes in browser' },
    ],
    note: 'Recommended stack: Next.js 14 + TypeScript + Tailwind CSS + Prisma + PostgreSQL',
  },
  {
    num: 13,
    title: 'Security & Production Checklist',
    icon: '🔐',
    bgColor: '#dbeafe',
    content: 'Before deploying any vibe-coded app:',
    items: [
      { label: 'Environment', desc: 'API keys in env vars, .env in .gitignore' },
      { label: 'Authentication', desc: 'Passwords hashed, JWTs expire, routes protected' },
      { label: 'Input validation', desc: 'Server-side validation, parameterized queries' },
      { label: 'API Security', desc: 'Rate limiting, CORS configured, no secrets in responses' },
      { label: 'Frontend', desc: 'No API keys in code, CSP headers, sanitize user content' },
    ],
  },
  {
    num: 14,
    title: 'Quick-Reference Prompt Templates',
    icon: '📋',
    bgColor: '#fef9c3',
    content: 'Copy and adapt these templates:',
    items: [
      { label: 'Start new project', desc: 'Describe app, features, skill level, get stack recommendation' },
      { label: 'Add feature (new)', desc: 'Project context + feature requirements + constraints' },
      { label: 'Add feature (existing)', desc: 'Existing code + new feature + what NOT to modify' },
      { label: 'Fix a bug', desc: 'Error message + stack trace + code + expected vs actual' },
      { label: 'Refactor', desc: 'Code + goals + constraints (no new features)' },
      { label: 'Write tests', desc: 'Code to test + coverage (happy path, edge cases, errors)' },
    ],
  },
  {
    num: 15,
    title: 'Glossary',
    icon: '📖',
    bgColor: '#f1f5f9',
    content: 'Key terms to know:',
    items: [
      { label: 'Vibe coding', desc: 'AI-assisted development where you describe intent and AI generates code' },
      { label: 'Hallucination', desc: 'When AI confidently produces incorrect information' },
      { label: 'Context window', desc: 'How much text/code an AI can see at once' },
      { label: 'Scaffolding', desc: 'Initial project structure before real features' },
      { label: 'Green field', desc: 'Brand new project with no existing code' },
      { label: 'Brown field', desc: 'Existing codebase with constraints' },
    ],
  },
]

const comparison = [
  { aspect: 'Starting point', traditional: 'Blank editor', vibe: 'Natural language description' },
  { aspect: 'Speed to prototype', traditional: 'Hours/days', vibe: 'Minutes' },
  { aspect: 'Mental model', traditional: 'Write → Test → Debug', vibe: 'Describe → Review → Iterate' },
  { aspect: 'Skills needed', traditional: 'Deep syntax knowledge', vibe: 'Architecture + communication' },
]

const tools = [
  { tool: 'Claude', bestFor: 'Complex reasoning, architecture', notes: 'Best for nuanced, long-context work' },
  { tool: 'Cursor', bestFor: 'Full IDE integration', notes: 'Best all-in-one for vibe coding' },
  { tool: 'GitHub Copilot', bestFor: 'Inline autocomplete', notes: 'Great for line-by-line generation' },
  { tool: 'Claude Code', bestFor: 'Terminal-based agentic', notes: 'For automated multi-file changes' },
  { tool: 'v0 by Vercel', bestFor: 'React UI components', notes: 'Great for quick UI generation' },
  { tool: 'Bolt.new', bestFor: 'Full-stack prototypes', notes: 'Best for rapid browser-based prototypes' },
]

export default function VibeCodingGuide() {
  return (
    <>
      <div className="topic">
        <div className="topic-header security">
          <div className="topic-tag security">🤖 Vibe Coding Guide</div>
          <h1>The Complete<br/>Vibe Coding Guide</h1>
          <p>From zero to shipping — a practical, battle-tested reference for AI-assisted development. Learn to build faster with AI while maintaining quality and security.</p>
          <div className="topic-stats">
            <div className="t-stat"><span className="t-stat-ico">📋</span><div><div className="t-stat-val">15</div><div className="t-stat-lbl">Sections</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">🤖</span><div><div className="t-stat-val">6</div><div className="t-stat-lbl">AI Tools</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">⚡</span><div><div className="t-stat-val">6</div><div className="t-stat-lbl">Workflow Steps</div></div></div>
          </div>
        </div>
      </div>

      <div className="topic-divider"><hr/></div>

      <div className="topic">
        <Card icon="🤖" bgColor="#e0f2fe" title="What Is Vibe Coding?" subtitle="AI-assisted development where you describe what you want">
          <p className="body" style={{ marginBottom: '16px' }}>Vibe coding is a development approach where you describe what you want to build in natural language — your "vibe" — and use AI to generate, iterate, and refine the code.</p>
          <Note type="info" icon="💡" title="Andrej Karpathy">"You fully give in to the vibes, embrace exponentials, and forget that the code even exists."</Note>
          <h3 className="lbl">Vibe coding vs. traditional coding</h3>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr><th>Aspect</th><th>Traditional</th><th>Vibe Coding</th></tr>
              </thead>
              <tbody>
                {comparison.map((c, i) => (
                  <tr key={i}>
                    <td><strong>{c.aspect}</strong></td>
                    <td>{c.traditional}</td>
                    <td>{c.vibe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card icon="🛠️" bgColor="#ede9fe" title="Best AI Tools for Vibe Coding" subtitle="Choose the right tool for the job">
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr><th>Tool</th><th>Best For</th><th>Notes</th></tr>
              </thead>
              <tbody>
                {tools.map((t, i) => (
                  <tr key={i}>
                    <td><strong>{t.tool}</strong></td>
                    <td>{t.bestFor}</td>
                    <td>{t.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {sections.slice(1).map((section) => (
          <Card
            key={section.num}
            icon={section.icon}
            bgColor={section.bgColor}
            title={`${section.num} — ${section.title}`}
            subtitle={section.content.split('.')[0] + '.'}
          >
            <p className="body" style={{ marginBottom: '16px' }}>{section.content}</p>
            <div className="two-col">
              {section.items.map((item, i) => (
                <div key={i} className="icard">
                  <div className="icard-tag">{item.label}</div>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
            {section.quote && (
              <Note type="info" icon="💬" title="Quote">{section.quote}</Note>
            )}
            {section.note && (
              <Note type="teal" icon="📌" title="Note">{section.note}</Note>
            )}
          </Card>
        ))}

        <Note type="teal" icon="🚀" title="Final Recommendations">
          1. Start every session with a goal. 2. Commit aggressively. 3. Read every line before running. 4. Learn fundamentals anyway. 5. Use the right tool. 6. Iterate in small steps. 7. Own your security.
        </Note>
      </div>

      <BackToTop />
    </>
  )
}