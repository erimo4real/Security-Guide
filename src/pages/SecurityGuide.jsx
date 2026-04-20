import { useState } from 'react'
import Card from '../components/Card'
import CodeBlock from '../components/CodeBlock'
import Note from '../components/Note'
import BackToTop from '../components/BackToTop'
import { useSearch } from '../context/SearchContext'
import { tableOfContents, vulnerabilities, checklists } from '../data/content'

const BADGE_MAP = { CRITICAL: 'bc', HIGH: 'bh', MEDIUM: 'bm', LOW: 'bl' }

export default function SecurityGuide() {
  const { searchQuery } = useSearch()
  const [openCards, setOpenCards] = useState({ s1: true })

  const toggle = (id) => setOpenCards(p => ({ ...p, [id]: !p[id] }))

  const filtered = (id) => {
    if (!searchQuery) return true
    const item = tableOfContents.find(t => t.id === id)
    return item?.title.toLowerCase().includes(searchQuery.toLowerCase())
  }

  const filteredVulns = () => {
    if (!searchQuery) return vulnerabilities
    return vulnerabilities.filter(v =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.exploit.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const tocFiltered = () => {
    if (!searchQuery) return tableOfContents
    return tableOfContents.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <>
      <div className="topic">
        <div className="topic-header security">
          <div className="topic-tag security">🔒 Web Security Guide</div>
          <h1>Web Application Security<br/>&amp; Launch Checklist</h1>
          <p>Everything you need to harden, test, and ship a secure production web app — from environment variables through to a full hacker's-eye vulnerability audit.</p>
          <div className="topic-stats">
            <div className="t-stat"><span className="t-stat-ico">📋</span><div><div className="t-stat-val">{tableOfContents.length}</div><div className="t-stat-lbl">Sections</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">☠️</span><div><div className="t-stat-val">{vulnerabilities.length}</div><div className="t-stat-lbl">Vulnerabilities</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">📦</span><div><div className="t-stat-val">20+</div><div className="t-stat-lbl">Code examples</div></div></div>
          </div>
        </div>

        <h3 className="lbl" style={{ marginTop: '28px' }}>Quick Navigation</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {tocFiltered().map(item => (
            <button key={item.id} onClick={() => {
              const el = document.getElementById(item.id)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--sans)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{item.icon}</span> {item.num} — {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="topic-divider"><hr/></div>

      <div className="topic">
        {/* S1 Environment Variables */}
        {filtered('s1') && (
          <Card icon="🔐" bgColor="#fef9c3" title="1 — Environment Variables & .env" subtitle="Never hard-code secrets. Keep them out of version control.">
            <Note type="danger" icon="🚨" title="Critical Rule">Never commit <code>.env</code> to Git. Add it to <code>.gitignore</code> immediately.</Note>
            <h3 className="lbl">File Structure</h3>
            <CodeBlock lang="bash" code={`.env                  # real secrets — NEVER commit
.env.example          # template with dummy values — COMMIT this
.env.local            # local overrides (Next.js)
.gitignore            # must include .env and .env.local`} />
            <h3 className="lbl">Validate env at startup with Zod</h3>
            <CodeBlock lang="typescript" code={`import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV:        z.enum(['development', 'production', 'test']),
  DATABASE_URL:    z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  APP_URL:         z.string().url(),
  SENTRY_DSN:      z.string().url().optional(),
});

export const env = envSchema.parse(process.env);
// Throws at startup if anything is wrong`} />
          </Card>
        )}

        {/* S2 Error Handling */}
        {filtered('s2') && (
          <Card icon="⚠️" bgColor="#fff5f5" title="2 — Error Handling" subtitle="Graceful failures; never leak stack traces to users.">
            <CodeBlock lang="javascript" code={`// Global Express Error Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';
  
  if (isProd) Sentry.captureException(err);
  else console.error(err);
  
  res.status(statusCode).json({
    success: false,
    message: isProd ? 'Something went wrong.' : err.message,
  });
});`} />
            <Note type="info" icon="💡" title="Tip">Always log full errors server-side (Sentry) and return generic messages to users.</Note>
          </Card>
        )}

        {/* S3 Input Validation */}
        {filtered('s3') && (
          <Card icon="✅" bgColor="#f0fff4" title="3 — Input Validation & Sanitisation" subtitle="Trust nothing from the client. Validate and sanitise everything.">
            <Note type="warning" icon="⚡" title="Golden Rule">Validate on the server even if you already validate on the client. Client-side validation is UX; server-side validation is security.</Note>
            <CodeBlock lang="typescript" code={`import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
});

router.post('/register', asyncHandler(async (req, res) => {
  const data = registerSchema.parse(req.body);
}));`} />
          </Card>
        )}

        {/* S4 Rate Limiting */}
        {filtered('s4') && (
          <Card icon="⏱️" bgColor="#ebf8ff" title="4 — Rate Limiting" subtitle="Protect every route and endpoint from abuse, bots, and brute force.">
            <CodeBlock lang="javascript" code={`npm install express-rate-limit rate-limit-redis ioredis`} />
            <CodeBlock lang="javascript" code={`export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 200,
  standardHeaders: true, legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, max: 5,
  skipSuccessfulRequests: true,
});

app.use(globalLimiter);
app.use('/api/auth', authLimiter);`} />
          </Card>
        )}

        {/* S5 HTTPS */}
        {filtered('s5') && (
          <Card icon="🔒" bgColor="#f0fff4" title="5 — HTTPS Certificate & HTTP → HTTPS Redirect" subtitle="Ensure all traffic is encrypted. No exceptions.">
            <CodeBlock lang="javascript" code={`export const forceHttps = (req, res, next) => {
  if (process.env.NODE_ENV === 'production' &&
      req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, \`https://\${req.headers.host}\${req.url}\`);
  }
  next();
};`} />
            <Note type="ok" icon="✅" title="Auto-Renewing Certs">Use Let's Encrypt + Certbot (free) or enable automatic TLS on Vercel, Railway, Netlify.</Note>
          </Card>
        )}

        {/* S6 CORS */}
        {filtered('s6') && (
          <Card icon="🌐" bgColor="#f0fdf4" title="6 — CORS Configuration" subtitle="Control which domains can access your API resources.">
            <Note type="warning" icon="⚠️" title="Common Mistake">Never set <code>CORS: *</code> in production unless your API is truly public.</Note>
            <CodeBlock lang="javascript" code={`npm install cors

const corsOptions = {
  origin: ['https://yourdomain.com', 'https://app.yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));`} />
          </Card>
        )}

        {/* S7 Cookie Security */}
        {filtered('s7') && (
          <Card icon="🍪" bgColor="#fff7ed" title="7 — Cookie Security" subtitle="Secure cookie settings prevent XSS and CSRF attacks.">
            <CodeBlock lang="javascript" code={`cookie: {
  httpOnly: true,     // No JS access
  secure: true,       // HTTPS only
  sameSite: 'strict', // No cross-site requests
  maxAge: 24 * 60 * 60 * 1000,
}`} />
          </Card>
        )}

        {/* S8 Password Hashing */}
        {filtered('s8') && (
          <Card icon="🔏" bgColor="#fff7ed" title="8 — Password Hashing & Sessions" subtitle="Secure password storage and session handling are non-negotiable.">
            <Note type="danger" icon="🚨" title="Critical">Never store passwords in plain text. Use bcrypt (cost ≥ 12), Argon2, or scrypt.</Note>
            <CodeBlock lang="javascript" code={`npm install bcrypt

const hash = await bcrypt.hash(password, 12);
const valid = await bcrypt.compare(password, hash);`} />
          </Card>
        )}

        {/* S9 MFA */}
        {filtered('s9') && (
          <Card icon="🔑" bgColor="#f3f4f6" title="9 — MFA / 2FA Implementation" subtitle="Add a second layer of security to protect user accounts.">
            <CodeBlock lang="javascript" code={`npm install speakeasy qrcode

// Generate TOTP secret
const secret = speakeasy.generateSecret({ name: 'MyApp' });

// Verify TOTP code
const verified = speakeasy.totp.verify({
  secret: user.twoFactorSecret,
  encoding: 'base32',
  token: req.body.token,
  window: 1,
});`} />
          </Card>
        )}

        {/* S10 Auth Providers */}
        {filtered('s10') && (
          <Card icon="🛡️" bgColor="#f0fff4" title="10 — Battle-Tested Auth Providers" subtitle="Never roll your own auth. Use proven solutions.">
            <Note type="info" icon="💡" title="Minimum Auth Requirements">Enforce MFA for admin accounts, short session expiry (1-24 hrs), rotate JWT secrets, store only hashed passwords.</Note>
          </Card>
        )}

        {/* S11 Image Optimisation */}
        {filtered('s11') && (
          <Card icon="🖼️" bgColor="#faf5ff" title="11 — Image Optimisation" subtitle="Compress, convert to WebP, lazy-load, and use CDN for all images.">
            <CodeBlock lang="javascript" code={`import Image from 'next/image';
<Image src="/hero.jpg" alt="Hero banner" width={1200} height={600} priority />`} />
          </Card>
        )}

        {/* S12 Custom 404 */}
        {filtered('s12') && (
          <Card icon="🚫" bgColor="#fff5f5" title="12 — Custom 404 Page" subtitle="Guide lost visitors back — never leave them at a dead end.">
            <Note type="info" icon="💡" title="Good 404 page must have">A friendly message, "Go Home" button, "Go Back" button, and main navigation.</Note>
          </Card>
        )}

        {/* S13 Sentry */}
        {filtered('s13') && (
          <Card icon="🚨" bgColor="#fff5f5" title="13 — Sentry Error Monitoring" subtitle="Get an email the moment something breaks in production.">
            <CodeBlock lang="javascript" code={`npm install @sentry/nextjs

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  enabled: process.env.NODE_ENV === 'production',
});`} />
          </Card>
        )}

        {/* S14 Vulnerability Audit */}
        {filtered('s14') && (
          <Card icon="☠️" bgColor="#fff5f5" title="14 — Vulnerabilities & Fixes" subtitle="Thinking like an attacker is the best defence.">
            <Note type="danger" icon="💀" title="Mindset Warning">Every input field, API endpoint, dependency, and third-party script is a potential attack surface. Assume breach.</Note>
            <h3 className="lbl">Vulnerabilities by Severity</h3>
            <div className="vuln-grid">
              {filteredVulns().map((vuln, i) => (
                <div key={i} className="vcard">
                  <div className="vcard-head">
                    <span className={`badge ${BADGE_MAP[vuln.severity]}`}>{vuln.severity}</span>
                    <h4>{vuln.title}</h4>
                  </div>
                  <div className="vcard-body">
                    <div className="v-exploit">{vuln.exploit}</div>
                    <div className="v-fix">{vuln.fix}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* S15 Launch Checklist */}
        {filtered('s15') && (
          <Card icon="✅" bgColor="#dcfce7" title="15 — Launch Checklist" subtitle="Final security audit before going to production.">
            <ul className="checklist">
              {checklists.map((item, i) => (
                <li key={i}>
                  <span className="chkbox">
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      <BackToTop />
    </>
  )
}
