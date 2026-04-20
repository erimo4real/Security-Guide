import Card from '../components/Card'
import CodeBlock from '../components/CodeBlock'
import Note from '../components/Note'
import BackToTop from '../components/BackToTop'

const securityLayers = [
  { level: 'Critical', badge: 'bc', title: '2FA (TOTP)', desc: 'Time-based One-Time Password via Google Authenticator. Mandatory for Admins, optional for Users.' },
  { level: 'High', badge: 'bh', title: 'OAuth 2.0', desc: 'Social Login (Google, GitHub) with account linking to prevent duplicate emails across providers.' },
  { level: 'High', badge: 'bh', title: 'Device Fingerprinting', desc: 'Hash of User-Agent + IP + Screen Resolution. JWT is bound to fingerprint hash. Rejected if mismatch detected.' },
  { level: 'High', badge: 'bh', title: 'Brute Force Protection', desc: 'Account lockout after 5 failed attempts (15 min). IP ban after 50 failed attempts (24 hrs).' },
  { level: 'Medium', badge: 'bm', title: 'Session Management', desc: 'Session ID stored in DB. Admin and user can revoke specific sessions to force logout on individual devices.' },
  { level: 'Medium', badge: 'bm', title: 'Security Headers', desc: 'Helmet.js — HSTS, XSS Protection, NoSniff, Frameguard all configured on every response.' },
  { level: 'Low', badge: 'bl', title: 'Rate Limiting', desc: 'Redis-based sliding window rate limiter applied API-wide and with stricter limits on all auth routes.' },
]

const tokenStrategy = [
  { type: 'Access Token', lifetime: '15 minutes', storage: 'HttpOnly Cookie', notes: 'Short-lived, rotated frequently' },
  { type: 'Refresh Token', lifetime: '7 days', storage: 'HttpOnly Cookie', notes: 'Rotated on every use — old token blacklisted immediately' },
  { type: '2FA Temp Token', lifetime: '5 minutes', storage: 'HttpOnly Cookie', notes: 'Issued after password check, before 2FA verification' },
]

const authFlows = [
  { feature: 'Login', steps: '1. Check lockout → 2. Verify password (bcrypt) → 3. Check 2FA enabled → 4. Generate device fingerprint → 5. Issue HttpOnly cookies → 6. Write AuditLog' },
  { feature: '2FA Setup', steps: 'Generate TOTP secret → Encrypt & store → Return QR code URL → User enters 6-digit code → Verify → Enable 2FA → Return 8 one-time backup codes' },
  { feature: 'Social Login', steps: 'OAuth callback → Extract email → If email exists: link provider to account → If new: create account → Issue cookies' },
  { feature: 'Logout', steps: 'Clear both HttpOnly cookies → Remove sessionId from DB → Blacklist refresh token in Redis' },
  { feature: 'Logout All Devices', steps: 'Invalidate all refresh tokens → Clear user.activeSessions array → User must log in again on every device' },
  { feature: 'Token Refresh', steps: 'Validate refresh token → Check not blacklisted → Verify fingerprint → Issue new access + refresh → Blacklist old refresh' },
]

const apiEndpoints = [
  { method: 'POST', endpoint: '/api/auth/register', access: 'Public', desc: 'Create account. Sends email verification link.' },
  { method: 'POST', endpoint: '/api/auth/login', access: 'Public', desc: 'Login. Returns requires2FA flag if 2FA is enabled.' },
  { method: 'POST', endpoint: '/api/auth/2fa/verify', access: 'Temp-Token', desc: 'Verify 6-digit TOTP code.' },
  { method: 'POST', endpoint: '/api/auth/2fa/setup', access: 'Private', desc: 'Generate encrypted TOTP secret and return QR code URL.' },
  { method: 'GET', endpoint: '/api/auth/me', access: 'Private', desc: 'Re-hydration endpoint. Returns current user from cookie.' },
  { method: 'POST', endpoint: '/api/auth/logout', access: 'Private', desc: 'Clear cookies, remove session from DB, blacklist refresh token.' },
  { method: 'POST', endpoint: '/api/auth/logout-all', access: 'Private', desc: 'Invalidate all sessions for this user across all devices.' },
  { method: 'GET', endpoint: '/api/auth/google', access: 'Public', desc: 'Initiate Google OAuth flow.' },
  { method: 'GET', endpoint: '/api/users/sessions', access: 'Private', desc: 'List all active sessions with device, IP, location.' },
  { method: 'DELETE', endpoint: '/api/users/sessions/:id', access: 'Private', desc: 'Revoke a specific session by session ID.' },
  { method: 'POST', endpoint: '/api/admin/users/:id/lock', access: 'Admin', desc: 'Manually lock or unlock a user account.' },
  { method: 'POST', endpoint: '/api/admin/users/:id/logout', access: 'Admin', desc: 'Force-logout a specific user immediately.' },
  { method: 'POST', endpoint: '/api/admin/users/:id/impersonate', access: 'Admin', desc: 'Generate a temporary impersonation token.' },
  { method: 'GET', endpoint: '/api/admin/audit-logs', access: 'Admin', desc: 'View audit logs, filterable by user, date, action.' },
  { method: 'GET', endpoint: '/api/health', access: 'Public', desc: 'Health check. Returns DB, Redis, and Email service status.' },
]

