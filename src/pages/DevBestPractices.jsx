import Card from '../components/Card'
import Note from '../components/Note'
import BackToTop from '../components/BackToTop'

const mistakes = [
  {
    num: 1,
    title: 'Do Not Begin Coding When the Problem Is Still Vague',
    icon: '🎯',
    bgColor: '#dbeafe',
    content: `Before writing any code, you must have clarity on three things:`,
    items: [
      { label: 'Define what you are building', desc: 'What exactly will the system do? What are the core features?' },
      { label: 'Define who will use it', desc: 'Who is the target audience? What are their needs and technical capabilities?' },
      { label: 'Define the main flow', desc: 'How does a user go from start to finish? Map the critical path.' },
    ],
    note: 'This is where direction comes from. Without this clarity, you will build the wrong thing.',
  },
  {
    num: 2,
    title: 'Do Not Try to Build Everything at Once',
    icon: '🧱',
    bgColor: '#dcfce7',
    content: 'Take one feature at a time. Break it into three parts:',
    items: [
      { label: 'Inputs', desc: 'What data enters the system? Where does it come from?' },
      { label: 'Process', desc: 'What transformation or logic is applied?' },
      { label: 'Outputs', desc: 'What is the result? Where does it go?' },
    ],
    note: 'Build it step by step. This keeps the system controlled and manageable.',
  },
  {
    num: 3,
    title: 'Watch Responsibilities — Do Not Place Everything in One Place',
    icon: '📦',
    bgColor: '#fef3c7',
    content: 'Separation of concerns is critical for maintainability:',
    items: [
      { label: 'Separate validation', desc: 'Input validation logic should be separate from business logic.' },
      { label: 'Separate business logic', desc: 'Core rules and calculations belong in their own layer.' },
      { label: 'Separate data access', desc: 'Database operations should not be mixed with UI code.' },
    ],
    note: 'This is where maintainability improves. When everything is mixed, changes become dangerous.',
  },
  {
    num: 4,
    title: 'Pay Attention to Naming — Names Should Explain Intent',
    icon: '📝',
    bgColor: '#e0e7ff',
    content: 'Good names reduce confusion during development:',
    items: [
      { label: 'Use descriptive names', desc: 'createPayrollDeduction, invalidateRequest, processPayment' },
      { label: 'Avoid abbreviations', desc: 'Unless they are industry standards everyone knows.' },
      { label: 'Be consistent', desc: 'Use the same naming convention across the entire codebase.' },
    ],
    note: 'When you read the code, the name should tell you exactly what it does.',
  },
  {
    num: 5,
    title: 'Follow the DRY Principle',
    icon: '♻️',
    bgColor: '#fce7f3',
    content: 'DRY = Do Not Repeat Yourself',
    items: [
      { label: 'Identify duplication', desc: 'When the same logic appears in multiple places.' },
      { label: 'Extract to shared location', desc: 'Move repeated code to a single, reusable function or module.' },
      { label: 'Reuse across the system', desc: 'Call the shared function from everywhere it is needed.' },
    ],
    note: 'This keeps behavior consistent. When you fix a bug in one place, it applies everywhere.',
  },
  {
    num: 6,
    title: 'Handle Inputs Carefully — Do Not Trust Incoming Data',
    icon: '🛡️',
    bgColor: '#fee2e2',
    content: 'Input validation is your first line of defense:',
    items: [
      { label: 'Validate fields', desc: 'Check that required fields are present and non-empty.' },
      { label: 'Validate types', desc: 'Ensure numbers are numbers, dates are valid dates, etc.' },
      { label: 'Validate formats', desc: 'Check email formats, phone numbers, URLs, etc.' },
    ],
    note: 'This is where many issues are stopped early. Never trust client-side validation alone.',
  },
  {
    num: 7,
    title: 'Think About Failwrap — Handle Errors Properly',
    icon: '⚠️',
    bgColor: '#ffedd5',
    content: 'Errors will happen. Handle them gracefully:',
    items: [
      { label: 'Return clear responses', desc: 'Tell users what went wrong in plain language.' },
      { label: 'Log key events', desc: 'Record errors with enough context for debugging.' },
      { label: 'Graceful degradation', desc: 'System should fail safely, not crash catastrophically.' },
    ],
    note: 'This is where reliability is built. Users trust systems that handle errors well.',
  },
  {
    num: 8,
    title: 'Think About Your Database Early',
    icon: '🗄️',
    bgColor: '#ccfbf1',
    content: 'Plan your data layer from the start:',
    items: [
      { label: 'Define tables with purpose', desc: 'Each table should have a clear, single responsibility.' },
      { label: 'Define relationships clearly', desc: 'One-to-one, one-to-many, many-to-many — document them.' },
      { label: 'Add indexes when needed', desc: 'Index columns used in WHERE and JOIN clauses.' },
    ],
    note: 'This supports performance from start. Bad database design is hard to fix later.',
  },
  {
    num: 9,
    title: 'Protect Your System — Do Not Expose Secrets',
    icon: '🔐',
    bgColor: '#ede9fe',
    content: 'Security must be built in, not added later:',
    items: [
      { label: 'Keep API keys secure', desc: 'Never commit keys to git. Use environment variables.' },
      { label: 'Keep tokens secure', desc: 'Store tokens in HttpOnly cookies, not localStorage.' },
      { label: 'Rotate secrets', desc: 'Change API keys and tokens regularly.' },
    ],
    note: 'This protects your system in production. A single leaked key can compromise everything.',
  },
]

export default function DevBestPractices() {
  return (
    <>
      <div className="topic">
        <div className="topic-header prd">
          <div className="topic-tag prd">💻 Development Guidelines</div>
          <h1>Before You<br/>Build Your App</h1>
          <p>9 critical mistakes that can shape your entire system. Avoid these early for a system that is easier to manage, easier to test, and easier to grow.</p>
          <div className="topic-stats">
            <div className="t-stat"><span className="t-stat-ico">⚠️</span><div><div className="t-stat-val">9</div><div className="t-stat-lbl">Mistakes</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">📋</span><div><div className="t-stat-val">27</div><div className="t-stat-lbl">Key Points</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">🎯</span><div><div className="t-stat-val">Any</div><div className="t-stat-lbl">Tech Stack</div></div></div>
          </div>
        </div>
      </div>

      <div className="topic-divider"><hr/></div>

      <div className="topic">
        {mistakes.map((m) => (
          <Card
            key={m.num}
            icon={m.icon}
            bgColor={m.bgColor}
            title={`${m.num} — ${m.title}`}
            subtitle={m.note}
          >
            <p className="body" style={{ marginBottom: '16px' }}>{m.content}</p>
            <div className="two-col">
              {m.items.map((item, i) => (
                <div key={i} className="icard">
                  <div className="icard-tag">{item.label}</div>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}

        <Note type="teal" icon="🚀" title="The Result">
          Avoid these mistakes early, and your system becomes easier to manage, easier to test, and easier to grow.
        </Note>
      </div>

      <BackToTop />
    </>
  )
}