const successCriteria = [
  { icon: '🔐', title: 'Persistence', pass: 'Refreshing the page does not log the user out', test: 'Manual test: login, hard-refresh, verify user state is preserved' },
  { icon: '🔒', title: '2FA Works', pass: 'TOTP codes are correctly verified; invalid codes are rejected', test: 'Unit test with valid and invalid codes; verify 5-minute expiry' },
  { icon: '🚫', title: 'Brute Force Blocked', pass: 'Account locks after 5 failed attempts; unlocks after 15 minutes', test: 'Automated test: POST /login x 6, assert 423 on 6th attempt' },
  { icon: '🍪', title: 'HttpOnly Cookies', pass: 'Tokens are not accessible via document.cookie', test: 'Console test: document.cookie must not contain token value' },
  { icon: '🛡️', title: 'Admin Control', pass: 'Admin can revoke sessions and view audit logs', test: 'E2E test: Admin revokes session → user is logged out within 60s' },
  { icon: '⚡', title: 'Rate Limiting', pass: 'Auth endpoints enforce limits; excess requests receive 429', test: 'Load test: assert p(99) returns 429 after threshold' },
  { icon: '🚨', title: 'Error Tracking', pass: 'Unhandled exceptions appear in Sentry within 60 seconds', test: 'Trigger a deliberate error; confirm Sentry alert' },
  { icon: '🤝', title: 'UX Smoothness', pass: 'Login flow completes in under 2s on 3G; 2FA input auto-submits', test: 'Lighthouse CI + manual 2FA flow test across devices' },
]

const phases = [
  { phase: 'Phase 1 · Days 1–5', color: 'var(--blue)', bg: 'var(--blue-lt)', tx: 'var(--blue-tx)', bd: 'var(--blue-bd)', title: 'Core Secure Auth', items: ['Setup Node/Express + MongoDB', 'User Model with all security fields', 'Login/Register with brute-force protection', 'HttpOnly Cookies + State Persistence', 'Email verification flow'] },
  { phase: 'Phase 2 · Days 6–10', color: 'var(--orange)', bg: 'var(--orange-lt)', tx: 'var(--orange-tx)', bd: 'var(--orange-bd)', title: 'Advanced Security', items: ['2FA (TOTP) flow — setup + verify + backup codes', 'Device fingerprinting middleware', 'Session management — list + revoke', 'Audit logging for all auth events', 'Redis rate limiting'] },
  { phase: 'Phase 3 · Days 11–15', color: 'var(--purple)', bg: 'var(--purple-lt)', tx: 'var(--purple-tx)', bd: 'var(--purple-bd)', title: 'Frontend & UX', items: ['React + TanStack Query for server state', 'Auth forms: Login, Register, 2FA, Setup', 'Auth re-hydration gate (Zustand)', 'Toast notifications + loading states', 'Password strength meter (Zxcvbn)'] },
  { phase: 'Phase 4 · Days 16–20', color: 'var(--teal)', bg: 'var(--teal-lt)', tx: 'var(--teal-tx)', bd: 'var(--teal-bd)', title: 'Admin & OAuth', items: ['Admin dashboard — user management', 'Google + GitHub OAuth', 'Sentry integration (frontend + backend)', 'Health check endpoint', 'Final security audit & load testing'] },
]

const METHOD_COLORS = { POST: { bg: 'var(--blue-lt)', color: 'var(--blue-tx)', border: 'var(--blue-bd)' }, GET: { bg: 'var(--green-lt)', color: 'var(--green-tx)', border: 'var(--green-bd)' }, DELETE: { bg: 'var(--red-lt)', color: 'var(--red-tx)', border: 'var(--red-bd)' } }

export default function AuthPRD() {
  return (
    <>
      <div className="topic">
        <div className="topic-header prd">
          <div className="topic-tag prd">📋 Product Requirements Document</div>
          <h1>SecureAuth MERN —<br/>Enterprise Edition</h1>
          <p>Version 3.0 — Security Hardened. Zero-Trust Architecture, Persistent State, Defense-in-Depth. A production-ready authentication module for MERN applications.</p>
          <div className="topic-stats">
            <div className="t-stat"><span className="t-stat-ico">🏗️</span><div><div className="t-stat-val">4</div><div className="t-stat-lbl">Dev phases</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">🛡️</span><div><div className="t-stat-val">7</div><div className="t-stat-lbl">Security layers</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">📈</span><div><div className="t-stat-val">20</div><div className="t-stat-lbl">Day timeline</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">📄</span><div><div className="t-stat-val">15</div><div className="t-stat-lbl">API routes</div></div></div>
          </div>
        </div>
      </div>

      <div className="topic-divider"><hr/></div>

      <div className="topic">
        {/* P1 Executive Summary */}
        <Card icon="📄" bgColor="var(--teal-lt)" title="1 — Executive Summary" subtitle="What this system is and why it's built this way.">
          <p className="body">SecureAuth is a production-ready authentication module for MERN applications. It prioritises security (HttpOnly cookies, 2FA, Device Fingerprinting), UX (smooth state persistence, feedback), and control (Admin dashboard).</p>
          <p className="body">It solves the "refresh logout" problem via server-side re-hydration while implementing OWASP Top 10 protections from day one.</p>
          <div className="two-col">
            <div className="icard"><div className="icard-tag">Core promise</div><h4>Zero-Trust Architecture</h4><p>Every request is verified. No session is implicitly trusted. Device fingerprints bind tokens to the originating client.</p></div>
            <div className="icard"><div className="icard-tag">Core promise</div><h4>Persistent State</h4><p>The "refresh logout" bug is fixed via an Auth Re-hydration Gate — a GET /api/auth/me call on every app load that silently restores user state without forcing re-login.</p></div>
            <div className="icard"><div className="icard-tag">Core promise</div><h4>Defense-in-Depth</h4><p>No single security control is relied upon. Rate limiting, brute-force protection, 2FA, session revocation, and audit logging all work together in layers.</p></div>
            <div className="icard"><div className="icard-tag">Core promise</div><h4>Admin Control</h4><p>Full admin dashboard to force-logout users, view audit logs, analyse login risk, and impersonate users for support purposes — all logged.</p></div>
          </div>
        </Card>

        {/* P2 Architecture */}
        <Card icon="🏗️" bgColor="var(--blue-lt)" title="2 — Technical Architecture" subtitle="State persistence strategy and all seven security layers.">
          <h3 className="lbl">2.1 — State persistence: the "Refresh Fix"</h3>
          <p className="body">The auth re-hydration flow runs on every app load. It sets <code>isLoading = true</code>, fires <code>GET /api/auth/me</code> with the HttpOnly cookie automatically attached, validates the token server-side, sets React state, then sets <code>isLoading = false</code>.</p>
          <CodeBlock lang="typescript" code={`// Auth Re-hydration Gate — runs on app mount
const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  rehydrate: async () => {
    try {
      // Cookie is sent automatically — no manual token handling
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.ok) {
        const user = await res.json();
        set({ user, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch {
      set({ user: null, isLoading: false });
    }
  }
}));`} />

          <h3 className="lbl">2.2 — Token strategy</h3>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Token type</th><th>Lifetime</th><th>Storage</th><th>Notes</th></tr></thead>
              <tbody>
                {tokenStrategy.map((t, i) => (
                  <tr key={i}>
                    <td><strong>{t.type}</strong></td>
                    <td>{t.lifetime}</td>
                    <td>{t.storage}</td>
                    <td>{t.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="lbl">2.3 — Security layers</h3>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Layer</th><th>Implementation</th></tr></thead>
              <tbody>
                {securityLayers.map((s, i) => (
                  <tr key={i}>
                    <td><span className={`badge ${s.badge}`}>{s.level}</span> <strong>{s.title}</strong></td>
                    <td>{s.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CodeBlock lang="javascript" code={`import crypto from 'crypto';

export const generateFingerprint = (req) => {
  const data = [
    req.headers['user-agent'] || '',
    req.ip || '',
    req.headers['accept-language'] || '',
  ].join('|');
  return crypto.createHash('sha256').update(data).digest('hex');
};

export const verifyFingerprint = (req, res, next) => {
  const current = generateFingerprint(req);
  if (req.user.fingerprint !== current) {
    AuditLog.create({ action: 'FINGERPRINT_MISMATCH', userId: req.user._id, ip: req.ip, status: 'FAILURE' });
    return res.status(401).json({ error: 'Session invalid. Please log in again.' });
  }
  next();
};`} />
        </Card>

        {/* P3 Data Models */}
        <Card icon="📒" bgColor="var(--green-lt)" title="3 — Data Models" subtitle="User schema with all security fields and the AuditLog schema.">
          <h3 className="lbl">3.1 — User schema</h3>
          <CodeBlock lang="javascript" code={`const UserSchema = new Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, select: false, minlength: 8 }, // Hashed (bcrypt)
  provider: { type: String, enum: ['local', 'google', 'github'], default: 'local' },
  role:     { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },

  // Security
  isVerified:    { type: Boolean, default: false },
  isBanned:      { type: Boolean, default: false },
  loginAttempts: { type: Number, default: 0 },
  lockUntil:     { type: Date },

  // 2FA
  twoFactorSecret:      { type: String, select: false }, // Encrypted at rest
  twoFactorEnabled:     { type: Boolean, default: false },
  twoFactorBackupCodes: [String], // Hashed (bcrypt)

  // Session tracking
  activeSessions: [{
    sessionId:  String,
    fingerprint: String,
    userAgent:  String,
    ip:         String,
    lastActive: Date,
  }],
});`} />

          <h3 className="lbl">3.2 — AuditLog schema</h3>
          <CodeBlock lang="javascript" code={`const AuditLogSchema = new Schema({
  action:      { type: String, required: true },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ip:          String,
  fingerprint: String,
  status:      { type: String, enum: ['SUCCESS', 'FAILURE'] },
  createdAt:   { type: Date, default: Date.now, expires: '90d' }, // Auto-delete after 90 days
});

// Common action values:
// LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_2FA_REQUIRED
// LOGIN_2FA_SUCCESS, LOGIN_2FA_FAILED, LOGIN_LOCKED
// FINGERPRINT_MISMATCH, SESSION_REVOKED, PASSWORD_RESET
// OAUTH_LINKED, ADMIN_IMPERSONATION, ADMIN_FORCE_LOGOUT`} />

          <Note type="info" icon="🔐" title="Security note on sensitive fields"><code>password</code> and <code>twoFactorSecret</code> use <code>select: false</code> — they are never returned in queries unless explicitly requested.</Note>
        </Card>

        {/* P4 Functional Requirements */}
        <Card icon="✅" bgColor="var(--green-lt)" title="4 — Functional Requirements" subtitle="Auth flows, 2FA setup, social login, session management, and admin panel.">
          <h3 className="lbl">4.1 — Authentication flows</h3>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Feature</th><th>Step-by-step logic</th></tr></thead>
              <tbody>
                {authFlows.map((f, i) => (
                  <tr key={i}>
                    <td><strong>{f.feature}</strong></td>
                    <td>{f.steps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="lbl">Brute force protection implementation</h3>
          <CodeBlock lang="javascript" code={`const handleFailedLogin = async (user) => {
  const updates = { $inc: { loginAttempts: 1 } };

  if (user.loginAttempts + 1 >= 5) {
    updates.$set = { lockUntil: new Date(Date.now() + 15 * 60 * 1000) };
    await AuditLog.create({ action: 'LOGIN_LOCKED', userId: user._id, status: 'FAILURE' });
  }
  await User.updateOne({ _id: user._id }, updates);
};

const checkLockout = (user) => {
  if (user.lockUntil && user.lockUntil > Date.now()) {
    const mins = Math.ceil((user.lockUntil - Date.now()) / 60000);
    throw new AppError(\`Account locked. Try again in \${mins} minutes.\`, 423);
  }
};`} />

          <h3 className="lbl">4.2 — Admin control panel</h3>
          <p className="body">The admin panel includes: <strong>Force Logout</strong> (revoke specific user session), <strong>Impersonation</strong> (temporary token with admin tracking), <strong>Security Logs</strong> (failed logins, fingerprint mismatches), <strong>Risk Analysis</strong> (multi-country logins flagged), and <strong>Manual Lock/Unlock</strong>.</p>
        </Card>

        {/* P5 UI/UX */}
        <Card icon="🎨" bgColor="var(--purple-lt)" title="5 — UI/UX Design Specification" subtitle="Visual feedback, accessibility requirements, and trust signals.">
          <div className="two-col">
            <div className="icard"><div className="icard-tag">2FA Input</div><h4>Auto-focus + auto-submit</h4><p>6-digit TOTP input auto-focuses on mount. Automatically submits when the 6th digit is entered — no button press required.</p></div>
            <div className="icard"><div className="icard-tag">Device badge</div><h4>Verified vs New device</h4><p>Show "Verified Device" badge on login success for known fingerprints. Show "New Device" badge with notification email for unrecognised fingerprints.</p></div>
            <div className="icard"><div className="icard-tag">Session list</div><h4>Active devices display</h4><p>Show device icon, IP address, approximate location, and "Last Active" timestamp. Include a "Revoke" button on each row.</p></div>
            <div className="icard"><div className="icard-tag">Lockout UI</div><h4>Clear lockout warning</h4><p>When account is locked, show: "Account locked for 15 minutes due to too many failed attempts." with a countdown timer.</p></div>
            <div className="icard"><div className="icard-tag">Password meter</div><h4>Real-time strength check</h4><p>Use the Zxcvbn library for password strength scoring. Show a visual strength bar with specific feedback on what to improve.</p></div>
            <div className="icard"><div className="icard-tag">Phishing protection</div><h4>Generic error messages</h4><p>Never reveal whether an email exists. Always return "Invalid email or password" — never "Email not found".</p></div>
          </div>
        </Card>

        {/* P6 API Endpoints */}
        <Card icon="📃" bgColor="var(--blue-lt)" title="6 — API Endpoint Structure" subtitle="All routes, access levels, and descriptions.">
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Method</th><th>Endpoint</th><th>Access</th><th>Description</th></tr></thead>
              <tbody>
                {apiEndpoints.map((e, i) => (
                  <tr key={i}>
                    <td><span className="badge" style={{ background: METHOD_COLORS[e.method]?.bg || 'var(--surface2)', color: METHOD_COLORS[e.method]?.color || 'var(--tx3)', border: `1px solid ${METHOD_COLORS[e.method]?.border || 'var(--border)'}`, padding: '2px 7px', borderRadius: '20px', fontSize: '10px', fontWeight: '700', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>{e.method}</span></td>
                    <td><code>{e.endpoint}</code></td>
                    <td>{e.access}</td>
                    <td>{e.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* P7 Observability */}
        <Card icon="👁️" bgColor="var(--orange-lt)" title="7 — Observability & Compliance" subtitle="Sentry, Winston, health checks, GDPR, and data retention.">
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Feature</th><th>Implementation</th></tr></thead>
              <tbody>
                <tr><td><strong>Error Tracking</strong></td><td>Sentry.io on both frontend (React) and backend (Node). Configured with <code>beforeSend</code> to strip passwords and tokens before transmission.</td></tr>
                <tr><td><strong>Structured Logging</strong></td><td>Winston logger writing to both console (development) and rotating log files (production). All auth failures logged at warn level with IP and fingerprint.</td></tr>
                <tr><td><strong>Health Checks</strong></td><td><code>GET /api/health</code> returns JSON status of MongoDB, Redis, and email service. Used by uptime monitoring tools.</td></tr>
                <tr><td><strong>GDPR Compliance</strong></td><td><code>GET /api/users/data-export</code> returns a complete JSON dump of all data held for the authenticated user.</td></tr>
                <tr><td><strong>Data Retention</strong></td><td>Audit logs auto-expire after 90 days using MongoDB TTL index (<code>expires: '90d'</code> on the <code>createdAt</code> field).</td></tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* P8 Roadmap */}
        <Card icon="🚀" bgColor="var(--teal-lt)" title="8 — Development Roadmap" subtitle="Four phases across 20 days from setup to production launch.">
          <div className="two-col" style={{ gap: '12px' }}>
            {phases.map((p, i) => (
              <div key={i} className="icard" style={{ borderLeft: `3px solid ${p.color}` }}>
                <div className="icard-tag" style={{ background: p.bg, color: p.tx, borderColor: p.bd }}>{p.phase}</div>
                <h4>{p.title}</h4>
                <p style={{ color: 'var(--tx2)', fontSize: '13px', lineHeight: '1.7', marginTop: '4px' }}>
                  {p.items.map((item, j) => (
                    <span key={j}>✓ {item}<br/></span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* P9 Success Criteria */}
        <Card icon="🏆" bgColor="var(--green-lt)" title="9 — Success Criteria" subtitle="How we know the system is complete and ready for production.">
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Criterion</th><th>Pass condition</th><th>Test method</th></tr></thead>
              <tbody>
                {successCriteria.map((s, i) => (
                  <tr key={i}>
                    <td><strong>{s.icon} {s.title}</strong></td>
                    <td>{s.pass}</td>
                    <td>{s.test}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Note type="teal" icon="🚀" title="Definition of done">All 8 criteria above must pass in the staging environment before any deployment to production. Security audit (OWASP ZAP scan + manual penetration test) must return zero high or critical findings.</Note>
        </Card>
      </div>

      <BackToTop />
    </>
  )
}
